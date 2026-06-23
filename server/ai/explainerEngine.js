// SOILSENSE AI — Explainable AI Engine
// Generates human-friendly explanations
// Why was this recommendation made?


/**
 * Generate pH explanation
 */
function explainPH(ph, crop) {
  if (ph < 4.5) {
    return `The soil pH of ${ph} is critically acidic. At this level, essential nutrients like phosphorus, calcium, and magnesium become chemically locked in the soil and cannot be absorbed by ${crop} roots. This means even if you apply fertilizer, the plants cannot use it. The soil needs urgent lime application to raise the pH before any crop can grow successfully.`
  }
  if (ph < 5.0) {
    return `The soil pH of ${ph} is highly acidic. ${crop} struggles to absorb nutrients at this pH level. Aluminum and manganese become toxic to plant roots at low pH, stunting growth and reducing yields by up to 60%. Agricultural lime will neutralize the acidity and unlock nutrients already present in the soil.`
  }
  if (ph < 5.5) {
    return `The soil pH of ${ph} is moderately acidic for ${crop} production. Nutrient availability is reduced, particularly phosphorus which is critical for root development and flowering. Applying lime will improve nutrient uptake and increase fertilizer efficiency by up to 40%.`
  }
  if (ph < 6.0) {
    return `The soil pH of ${ph} is slightly below the optimal range for ${crop}. While crops can still grow, nutrient availability is not at its peak. A small lime application will optimize conditions and improve yield potential.`
  }
  if (ph >= 6.0 && ph <= 7.0) {
    return `The soil pH of ${ph} is in the optimal range for ${crop} production. At this pH, all essential nutrients are readily available to plant roots. This is ideal for maximizing crop yield and fertilizer efficiency.`
  }
  if (ph > 7.5) {
    return `The soil pH of ${ph} is too alkaline for ${crop}. High pH causes iron, manganese, and zinc deficiencies which show up as yellowing leaves. Applying sulfur or organic matter will help reduce the pH to the optimal range.`
  }
  return `The soil pH of ${ph} has been recorded and will be monitored for ${crop} production.`
}

/**
 * Generate moisture explanation
 */
function explainMoisture(moisture, rainExpected) {
  if (moisture < 20) {
    return `Soil moisture of ${moisture}% is critically low. Plants need water to transport nutrients from soil to leaves. At this moisture level, crops experience severe water stress, causing wilting, reduced photosynthesis, and potential crop failure. ${rainExpected ? "Although rain is expected, the situation is too urgent to wait." : "Immediate irrigation is essential to save the crop."}`
  }
  if (moisture < 30) {
    return `Soil moisture of ${moisture}% is very low. Water stress at this level reduces crop growth rate and yield potential significantly. ${rainExpected ? "Rain is expected which should help replenish moisture. Monitor the situation closely after rainfall." : "Irrigation is needed soon to prevent further crop stress and yield loss."}`
  }
  if (moisture < 40) {
    return `Soil moisture of ${moisture}% is below the optimal range. While crops can survive, growth is not at its peak efficiency. ${rainExpected ? "Expected rainfall should bring moisture to adequate levels. Monitor after rain." : "Consider scheduling irrigation to optimize growing conditions."}`
  }
  if (moisture >= 50 && moisture <= 70) {
    return `Soil moisture of ${moisture}% is in the optimal range. Water is adequately available for nutrient transport, photosynthesis, and crop growth. Current irrigation management is effective.`
  }
  if (moisture > 80) {
    return `Soil moisture of ${moisture}% indicates waterlogged conditions. Excess water pushes oxygen out of the soil, causing root suffocation and rot. Waterlogged soils also promote fungal diseases and nutrient leaching. Improving drainage is critical to protect crop health.`
  }
  return `Soil moisture of ${moisture}% has been recorded and will be monitored.`
}

/**
 * Generate temperature explanation
 */
function explainTemperature(temperature) {
  if (temperature > 32) {
    return `Soil temperature of ${temperature}°C is above the optimal range. High soil temperatures accelerate water evaporation, stress plant roots, and speed up organic matter decomposition — reducing long-term soil fertility. Applying mulch creates an insulating layer that can reduce soil temperature by 5-8°C and significantly improve growing conditions.`
  }
  if (temperature < 15) {
    return `Soil temperature of ${temperature}°C is too cold for optimal seed germination and root activity. Most crops require soil temperatures above 18°C to germinate and grow efficiently. Cold soils also slow microbial activity which is essential for nutrient cycling. Waiting for warmer conditions will improve germination rates and early crop establishment.`
  }
  if (temperature >= 20 && temperature <= 28) {
    return `Soil temperature of ${temperature}°C is ideal for crop growth. At this temperature range, seed germination is optimal, root activity is efficient, and soil microbes that cycle nutrients are highly active. These are excellent growing conditions.`
  }
  return `Soil temperature of ${temperature}°C is within an acceptable range. Monitor temperature trends to ensure optimal growing conditions are maintained.`
}

/**
 * Generate overall AI summary explanation
 */
function generateOverallExplanation(ph, moisture, temperature, crop, score, riskLevel) {
  const location = "Kiambu Town, Kenya"

  let opening = ""
  if (score >= 80) {
    opening = `The soil conditions at this farm are excellent for ${crop} production.`
  } else if (score >= 65) {
    opening = `The soil conditions at this farm are generally good for ${crop} production with some areas for improvement.`
  } else if (score >= 50) {
    opening = `The soil conditions at this farm are moderate and require attention to optimize ${crop} production.`
  } else if (score >= 35) {
    opening = `The soil conditions at this farm are poor and significant intervention is needed to support ${crop} production.`
  } else {
    opening = `The soil conditions at this farm are critical and urgent action is required to prevent complete crop failure.`
  }

  return `${opening} 

The overall soil health score of ${score}/100 was calculated based on three key parameters: soil pH (${ph}), moisture level (${moisture}%), and soil temperature (${temperature}°C). 

${explainPH(ph, crop)}

${explainMoisture(moisture, false)}

${explainTemperature(temperature)}

The overall risk level is ${riskLevel}. Following the recommendations provided will help improve soil conditions and maximize ${crop} yield in ${location}.`
}

/**
 * Generate confidence explanation
 */
function generateConfidenceExplanation(ph, moisture, temperature) {
  let confidence = 75
  const factors = []

  // Higher confidence when readings are in normal ranges
  if (ph >= 4.0 && ph <= 9.0) {
    confidence += 5
    factors.push("pH reading is within measurable range")
  }
  if (moisture >= 0 && moisture <= 100) {
    confidence += 5
    factors.push("Moisture reading is valid")
  }
  if (temperature >= 5 && temperature <= 45) {
    confidence += 5
    factors.push("Temperature reading is within expected range")
  }

  // Lower confidence for extreme readings
  if (ph < 3.5 || ph > 9.5) {
    confidence -= 15
    factors.push("Extreme pH reading — verify sensor calibration")
  }
  if (moisture < 5 || moisture > 95) {
    confidence -= 10
    factors.push("Extreme moisture reading — verify sensor")
  }

  confidence = Math.min(Math.max(confidence, 50), 98)

  return {
    score: confidence,
    factors,
    note: confidence >= 85
      ? "High confidence — sensor readings appear accurate and consistent."
      : confidence >= 70
      ? "Moderate confidence — recommendations are reliable but field verification is advised."
      : "Lower confidence — please verify sensor calibration before acting on recommendations.",
  }
}

/**
 * MAIN EXPLAINER FUNCTION
 */
export function generateExplanations(ph, moisture, temperature, crop, soilScore, riskLevel) {
  return {
    overall: generateOverallExplanation(ph, moisture, temperature, crop, soilScore, riskLevel),
    parameters: {
      ph: explainPH(ph, crop),
      moisture: explainMoisture(moisture, false),
      temperature: explainTemperature(temperature),
    },
    confidence: generateConfidenceExplanation(ph, moisture, temperature),
  }
}
