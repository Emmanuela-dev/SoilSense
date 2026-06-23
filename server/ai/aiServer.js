// SOILSENSE AI — Standalone AI Server
// Runs independently on port 5175


import express from "express"
import cors from "cors"
import { analyzeSoil, quickHealthCheck, processIoTReading } from "./aiEngine.js"

const app = express()
const PORT = 5175

// Middleware
app.use(cors())
app.use(express.json())

// ============================================
// AI ROUTES
// ============================================

/**
 * GET /health
 * Check if AI server is running
 */
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "SoilSense AI Engine is running",
    version: "1.0.0",
    port: PORT,
    modules: [
      "Soil Health Scorer",
      "Risk Assessment Engine",
      "Recommendation Engine",
      "Explainer Engine",
    ],
    timestamp: new Date().toISOString(),
  })
})

/**
 * POST /analyze
 * Main AI analysis endpoint
 */
app.post("/analyze", async (req, res) => {
  try {
    const {
      ph,
      moisture,
      temperature,
      crop,
      location,
      rainExpected,
    } = req.body

    if (!ph || !moisture || !temperature || !crop) {
      return res.status(400).json({
        success: false,
        message: "ph, moisture, temperature and crop are required",
      })
    }

    const result = await analyzeSoil({
      ph: Number(ph),
      moisture: Number(moisture),
      temperature: Number(temperature),
      crop: crop || "maize",
      location: location || "Kiambu Town, Kenya",
      rainExpected: rainExpected || false,
    })

    res.json({
      success: true,
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

/**
 * GET /quick-check
 * Quick soil health check
 */
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

    const result = quickHealthCheck(ph, moisture, temperature)

    res.json({
      success: true,
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

/**
 * POST /iot-reading
 * Process IoT sensor data
 */
app.post("/iot-reading", async (req, res) => {
  try {
    const result = await processIoTReading(req.body)
    res.json({
      success: true,
      message: "IoT reading processed successfully",
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

/**
 * POST /batch-analyze
 * Analyze multiple soil readings at once
 */
app.post("/batch-analyze", async (req, res) => {
  try {
    const { readings } = req.body

    if (!Array.isArray(readings) || readings.length === 0) {
      return res.status(400).json({
        success: false,
        message: "readings must be a non-empty array",
      })
    }

    const results = await Promise.all(
      readings.map((reading) => analyzeSoil(reading))
    )

    res.json({
      success: true,
      total: results.length,
      data: results,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

// Error handler
app.use((err, req, res, next) => {
  console.error("AI Server Error:", err.message)
  res.status(500).json({
    success: false,
    message: err.message || "Internal AI server error",
  })
})

// Start server
app.listen(PORT, () => {
  console.log("============================================")
  console.log("🌱 SoilSense AI Engine Server")
  console.log(`✅ Running on http://localhost:${PORT}`)
  console.log("============================================")
  console.log("📡 Available Endpoints:")
  console.log(`   GET  http://localhost:${PORT}/health`)
  console.log(`   POST http://localhost:${PORT}/analyze`)
  console.log(`   GET  http://localhost:${PORT}/quick-check`)
  console.log(`   POST http://localhost:${PORT}/iot-reading`)
  console.log(`   POST http://localhost:${PORT}/batch-analyze`)
  console.log("============================================")
})