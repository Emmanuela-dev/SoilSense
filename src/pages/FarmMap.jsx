import { useState } from "react"
import DashboardLayout from "../components/layout/DashboardLayout"
import { recentAssessments } from "../data/mockData"
import { MapPin, Layers, ZoomIn, ZoomOut, Navigation } from "lucide-react"

function StatusDot({ status }) {
  const colors = {
    "High Risk": "bg-red-500",
    "Moderate": "bg-yellow-500",
    "Healthy": "bg-green-500",
  }
  return (
    <span className={`w-3 h-3 rounded-full ${colors[status]} shrink-0`}></span>
  )
}

function FarmMap() {
  const [selectedFarm, setSelectedFarm] = useState(recentAssessments[0])
  const [activeLayer, setActiveLayer] = useState("Soil Health")

  const layers = ["Soil Health", "pH Levels", "Moisture", "Temperature"]

  const farmLocations = [
    { id: 1, name: "Nyamirama Farm", top: "35%", left: "42%", status: "High Risk" },
    { id: 2, name: "Riana Farm", top: "55%", left: "60%", status: "Moderate" },
    { id: 3, name: "Borabu Farm", top: "25%", left: "65%", status: "Healthy" },
    { id: 4, name: "Koumbu Farm", top: "65%", left: "38%", status: "Moderate" },
    { id: 5, name: "Manga Farm", top: "45%", left: "25%", status: "Healthy" },
  ]

  const pinColors = {
    "High Risk": "bg-red-500 border-red-600",
    "Moderate": "bg-yellow-500 border-yellow-600",
    "Healthy": "bg-green-500 border-green-600",
  }

  return (
    <DashboardLayout pageTitle="Farm Map">

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-800 text-2xl font-bold">Farm Map</h2>
          <p className="text-gray-600 text-sm mt-1">
             Kiambu Town, Kenya — Geo-referenced soil intelligence
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-[#166534] hover:bg-green-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm">
            <Navigation className="w-4 h-4" />
            My Location
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Farms", value: "5", color: "text-gray-800", icon: "🌾" },
          { label: "High Risk", value: "1", color: "text-red-500", icon: "🚨" },
          { label: "Moderate", value: "2", color: "text-yellow-500", icon: "⚠️" },
          { label: "Healthy", value: "2", color: "text-green-600", icon: "✅" },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
          >
            <div className="text-2xl mb-2">{card.icon}</div>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-gray-600 text-xs mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Map and Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Map Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Map Controls */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700 text-sm font-semibold">Map Layer:</span>
              <div className="flex items-center gap-1">
                {layers.map((layer) => (
                  <button
                    key={layer}
                    onClick={() => setActiveLayer(layer)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                      activeLayer === layer
                        ? "bg-[#166534] text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {layer}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">
                <ZoomIn className="w-4 h-4 text-gray-600" />
              </button>
              <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">
                <ZoomOut className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Map Visual */}
          <div className="relative h-96 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">

            {/* Grid Lines */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(8)].map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute w-full border-t border-green-300"
                  style={{ top: `${(i + 1) * 12.5}%` }}
                />
              ))}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute h-full border-l border-green-300"
                  style={{ left: `${(i + 1) * 12.5}%` }}
                />
              ))}
            </div>

            {/* Roads */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute bg-yellow-300 h-1 w-full" style={{ top: "50%" }} />
              <div className="absolute bg-yellow-300 w-1 h-full" style={{ left: "50%" }} />
            </div>

            {/* Farm Pins */}
            {farmLocations.map((farm) => (
              <button
                key={farm.id}
                onClick={() => setSelectedFarm(
                  recentAssessments.find((a) => a.farm === farm.name) || recentAssessments[0]
                )}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ top: farm.top, left: farm.left }}
              >
                {/* Pin */}
                <div className={`w-5 h-5 rounded-full border-2 ${pinColors[farm.status]} shadow-lg group-hover:scale-125 transition-transform`}>
                </div>

                {/* Pulse Ring */}
                {farm.status === "High Risk" && (
                  <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-40"></div>
                )}

                {/* Label */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-lg px-2 py-1 shadow-lg border border-gray-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <p className="text-gray-800 text-xs font-bold">{farm.name}</p>
                  <p className={`text-xs font-medium ${
                    farm.status === "High Risk" ? "text-red-500" :
                    farm.status === "Moderate" ? "text-yellow-500" : "text-green-600"
                  }`}>{farm.status}</p>
                </div>
              </button>
            ))}

            {/* Map Label */}
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-100">
              <p className="text-gray-700 text-xs font-semibold">
                📍 Kiambu Town, Kenya
              </p>
              <p className="text-gray-500 text-xs">
                Showing: {activeLayer}
              </p>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-100">
              <p className="text-gray-700 text-xs font-semibold mb-2">Legend</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="text-gray-600 text-xs">High Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="text-gray-600 text-xs">Moderate</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-gray-600 text-xs">Healthy</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Farm List Sidebar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h3 className="text-gray-800 font-bold text-base">Farm List</h3>
            <p className="text-gray-600 text-xs mt-0.5">
              Click a farm to view details
            </p>
          </div>

          {/* Farm Cards */}
          <div className="divide-y divide-gray-50">
            {recentAssessments.map((farm) => (
              <button
                key={farm.id}
                onClick={() => setSelectedFarm(farm)}
                className={`w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
                  selectedFarm?.id === farm.id ? "bg-green-50 border-l-4 border-[#166534]" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <StatusDot status={farm.status} />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 text-sm font-semibold truncate">
                      {farm.farm}
                    </p>
                    <p className="text-gray-600 text-xs">{farm.crop}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-xs font-bold ${
                      farm.status === "High Risk" ? "text-red-500" :
                      farm.status === "Moderate" ? "text-yellow-500" : "text-green-600"
                    }`}>
                      pH {farm.pH}
                    </p>
                    <p className="text-gray-500 text-xs">{farm.status}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Farm Detail */}
          {selectedFarm && (
            <div className="mx-4 my-4 p-4 bg-[#F0FDF4] rounded-xl border border-green-100">
              <p className="text-green-700 text-xs font-bold mb-3">
                📍 {selectedFarm.farm}
              </p>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <p className="text-gray-600 text-xs">pH</p>
                  <p className={`text-sm font-bold ${
                    selectedFarm.pH < 5.5 ? "text-red-500" : "text-green-600"
                  }`}>
                    {selectedFarm.pH}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-xs">Moisture</p>
                  <p className="text-blue-600 text-sm font-bold">
                    {selectedFarm.moisture}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-xs">Temp</p>
                  <p className="text-orange-500 text-sm font-bold">
                    {selectedFarm.temperature}
                  </p>
                </div>
              </div>
              <button className="w-full mt-3 py-2 bg-[#166534] text-white text-xs font-semibold rounded-lg hover:bg-green-800 transition-colors">
                View Full Assessment →
              </button>
            </div>
          )}

        </div>
      </div>

    </DashboardLayout>
  )
}

export default FarmMap