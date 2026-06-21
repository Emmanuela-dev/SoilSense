import { useState } from "react"
import DashboardLayout from "../components/layout/DashboardLayout"
import { recentAssessments } from "../data/mockData"
import { Search, Filter, Plus, Eye, Trash2, Download } from "lucide-react"

function StatusBadge({ status }) {
  const styles = {
    "High Risk": "bg-red-50 text-red-600 border border-red-100",
    "Moderate": "bg-yellow-50 text-yellow-600 border border-yellow-100",
    "Healthy": "bg-green-50 text-green-600 border border-green-100",
  }
  const dots = {
    "High Risk": "bg-red-500",
    "Moderate": "bg-yellow-500",
    "Healthy": "bg-green-500",
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`}></span>
      {status}
    </span>
  )
}

function Assessments() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const filters = ["All", "Healthy", "Moderate", "High Risk"]

  const filtered = recentAssessments.filter((a) => {
    const matchesSearch =
      a.farm.toLowerCase().includes(search.toLowerCase()) ||
      a.crop.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "All" || a.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <DashboardLayout pageTitle="Assessments">

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-800 text-2xl font-bold">Soil Assessments</h2>
          <p className="text-gray-600 text-sm mt-1">
            Manage and review all soil health evaluations
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#166534] hover:bg-green-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm">
          <Plus className="w-4 h-4" />
          New Assessment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">
            Total Assessments
          </p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {recentAssessments.length}
          </p>
          <p className="text-green-600 text-xs mt-1 font-medium">
            This month
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">
            High Risk Farms
          </p>
          <p className="text-3xl font-bold text-red-500 mt-2">
            {recentAssessments.filter((a) => a.status === "High Risk").length}
          </p>
          <p className="text-red-400 text-xs mt-1 font-medium">
            Needs immediate attention
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">
            Healthy Farms
          </p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {recentAssessments.filter((a) => a.status === "Healthy").length}
          </p>
          <p className="text-green-500 text-xs mt-1 font-medium">
            Good condition
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-b border-gray-50">

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search farm or crop..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-green-100 transition-all"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  filter === f
                    ? "bg-[#166534] text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Farm</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Crop</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">pH</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Moisture</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Temp</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <p className="text-gray-400 text-sm">No assessments found.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((assessment) => (
                  <tr
                    key={assessment.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Farm */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">
                          🌾
                        </div>
                        <span className="text-gray-800 text-sm font-semibold">
                          {assessment.farm}
                        </span>
                      </div>
                    </td>

                    {/* Crop */}
                    <td className="px-6 py-4">
                      <span className="text-gray-700 text-sm">{assessment.crop}</span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <span className="text-gray-600 text-sm">{assessment.date}</span>
                    </td>

                    {/* pH */}
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${
                        assessment.pH < 5.5 ? "text-red-500" : "text-green-600"
                      }`}>
                        {assessment.pH}
                      </span>
                    </td>

                    {/* Moisture */}
                    <td className="px-6 py-4">
                      <span className="text-gray-700 text-sm">{assessment.moisture}</span>
                    </td>

                    {/* Temperature */}
                    <td className="px-6 py-4">
                      <span className="text-gray-700 text-sm">{assessment.temperature}</span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <StatusBadge status={assessment.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg flex items-center justify-center transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg flex items-center justify-center transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-gray-600 text-xs">
            Showing {filtered.length} of {recentAssessments.length} assessments
          </p>
          <button className="text-[#166534] text-xs font-semibold hover:text-green-700 transition-colors">
            Export CSV →
          </button>
        </div>

      </div>

    </DashboardLayout>
  )
}

export default Assessments