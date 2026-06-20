function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

function GreetingBanner() {
  const today = new Date().toLocaleDateString("en-KE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="bg-gradient-to-r from-[#166534] to-[#22C55E] rounded-2xl px-6 py-5 mb-6 shadow-sm">
      <div className="flex items-center justify-between">

        {/* Left Side */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-white text-xl font-bold">
              {getGreeting()}, James 👋
            </h2>
          </div>
          <p className="text-green-100 text-sm mt-1">
            Here's your soil intelligence summary for today.
          </p>
          <p className="text-green-200 text-xs mt-1">{today}</p>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">

          {/* Quick Stat */}
          <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
            <p className="text-green-200 text-xs">Farms Active</p>
            <p className="text-white text-2xl font-bold">12</p>
          </div>

          <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
            <p className="text-green-200 text-xs">Alerts Today</p>
            <p className="text-white text-2xl font-bold">3</p>
          </div>

          <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
            <p className="text-green-200 text-xs">Pending Reviews</p>
            <p className="text-white text-2xl font-bold">7</p>
          </div>

        </div>

      </div>

      {/* Bottom Strip */}
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
        <span className="w-2 h-2 bg-[#F59E0B] rounded-full animate-pulse"></span>
        <p className="text-green-100 text-xs">
          <span className="font-semibold">SoilSense AI Tip:</span> Regular soil testing combined with weather insights helps you make smarter decisions and increase yields.
        </p>
      </div>

    </div>
  )
}

export default GreetingBanner