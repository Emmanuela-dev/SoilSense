import express from "express"
import { randomUUID } from "node:crypto"
import { read, write } from "../db.js"
import {
  formatAssessment,
} from "../utils.js"

const router = express.Router()

function requiredString(body, key) {
  const value = body?.[key]
  if (typeof value !== "string" || value.trim() === "") {
    const error = new Error(`${key} is required`)
    error.status = 400
    throw error
  }
  return value.trim()
}

function requiredNumber(body, key) {
  const value = Number(body?.[key])
  if (!Number.isFinite(value)) {
    const error = new Error(`${key} must be a number`)
    error.status = 400
    throw error
  }
  return value
}

function optionalNumber(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

router.get("/", async (req, res, next) => {
  try {
    const result = await read(`
      MATCH (f:Farm)-[:HAS_ASSESSMENT]->(a:Assessment)
      RETURN f, a
      ORDER BY datetime(a.createdAt) DESC
    `)

    const assessments = result.records.map((record) =>
      formatAssessment(record.get("a").properties, record.get("f").properties),
    )

    res.json(assessments)
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const farmName = requiredString(req.body, "farmName")
    const crop = requiredString(req.body, "crop")
    const latitude = requiredNumber(req.body, "latitude")
    const longitude = requiredNumber(req.body, "longitude")
    const farmId = requiredString(req.body, "farmId") || `F${Date.now().toString(36).toUpperCase()}`
    const assessmentId = `A${Date.now().toString(36).toUpperCase()}`
    const createdAt = new Date().toISOString()

    const result = await write(
      `
      MERGE (f:Farm {farmId: $farmId})
      SET f.name = $farmName,
          f.latitude = $latitude,
          f.longitude = $longitude
      OPTIONAL MATCH (f)-[:HAS_READING]->(r:SensorReading)
      WITH f, r
      ORDER BY datetime(r.timestamp) DESC
      LIMIT 1
      WITH f, r
      CREATE (a:Assessment {
        assessmentId: $assessmentId,
        farmId: f.farmId,
        farmName: f.name,
        crop: $crop,
        ph: coalesce(r.ph, 0),
        moisture: coalesce(r.moisture, 0),
        temperature: coalesce(r.temperature, 0),
        soilCondition: $soilCondition,
        soilHealthScore: $soilHealthScore,
        createdAt: $createdAt
      })
      CREATE (f)-[:HAS_ASSESSMENT]->(a)
      RETURN f, a
      `,
      {
        farmId,
        farmName,
        crop,
        latitude,
        longitude,
        assessmentId,
        createdAt,
      },
    )

    const assessment = result.records[0].get("a").properties
    const farm = result.records[0].get("f").properties
    const payload = formatAssessment(assessment, farm)

    res.status(201).json(payload)
  } catch (error) {
    next(error)
  }
})

router.get("/:assessmentId", async (req, res, next) => {
  try {
    const result = await read(
      `
      MATCH (f:Farm)-[:HAS_ASSESSMENT]->(a:Assessment)
      WHERE a.assessmentId = $assessmentId
      RETURN f, a
      `,
      { assessmentId: req.params.assessmentId },
    )

    if (result.records.length === 0) {
      res.status(404).json({ message: "Assessment not found" })
      return
    }

    const assessment = result.records[0].get("a").properties
    const farm = result.records[0].get("f").properties
    res.json(formatAssessment(assessment, farm))
  } catch (error) {
    next(error)
  }
})

export { requiredNumber, requiredString, optionalNumber }
