export const dashboardStats = {
  soilHealthScore: 78,
  totalAssessments: 128,
  highRiskSoils: 32,
  farmersReached: 243,
}

export const recentAssessments = [
  {
    id: 1,
    farm: "Nyamirama Farm",
    crop: "Maize",
    date: "12 May 2025",
    pH: 4.8,
    moisture: "25%",
    temperature: "28°C",
    status: "High Risk",
  },
  {
    id: 2,
    farm: "Riana Farm",
    crop: "Beans",
    date: "10 May 2025",
    pH: 6.2,
    moisture: "45%",
    temperature: "24°C",
    status: "Moderate",
  },
  {
    id: 3,
    farm: "Borabu Farm",
    crop: "Tea",
    date: "08 May 2025",
    pH: 5.8,
    moisture: "60%",
    temperature: "22°C",
    status: "Healthy",
  },
  {
    id: 4,
    farm: "Koumbu Farm",
    crop: "Maize",
    date: "05 May 2025",
    pH: 5.5,
    moisture: "38%",
    temperature: "26°C",
    status: "Moderate",
  },
  {
    id: 5,
    farm: "Manga Farm",
    crop: "Coffee",
    date: "03 May 2025",
    pH: 6.5,
    moisture: "55%",
    temperature: "23°C",
    status: "Healthy",
  },
]

export const recommendations = [
  {
    id: 1,
    priority: "High",
    title: "Apply Agricultural Lime",
    description: "Apply 2 bags per acre to reduce soil acidity on Nyamirama Farm.",
    farm: "Nyamirama Farm",
  },
  {
    id: 2,
    priority: "Medium",
    title: "Add Organic Manure",
    description: "Use well-decomposed manure to improve soil structure and fertility.",
    farm: "Riana Farm",
  },
  {
    id: 3,
    priority: "Low",
    title: "Delay Irrigation",
    description: "Rain is expected in the next 48 hours. Monitor soil moisture after rainfall.",
    farm: "Borabu Farm",
  },
  {
    id: 4,
    priority: "Medium",
    title: "Plan Planting After Rainfall",
    description: "Ideal time to plant maize is 2-3 days after consistent rainfall.",
    farm: "Koumbu Farm",
  },
]

export const soilTrends = [
  { date: "6 May", pH: 5.2, moisture: 40, temperature: 24 },
  { date: "7 May", pH: 5.0, moisture: 38, temperature: 25 },
  { date: "8 May", pH: 4.9, moisture: 35, temperature: 26 },
  { date: "9 May", pH: 5.1, moisture: 42, temperature: 25 },
  { date: "10 May", pH: 5.3, moisture: 45, temperature: 24 },
  { date: "11 May", pH: 5.0, moisture: 41, temperature: 27 },
  { date: "12 May", pH: 4.8, moisture: 25, temperature: 28 },
]

export const weatherData = {
  location: "Kiambu town, Kenya",
  temperature: 22,
  humidity: 85,
  wind: 12,
  condition: "Light Rain",
  forecast: [
    { day: "Tue", high: 22, low: 16, condition: "Rain" },
    { day: "Wed", high: 24, low: 16, condition: "Cloudy" },
    { day: "Thu", high: 29, low: 18, condition: "Sunny" },
    { day: "Fri", high: 26, low: 18, condition: "Rain" },
    { day: "Sat", high: 23, low: 17, condition: "Rain" },
    { day: "Sun", high: 22, low: 16, condition: "Cloudy" },
    { day: "Mon", high: 24, low: 17, condition: "Cloudy" },
  ],
}