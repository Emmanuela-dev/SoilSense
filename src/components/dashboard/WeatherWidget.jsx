import { weatherData } from "../../data/mockData"

function WeatherIcon({ condition }) {
  const icons = {
    Rain: "🌧️",
    Cloudy: "☁️",
    Sunny: "☀️",
    "Light Rain": "🌦️",
  }
  return <span>{icons[condition] || "🌤️"}</span>
}

function WeatherWidget() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <div>
          <h3 className="text-gray-800 font-bold text-base">Weather Intelligence</h3>
          <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1">
             {weatherData.location}
          </p>
        </div>
        <button className="text-[#166534] text-sm font-semibold hover:text-green-700 transition-colors">
          Full Forecast →
        </button>
      </div>

      {/* Current Weather */}
      <div className="px-6 py-5 bg-gradient-to-br from-[#166534] to-[#22C55E]">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-end gap-2">
              <span className="text-white text-5xl font-bold">
                {weatherData.temperature}°
              </span>
              <span className="text-green-200 text-lg mb-2">C</span>
            </div>
            <p className="text-green-100 text-sm mt-1">{weatherData.condition}</p>
            <p className="text-green-200 text-xs mt-1">
              Feels like {weatherData.temperature - 1}°C
            </p>
          </div>
          <div className="text-6xl">
            <WeatherIcon condition={weatherData.condition} />
          </div>
        </div>

        {/* Weather Stats */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="bg-white/10 rounded-xl px-3 py-2.5 text-center">
            <p className="text-green-200 text-xs">Humidity</p>
            <p className="text-white text-sm font-bold mt-1">{weatherData.humidity}%</p>
          </div>
          <div className="bg-white/10 rounded-xl px-3 py-2.5 text-center">
            <p className="text-green-200 text-xs">Wind</p>
            <p className="text-white text-sm font-bold mt-1">{weatherData.wind} km/h</p>
          </div>
          <div className="bg-white/10 rounded-xl px-3 py-2.5 text-center">
            <p className="text-green-200 text-xs">Rain (24h)</p>
            <p className="text-white text-sm font-bold mt-1">2.4 mm</p>
          </div>
        </div>
      </div>

      {/* 7 Day Forecast */}
      <div className="px-6 py-4">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-3">
          7-Day Forecast
        </p>
        <div className="grid grid-cols-7 gap-1">
          {weatherData.forecast.map((day) => (
            <div
              key={day.day}
              className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <p className="text-gray-400 text-xs font-medium">{day.day}</p>
              <WeatherIcon condition={day.condition} />
              <p className="text-gray-800 text-xs font-bold">{day.high}°</p>
              <p className="text-gray-400 text-xs">{day.low}°</p>
            </div>
          ))}
        </div>
      </div>

      {/* Farming Alert */}
      <div className="mx-6 mb-5 p-3 bg-amber-50 border border-amber-100 rounded-xl">
        <div className="flex items-start gap-2">
          <span className="text-amber-500 text-sm mt-0.5">⚠️</span>
          <div>
            <p className="text-amber-700 text-xs font-semibold">Farming Alert</p>
            <p className="text-amber-600 text-xs mt-0.5">
              Rain expected in 48 hours. Delay fertilizer application to avoid nutrient runoff.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default WeatherWidget