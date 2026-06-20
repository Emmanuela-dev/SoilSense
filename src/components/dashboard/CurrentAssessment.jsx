function CurrentAssessment() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <div>
          <h3 className="text-gray-800 font-bold text-base">Current Assessment</h3>
          <p className="text-gray-400 text-xs mt-0.5">Latest field evaluation</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
          Latest
        </span>
      </div>

      {/* Farm Image and Info */}
      <div className="px-6 py-4">
        <div className="flex items-start gap-4">

          {/* Soil Image */}
<div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-sm">
  <img
    src="/Soil.jpg"
    alt="Soil sample"
    className="w-full h-full object-cover"
  />
</div>

          {/* Farm Details */}
          <div className="flex-1">
            <h4 className="text-gray-800 font-bold text-sm">Nyamirama Farm</h4>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-gray-400 text-xs">Kiambu Town, Kenya</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-gray-400 text-xs">🌾</span>
              <span className="text-gray-500 text-xs font-medium">Maize</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-gray-400 text-xs">📅</span>
              <span className="text-gray-400 text-xs">12 May 2025 • 10:30 AM</span>
            </div>
          </div>

        </div>

        {/* Soil Readings */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-red-50 rounded-xl p-3 text-center border border-red-100">
            <p className="text-red-400 text-xs font-medium">pH Level</p>
            <p className="text-red-600 text-xl font-bold mt-1">4.8</p>
            <p className="text-red-400 text-xs">Acidic</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-3 text-center border border-yellow-100">
            <p className="text-yellow-500 text-xs font-medium">Moisture</p>
            <p className="text-yellow-600 text-xl font-bold mt-1">25%</p>
            <p className="text-yellow-400 text-xs">Low</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-3 text-center border border-orange-100">
            <p className="text-orange-400 text-xs font-medium">Temperature</p>
            <p className="text-orange-600 text-xl font-bold mt-1">28°C</p>
            <p className="text-orange-400 text-xs">Warm</p>
          </div>
        </div>

        {/* Alert */}
        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl">
          <div className="flex items-start gap-2">
            <span className="text-red-500 text-sm mt-0.5">🚨</span>
            <div>
              <p className="text-red-700 text-xs font-bold">High Soil Acidity Detected</p>
              <p className="text-red-500 text-xs mt-0.5">
                Immediate action recommended to improve soil pH.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button className="py-2.5 border-2 border-[#166534] text-[#166534] text-xs font-semibold rounded-xl hover:bg-[#166534] hover:text-white transition-all duration-200">
            View Soil Report
          </button>
          <button className="py-2.5 bg-[#166534] text-white text-xs font-semibold rounded-xl hover:bg-green-800 transition-all duration-200 shadow-sm">
            Full Assessment →
          </button>
        </div>

      </div>
    </div>
  )
}

export default CurrentAssessment