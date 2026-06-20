import StatsCards from "../components/dashboard/StatsCards"
import RecentAssessments from "../components/dashboard/RecentAssessments"
import RecommendationsPanel from "../components/dashboard/RecommendationsPanel"
import WeatherWidget from "../components/dashboard/WeatherWidget"
import SoilTrends from "../components/dashboard/SoilTrends"
import SoilHealthChart from "../components/dashboard/SoilHealthChart"
import GreetingBanner from "../components/dashboard/GreetingBanner"
import CurrentAssessment from "../components/dashboard/CurrentAssessment"
import DashboardLayout from "../components/layout/DashboardLayout"

function Dashboard() {
  return (
    <DashboardLayout pageTitle="Dashboard">

      {/* Greeting Banner */}
      <GreetingBanner />

      {/* Stats Cards */}
      <StatsCards />

      {/* Soil Health, Current Assessment and Weather Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-1">
          <SoilHealthChart />
        </div>
        <div className="lg:col-span-1">
          <CurrentAssessment />
        </div>
        <div className="lg:col-span-1">
          <WeatherWidget />
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-6">
        <RecommendationsPanel />
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