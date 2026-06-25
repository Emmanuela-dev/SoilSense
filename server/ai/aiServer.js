// SOILSENSE AI — Standalone AI Server with Gemini
// Runs independently on port 5175

import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { analyzeSoil, quickHealthCheck, processIoTReading } from "./aiEngine.js"

dotenv.config({ path: "./server/ai/.env" })
console.log("Loaded key:", process.env.GEMINI_API_KEY)

const app = express()
const PORT = 5175

app.use(cors())
app.use(express.json())

// ============================================
// GEMINI SETUP
// ============================================
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
let geminiModel = null

if (GEMINI_API_KEY) {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
  geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
  console.log("✅ Gemini AI enabled")
} else {
  console.warn("⚠️  GEMINI_API_KEY not set — Gemini advice disabled")
}

/**
 * Ask Gemini to turn raw soil data + rule-based result
 * into farmer-friendly agronomist advice.
 */
async function generateFarmerAdvice(soilData, ruleResult) {
  if (!geminiModel) {
    return "Gemini AI is not configured. Add GEMINI_API_KEY to your .env file to enable smart advice."
  }

  const prompt = `
You are an expert agronomist advising a smallholder farmer in ${soilData.location}.
Speak directly to the farmer in clear, simple, encouraging English (max 120 words).

Soil readings:
- pH: ${soilData.ph}
- Moisture: ${soilData.moisture}%
- Temperature: ${soilData.temperature}°C
- Crop: ${soilData.crop}
- Rain expected soon: ${soilData.rainExpected ? "Yes" : "No"}

System analysis:
${JSON.stringify(ruleResult, null, 2)}

Write 3 short paragraphs:
1. What the soil is telling us right now.
2. The most important action to take this week (be specific: quantities, timing).
3. One encouraging tip for the ${soilData.crop} crop.
Do not use markdown headings. Plain text only.
`.trim()

  try {
    const result = await geminiModel.generateContent(prompt)
    return result.response.text().trim()
  } catch (err) {
    console.error("Gemini error:", err.message)
    return "Smart advice is temporarily unavailable. Please rely on the recommendations below."
  }
}

// ============================================
// AI ROUTES
// ============================================

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "SoilSense AI Engine is running",
    version: "1.1.0",
    port: PORT,
    geminiEnabled: !!geminiModel,
    modules: [
      "Soil Health Scorer",
      "Risk Assessment Engine",
      "Recommendation Engine",
      "Explainer Engine",
      "Gemini AI Advisor",
    ],
    timestamp: new Date().toISOString(),
  })
})

app.post("/analyze", async (req, res) => {
  try {
    const { ph, moisture, temperature, crop, location, rainExpected } = req.body

    if (!ph || !moisture || !temperature || !crop) {
      return res.status(400).json({
        success: false,
        message: "ph, moisture, temperature and crop are required",
      })
    }

    const soilData = {
      ph: Number(ph),
      moisture: Number(moisture),
      temperature: Number(temperature),
      crop: crop || "maize",
      location: location || "Kiambu Town, Kenya",
      rainExpected: rainExpected || false,
    }

    // 1. Rule-based analysis
    const result = await analyzeSoil(soilData)

    // 2. Gemini AI advice (attached to the response)
    const geminiAdvice = await generateFarmerAdvice(soilData, result)

    res.json({
      success: true,
      data: {
        ...result,
        geminiAdvice, // 👈 frontend reads this for the "🤖 Gemini AI Advice" card
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

app.get("/quick-check", async (req, res) => {
  try {
    const ph = Number(req.query.ph)
    const moisture = Number(req.query.moisture)
    const temperature = Number(req.query.temperature)

    if (!ph || !moisture || !temperature) {
      return res.status(400).json({
        success: false,
        message: "ph, moisture and temperature are required",
      })
    }

    res.json({ success: true, data: quickHealthCheck(ph, moisture, temperature) })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

app.post("/iot-reading", async (req, res) => {
  try {
    const result = await processIoTReading(req.body)
    res.json({ success: true, message: "IoT reading processed successfully", data: result })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

app.post("/batch-analyze", async (req, res) => {
  try {
    const { readings } = req.body
    if (!Array.isArray(readings) || readings.length === 0) {
      return res.status(400).json({ success: false, message: "readings must be a non-empty array" })
    }
    const results = await Promise.all(readings.map((r) => analyzeSoil(r)))
    res.json({ success: true, total: results.length, data: results })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

app.use((err, req, res, next) => {
  console.error("AI Server Error:", err.message)
  res.status(500).json({ success: false, message: err.message || "Internal AI server error" })
})

app.listen(PORT, () => {
  console.log("============================================")
  console.log("🌱 SoilSense AI Engine Server")
  console.log(`✅ Running on http://localhost:${PORT}`)
  console.log(`🤖 Gemini: ${geminiModel ? "ENABLED" : "DISABLED (no API key)"}`)
  console.log("============================================")
  console.log("📡 Available Endpoints:")
  console.log(`   GET  http://localhost:${PORT}/health`)
  console.log(`   POST http://localhost:${PORT}/analyze`)
  console.log(`   GET  http://localhost:${PORT}/quick-check`)
  console.log(`   POST http://localhost:${PORT}/iot-reading`)
  console.log(`   POST http://localhost:${PORT}/batch-analyze`)
  console.log("============================================")
})
