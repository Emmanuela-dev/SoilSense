import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts"
import { dashboardStats } from "../../data/mockData"

const score = dashboardStats.soilHealthScore

const data = [{ value: score, fill: "#22C55E" }]

function getScoreLabel(score) {
  if (score >= 75) return { label: "Good", color: "text-green-600", bg: "bg-green-50" }
  if (score >= 50) return { label: "Moderate", color: "text-yellow-600", bg: "bg-yellow-50" }
  return { label: "Poor", color: "text-red-600", bg: "bg-red-50" }
}

function SoilHealthChart() {
  const scoreInfo = getScoreLabel(score)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <div>
          <h3 className="text-gray-800 font-bold text-base">Soil Health Overview</h3>
          <p className="text-gray-400 text-xs mt-0.5">Overall farm soil condition</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${scoreInfo.bg} ${scoreInfo.color}`}>
          {scoreInfo.label}
        </span>
      </div>

      {/* Gauge Chart */}
      <div className="relative flex items-center justify-center px-6 py-4">
        <ResponsiveContainer width="100%" height={220}>
          <RadialBarChart
            cx="50%"
            cy="80%"
            innerRadius="70%"
            outerRadius="100%"
            barSize={14}
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background={{ fill: "#F1F5F9" }}
              dataKey="value"
              angleAxisId={0}
              cornerRadius={8}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Score Text Overlay */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
          <p className="text-5xl font-bold text-gray-800">{score}</p>
          <p className="text-gray-400 text-sm">/100</p>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 pb-4 text-center">
        <p className="text-gray-500 text-xs leading-relaxed">
          Your soil is in good condition. Continue following recommendations to maintain productivity.
        </p>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-3 gap-3 px-6 pb-5">
        <div className="text-center p-3 bg-gray-50 rounded-xl">
          <p className="text-gray-400 text-xs">pH Status</p>
          <p className="text-red-500 text-sm font-bold mt-1">Acidic</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-xl">
          <p className="text-gray-400 text-xs">Moisture</p>
          <p className="text-yellow-500 text-sm font-bold mt-1">Low</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-xl">
          <p className="text-gray-400 text-xs">Temperature</p>
          <p className="text-green-600 text-sm font-bold mt-1">Optimal</p>
        </div>
      </div>

      {/* View Report Button */}
      <div className="px-6 pb-5">
        <button className="w-full py-2.5 border-2 border-[#166534] text-[#166534] text-sm font-semibold rounded-xl hover:bg-[#166534] hover:text-white transition-all duration-200">
          View Soil Health Report →
        </button>
      </div>

    </div>
  )
}

export default SoilHealthChart