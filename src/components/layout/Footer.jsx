function Footer() {
  return (
    <div className="bg-white border-t border-gray-200 px-10 py-5">
      <div className="flex items-center justify-between gap-6">

        {/* Left Side */}
        <div className="flex items-center gap-4">
          <span className="text-green-600 text-base">🌱</span>
          <p className="text-gray-700 text-sm">
            <span className="font-bold text-[#166534]">SoilSense AI</span>
            <span className="mx-2 text-gray-300">|</span>
            Smart Soil. Better Yields.
          </p>
          <span className="text-gray-300">|</span>
          <p className="text-gray-600 text-sm font-medium">Version 1.0.0 Beta</p>
        </div>

        {/* Center */}
        <div className="hidden md:flex items-center gap-8">
          <button className="text-gray-600 text-sm font-medium hover:text-[#166534] transition-colors">
            Documentation
          </button>
          <button className="text-gray-600 text-sm font-medium hover:text-[#166534] transition-colors">
            Support
          </button>
          <button className="text-gray-600 text-sm font-medium hover:text-[#166534] transition-colors">
            Privacy Policy
          </button>
          <button className="text-gray-600 text-sm font-medium hover:text-[#166534] transition-colors">
            Terms of Use
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <p className="text-gray-600 text-sm font-medium">All systems operational</p>
          </div>
          <span className="text-gray-300">|</span>
          <p className="text-gray-700 text-sm font-medium">
            © 2025 SoilSense AI. Built for Kenyan Farmers.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Footer