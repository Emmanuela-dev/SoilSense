// SOILSENSE AI — Soil Health Scoring Engine
// Calculates soil health score from 0 to 100

/**
 * Calculate pH score (40% of total score)
 * Optimal pH for most Kenyan crops: 6.0 - 7.0
 */
function calculatePHScore(ph) {
  if (ph >= 6.0 && ph <= 7.0) return 100  // Optimal
  if (ph >= 5.5 && ph < 6.0) return 80   // Slightly Acidic
  if (ph >= 5.0 && ph < 5.5) return 60   // Moderately Acidic
  if (ph >= 4.5 && ph < 5.0) return 35   // Highly Acidic
  if (ph < 4.5) return 10                 // Critically Acidic
  if (ph > 7.0 && ph <= 7.5) return 85   // Slightly Alkaline
  if (ph > 7.5 && ph <= 8.0) return 60   // Moderately Alkaline
  if (ph > 8.0) return 30                 // Too Alkaline
  return 50
}

/**
 * Calculate moisture score (35% of total score)
 * Optimal moisture for most crops: 50% - 70%
 */
function calculateMoistureScore(moisture) {
  if (moisture >= 50 && moisture <= 70) return 100  // Optimal
  if (moisture >= 40 && moisture < 50) return 80    // Slightly Low
  if (moisture >= 30 && moisture < 40) return 60    // Low
  if (moisture >= 20 && moisture < 30) return 35    // Very Low
  if (moisture < 20) return 10                       // Critical
  if (moisture > 70 && moisture <= 80) return 75    // Slightly High
  if (moisture > 80) return 40                       // Waterlogged
  return 50
}

/**
 * Calculate temperature score (25% of total score)
 * Optimal soil temperature: 20°C - 28°C
 */
function calculateTemperatureScore(temperature) {
  if (temperature >= 20 && temperature <= 28) return 100  // Optimal
  if (temperature >= 15 && temperature < 20) return 75    // Cool
  if (temperature > 28 && temperature <= 32) return 75    // Warm
  if (temperature >= 10 && temperature < 15) return 50    // Cold
  if (temperature > 32 && temperature <= 38) return 40    // Hot
  if (temperature < 10) return 20                          // Too Cold
  if (temperature > 38) return 15                          // Too Hot
  return 50
}

/**
 * Get pH condition label
 */
function getPHCondition(ph) {
  if (ph >= 6.0 && ph <= 7.0) return "Optimal"
  if (ph >= 5.5 && ph < 6.0) return "Slightly Acidic"
  if (ph >= 5.0 && ph < 5.5) return "Moderately Acidic"
  if (ph >= 4.5 && ph < 5.0) return "Highly Acidic"
  if (ph < 4.5) return "Critically Acidic"
  if (ph > 7.0 && ph <= 7.5) return "Slightly Alkaline"
  if (ph > 7.5) return "Alkaline"
  return "Unknown"
}

/**
 * Get moisture condition label
 */
function getMoistureCondition(moisture) {
  if (moisture >= 50 && moisture <= 70) return "Optimal"
  if (moisture >= 40 && moisture < 50) return "Slightly Low"
  if (moisture >= 30 && moisture < 40) return "Low"
  if (moisture >= 20 && moisture < 30) return "Very Low"
  if (moisture < 20) return "Critically Dry"
  if (moisture > 70 && moisture <= 80) return "Slightly High"
  if (moisture > 80) return "Waterlogged"
  return "Unknown"
}

/**
 * Get temperature condition label
 */
function getTemperatureCondition(temperature) {
  if (temperature >= 20 && temperature <= 28) return "Optimal"
  if (temperature >= 15 && temperature < 20) return "Cool"
  if (temperature > 28 && temperature <= 32) return "Warm"
  if (temperature >= 10 && temperature < 15) return "Cold"
  if (temperature > 32) return "Hot"
  if (temperature < 10) return "Too Cold"
  return "Unknown"
}

/**
 * Get overall soil health label
 */
function getSoilHealthLabel(score) {
  if (score >= 80) return "Excellent"
  if (score >= 65) return "Good"
  if (score >= 50) return "Moderate"
  if (score >= 35) return "Poor"
  return "Critical"
}

/**
 * MAIN SCORING FUNCTION
 * Takes soil readings and returns complete score breakdown
 */
export function calculateSoilHealthScore(ph, moisture, temperature) {
  // Calculate individual scores
  const phScore = calculatePHScore(ph)
  const moistureScore = calculateMoistureScore(moisture)
  const temperatureScore = calculateTemperatureScore(temperature)

  // Calculate weighted total score
  // pH = 40%, Moisture = 35%, Temperature = 25%
  const totalScore = Math.round(
    phScore * 0.40 +
    moistureScore * 0.35 +
    temperatureScore * 0.25
  )

  return {
    totalScore,
    label: getSoilHealthLabel(totalScore),
    breakdown: {
      ph: {
        value: ph,
        score: phScore,
        condition: getPHCondition(ph),
        weight: "40%",
      },
      moisture: {
        value: moisture,
        score: moistureScore,
        condition: getMoistureCondition(moisture),
        weight: "35%",
      },
      temperature: {
        value: temperature,
        score: temperatureScore,
        condition: getTemperatureCondition(temperature),
        weight: "25%",
      },
    },
  }
}
