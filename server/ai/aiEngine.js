// SOILSENSE AI — Main AI Engine
// Combines all modules into one response
// The brain of SoilSense AI

import { calculateSoilHealthScore } from "./soilHealthScorer.js"
import { assessRisks } from "./riskAssessmentEngine.js"
import { generateRecommendations } from "./recommendationEngine.js"
import { generateExplanations } from "./explainerEngine.js"

/**
 * Validate incoming soil data
 */
function validateInput(data) {
  const errors = []

  // Validate pH
  if (data.ph === undefined || data.ph === null) {
    errors.push("pH value is required")
  } else if (data.ph < 0 || data.ph > 14) {
    errors.push("pH must be between 0 and 14")
  }

  // Validate moisture
  if (data.moisture === undefined || data.moisture === null) {
    errors.push("Moisture value is required")
  } else if (data.moisture < 0 || data.moisture > 100) {
    errors.push("Moisture must be between 0 and 100")
  }

  // Validate temperature
  if (data.temperature === undefined || data.temperature === null) {
    errors.push("Temperature value is required")
  } else if (data.temperature < -10 || data.temperature > 60) {
    errors.push("Temperature must be between -10 and 60°C")
  }

  // Validate crop
  if (!data.crop || typeof data.crop !== "string") {
    errors.push("Crop type is required")
  }

  return errors
}

/**
 * Format the final AI response
 */
function formatResponse(
  input,
  scoringResult,
  riskResult,
  recommendations,
  explanations,
  processingTime
) {
  return {
    // Metadata
    metadata: {
      timestamp: new Date().toISOString(),
      location: input.location || "Kiambu Town, Kenya",
      crop: input.crop,
      processingTimeMs: processingTime,
      aiVersion: "1.0.0",
    },

    // Input readings
    readings: {
      ph: input.ph,
      moisture: input.moisture,
      temperature: input.temperature,
      rainExpected: input.rainExpected || false,
    },

    // Soil health score
    soilHealth: {
      score: scoringResult.totalScore,
      label: scoringResult.label,
      breakdown: scoringResult.breakdown,
    },

    // Risk assessment
    risks: riskResult,

    // Recommendations
    recommendations: {
      total: recommendations.length,
      critical: recommendations.filter((r) => r.priority === "Critical").length,
      high: recommendations.filter((r) => r.priority === "High").length,
      medium: recommendations.filter((r) => r.priority === "Medium").length,
      low: recommendations.filter((r) => r.priority === "Low").length,
      items: recommendations,
    },

    // Explanations
    explanations,

    // Quick summary for dashboard
    summary: {
      soilHealthScore: scoringResult.totalScore,
      soilHealthLabel: scoringResult.label,
      overallRisk: riskResult.overall.level,
      riskMessage: riskResult.overall.message,
      topRecommendation: recommendations[0] || null,
      confidenceScore: explanations.confidence.score,
      requiresUrgentAction:
        riskResult.overall.level === "Critical" ||
        riskResult.overall.level === "High" ||
        recommendations.some((r) => r.priority === "Critical"),
    },
  }
}

/**
 * MAIN AI ANALYSIS FUNCTION
 * This is what gets called when a soil reading comes in
 *
 * Input:
 * {
 *   ph: 4.8,
 *   moisture: 25,
 *   temperature: 28,
 *   crop: "maize",
 *   location: "Kiambu",
 *   rainExpected: true
 * }
 */
export async function analyzeSoil(data) {
  const startTime = Date.now()

  // Step 1: Validate input
  const errors = validateInput(data)
  if (errors.length > 0) {
    throw new Error(`Invalid input: ${errors.join(", ")}`)
  }

  const { ph, moisture, temperature, crop, rainExpected = false } = data

  // Step 2: Calculate soil health score
  const scoringResult = calculateSoilHealthScore(ph, moisture, temperature)

  // Step 3: Assess risks
  const riskResult = assessRisks(ph, moisture, temperature, rainExpected)

  // Step 4: Generate recommendations
  const recommendations = generateRecommendations(
    ph,
    moisture,
    temperature,
    crop,
    rainExpected
  )

  // Step 5: Generate explanations
  const explanations = generateExplanations(
    ph,
    moisture,
    temperature,
    crop,
    scoringResult.totalScore,
    riskResult.overall.level
  )

  // Step 6: Calculate processing time
  const processingTime = Date.now() - startTime

  // Step 7: Format and return complete response
  return formatResponse(
    data,
    scoringResult,
    riskResult,
    recommendations,
    explanations,
    processingTime
  )
}

/**
 * Process IoT sensor data
 * Called when real-time sensor readings come in
 */
export async function processIoTReading(sensorData) {
  // Transform IoT data format to AI engine format
  const aiInput = {
    ph: sensorData.ph || sensorData.pH,
    moisture: sensorData.moisture || sensorData.soilMoisture,
    temperature: sensorData.temperature || sensorData.soilTemperature,
    crop: sensorData.crop || "maize",
    location: sensorData.location || "Kiambu Town, Kenya",
    rainExpected: sensorData.rainExpected || false,
  }

  return await analyzeSoil(aiInput)
}

/**
 * Quick health check
 * Returns just the score without full analysis
 */
export function quickHealthCheck(ph, moisture, temperature) {
  const result = calculateSoilHealthScore(ph, moisture, temperature)
  return {
    score: result.totalScore,
    label: result.label,
    ph: { value: ph, condition: result.breakdown.ph.condition },
    moisture: { value: moisture, condition: result.breakdown.moisture.condition },
    temperature: { value: temperature, condition: result.breakdown.temperature.condition },
  }
}
