async function request(path, options = {}) {
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed with status ${response.status}`)
  }

  const text = await response.text()
  return text ? JSON.parse(text) : null
}

export const api = {
  getDashboard: () => request("/api/dashboard"),
  getAssessments: () => request("/api/assessments"),
  createAssessment: (payload) => request("/api/assessments", {
    method: "POST",
    body: JSON.stringify(payload),
  }),
  getSensors: () => request("/api/sensors"),
  postSensorReading: (payload) => request("/api/sensors", {
    method: "POST",
    body: JSON.stringify(payload),
  }),
  getLatestSensorReading: (farmId) => request(`/api/sensors/latest/${farmId}`),
  getRecommendation: (assessmentId) => request(`/api/recommendations/${assessmentId}`),
  getWeather: (lat, lon) => request(`/api/weather?lat=${lat}&lon=${lon}`),
  getWeatherAdvisory: (farmId) => request(`/api/weather/advisory/${farmId}`),
  getFarmMap: () => request("/api/farms/map"),
  getReports: () => request("/api/reports"),
}
