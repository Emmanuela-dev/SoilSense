function TopNav({ pageTitle }) {
  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-40 shadow-sm">
      
      {/* Left Side - Page Title */}
      <div>
        <h2 className="text-lg font-bold text-gray-800">{pageTitle}</h2>
        <p className="text-xs text-gray-400">Here's what's happening with your farms today.</p>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-4">

        {/* Location */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
          <span className="text-gray-600 text-sm font-medium">Kiambu Town, Kenya</span>
          <span className="text-gray-400 text-xs">▾</span>
        </div>

        {/* Notification Bell */}
        <button className="relative w-10 h-10 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl flex items-center justify-center transition-all">
          <span className="text-gray-600 text-lg">🔔</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* New Assessment Button */}
        <button className="flex items-center gap-2 bg-[#166534] hover:bg-green-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md">
          <span className="text-base">+</span>
          <span>New Assessment</span>
        </button>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-xl bg-[#F59E0B] flex items-center justify-center text-white font-bold text-sm cursor-pointer shadow-sm">
          JK
        </div>

      </div>
    </div>
  )
}

export default TopNav