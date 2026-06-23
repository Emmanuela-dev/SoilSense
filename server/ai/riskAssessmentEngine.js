// SOILSENSE AI — Risk Assessment Engine
// Detects farming risks from soil readings


/**
 * Assess soil acidity risk
 */
function assessAcidityRisk(ph) {
  if (ph >= 6.0) return { level: "Low", score: 10, message: "Soil pH is in optimal range." }
  if (ph >= 5.5) return { level: "Medium", score: 40, message: "Soil is slightly acidic. Monitor closely." }
  if (ph >= 5.0) return { level: "High", score: 70, message: "Soil acidity is reducing nutrient availability." }
  if (ph >= 4.5) return { level: "Critical", score: 90, message: "Critically acidic soil. Immediate liming required." }
  return { level: "Critical", score: 100, message: "Extreme acidity. Crops cannot grow without urgent treatment." }
}

/**
 * Assess drought risk
 */
function assessDroughtRisk(moisture, rainExpected) {
  if (moisture >= 50) return { level: "Low", score: 10, message: "Soil moisture is adequate." }
  if (moisture >= 40) {
    return {
      level: rainExpected ? "Low" : "Medium",
      score: rainExpected ? 20 : 45,
      message: rainExpected
        ? "Moisture slightly low but rain expected soon."
        : "Moisture is slightly low. Consider irrigation.",
    }
  }
  if (moisture >= 30) {
    return {
      level: rainExpected ? "Medium" : "High",
      score: rainExpected ? 45 : 70,
      message: rainExpected
        ? "Moisture is low. Rain expected — delay irrigation."
        : "Moisture is low. Irrigation recommended soon.",
    }
  }
  if (moisture >= 20) {
    return {
      level: "High",
      score: 80,
      message: "Soil moisture critically low. Immediate irrigation needed.",
    }
  }
  return {
    level: "Critical",
    score: 100,
    message: "Severe drought conditions. Crops at risk of failure.",
  }
}

/**
 * Assess nutrient deficiency risk
 */
function assessNutrientRisk(ph, moisture) {
  let score = 0
  let messages = []

  // pH affects nutrient availability
  if (ph < 5.0) {
    score += 50
    messages.push("Low pH locks out key nutrients like phosphorus and calcium.")
  } else if (ph < 5.5) {
    score += 30
    messages.push("Slightly acidic soil reduces nutrient uptake efficiency.")
  }

  // Low moisture affects nutrient transport
  if (moisture < 25) {
    score += 40
    messages.push("Very low moisture prevents nutrients from dissolving in soil.")
  } else if (moisture < 35) {
    score += 20
    messages.push("Low moisture reduces nutrient transport to plant roots.")
  }

  score = Math.min(score, 100)

  let level = "Low"
  if (score >= 70) level = "Critical"
  else if (score >= 50) level = "High"
  else if (score >= 30) level = "Medium"

  return {
    level,
    score,
    message: messages.length > 0
      ? messages.join(" ")
      : "Nutrient availability appears adequate.",
  }
}

/**
 * Assess heat stress risk
 */
function assessHeatRisk(temperature) {
  if (temperature <= 28) return { level: "Low", score: 10, message: "Soil temperature is optimal for crop growth." }
  if (temperature <= 32) return { level: "Medium", score: 40, message: "Soil is warm. Monitor crop stress levels." }
  if (temperature <= 36) return { level: "High", score: 70, message: "High soil temperature may stress crops." }
  return { level: "Critical", score: 90, message: "Extreme heat stress. Mulching recommended urgently." }
}

/**
 * Calculate overall crop failure risk
 */
function assessCropFailureRisk(acidityRisk, droughtRisk, nutrientRisk, heatRisk) {
  const risks = [acidityRisk, droughtRisk, nutrientRisk, heatRisk]
  const criticalCount = risks.filter((r) => r.level === "Critical").length
  const highCount = risks.filter((r) => r.level === "High").length

  const avgScore = Math.round(
    risks.reduce((sum, r) => sum + r.score, 0) / risks.length
  )

  let level = "Low"
  let message = "Overall crop conditions are favorable."

  if (criticalCount >= 2) {
    level = "Critical"
    message = "Multiple critical risks detected. Immediate intervention required to prevent crop failure."
  } else if (criticalCount === 1 || highCount >= 2) {
    level = "High"
    message = "Significant risks detected. Urgent action recommended to protect crop yield."
  } else if (highCount === 1) {
    level = "Medium"
    message = "Some risks present. Monitor closely and follow recommendations."
  }

  return { level, score: avgScore, message }
}

/**
 * MAIN RISK ASSESSMENT FUNCTION
 */
export function assessRisks(ph, moisture, temperature, rainExpected = false) {
  const acidityRisk = assessAcidityRisk(ph)
  const droughtRisk = assessDroughtRisk(moisture, rainExpected)
  const nutrientRisk = assessNutrientRisk(ph, moisture)
  const heatRisk = assessHeatRisk(temperature)
  const cropFailureRisk = assessCropFailureRisk(
    acidityRisk,
    droughtRisk,
    nutrientRisk,
    heatRisk
  )

  return {
    overall: cropFailureRisk,
    risks: {
      soilAcidity: acidityRisk,
      drought: droughtRisk,
      nutrientDeficiency: nutrientRisk,
      heatStress: heatRisk,
    },
  }
}
