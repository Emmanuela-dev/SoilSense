// SOILSENSE AI — Recommendation Engine
// Generates personalized farming advice

/**
 * pH / Liming Recommendations
 */
function getPHRecommendations(ph, crop) {
  const recommendations = []

  if (ph < 4.5) {
    recommendations.push({
      priority: "Critical",
      category: "Soil Amendment",
      title: "Apply Agricultural Lime Urgently",
      description: `Soil pH of ${ph} is critically low. Apply 3-4 bags of agricultural lime per acre immediately. Do not plant ${crop} until pH rises above 5.5.`,
      timeframe: "Immediately",
    })
    recommendations.push({
      priority: "High",
      category: "Soil Amendment",
      title: "Stop All Fertilizer Application",
      description: "At this pH level, fertilizers are ineffective and may worsen soil conditions. Wait until after liming.",
      timeframe: "Immediately",
    })
  } else if (ph < 5.0) {
    recommendations.push({
      priority: "Critical",
      category: "Soil Amendment",
      title: "Apply Agricultural Lime",
      description: `Soil pH of ${ph} is highly acidic for ${crop}. Apply 2-3 bags of agricultural lime per acre. Retest soil after 4 weeks.`,
      timeframe: "Within 1 week",
    })
  } else if (ph < 5.5) {
    recommendations.push({
      priority: "High",
      category: "Soil Amendment",
      title: "Apply Lime to Correct Acidity",
      description: `Soil pH of ${ph} is reducing nutrient availability for ${crop}. Apply 1-2 bags of agricultural lime per acre.`,
      timeframe: "Within 2 weeks",
    })
  } else if (ph < 6.0) {
    recommendations.push({
      priority: "Medium",
      category: "Soil Amendment",
      title: "Monitor Soil pH",
      description: `Soil pH of ${ph} is slightly below optimal for ${crop}. Consider applying 1 bag of lime per acre to improve conditions.`,
      timeframe: "Within 1 month",
    })
  } else if (ph > 7.5) {
    recommendations.push({
      priority: "High",
      category: "Soil Amendment",
      title: "Reduce Soil Alkalinity",
      description: `Soil pH of ${ph} is too alkaline for ${crop}. Apply agricultural sulfur to reduce pH. Add organic matter to improve soil balance.`,
      timeframe: "Within 2 weeks",
    })
  } else {
    recommendations.push({
      priority: "Low",
      category: "Soil Maintenance",
      title: "Maintain Current pH Level",
      description: `Soil pH of ${ph} is optimal for ${crop}. Continue current soil management practices.`,
      timeframe: "Ongoing",
    })
  }

  return recommendations
}

/**
 * Irrigation / Moisture Recommendations
 */
function getMoistureRecommendations(moisture, rainExpected) {
  const recommendations = []

  if (moisture < 20) {
    if (rainExpected) {
      recommendations.push({
        priority: "High",
        category: "Irrigation",
        title: "Urgent Irrigation Needed Despite Rain",
        description: "Soil moisture is critically low. Do not wait for rain. Irrigate immediately with at least 25mm of water.",
        timeframe: "Today",
      })
    } else {
      recommendations.push({
        priority: "Critical",
        category: "Irrigation",
        title: "Emergency Irrigation Required",
        description: "Soil moisture is critically low and no rain expected. Irrigate immediately. Crops are at serious risk.",
        timeframe: "Immediately",
      })
    }
  } else if (moisture < 30) {
    if (rainExpected) {
      recommendations.push({
        priority: "Medium",
        category: "Irrigation",
        title: "Delay Irrigation — Rain Expected",
        description: "Soil moisture is low but rain is expected. Delay irrigation by 24-48 hours and monitor moisture after rainfall.",
        timeframe: "Monitor daily",
      })
    } else {
      recommendations.push({
        priority: "High",
        category: "Irrigation",
        title: "Irrigate Soon",
        description: "Soil moisture is very low. Irrigate within the next 24 hours with 20mm of water to prevent crop stress.",
        timeframe: "Within 24 hours",
      })
    }
  } else if (moisture < 40) {
    recommendations.push({
      priority: rainExpected ? "Low" : "Medium",
      category: "Irrigation",
      title: rainExpected ? "Monitor After Rainfall" : "Schedule Irrigation",
      description: rainExpected
        ? "Moisture is slightly low but rainfall should replenish it. Monitor soil moisture after rain."
        : "Moisture is slightly low. Schedule irrigation within the next 2-3 days.",
      timeframe: rainExpected ? "After rainfall" : "Within 3 days",
    })
  } else if (moisture > 80) {
    recommendations.push({
      priority: "High",
      category: "Drainage",
      title: "Improve Soil Drainage",
      description: "Soil is waterlogged. Improve drainage channels immediately. Waterlogged soil causes root rot and nutrient loss.",
      timeframe: "Immediately",
    })
  } else {
    recommendations.push({
      priority: "Low",
      category: "Irrigation",
      title: "Maintain Current Moisture Level",
      description: "Soil moisture is optimal. Continue current irrigation schedule and monitor regularly.",
      timeframe: "Ongoing",
    })
  }

  return recommendations
}

/**
 * Temperature Recommendations
 */
function getTemperatureRecommendations(temperature) {
  const recommendations = []

  if (temperature > 32) {
    recommendations.push({
      priority: "High",
      category: "Soil Management",
      title: "Apply Mulch to Reduce Soil Temperature",
      description: `Soil temperature of ${temperature}°C is too high. Apply organic mulch (5-10cm layer) around crops to reduce heat stress and retain moisture.`,
      timeframe: "Within 2 days",
    })
  } else if (temperature < 15) {
    recommendations.push({
      priority: "Medium",
      category: "Planting",
      title: "Delay Planting Until Soil Warms",
      description: `Soil temperature of ${temperature}°C is too cold for optimal germination. Wait until soil reaches at least 18°C before planting.`,
      timeframe: "Monitor weekly",
    })
  } else {
    recommendations.push({
      priority: "Low",
      category: "Soil Management",
      title: "Temperature Conditions Are Favorable",
      description: `Soil temperature of ${temperature}°C is optimal for crop growth. No temperature intervention needed.`,
      timeframe: "Ongoing",
    })
  }

  return recommendations
}

/**
 * Crop Specific Recommendations
 */
function getCropRecommendations(crop, ph, moisture) {
  const recommendations = []
  const cropLower = crop.toLowerCase()

  const cropRequirements = {
    maize: { phMin: 5.8, phMax: 7.0, moistureMin: 50, moistureMax: 70 },
    tea: { phMin: 4.5, phMax: 5.5, moistureMin: 60, moistureMax: 80 },
    coffee: { phMin: 6.0, phMax: 6.5, moistureMin: 50, moistureMax: 70 },
    beans: { phMin: 6.0, phMax: 7.0, moistureMin: 40, moistureMax: 60 },
    wheat: { phMin: 6.0, phMax: 7.0, moistureMin: 45, moistureMax: 65 },
    potatoes: { phMin: 5.0, phMax: 6.0, moistureMin: 50, moistureMax: 70 },
  }

  const req = cropRequirements[cropLower]

  if (req) {
    if (ph < req.phMin) {
      recommendations.push({
        priority: "High",
        category: "Crop Management",
        title: `Soil pH Too Low for ${crop}`,
        description: `${crop} requires pH between ${req.phMin} and ${req.phMax}. Current pH ${ph} will reduce yield significantly. Apply lime to correct.`,
        timeframe: "Before planting",
      })
    }
    if (moisture < req.moistureMin) {
      recommendations.push({
        priority: "Medium",
        category: "Crop Management",
        title: `Increase Moisture for ${crop}`,
        description: `${crop} requires ${req.moistureMin}-${req.moistureMax}% moisture. Current moisture ${moisture}% is below optimal. Irrigate to improve conditions.`,
        timeframe: "Within 48 hours",
      })
    }
  } else {
    recommendations.push({
      priority: "Low",
      category: "Crop Management",
      title: "General Crop Advisory",
      description: `Ensure soil conditions meet the specific requirements for ${crop}. Consult your extension officer for crop-specific guidance.`,
      timeframe: "Before planting",
    })
  }

  return recommendations
}

/**
 * Organic Matter Recommendations
 */
function getOrganicMatterRecommendations(ph, moisture) {
  const recommendations = []

  if (ph < 5.5 || moisture < 30) {
    recommendations.push({
      priority: "Medium",
      category: "Soil Improvement",
      title: "Add Organic Matter",
      description: "Apply well-decomposed farmyard manure or compost at 2-3 tonnes per acre. Organic matter improves soil structure, moisture retention, and pH balance.",
      timeframe: "Within 2 weeks",
    })
  }

  return recommendations
}

/**
 * MAIN RECOMMENDATION FUNCTION
 */
export function generateRecommendations(ph, moisture, temperature, crop, rainExpected = false) {
  const allRecommendations = [
    ...getPHRecommendations(ph, crop),
    ...getMoistureRecommendations(moisture, rainExpected),
    ...getTemperatureRecommendations(temperature),
    ...getCropRecommendations(crop, ph, moisture),
    ...getOrganicMatterRecommendations(ph, moisture),
  ]

  // Sort by priority
  const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 }
  allRecommendations.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  )

  return allRecommendations
}
