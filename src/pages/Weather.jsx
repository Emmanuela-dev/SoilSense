import DashboardLayout from "../components/layout/DashboardLayout"
import { weatherData } from "../data/mockData"
import { Wind, Droplets, Thermometer, Eye, Umbrella, Sun } from "lucide-react"

function WeatherIcon({ condition, size = "text-2xl" }) {
  const icons = {
    Rain: "🌧️",
    Cloudy: "☁️",
    Sunny: "☀️",
    "Light Rain": "🌦️",
  }
  return <span className={size}>{icons[condition] || "🌤️"}</span>
}

function Weather() {
  return (
    <DashboardLayout pageTitle="Weather Intelligence">

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-800 text-2xl font-bold">Weather Intelligence</h2>
          <p className="text-gray-600 text-sm mt-1">
              Kiambu Town, Kenya — Real-time weather insights for farming decisions
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-2 rounded-xl">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-green-700 text-sm font-semibold">Live Data</span>
        </div>
      </div>

      {/* Current Weather Hero */}
      <div className="bg-gradient-to-br from-[#166534] to-[#22C55E] rounded-2xl p-8 mb-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Left — Main Weather */}
          <div>
            <p className="text-green-200 text-sm font-medium mb-2">
              Current Conditions
            </p>
            <div className="flex items-end gap-4 mb-4">
              <span className="text-8xl font-bold text-white">
                {weatherData.temperature}°
              </span>
              <div className="mb-4">
                <p className="text-white text-xl font-semibold">
                  {weatherData.condition}
                </p>
                <p className="text-green-200 text-sm">
                  Feels like {weatherData.temperature - 1}°C
                </p>
              </div>
              <span className="text-6xl mb-2">
                <WeatherIcon condition={weatherData.condition} size="text-6xl" />
              </span>
            </div>
            <p className="text-green-100 text-sm">
               {weatherData.location}
            </p>
          </div>

          {/* Right — Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-4 h-4 text-green-200" />
                <p className="text-green-200 text-xs font-medium">Humidity</p>
              </div>
              <p className="text-white text-2xl font-bold">{weatherData.humidity}%</p>
              <p className="text-green-300 text-xs mt-1">High — Monitor crops</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="w-4 h-4 text-green-200" />
                <p className="text-green-200 text-xs font-medium">Wind Speed</p>
              </div>
              <p className="text-white text-2xl font-bold">{weatherData.wind} km/h</p>
              <p className="text-green-300 text-xs mt-1">Light breeze</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Umbrella className="w-4 h-4 text-green-200" />
                <p className="text-green-200 text-xs font-medium">Rainfall (24h)</p>
              </div>
              <p className="text-white text-2xl font-bold">2.4 mm</p>
              <p className="text-green-300 text-xs mt-1">Light rain</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="w-4 h-4 text-green-200" />
                <p className="text-green-200 text-xs font-medium">UV Index</p>
              </div>
              <p className="text-white text-2xl font-bold">3</p>
              <p className="text-green-300 text-xs mt-1">Low — Safe</p>
            </div>
          </div>

        </div>
      </div>

      {/* Farming Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-amber-500 text-xl mt-0.5">⚠️</span>
            <div>
              <p className="text-amber-700 font-bold text-sm">Delay Fertilizer</p>
              <p className="text-amber-600 text-xs mt-1 leading-relaxed">
                Rain expected in 48 hours. Avoid fertilizer application to prevent nutrient runoff.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-blue-500 text-xl mt-0.5">💧</span>
            <div>
              <p className="text-blue-700 font-bold text-sm">Irrigation Advisory</p>
              <p className="text-blue-600 text-xs mt-1 leading-relaxed">
                Skip irrigation today. Natural rainfall will provide adequate soil moisture.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-green-500 text-xl mt-0.5">🌱</span>
            <div>
              <p className="text-green-700 font-bold text-sm">Planting Window</p>
              <p className="text-green-600 text-xs mt-1 leading-relaxed">
                Ideal planting time is 2-3 days after consistent rainfall for maize crops.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 7 Day Forecast */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-50">
          <h3 className="text-gray-800 font-bold text-base">7-Day Forecast</h3>
          <p className="text-gray-600 text-xs mt-0.5">
            Extended weather outlook for Kiambu Town, Kenya
          </p>
        </div>
        <div className="grid grid-cols-7 divide-x divide-gray-50">
          {weatherData.forecast.map((day) => (
            <div
              key={day.day}
              className="flex flex-col items-center gap-3 p-5 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <p className="text-gray-600 text-sm font-semibold">{day.day}</p>
              <WeatherIcon condition={day.condition} size="text-3xl" />
              <div className="text-center">
                <p className="text-gray-800 text-sm font-bold">{day.high}°</p>
                <p className="text-gray-500 text-xs">{day.low}°</p>
              </div>
              <p className="text-gray-500 text-xs text-center">{day.condition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Farming Calendar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50">
          <h3 className="text-gray-800 font-bold text-base">
            Weather-Based Farming Calendar
          </h3>
          <p className="text-gray-600 text-xs mt-0.5">
            Recommended farming activities based on weather forecast
          </p>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            {
              day: "Today",
              activity: "Soil Assessment",
              description: "Good conditions for field visits and soil sampling.",
              status: "Recommended",
              color: "text-green-600",
              bg: "bg-green-50",
            },
            {
              day: "Tomorrow",
              activity: "Delay Spraying",
              description: "Wind speed may affect chemical application. Avoid pesticide spraying.",
              status: "Caution",
              color: "text-yellow-600",
              bg: "bg-yellow-50",
            },
            {
              day: "In 2 Days",
              activity: "Expected Rainfall",
              description: "Natural irrigation expected. Monitor drainage on low-lying farms.",
              status: "Alert",
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              day: "In 3 Days",
              activity: "Planting Window",
              description: "After rainfall, ideal time to plant maize and beans.",
              status: "Opportunity",
              color: "text-green-600",
              bg: "bg-green-50",
            },
            {
              day: "In 5 Days",
              activity: "Fertilizer Application",
              description: "Dry conditions expected — safe to apply fertilizer after rainfall.",
              status: "Recommended",
              color: "text-green-600",
              bg: "bg-green-50",
            },
          ].map((item) => (
            <div
              key={item.day}
              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-20 shrink-0">
                <p className="text-gray-700 text-sm font-bold">{item.day}</p>
              </div>
              <div className="flex-1">
                <p className="text-gray-800 text-sm font-semibold">{item.activity}</p>
                <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.bg} ${item.color} shrink-0`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </DashboardLayout>
  )
}

export default Weather