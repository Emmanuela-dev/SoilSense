import express from "express"
import { randomUUID } from "node:crypto"
import { read, write } from "../db.js"
import { formatSensorReading, optionalNumber, requiredNumber, requiredString } from "./assessmentRoutes.js"

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const result = await read(`
      MATCH (f:Farm)-[:HAS_READING]->(r:SensorReading)
      RETURN f.farmId AS farmId, r
      ORDER BY datetime(r.timestamp) DESC
    `)

    res.json(result.records.map((record) => formatSensorReading(record.get("r").properties)))
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const farmId = requiredString(req.body, "farmId")
    const moisture = requiredNumber(req.body, "moisture")
    const ph = requiredNumber(req.body, "ph")
    const temperature = requiredNumber(req.body, "temperature")
    const latitude = optionalNumber(req.body.latitude)
    const longitude = optionalNumber(req.body.longitude)
    const timestamp = typeof req.body.timestamp === "string" ? req.body.timestamp : new Date().toISOString()
    const readingId = randomUUID()

    const result = await write(
      `
      MERGE (f:Farm {farmId: $farmId})
      SET f.name = coalesce(f.name, $farmId),
          f.latitude = coalesce(f.latitude, $latitude),
          f.longitude = coalesce(f.longitude, $longitude)
      CREATE (r:SensorReading {
        readingId: $readingId,
        farmId: $farmId,
        moisture: $moisture,
        ph: $ph,
        temperature: $temperature,
        timestamp: $timestamp
      })
      CREATE (f)-[:HAS_READING]->(r)
      RETURN r
      `,
      {
        farmId,
        moisture,
        ph,
        temperature,
        latitude,
        longitude,
        timestamp,
        readingId,
      },
    )

    res.status(201).json(formatSensorReading(result.records[0].get("r").properties))
  } catch (error) {
    next(error)
  }
})

router.get("/latest/:farmId", async (req, res, next) => {
  try {
    const result = await read(
      `
      MATCH (f:Farm)-[:HAS_READING]->(r:SensorReading)
      WHERE f.farmId = $farmId
      RETURN r
      ORDER BY datetime(r.timestamp) DESC
      LIMIT 1
      `,
      { farmId: req.params.farmId },
    )

    if (result.records.length === 0) {
      res.status(404).json({ message: "Latest sensor reading not found" })
      return
    }

    const reading = result.records[0].get("r").properties
    res.json({
      moisture: Math.round(Number(reading.moisture)),
      ph: Math.round(Number(reading.ph) * 10) / 10,
      temperature: Math.round(Number(reading.temperature)),
    })
  } catch (error) {
    next(error)
  }
})

export default router
