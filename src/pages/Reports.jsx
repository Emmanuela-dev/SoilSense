import { useState } from "react"
import DashboardLayout from "../components/layout/DashboardLayout"
import { recentAssessments } from "../data/mockData"
import {
  Download,
  FileText,
  Filter,
  BarChart2,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react"

function Reports() {
  const [activeTab, setActiveTab] = useState("Overview")
  const tabs = ["Overview", "Soil Reports", "Farm Reports", "AI Summary"]

  return (
    <DashboardLayout pageTitle="Reports">

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-800 text-2xl font-bold">Reports</h2>
          <p className="text-gray-600 text-sm mt-1">
            Comprehensive soil health reports and analytics
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#166534] hover:bg-green-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm">
          <Download className="w-4 h-4" />
          Export All Reports
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            icon: FileText,
            label: "Total Reports",
            value: "128",
            change: "+18%",
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            icon: BarChart2,
            label: "Assessments",
            value: "243",
            change: "+12%",
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            icon: Users,
            label: "Farmers Covered",
            value: "243",
            change: "+15%",
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            icon: TrendingUp,
            label: "Avg Soil Score",
            value: "78",
            change: "+5%",
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
        ].map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">
                {card.label}
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                {card.change}
              </span>
            </div>
          )
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Tab Header */}
        <div className="flex items-center gap-1 px-6 py-4 border-b border-gray-50">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
                activeTab === tab
                  ? "bg-[#166534] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "Overview" && (
          <div className="p-6">

            {/* Recent Reports */}
            <div className="mb-6">
              <h3 className="text-gray-800 font-bold text-base mb-4">
                Recent Reports Generated
              </h3>
              <div className="space-y-3">
                {[
                  {
                    title: "Monthly Soil Health Summary — June 2025",
                    type: "Monthly Report",
                    date: "12 June 2025",
                    farms: 5,
                    status: "Ready",
                  },
                  {
                    title: "High Risk Farm Alert Report",
                    type: "Alert Report",
                    date: "10 June 2025",
                    farms: 1,
                    status: "Ready",
                  },
                  {
                    title: "Quarterly AI Recommendation Summary",
                    type: "AI Report",
                    date: "01 June 2025",
                    farms: 5,
                    status: "Ready",
                  },
                  {
                    title: "Soil Acidity Treatment Progress Report",
                    type: "Progress Report",
                    date: "28 May 2025",
                    farms: 3,
                    status: "Ready",
                  },
                  {
                    title: "Weather Impact on Soil Health — May 2025",
                    type: "Weather Report",
                    date: "20 May 2025",
                    farms: 5,
                    status: "Ready",
                  },
                ].map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#166534] rounded-xl flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-800 text-sm font-semibold">
                          {report.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-gray-500 text-xs">
                            {report.type}
                          </span>
                          <span className="text-gray-300 text-xs">|</span>
                          <span className="text-gray-500 text-xs flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {report.date}
                          </span>
                          <span className="text-gray-300 text-xs">|</span>
                          <span className="text-gray-500 text-xs">
                            {report.farms} farms
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                        {report.status}
                      </span>
                      <button className="w-8 h-8 bg-white hover:bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center transition-colors">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Soil Reports Tab */}
        {activeTab === "Soil Reports" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-800 font-bold text-base">
                Individual Soil Assessment Reports
              </h3>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 text-sm">Filter</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 rounded-xl">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Farm</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Crop</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">pH</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Report</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentAssessments.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <p className="text-gray-800 text-sm font-semibold">{a.farm}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-gray-700 text-sm">{a.crop}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-gray-600 text-sm">{a.date}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className={`text-sm font-bold ${
                          a.pH < 5.5 ? "text-red-500" : "text-green-600"
                        }`}>
                          {a.pH}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          a.status === "High Risk"
                            ? "bg-red-50 text-red-600"
                            : a.status === "Moderate"
                            ? "bg-yellow-50 text-yellow-600"
                            : "bg-green-50 text-green-600"
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button className="flex items-center gap-1 text-[#166534] text-xs font-semibold hover:text-green-700 transition-colors">
                          <Download className="w-3 h-3" />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Farm Reports Tab */}
        {activeTab === "Farm Reports" && (
          <div className="p-6">
            <h3 className="text-gray-800 font-bold text-base mb-4">
              Farm Performance Reports
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentAssessments.map((farm) => (
                <div
                  key={farm.id}
                  className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-gray-800 font-bold text-sm">{farm.farm}</p>
                      <p className="text-gray-600 text-xs mt-0.5">{farm.crop} • {farm.date}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      farm.status === "High Risk"
                        ? "bg-red-50 text-red-600"
                        : farm.status === "Moderate"
                        ? "bg-yellow-50 text-yellow-600"
                        : "bg-green-50 text-green-600"
                    }`}>
                      {farm.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-white rounded-xl p-2 text-center">
                      <p className="text-gray-500 text-xs">pH</p>
                      <p className={`font-bold text-sm ${
                        farm.pH < 5.5 ? "text-red-500" : "text-green-600"
                      }`}>{farm.pH}</p>
                    </div>
                    <div className="bg-white rounded-xl p-2 text-center">
                      <p className="text-gray-500 text-xs">Moisture</p>
                      <p className="font-bold text-sm text-blue-600">{farm.moisture}</p>
                    </div>
                    <div className="bg-white rounded-xl p-2 text-center">
                      <p className="text-gray-500 text-xs">Temp</p>
                      <p className="font-bold text-sm text-orange-500">{farm.temperature}</p>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-[#166534] text-white text-xs font-semibold rounded-xl hover:bg-green-800 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-3 h-3" />
                    Download Farm Report
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Summary Tab */}
        {activeTab === "AI Summary" && (
          <div className="p-6">
            <h3 className="text-gray-800 font-bold text-base mb-4">
              AI-Generated Soil Intelligence Summary
            </h3>

            {/* AI Summary Card */}
            <div className="bg-gradient-to-br from-[#166534] to-[#22C55E] rounded-2xl p-6 mb-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🤖</span>
                <div>
                  <p className="font-bold text-base">SoilSense AI Analysis</p>
                  <p className="text-green-200 text-xs">Generated on 12 June 2025 • Confidence: 84%</p>
                </div>
              </div>
              <p className="text-green-100 text-sm leading-relaxed mb-4">
                Based on analysis of 5 farms in Kiambu Town, Kenya, the overall soil health score is 78/100 which is classified as Good. However, 1 farm (Nyamirama Farm) shows critically low pH levels of 4.8 requiring immediate lime application.
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold">78</p>
                  <p className="text-green-200 text-xs">Avg Score</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold">5.04</p>
                  <p className="text-green-200 text-xs">Avg pH</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold">84%</p>
                  <p className="text-green-200 text-xs">Confidence</p>
                </div>
              </div>
            </div>

            {/* Key Findings */}
            <div className="space-y-3">
              <h4 className="text-gray-800 font-bold text-sm">Key Findings</h4>
              {[
                {
                  icon: "🚨",
                  title: "Critical: High Soil Acidity",
                  description: "Nyamirama Farm pH 4.8 is critically low. Apply 2 bags of agricultural lime per acre immediately.",
                  color: "bg-red-50 border-red-100",
                  titleColor: "text-red-700",
                  textColor: "text-red-600",
                },
                {
                  icon: "⚠️",
                  title: "Warning: Low Moisture Levels",
                  description: "Nyamirama and Koumbu farms show low moisture. Monitor irrigation needs closely.",
                  color: "bg-yellow-50 border-yellow-100",
                  titleColor: "text-yellow-700",
                  textColor: "text-yellow-600",
                },
                {
                  icon: "✅",
                  title: "Good: Temperature Range",
                  description: "All farms show optimal soil temperature between 22-28°C for crop growth.",
                  color: "bg-green-50 border-green-100",
                  titleColor: "text-green-700",
                  textColor: "text-green-600",
                },
                {
                  icon: "💡",
                  title: "Opportunity: Cover Crops",
                  description: "3 farms could benefit from leguminous cover crops to improve organic matter.",
                  color: "bg-blue-50 border-blue-100",
                  titleColor: "text-blue-700",
                  textColor: "text-blue-600",
                },
              ].map((finding, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-4 rounded-xl border ${finding.color}`}
                >
                  <span className="text-lg shrink-0">{finding.icon}</span>
                  <div>
                    <p className={`text-sm font-bold ${finding.titleColor}`}>
                      {finding.title}
                    </p>
                    <p className={`text-xs mt-1 leading-relaxed ${finding.textColor}`}>
                      {finding.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 bg-[#166534] text-white text-sm font-bold rounded-xl hover:bg-green-800 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download Full AI Report
            </button>

          </div>
        )}

      </div>

    </DashboardLayout>
  )
}

export default Reports