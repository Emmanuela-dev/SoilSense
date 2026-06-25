// ============================================
// SOILSENSE AI — Frontend AI Service
// Connects React frontend to AI Engine
// ============================================

const AI_BASE_URL = "/api/ai"

/**
 * Analyze soil readings using AI engine
 */
export async function analyzeSoil(data) {
  try {
    const response = await fetch(`${AI_BASE_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("AI analysis failed")
    }

    const result = await response.json()
    return result.data

  } catch (error) {
    console.error("AI Service Error:", error)
    throw error
  }
}

/**
 * Quick soil health check
 */
export async function quickHealthCheck(ph, moisture, temperature) {
  try {
    const response = await fetch(
      `${AI_BASE_URL}/quick-check?ph=${ph}&moisture=${moisture}&temperature=${temperature}`
    )

    if (!response.ok) {
      throw new Error("Quick check failed")
    }

    const result = await response.json()
    return result.data

  } catch (error) {
    console.error("Quick Check Error:", error)
    throw error
  }
}

/**
 * Check if AI engine is running
 */
export async function checkAIHealth() {
  try {
    const response = await fetch(`${AI_BASE_URL}/health`)
    const result = await response.json()
    return result.success

  } catch (error) {
    return false
  }
}