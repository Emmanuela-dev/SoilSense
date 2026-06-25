import { useState } from "react"

import { useNavigate } from "react-router-dom"

import DashboardLayout from "../components/layout/DashboardLayout"

import { analyzeSoil } from "../api/aiService"

import { api } from "../api/client"

import {

  FlaskConical,

  Loader,

  CheckCircle,

  AlertTriangle,

  ArrowRight,

  RotateCcw,

} from "lucide-react"




function RiskBadge({ level }) {

  const styles = {

    Low: "bg-green-50 text-green-600 border border-green-100",

    Medium: "bg-yellow-50 text-yellow-600 border border-yellow-100",

    High: "bg-red-50 text-red-600 border border-green-100",

    Critical: "bg-red-100 text-red-700 border border-red-200",

  }

  return (

    <span className={`text-xs font-bold px-3 py-1 rounded-full ${styles[level] || styles.Low}`}>

      {level} Risk

    </span>

  )

}




function PriorityBadge({ priority }) {

  const styles = {

    Critical: "bg-red-50 text-red-600 border border-red-100",

    High: "bg-orange-50 text-orange-600 border border-orange-100",

    Medium: "bg-yellow-50 text-yellow-600 border border-yellow-100",

    Low: "bg-green-50 text-green-600 border border-green-100",

  }

  return (

    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${styles[priority]}`}>

      {priority}

    </span>

  )

}




function NewAssessment() {

  const navigate = useNavigate()




  const [formData, setFormData] = useState({

    farmName: "",

    crop: "maize",

    ph: "",

    moisture: "",

    temperature: "",

    location: "Kiambu Town, Kenya",

    rainExpected: false,

  })




  const [loading, setLoading] = useState(false)

  const [result, setResult] = useState(null)

  const [error, setError] = useState("")

  const [iotLoading, setIotLoading] = useState(false)

  const [iotSuccess, setIotSuccess] = useState(false)




  const crops = [

    "Maize",

    "Tea",

    "Coffee",

    "Beans",

    "Wheat",

    "Potatoes",

    "Tomatoes",

    "Cabbage",

  ]




  function handleChange(e) {

    const { name, value, type, checked } = e.target

    setFormData((prev) => ({

      ...prev,

      [name]: type === "checkbox" ? checked : value,

    }))

  }

  async function fetchIoTReadings() {

  setIotLoading(true)

  setIotSuccess(false)




  try {

    // This will call the IoT endpoint when ESP32 is connected

    // For now we simulate real sensor data

    await new Promise((resolve) => setTimeout(resolve, 1500))




    // Simulated IoT readings — replace with real ESP32 API call later

    setFormData((prev) => ({

      ...prev,

      ph: 4.8,

      moisture: 25,

      temperature: 28,

    }))




    setIotSuccess(true)




  } catch (error) {

    setError("Could not connect to IoT device. Enter readings manually.")

  } finally {

    setIotLoading(false)

  }

}




  async function handleSubmit(e) {

    e.preventDefault()

    setError("")

    setResult(null)

    setLoading(true)




    try {

      const aiResult = await analyzeSoil({

        ph: Number(formData.ph),

        moisture: Number(formData.moisture),

        temperature: Number(formData.temperature),

        crop: formData.crop,

        location: formData.location,

        rainExpected: formData.rainExpected,

      })




      setResult(aiResult)

    } catch (err) {

      setError("AI analysis failed. Make sure the AI server is running on port 5175.")

    } finally {

      setLoading(false)

    }

  }




  function handleReset() {

    setResult(null)

    setError("")

    setFormData({

      farmName: "",

      crop: "maize",

      ph: "",

      moisture: "",

      temperature: "",

      location: "Kiambu Town, Kenya",

      rainExpected: false,

    })

  }

const [saveLoading, setSaveLoading] = useState(false)

async function handleSaveAssessment() {
  if (!result) return
  setSaveLoading(true)
  setError("")
  try {
    await api.createAssessment({
      farmName: formData.farmName,
      crop: formData.crop,
      ph: Number(result.readings.ph),
      moisture: Number(result.readings.moisture),
      temperature: Number(result.readings.temperature),
      soilCondition: result.soilHealth.label,
      soilHealthScore: Number(result.soilHealth.score),
      latitude: -1.2921,
      longitude: 36.8219,
    })
    navigate("/assessments")
  } catch (err) {
    console.error(err)
    setError("Failed to save assessment to database. Make sure Neo4j database is running.")
  } finally {
    setSaveLoading(false)
  }
}

  return (

    <DashboardLayout pageTitle="New Assessment">




      {/* Page Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-gray-800 text-2xl font-bold">New Soil Assessment</h2>

          <p className="text-gray-600 text-sm mt-1">

            Enter soil readings to get AI-powered recommendations

          </p>

        </div>

        <button

          onClick={() => navigate("/assessments")}

          className="text-gray-600 text-sm font-semibold hover:text-[#166534] transition-colors"

        >

          ← Back to Assessments

        </button>

      </div>




      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">




        {/* Left — Input Form */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">




          <div className="px-6 py-4 border-b border-gray-50">

            <div className="flex items-center gap-2">

              <FlaskConical className="w-5 h-5 text-[#166534]" />

              <h3 className="text-gray-800 font-bold text-base">Soil Readings</h3>

            </div>

            <p className="text-gray-600 text-xs mt-0.5">

              Enter readings from IoT sensors or manual testing

            </p>

          </div>




          <form onSubmit={handleSubmit} className="p-6 space-y-5">




            {/* IoT Auto-Fill Panel */}

<div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">

  <div className="flex items-center justify-between">

    <div className="flex items-center gap-2">

      <span className="text-blue-600 text-lg">📡</span>

      <div>

        <p className="text-blue-700 text-sm font-bold">IoT Sensor Connected</p>

        <p className="text-blue-600 text-xs">

          ESP32 device ready — click to load live readings

        </p>

      </div>

    </div>

    <button

      type="button"

      onClick={fetchIoTReadings}

      disabled={iotLoading}

      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"

    >

      {iotLoading ? (

        <>

          <Loader className="w-3 h-3 animate-spin" />

          Loading...

        </>

      ) : (

        <>

          📥 Load IoT Data

        </>

      )}

    </button>

  </div>

  {iotSuccess && (

    <div className="mt-3 flex items-center gap-2">

      <CheckCircle className="w-4 h-4 text-green-500" />

      <p className="text-green-600 text-xs font-semibold">

        Live sensor data loaded successfully!

      </p>

    </div>

  )}

</div> 




            {/* Farm Name */}

            <div>

              <label className="block text-gray-700 text-sm font-semibold mb-2">

                Farm Name

              </label>

              <input

                type="text"

                name="farmName"

                value={formData.farmName}

                onChange={handleChange}

                placeholder="e.g. Nyamirama Farm"

                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-green-100 transition-all"

                required

              />

            </div>




            {/* Crop Type */}

            <div>

              <label className="block text-gray-700 text-sm font-semibold mb-2">

                Crop Type

              </label>

              <select

                name="crop"

                value={formData.crop}

                onChange={handleChange}

                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-green-100 transition-all"

              >

                {crops.map((crop) => (

                  <option key={crop} value={crop.toLowerCase()}>

                    {crop}

                  </option>

                ))}

              </select>

            </div>




            {/* Soil Readings */}

            <div className="grid grid-cols-3 gap-4">

              <div>

                <label className="block text-gray-700 text-sm font-semibold mb-2">

                  Soil pH

                </label>

                <input

                  type="number"

                  name="ph"

                  value={formData.ph}

                  onChange={handleChange}

                  placeholder="0-14"

                  step="0.1"

                  min="0"

                  max="14"

                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-green-100 transition-all"

                  required

                />

              </div>

              <div>

                <label className="block text-gray-700 text-sm font-semibold mb-2">

                  Moisture %

                </label>

                <input

                  type="number"

                  name="moisture"

                  value={formData.moisture}

                  onChange={handleChange}

                  placeholder="0-100"

                  min="0"

                  max="100"

                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-green-100 transition-all"

                  required

                />

              </div>

              <div>

                <label className="block text-gray-700 text-sm font-semibold mb-2">

                  Temp °C

                </label>

                <input

                  type="number"

                  name="temperature"

                  value={formData.temperature}

                  onChange={handleChange}

                  placeholder="°C"

                  min="-10"

                  max="60"

                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-green-100 transition-all"

                  required

                />

              </div>

            </div>




            {/* Location */}

            <div>

              <label className="block text-gray-700 text-sm font-semibold mb-2">

                Location

              </label>

              <input

                type="text"

                name="location"

                value={formData.location}

                onChange={handleChange}

                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-green-100 transition-all"

              />

            </div>




            {/* Rain Expected */}

            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">

              <input

                type="checkbox"

                name="rainExpected"

                id="rainExpected"

                checked={formData.rainExpected}

                onChange={handleChange}

                className="w-4 h-4 accent-[#166534]"

              />

              <label htmlFor="rainExpected" className="text-blue-700 text-sm font-medium">

                Rain expected in the next 48 hours

              </label>

            </div>




            {/* Error */}

            {error && (

              <div className="p-3 bg-red-50 border border-red-100 rounded-xl">

                <p className="text-red-600 text-sm">{error}</p>

              </div>

            )}




            {/* Buttons */}

            <div className="flex gap-3">

              <button

                type="submit"

                disabled={loading}

                className="flex-1 py-3 bg-[#166534] hover:bg-green-800 text-white text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"

              >

                {loading ? (

                  <>

                    <Loader className="w-4 h-4 animate-spin" />

                    Analyzing...

                  </>

                ) : (

                  <>

                    <FlaskConical className="w-4 h-4" />

                    Run AI Analysis

                  </>

                )}

              </button>

              {result && (

                <button

                  type="button"

                  onClick={handleReset}

                  className="px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-semibold rounded-xl transition-all border border-gray-100"

                >

                  <RotateCcw className="w-4 h-4" />

                </button>

              )}

            </div>




          </form>

        </div>




        {/* Right — AI Results */}

        <div>

          {!result && !loading && (

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm h-full flex items-center justify-center p-12">

              <div className="text-center">

                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">

                  <FlaskConical className="w-8 h-8 text-[#166534]" />

                </div>

                <p className="text-gray-700 font-bold text-base">

                  Ready for Analysis

                </p>

                <p className="text-gray-500 text-sm mt-2 leading-relaxed">

                  Fill in the soil readings on the left and click Run AI Analysis to get instant recommendations.

                </p>

              </div>

            </div>

          )}




          {loading && (

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm h-full flex items-center justify-center p-12">

              <div className="text-center">

                <Loader className="w-12 h-12 text-[#166534] animate-spin mx-auto mb-4" />

                <p className="text-gray-700 font-bold text-base">

                  AI is analyzing soil data...

                </p>

                <p className="text-gray-500 text-sm mt-2">

                  Running all 4 AI modules

                </p>

              </div>

            </div>

          )}




          {result && (

            <div className="space-y-4">




              {/* Score Card */}

              <div className="bg-gradient-to-br from-[#166534] to-[#22C55E] rounded-2xl p-6 text-white">

                <div className="flex items-center justify-between mb-4">

                  <div>

                    <p className="text-green-200 text-xs font-medium">

                      AI Soil Health Score

                    </p>

                    <div className="flex items-end gap-2 mt-1">

                      <span className="text-5xl font-bold">

                        {result.soilHealth.score}

                      </span>

                      <span className="text-green-200 text-lg mb-1">/100</span>

                    </div>

                    <p className="text-green-100 text-sm mt-1">

                      {result.soilHealth.label}

                    </p>

                  </div>

                  <div className="text-right">

                    <RiskBadge level={result.risks.overall.level} />

                    <p className="text-green-200 text-xs mt-2">

                      AI Confidence: {result.explanations.confidence.score}%

                    </p>

                  </div>

                </div>




                {/* Score Breakdown */}

                <div className="grid grid-cols-3 gap-3">

                  <div className="bg-white/10 rounded-xl p-3 text-center">

                    <p className="text-green-200 text-xs">pH</p>

                    <p className="text-white font-bold text-lg">

                      {result.readings.ph}

                    </p>

                    <p className="text-green-200 text-xs">

                      {result.soilHealth.breakdown.ph.condition}

                    </p>

                  </div>

                  <div className="bg-white/10 rounded-xl p-3 text-center">

                    <p className="text-green-200 text-xs">Moisture</p>

                    <p className="text-white font-bold text-lg">

                      {result.readings.moisture}%

                    </p>

                    <p className="text-green-200 text-xs">

                      {result.soilHealth.breakdown.moisture.condition}

                    </p>

                  </div>

                  <div className="bg-white/10 rounded-xl p-3 text-center">

                    <p className="text-green-200 text-xs">Temp</p>

                    <p className="text-white font-bold text-lg">

                      {result.readings.temperature}°C

                    </p>

                    <p className="text-green-200 text-xs">

                      {result.soilHealth.breakdown.temperature.condition}

                    </p>

                  </div>

                </div>

              </div>




              {/* Risk Alert */}

              {(result.risks.overall.level === "Critical" ||

                result.risks.overall.level === "High") && (

                <div className="bg-red-50 border border-red-100 rounded-2xl p-4">

                  <div className="flex items-start gap-3">

                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />

                    <div>

                      <p className="text-red-700 font-bold text-sm">

                        {result.risks.overall.level} Risk Detected

                      </p>

                      <p className="text-red-600 text-xs mt-1 leading-relaxed">

                        {result.risks.overall.message}

                      </p>

                    </div>

                  </div>

                </div>

              )}




              {/* Recommendations */}

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                <div className="px-5 py-4 border-b border-gray-50">

                  <h3 className="text-gray-800 font-bold text-sm">

                    AI Recommendations ({result.recommendations.total})

                  </h3>

                </div>

                <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">

                  {result.recommendations.items.map((rec, index) => (

                    <div key={index} className="px-5 py-3">

                      <div className="flex items-start gap-3">

                        <div className="w-6 h-6 rounded-full bg-[#166534] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">

                          {index + 1}

                        </div>

                        <div className="flex-1">

                          <div className="flex items-center gap-2 mb-1">

                            <p className="text-gray-800 text-xs font-bold">

                              {rec.title}

                            </p>

                            <PriorityBadge priority={rec.priority} />

                          </div>

                          <p className="text-gray-600 text-xs leading-relaxed">

                            {rec.description}

                          </p>

                          <p className="text-gray-400 text-xs mt-1">

                            ⏱ {rec.timeframe}

                          </p>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </div>




              {/* ✨ GEMINI AI ADVICE CARD — NEW ✨ */}

              {result.geminiAdvice && (

                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200 p-5">

                  <div className="flex items-center gap-2 mb-3">

                    <span className="text-lg">🤖</span>

                    <p className="text-purple-800 font-bold text-sm">

                      Gemini AI Advice

                    </p>

                    <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">

                      AI Powered

                    </span>

                  </div>

                  <p className="text-gray-700 text-xs leading-relaxed whitespace-pre-wrap">

                    {result.geminiAdvice}

                  </p>

                </div>

              )}




              {/* AI Explanation */}

              <div className="bg-[#F0FDF4] rounded-2xl border border-green-100 p-5">

                <div className="flex items-center gap-2 mb-3">

                  <span className="text-lg">🤖</span>

                  <p className="text-green-700 font-bold text-sm">

                    AI Explanation

                  </p>

                  <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">

                    {result.explanations.confidence.score}% confidence

                  </span>

                </div>

                <p className="text-green-800 text-xs leading-relaxed line-clamp-4">

                  {result.explanations.overall}

                </p>

              </div>




              {/* Action Buttons */}

              <div className="grid grid-cols-2 gap-3">

<div className="grid grid-cols-2 gap-3">
  <button
    onClick={handleSaveAssessment}
    disabled={saveLoading}
    className="py-3 bg-[#166534] text-white text-sm font-bold rounded-xl hover:bg-green-800 transition-all flex items-center justify-center gap-2 disabled:opacity-75"
  >
    {saveLoading ? (
      <>
        <Loader className="w-4 h-4 animate-spin" />
        Saving...
      </>
    ) : (
      <>
        <CheckCircle className="w-4 h-4" />
        Save Assessment
      </>
    )}
  </button>
</div>                

                <button

                  onClick={() => navigate("/recommendations")}

                  className="py-3 bg-gray-50 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-100 transition-all border border-gray-100 flex items-center justify-center gap-2"

                >

                  View All

                  <ArrowRight className="w-4 h-4" />

                </button>

              </div>




            </div>

          )}

        </div>

      </div>




    </DashboardLayout>

  )

}




export default NewAssessment
