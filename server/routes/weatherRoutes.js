import express from "express"
import { read } from "../db.js"
import { getWeather, getWeatherAdvisory } from "../services/weatherService.js"

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const lat = Number(req.query.lat)
    const lon = Number(req.query.lon)

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      res.status(400).json({ message: "lat and lon query parameters are required" })
      return
    }

    res.json(await getWeather(lat, lon))
  } catch (error) {
    next(error)
  }
})

router.get("/advisory/:farmId", async (req, res, next) => {
  try {
    const result = await read(
      `
      MATCH (f:Farm {farmId: $farmId})
      RETURN f.latitude AS latitude, f.longitude AS longitude
      `,
      { farmId: req.params.farmId },
    )

    if (result.records.length === 0) {
      res.status(404).json({ message: "Farm not found" })
      return
    }

    const row = result.records[0].toObject()
    res.json(await getWeatherAdvisory(req.params.farmId, Number(row.latitude), Number(row.longitude)))
  } catch (error) {
    next(error)
  }
})

export default router
