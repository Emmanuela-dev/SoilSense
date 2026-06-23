// SOILSENSE AI — AI API Routes
// Exposes AI engine via REST API


import express from "express"
import { analyzeSoil, quickHealthCheck, processIoTReading } from "../ai/aiEngine.js"

const router = express.Router()

/**
 * POST /api/ai/analyze
 * Main AI analysis endpoint
 * Accepts soil readings and returns full AI analysis
 */
router.post("/analyze", async (req, res, next) => {
  try {
    const {
      ph,
      moisture,
      temperature,
      crop,
      location,
      rainExpected,
    } = req.body

    // Run AI analysis
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
    next(error)
  }
})

/**
 * GET /api/ai/quick-check
 * Quick soil health check
 * Returns just the score without full analysis
 */
router.get("/quick-check", async (req, res, next) => {
  try {
    const ph = Number(req.query.ph)
    const moisture = Number(req.query.moisture)
    const temperature = Number(req.query.temperature)

    if (!ph || !moisture || !temperature) {
      return res.status(400).json({
        success: false,
        message: "ph, moisture and temperature are required query parameters",
      })
    }

    const result = quickHealthCheck(ph, moisture, temperature)

    res.json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
})

/**
 * POST /api/ai/iot-reading
 * Process IoT sensor data
 * Called automatically when sensors send data
 */
router.post("/iot-reading", async (req, res, next) => {
  try {
    const result = await processIoTReading(req.body)

    res.json({
      success: true,
      message: "IoT reading processed successfully",
      data: result,
    })
  } catch (error) {
    next(error)
  }
})

/**
 * GET /api/ai/health
 * Check if AI engine is running
 */
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "SoilSense AI Engine is running",
    version: "1.0.0",
    modules: [
      "Soil Health Scorer",
      "Risk Assessment Engine",
      "Recommendation Engine",
      "Explainer Engine",
    ],
    timestamp: new Date().toISOString(),
  })
})

export default router