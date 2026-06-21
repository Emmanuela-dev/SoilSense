import { read } from "../db.js"

export async function getWeather(latitude, longitude) {
  const url = new URL("https://api.open-meteo.com/v1/forecast")
  url.searchParams.set("latitude", String(latitude))
  url.searchParams.set("longitude", String(longitude))
  url.searchParams.set("current", "temperature_2m,relative_humidity_2m")
  url.searchParams.set("daily", "precipitation_probability_mean")
  url.searchParams.set("forecast_days", "1")
  url.searchParams.set("timezone", "UTC")

  const response = await fetch(url)

  if (!response.ok) {
    const error = new Error("Weather service request failed")
    error.status = response.status
    throw error
  }

  const data = await response.json()

  return {
    temperature: Math.round(Number(data.current?.temperature_2m ?? 0)),
    humidity: Math.round(Number(data.current?.relative_humidity_2m ?? 0)),
    rainProbability: Math.round(Number(data.daily?.precipitation_probability_mean?.[0] ?? 0)),
  }
}

export async function getWeatherAdvisory(farmId, latitude, longitude) {
  const farmResult = await read(
    `
    MATCH (f:Farm {farmId: $farmId})
    RETURN f.name AS name
    `,
    { farmId },
  )

  if (farmResult.records.length === 0) {
    const error = new Error("Farm not found")
    error.status = 404
    throw error
  }

  const weather = await getWeather(latitude, longitude)

  if (weather.rainProbability >= 70) {
    return {
      recommendation: "Delay irrigation",
      reason: "Rain expected within 24 hours.",
    }
  }

  if (weather.temperature >= 30 && weather.humidity <= 45) {
    return {
      recommendation: "Increase irrigation",
      reason: "Hot and dry conditions may stress crops.",
    }
  }

  return {
    recommendation: "Continue normal irrigation",
    reason: "Weather conditions are suitable for regular irrigation.",
  }
}
