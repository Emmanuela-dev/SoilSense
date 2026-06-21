import express from "express"
import cors from "cors"
import { config } from "./config.js"
import { closeDatabase, verifyDatabase } from "./db.js"
import assessmentRoutes from "./routes/assessmentRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import farmRoutes from "./routes/farmRoutes.js"
import recommendationRoutes from "./routes/recommendationRoutes.js"
import reportRoutes from "./routes/reportRoutes.js"
import sensorRoutes from "./routes/sensorRoutes.js"
import weatherRoutes from "./routes/weatherRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/api/health", async (req, res, next) => {
  try {
    await verifyDatabase()
    res.json({ status: "ok", database: "connected" })
  } catch (error) {
    next(error)
  }
})

app.use("/api/dashboard", dashboardRoutes)
app.use("/api/assessments", assessmentRoutes)
app.use("/api/sensors", sensorRoutes)
app.use("/api/recommendations", recommendationRoutes)
app.use("/api/weather", weatherRoutes)
app.use("/api/farms", farmRoutes)
app.use("/api/reports", reportRoutes)

app.use((error, req, res) => {
  console.error(error)

  res.status(error.status || 500).json({
    message: error.message || "Internal server error",
  })
})

const server = app.listen(config.port, () => {
  console.log(`Backend API running on http://localhost:${config.port}`)
})

async function shutdown() {
  server.close()
  await closeDatabase()
  process.exit(0)
}

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)
