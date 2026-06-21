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
          </div>

        {/* Center */}
        <div className="hidden md:flex items-center gap-8">
         </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        </div>
          <span className="text-gray-300">|</span>
          <p className="text-gray-700 text-sm font-medium">
            © 2026 SoilSense AI. Built for Kenyan Farmers.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Footer