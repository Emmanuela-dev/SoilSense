import { dashboardStats } from "../../data/mockData"

const cards = [
  {
    title: "Soil Health Score",
    value: dashboardStats.soilHealthScore,
    unit: "/100",
    change: "+12%",
    changeType: "positive",
    icon: "🌿",
    iconBg: "bg-green-100",
    description: "Good condition",
  },
  {
    title: "Total Assessments",
    value: dashboardStats.totalAssessments,
    unit: "",
    change: "+18%",
    changeType: "positive",
    icon: "🧪",
    iconBg: "bg-blue-100",
    description: "This month",
  },
  {
    title: "High Risk Soils",
    value: dashboardStats.highRiskSoils,
    unit: "",
    change: "+8%",
    changeType: "negative",
    icon: "⚠️",
    iconBg: "bg-red-100",
    description: "Attention needed",
  },
  {
    title: "Farmers Reached",
    value: dashboardStats.farmersReached,
    unit: "",
    change: "+15%",
    changeType: "positive",
    icon: "👨‍🌾",
    iconBg: "bg-yellow-100",
    description: "This month",
  },
]

function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
        >
          {/* Top Row */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">
                {card.title}
              </p>
            </div>
            <div className={`w-10 h-10 ${card.iconBg} rounded-xl flex items-center justify-center text-lg`}>
              {card.icon}
            </div>
          </div>

          {/* Value */}
          <div className="flex items-end gap-1 mb-2">
            <span className="text-3xl font-bold text-gray-800">
              {card.value}
            </span>
            {card.unit && (
              <span className="text-gray-600 text-sm mb-1">{card.unit}</span>
            )}
          </div>

          {/* Bottom Row */}
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                card.changeType === "positive"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-500"
              }`}
            >
              {card.change}
            </span>
            <span className="text-gray-600 text-xs">{card.description}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards