import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { soilTrends } from "../../data/mockData"

function SoilTrends() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <div>
          <h3 className="text-gray-800 font-bold text-base">Soil Parameters Trend</h3>
          <p className="text-gray-400 text-xs mt-0.5">
            Last 7 days — Kiambu Town, Kenya
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs font-semibold px-3 py-1.5 bg-[#166534] text-white rounded-lg">
            7 Days
          </button>
          <button className="text-xs font-semibold px-3 py-1.5 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
            30 Days
          </button>
          <button className="text-xs font-semibold px-3 py-1.5 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
            90 Days
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="px-6 py-5">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart
            data={soilTrends}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#94A3B8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94A3B8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                fontSize: "12px",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
            />
            <Line
              type="monotone"
              dataKey="pH"
              stroke="#166534"
              strokeWidth={2.5}
              dot={{ fill: "#166534", r: 4 }}
              activeDot={{ r: 6 }}
              name="pH Level"
            />
            <Line
              type="monotone"
              dataKey="moisture"
              stroke="#22C55E"
              strokeWidth={2.5}
              dot={{ fill: "#22C55E", r: 4 }}
              activeDot={{ r: 6 }}
              name="Moisture (%)"
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#F59E0B"
              strokeWidth={2.5}
              dot={{ fill: "#F59E0B", r: 4 }}
              activeDot={{ r: 6 }}
              name="Temperature (°C)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 px-6 pb-5">
        <div className="bg-green-50 rounded-xl p-3 text-center">
          <p className="text-green-600 text-xs font-medium">Avg pH</p>
          <p className="text-green-800 text-lg font-bold mt-1">5.04</p>
          <p className="text-green-500 text-xs">Acidic — needs lime</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-3 text-center">
          <p className="text-blue-600 text-xs font-medium">Avg Moisture</p>
          <p className="text-blue-800 text-lg font-bold mt-1">38%</p>
          <p className="text-blue-500 text-xs">Slightly low</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-3 text-center">
          <p className="text-amber-600 text-xs font-medium">Avg Temp</p>
          <p className="text-amber-800 text-lg font-bold mt-1">25.6°C</p>
          <p className="text-amber-500 text-xs">Optimal range</p>
        </div>
      </div>

    </div>
  )
}

export default SoilTrends