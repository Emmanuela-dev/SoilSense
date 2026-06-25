import { useState, useEffect } from "react"
import StatsCards from "../components/dashboard/StatsCards"
import RecentAssessments from "../components/dashboard/RecentAssessments"
import RecommendationsPanel from "../components/dashboard/RecommendationsPanel"
import WeatherWidget from "../components/dashboard/WeatherWidget"
import SoilTrends from "../components/dashboard/SoilTrends"
import SoilHealthChart from "../components/dashboard/SoilHealthChart"
import GreetingBanner from "../components/dashboard/GreetingBanner"
import CurrentAssessment from "../components/dashboard/CurrentAssessment"
import DashboardLayout from "../components/layout/DashboardLayout"
import { getDashboardAIData } from "../api/dashboardService"
import { Loader, Wifi, WifiOff } from "lucide-react"

function Dashboard() {
  const [aiData, setAiData] = useState(null)
  const [aiLoading, setAiLoading] = useState(true)
  const [aiConnected, setAiConnected] = useState(false)

  useEffect(() => {
    loadAIData()
    // Refresh AI data every 30 seconds
    const interval = setInterval(loadAIData, 30000)
    return () => clearInterval(interval)
  }, [])

  async function loadAIData() {
    try {
      const data = await getDashboardAIData()
      if (data) {
        setAiData(data)
        setAiConnected(true)
      }
    } catch (error) {
      setAiConnected(false)
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <DashboardLayout pageTitle="Dashboard">

      {/* AI Engine Status Bar */}
      <div className={`flex items-center justify-between px-4 py-2.5 rounded-xl mb-4 ${
        aiConnected
          ? "bg-green-50 border border-green-100"
          : "bg-red-50 border border-red-100"
      }`}>
        <div className="flex items-center gap-2">
          {aiConnected ? (
            <Wifi className="w-4 h-4 text-green-600" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
          <p className={`text-xs font-semibold ${
            aiConnected ? "text-green-700" : "text-red-600"
          }`}>
            {aiConnected
              ? "SoilSense AI Engine — Connected and Running"
              : "AI Engine Offline — Showing cached data"}
          </p>
        </div>
        {aiConnected && aiData && (
          <div className="flex items-center gap-4">
            <span className="text-green-600 text-xs font-medium">
              AI Confidence: {aiData.explanations.confidence.score}%
            </span>
            <span className="text-green-600 text-xs font-medium">
              Processing: {aiData.metadata.processingTimeMs}ms
            </span>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </div>
        )}
      </div>

      {/* Greeting Banner */}
      <GreetingBanner />

      {/* Real AI Stats Cards */}
      {aiLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse"
            >
              <div className="h-4 bg-gray-100 rounded mb-3 w-24"></div>
              <div className="h-8 bg-gray-100 rounded mb-2 w-16"></div>
              <div className="h-3 bg-gray-100 rounded w-20"></div>
            </div>
          ))}
        </div>
      ) : aiData ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          {/* Real Soil Health Score */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">
                Soil Health Score
              </p>
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-lg">
                🌿
              </div>
            </div>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-3xl font-bold text-gray-800">
                {aiData.soilHealth.score}
              </span>
              <span className="text-gray-400 text-sm mb-1">/100</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                aiData.soilHealth.score >= 65
                  ? "bg-green-50 text-green-600"
                  : aiData.soilHealth.score >= 50
                  ? "bg-yellow-50 text-yellow-600"
                  : "bg-red-50 text-red-500"
              }`}>
                {aiData.soilHealth.label}
              </span>
              <span className="text-gray-500 text-xs">AI Score</span>
            </div>
          </div>

          {/* Real Risk Level */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">
                Risk Level
              </p>
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-lg">
                ⚠️
              </div>
            </div>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-2xl font-bold text-gray-800">
                {aiData.risks.overall.level}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                aiData.risks.overall.level === "Low"
                  ? "bg-green-50 text-green-600"
                  : aiData.risks.overall.level === "Medium"
                  ? "bg-yellow-50 text-yellow-600"
                  : "bg-red-50 text-red-500"
              }`}>
                {aiData.risks.overall.level} Risk
              </span>
            </div>
          </div>

          {/* Real Recommendations Count */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">
                AI Recommendations
              </p>
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-lg">
                💡
              </div>
            </div>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-3xl font-bold text-gray-800">
                {aiData.recommendations.total}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-500">
                {aiData.recommendations.critical} Critical
              </span>
              <span className="text-gray-500 text-xs">
                {aiData.recommendations.high} High
              </span>
            </div>
          </div>

          {/* AI Confidence */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">
                AI Confidence
              </p>
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-lg">
                🤖
              </div>
            </div>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-3xl font-bold text-gray-800">
                {aiData.explanations.confidence.score}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                {aiData.explanations.confidence.score >= 85 ? "High" : "Moderate"}
              </span>
              <span className="text-gray-500 text-xs">Accuracy</span>
            </div>
          </div>

        </div>
      ) : (
        <StatsCards />
      )}

      {/* AI Alert Banner */}
      {aiData && aiData.summary.requiresUrgentAction && (
        <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-red-500 text-xl shrink-0">🚨</span>
            <div className="flex-1">
              <p className="text-red-700 font-bold text-sm">
                Urgent Action Required — AI Alert
              </p>
              <p className="text-red-600 text-xs mt-1 leading-relaxed">
                {aiData.summary.riskMessage}
              </p>
            </div>
            {aiData.summary.topRecommendation && (
              <div className="shrink-0 bg-red-100 rounded-xl px-3 py-2">
                <p className="text-red-700 text-xs font-bold">
                  Top Action:
                </p>
                <p className="text-red-600 text-xs mt-0.5">
                  {aiData.summary.topRecommendation.title}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Soil Health and Weather Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-1">
          <SoilHealthChart aiScore={aiData?.soilHealth.score} />
        </div>
        <div className="lg:col-span-1">
          <CurrentAssessment aiData={aiData} />
        </div>
        <div className="lg:col-span-1">
          <WeatherWidget />
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-6">
        <RecommendationsPanel aiRecommendations={aiData?.recommendations.items} />
      </div>

      {/* Soil Trends Chart */}
      <div className="mb-6">
        <SoilTrends />
      </div>

      {/* Assessments Table */}
      <div className="mb-6">
        <RecentAssessments />
      </div>

    </DashboardLayout>
  )
}

export default Dashboard