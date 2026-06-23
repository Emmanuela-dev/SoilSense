import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import Assessments from "./pages/Assessments"
import Weather from "./pages/Weather"
import Recommendations from "./pages/Recommendations"
import FarmMap from "./pages/FarmMap"
import Reports from "./pages/Reports"
import Settings from "./pages/Settings"
import NewAssessment from "./pages/NewAssessment"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assessments" element={<Assessments />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/map" element={<FarmMap />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/new-assessment" element={<NewAssessment />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App