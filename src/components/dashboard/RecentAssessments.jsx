import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../api/client"

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

function RecentAssessments() {
  const navigate = useNavigate()
  const [assessments, setAssessments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    api.getAssessments()
      .then((data) => {
        if (active) {
          setAssessments(data || [])
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <div>
          <h3 className="text-gray-800 font-bold text-base">Recent Assessments</h3>
          <p className="text-gray-600 text-xs mt-0.5">Latest soil health evaluations</p>
        </div>
        <button
          onClick={() => navigate("/assessments")}
          className="text-[#166534] text-sm font-semibold hover:text-green-700 transition-colors"
        >
          View All →
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
<th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">Farm</th>
<th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">Crop</th>
<th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">Date</th>
<th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">pH</th>
<th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">Moisture</th>
<th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">Temp</th>
<th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500 text-sm">
                  Loading...
                </td>
              </tr>
            ) : assessments.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500 text-sm">
                  No assessments yet.
                </td>
              </tr>
            ) : (
              assessments.slice(0, 5).map((assessment) => (
                <tr
                  key={assessment.id}
                  onClick={() => navigate("/assessments")}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
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
                    <span className="text-gray-600 text-sm">{assessment.crop}</span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <span className="text-gray-600 text-sm">{assessment.date}</span>
                  </td>

                  {/* pH */}
                  <td className="px-6 py-4">
                    <span className={`text-sm font-semibold ${
                      assessment.pH < 5.5 ? "text-red-500" : "text-green-600"
                    }`}>
                      {assessment.pH}
                    </span>
                  </td>

                  {/* Moisture */}
                  <td className="px-6 py-4">
                    <span className="text-gray-600 text-sm">{assessment.moisture}</span>
                  </td>

                  {/* Temperature */}
                  <td className="px-6 py-4">
                    <span className="text-gray-600 text-sm">{assessment.temperature}</span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <StatusBadge status={assessment.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <p className="text-gray-600 text-xs">
          Showing {loading ? 0 : Math.min(5, assessments.length)} of {loading ? 0 : assessments.length} assessments
        </p>
      </div>

    </div>
  )
}

export default RecentAssessments