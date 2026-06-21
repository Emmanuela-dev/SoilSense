import { useNavigate, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  FlaskConical,
  CloudSun,
  Lightbulb,
  Map,
  BarChart2,
  Settings,
  Sprout,
  MoreHorizontal,
} from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FlaskConical, label: "Assessments", path: "/assessments" },
  { icon: CloudSun, label: "Weather Intelligence", path: "/weather" },
  { icon: Lightbulb, label: "Recommendations", path: "/recommendations" },
  { icon: Map, label: "Farm Map", path: "/map" },
  { icon: BarChart2, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
]

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#166534] flex flex-col z-50 shadow-2xl">

      {/* Logo Section */}
      <div className="px-6 py-6 border-b border-green-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#22C55E] rounded-xl flex items-center justify-center shadow">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">
              SoilSense <span className="text-[#22C55E]">AI</span>
            </h1>
            <p className="text-green-300 text-xs">Smart Soil. Better Yields.</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#22C55E] text-white shadow-lg"
                  : "text-green-200 hover:bg-green-700 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom User Profile */}
      <div className="px-4 py-4 border-t border-green-700">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-green-700 cursor-pointer transition-all">
          <div className="w-9 h-9 rounded-full bg-[#F59E0B] flex items-center justify-center text-white font-bold text-sm shadow">
            JK
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">James Kariuki</p>
            <p className="text-green-300 text-xs truncate">Extension Officer</p>
          </div>
          <MoreHorizontal className="w-4 h-4 text-green-300" />
        </div>

        {/* Motivational Quote */}
        <div className="mt-3 px-3 py-3 bg-green-700 rounded-xl">
          <p className="text-green-200 text-xs italic leading-relaxed">
            "Healthy soil, healthy future. Smart decisions today, better harvests tomorrow."
          </p>
        </div>
      </div>

    </div>
  )
}

export default Sidebar