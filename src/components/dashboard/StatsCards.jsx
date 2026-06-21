import { useEffect, useState } from "react"
import { api } from "../../api/client"

const baseCards = [
  {
    title: "Soil Health Score",
    value: 78,
    unit: "/100",
    change: "+12%",
    changeType: "positive",
    icon: "🌿",
    iconBg: "bg-green-100",
    description: "Good condition",
  },
  {
    title: "Total Assessments",
    value: 128,
    unit: "",
    change: "+18%",
    changeType: "positive",
    icon: "🧪",
    iconBg: "bg-blue-100",
    description: "This month",
  },
  {
    title: "High Risk Soils",
    value: 32,
    unit: "",
    change: "+8%",
    changeType: "negative",
    icon: "⚠️",
    iconBg: "bg-red-100",
    description: "Attention needed",
  },
  {
    title: "Healthy Soils",
    value: 0,
    unit: "",
    change: "Live",
    changeType: "positive",
    icon: "✅",
    iconBg: "bg-green-100",
    description: "Good condition",
  },
]

function StatsCards() {
  const [stats, setStats] = useState({
    totalAssessments: 128,
    highRiskSoils: 32,
    healthySoils: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getDashboard()
      .then((data) => setStats(data))
      .finally(() => setLoading(false))
  }, [])

  const cards = baseCards.map((card) => {
    if (card.title === "Total Assessments") return { ...card, value: stats.totalAssessments || 0 }
    if (card.title === "High Risk Soils") return { ...card, value: stats.highRiskSoils || 0 }
    if (card.title === "Healthy Soils") return { ...card, value: stats.healthySoils || 0 }
    return card
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
        >
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

          <div className="flex items-end gap-1 mb-2">
            <span className="text-3xl font-bold text-gray-800">
              {loading ? "..." : card.value}
            </span>
            {card.unit && (
              <span className="text-gray-600 text-sm mb-1">{card.unit}</span>
            )}
          </div>

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
