// SOILSENSE AI — Dashboard Service
// Fetches real AI data for the dashboard

const AI_BASE_URL = "http://localhost:5175"

/**
 * Get real AI analysis for dashboard
 * Uses latest soil readings
 */
export async function getDashboardAIData() {
  try {
    const response = await fetch(`${AI_BASE_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ph: 4.8,
        moisture: 25,
        temperature: 28,
        crop: "maize",
        location: "Kiambu Town, Kenya",
        rainExpected: true,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch AI data")
    }

    const result = await response.json()
    return result.data

  } catch (error) {
    console.error("Dashboard AI Service Error:", error)
    return null
  }
}

/**
 * Get quick health check for a farm
 */
export async function getFarmHealthScore(ph, moisture, temperature) {
  try {
    const response = await fetch(
      `${AI_BASE_URL}/quick-check?ph=${ph}&moisture=${moisture}&temperature=${temperature}`
    )

    if (!response.ok) {
      throw new Error("Failed to fetch health score")
    }

    const result = await response.json()
    return result.data

  } catch (error) {
    console.error("Farm Health Score Error:", error)
    return null
  }
}