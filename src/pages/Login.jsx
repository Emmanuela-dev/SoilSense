import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Sprout, Eye, EyeOff, Loader } from "lucide-react"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }

    setLoading(true)

    // Simulating API call — your workmate will replace this with Django API
    setTimeout(() => {
      if (email === "james@soilsense.ai" && password === "admin123") {
        navigate("/dashboard")
      } else {
        setError("Invalid email or password. Try james@soilsense.ai / admin123")
        setLoading(false)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen flex">

      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#166534] to-[#22C55E] flex-col justify-between p-12">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">
              SoilSense <span className="text-green-200">AI</span>
            </h1>
            <p className="text-green-200 text-xs">Smart Soil. Better Yields.</p>
          </div>
        </div>

        {/* Center Content */}
        <div>
          <h2 className="text-white text-4xl font-bold leading-tight mb-4">
            Empowering Extension Officers with AI-Powered Soil Intelligence
          </h2>
          <p className="text-green-100 text-base leading-relaxed mb-8">
            Diagnose soil health, generate recommendations, and help smallholder farmers increase productivity — all from the field.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-2xl p-4 text-center">
              <p className="text-white text-2xl font-bold">243</p>
              <p className="text-green-200 text-xs mt-1">Farmers Reached</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 text-center">
              <p className="text-white text-2xl font-bold">128</p>
              <p className="text-green-200 text-xs mt-1">Assessments Done</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 text-center">
              <p className="text-white text-2xl font-bold">84%</p>
              <p className="text-green-200 text-xs mt-1">AI Accuracy</p>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="border-t border-white/20 pt-6">
          <p className="text-green-100 text-sm italic">
            "Healthy soil, healthy future. Smart decisions today, better harvests tomorrow."
          </p>
          <p className="text-green-300 text-xs mt-2">— SoilSense AI Mission</p>
        </div>

      </div>

      {/* Right Panel — Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#F8FAFC] px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-[#166534] rounded-xl flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-[#166534] font-bold text-lg">SoilSense AI</h1>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-gray-800 text-3xl font-bold">Welcome back</h2>
            <p className="text-gray-600 text-sm mt-2">
              Sign in to your SoilSense AI account to continue.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="james@soilsense.ai"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-green-100 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-gray-700 text-sm font-semibold">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[#166534] text-xs font-semibold hover:text-green-700 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-green-100 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />
                  }
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 accent-[#166534] rounded"
              />
              <label htmlFor="remember" className="text-gray-600 text-sm">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#166534] hover:bg-green-800 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>

          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-xl">
            <p className="text-green-700 text-xs font-bold mb-2">
              🔑 Demo Credentials
            </p>
            <p className="text-green-600 text-xs">
              Email: <span className="font-semibold">james@soilsense.ai</span>
            </p>
            <p className="text-green-600 text-xs mt-1">
              Password: <span className="font-semibold">admin123</span>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-gray-600 text-sm hover:text-[#166534] transition-colors"
            >
              ← Back to Home
            </button>
          </div>

          {/* Footer */}
          <p className="text-gray-500 text-xs text-center mt-6">
            © 2025 SoilSense AI. Built for Kenyan Farmers. 🌱
          </p>

        </div>
      </div>

    </div>
  )
}

export default Login