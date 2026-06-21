import { useNavigate } from "react-router-dom"
import {
  Sprout,
  FlaskConical,
  CloudSun,
  Lightbulb,
  MapPin,
  BarChart2,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#166534] rounded-xl flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-[#166534] font-bold text-lg leading-tight">
                SoilSense <span className="text-[#22C55E]">AI</span>
              </h1>
              <p className="text-gray-500 text-xs">Smart Soil. Better Yields.</p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-600 text-sm font-medium hover:text-[#166534] transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 text-sm font-medium hover:text-[#166534] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#stats"
              className="text-gray-600 text-sm font-medium hover:text-[#166534] transition-colors"
            >
              Impact
            </a>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-gray-600 text-sm font-medium hover:text-[#166534] transition-colors"
            >
              Dashboard
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-[#166534] text-sm font-semibold hover:text-green-700 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-[#166534] hover:bg-green-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm"
            >
              Get Started →
            </button>
          </div>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-[#166534] via-[#15803D] to-[#22C55E] flex items-center pt-20">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></span>
                <span className="text-green-100 text-xs font-medium">
                  AI-Powered Soil Intelligence Platform
                </span>
              </div>

              <h1 className="text-white text-5xl font-bold leading-tight mb-6">
                Transform Soil Health Into
                <span className="text-[#F59E0B]"> Better Harvests</span>
              </h1>

              <p className="text-green-100 text-lg leading-relaxed mb-8">
                SoilSense AI empowers extension officers and Farmer Service Centers
                with real-time soil diagnostics, AI recommendations, and weather
                intelligence — all from the field.
              </p>

              {/* Checkpoints */}
              <div className="space-y-3 mb-10">
                {[
                  "Instant soil health diagnostics in the field",
                  "AI-powered personalized recommendations",
                  "Real-time weather intelligence for farmers",
                  "Geo-referenced soil maps for Kenyan farms",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] shrink-0" />
                    <span className="text-green-100 text-sm">{point}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 bg-white text-[#166534] text-sm font-bold px-6 py-3.5 rounded-xl hover:bg-green-50 transition-all shadow-lg"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 bg-white/10 text-white text-sm font-semibold px-6 py-3.5 rounded-xl hover:bg-white/20 transition-all border border-white/20"
                >
                  View Dashboard
                </button>
              </div>
            </div>

            {/* Right Content — Dashboard Preview Card */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl">

                {/* Mini Dashboard Preview */}
                <div className="bg-white rounded-2xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-gray-800 text-sm font-bold">Soil Health Score</p>
                    <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full font-semibold">
                      Good
                    </span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-gray-800">78</span>
                    <span className="text-gray-400 text-sm mb-1">/100</span>
                  </div>
                  <div className="mt-3 h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-2 bg-[#22C55E] rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>

                {/* Mini Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-white text-lg font-bold">128</p>
                    <p className="text-green-200 text-xs">Assessments</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-white text-lg font-bold">243</p>
                    <p className="text-green-200 text-xs">Farmers</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-white text-lg font-bold">84%</p>
                    <p className="text-green-200 text-xs">AI Accuracy</p>
                  </div>
                </div>

                {/* Recommendation Preview */}
                <div className="bg-white rounded-xl p-3 mb-3">
                  <p className="text-gray-700 text-xs font-bold mb-2">
                    🤖 Latest AI Recommendation
                  </p>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Apply agricultural lime at 2 bags/acre to reduce soil acidity on Nyamirama Farm.
                  </p>
                </div>

                {/* Alert */}
                <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 text-sm">🚨</span>
                    <div>
                      <p className="text-red-700 text-xs font-bold">
                        High Soil Acidity Detected
                      </p>
                      <p className="text-red-500 text-xs">
                        Nyamirama Farm — pH 4.8
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="bg-[#F8FAFC] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "243+", label: "Farmers Reached", icon: "👨‍🌾" },
              { value: "128", label: "Soil Assessments", icon: "🧪" },
              { value: "84%", label: "AI Accuracy Rate", icon: "🤖" },
              { value: "12", label: "Active Farms", icon: "🌾" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-[#166534] text-3xl font-bold">{stat.value}</p>
                <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-14">
            <span className="text-[#22C55E] text-sm font-bold uppercase tracking-wide">
              Features
            </span>
            <h2 className="text-gray-800 text-4xl font-bold mt-2">
              Everything You Need for Soil Intelligence
            </h2>
            <p className="text-gray-600 text-base mt-3 max-w-2xl mx-auto">
              A complete platform for extension officers to diagnose, advise,
              and monitor soil health across multiple farms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FlaskConical,
                title: "Soil Health Diagnostics",
                description:
                  "Rapid field-based soil assessments using IoT sensors and smartphone image analysis.",
                color: "bg-green-50",
                iconColor: "text-green-600",
              },
              {
                icon: Lightbulb,
                title: "AI Recommendations",
                description:
                  "Personalized soil management advice generated by our AI engine in real time.",
                color: "bg-yellow-50",
                iconColor: "text-yellow-600",
              },
              {
                icon: CloudSun,
                title: "Weather Intelligence",
                description:
                  "7-day weather forecasts with farming alerts tailored to your location.",
                color: "bg-blue-50",
                iconColor: "text-blue-600",
              },
              {
                icon: MapPin,
                title: "Geo-Referenced Maps",
                description:
                  "Location-based soil intelligence to identify regional soil challenges.",
                color: "bg-red-50",
                iconColor: "text-red-600",
              },
              {
                icon: BarChart2,
                title: "Soil Trend Analysis",
                description:
                  "Track pH, moisture, and temperature trends over time across all farms.",
                color: "bg-purple-50",
                iconColor: "text-purple-600",
              },
              {
                icon: Sprout,
                title: "Farm Management",
                description:
                  "Manage multiple farms, crops, and assessments from one unified dashboard.",
                color: "bg-emerald-50",
                iconColor: "text-emerald-600",
              },
            ].map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group"
                >
                  <div
                    className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-gray-800 font-bold text-base mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-14">
            <span className="text-[#22C55E] text-sm font-bold uppercase tracking-wide">
              How It Works
            </span>
            <h2 className="text-gray-800 text-4xl font-bold mt-2">
              From Field to Recommendation in Minutes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Collect Soil Data",
                description:
                  "Extension officer visits the farm and collects soil samples using IoT sensors and smartphone camera.",
                icon: "📱",
              },
              {
                step: "02",
                title: "AI Analysis",
                description:
                  "SoilSense AI analyzes soil color, pH, moisture, temperature and crop requirements instantly.",
                icon: "🤖",
              },
              {
                step: "03",
                title: "Generate Report",
                description:
                  "The system generates a personalized soil health report with confidence score.",
                icon: "📊",
              },
              {
                step: "04",
                title: "Advise Farmer",
                description:
                  "Extension officer delivers clear, actionable recommendations directly to the farmer.",
                icon: "👨‍🌾",
              },
            ].map((step, index) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center h-full">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="text-[#22C55E] text-xs font-bold mb-2">
                    STEP {step.step}
                  </div>
                  <h3 className="text-gray-800 font-bold text-base mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10 text-gray-300 text-xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#166534] to-[#22C55E]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-white text-4xl font-bold mb-4">
            Ready to Transform Soil Health in Kenya?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Join extension officers and Farmer Service Centers already using
            SoilSense AI to deliver better soil advisory services.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 bg-white text-[#166534] text-base font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-all shadow-lg"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-green-200 text-sm mt-4">
            Free to use during hackathon demo period
          </p>
        </div>
      </section>

      {/* Landing Footer */}
      <footer className="bg-[#166534] py-6 px-6 border-t border-green-700">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-green-300" />
            <p className="text-green-200 text-sm">
              © 2026{" "}
              <span className="font-bold text-white">SoilSense AI</span> —
              Built for Kenyan Farmers
            </p>
          </div>
          </div>
      </footer>

    </div>
  )
}

export default Landing