export function roundOne(value) {
  return Math.round(Number(value || 0) * 10) / 10
}

export function roundNumber(value) {
  return Math.round(Number(value || 0))
}

export function getSoilCondition(ph, moisture) {
  if (ph < 5.2 || moisture < 40) return "High Risk"
  if (ph < 5.8 || moisture < 55) return "Moderate"
  return "Healthy"
}

export function getSoilHealthScore(ph, moisture) {
  const phScore = ph < 5.2 ? 35 : ph < 5.8 ? 62 : ph > 7.2 ? 58 : 88
  const moistureScore = moisture < 40 ? 35 : moisture < 55 ? 62 : moisture > 80 ? 70 : 86
  return Math.round((phScore + moistureScore) / 2)
}

export function getRecommendation(assessment) {
  const ph = Number(assessment.ph || 0)
  const moisture = Number(assessment.moisture || 0)
  const crop = assessment.crop || "this crop"

  if (ph < 5.5) {
    return {
      soilCondition: "Acidic Soil",
      recommendation: "Apply agricultural lime",
      reason: `Soil pH is below the optimum range for ${crop}.`,
    }
  }

  if (ph > 7.5) {
    return {
      soilCondition: "Alkaline Soil",
      recommendation: "Apply elemental sulphur and increase organic matter",
      reason: `Soil pH is above the optimum range for ${crop}.`,
    }
  }

  if (moisture < 45) {
    return {
      soilCondition: "Low Soil Moisture",
      recommendation: "Increase irrigation and add mulch",
      reason: "Soil moisture is below the recommended level for healthy crop growth.",
    }
  }

  if (moisture > 80) {
    return {
      soilCondition: "Excess Soil Moisture",
      recommendation: "Improve drainage and reduce irrigation frequency",
      reason: "Soil moisture is too high and may limit root oxygen.",
    }
  }

  return {
    soilCondition: "Healthy Soil",
    recommendation: "Maintain current soil management practices",
    reason: "Soil pH and moisture are within a healthy range.",
  }
}

export function getCommonIssue(condition) {
  if (condition === "High Risk") return "Soil Acidity"
  if (condition === "Moderate") return "Nutrient Management"
  if (condition === "Healthy") return "Maintain Soil Health"
  return "No assessments yet"
}

export function formatAssessment(assessment, farm) {
  const farmName = assessment.farmName || farm?.name || assessment.farmId || "Unknown Farm"
  const phVal = roundOne(assessment.ph)
  const moistureVal = roundNumber(assessment.moisture)
  const tempVal = roundNumber(assessment.temperature)
  const dateStr = assessment.createdAt ? new Date(assessment.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }) : ""

  return {
    id: assessment.assessmentId,
    farmId: assessment.farmId,
    farmName: farmName,
    farm: farmName,
    crop: assessment.crop ? (assessment.crop.charAt(0).toUpperCase() + assessment.crop.slice(1)) : "",
    ph: phVal,
    pH: phVal,
    moistureVal: moistureVal,
    temperatureVal: tempVal,
    moisture: `${moistureVal}%`,
    temperature: `${tempVal}°C`,
    soilCondition: assessment.soilCondition,
    status: assessment.soilCondition,
    soilHealthScore: assessment.soilHealthScore,
    createdAt: assessment.createdAt,
    date: dateStr,
  }
}

export function formatSensorReading(reading) {
  return {
    farmId: reading.farmId,
    moisture: roundNumber(reading.moisture),
    ph: roundOne(reading.ph),
    temperature: roundNumber(reading.temperature),
    timestamp: reading.timestamp,
  }
}
