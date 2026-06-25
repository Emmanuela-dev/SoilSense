import express from "express"
import { randomUUID } from "node:crypto"
import { read, write } from "../db.js"
import {
  formatAssessment,
  getSoilCondition,
  getSoilHealthScore,
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

    let farmId = req.body.farmId
    let latitude = req.body.latitude !== undefined ? optionalNumber(req.body.latitude) : null
    let longitude = req.body.longitude !== undefined ? optionalNumber(req.body.longitude) : null

    if (!farmId) {
      const existingFarm = await read(
        `
        MATCH (f:Farm)
        WHERE f.name = $farmName
        RETURN f.farmId AS farmId, f.latitude AS latitude, f.longitude AS longitude
        LIMIT 1
        `,
        { farmName }
      )
      if (existingFarm.records.length > 0) {
        farmId = existingFarm.records[0].get("farmId")
        if (latitude === null) latitude = Number(existingFarm.records[0].get("latitude"))
        if (longitude === null) longitude = Number(existingFarm.records[0].get("longitude"))
      } else {
        farmId = `F${Date.now().toString(36).toUpperCase()}`
      }
    }

    if (latitude === null) latitude = -0.68
    if (longitude === null) longitude = 34.77

    const assessmentId = `A${Date.now().toString(36).toUpperCase()}`
    const createdAt = new Date().toISOString()

    const ph = req.body.ph !== undefined ? optionalNumber(req.body.ph) : null
    const moisture = req.body.moisture !== undefined ? optionalNumber(req.body.moisture) : null
    const temperature = req.body.temperature !== undefined ? optionalNumber(req.body.temperature) : null
    const soilCondition = req.body.soilCondition || (ph !== null && moisture !== null ? getSoilCondition(ph, moisture) : null)
    const soilHealthScore = req.body.soilHealthScore !== undefined ? optionalNumber(req.body.soilHealthScore) : (ph !== null && moisture !== null ? getSoilHealthScore(ph, moisture) : null)

    const result = await write(
      `
      MERGE (f:Farm {farmId: $farmId})
      SET f.name = $farmName,
          f.latitude = coalesce($latitude, f.latitude),
          f.longitude = coalesce($longitude, f.longitude)
      
      OPTIONAL MATCH (f)-[:HAS_READING]->(r:SensorReading)
      WITH f, r
      ORDER BY datetime(r.timestamp) DESC
      LIMIT 1
      
      WITH f,
           coalesce($ph, r.ph, 0) AS phVal,
           coalesce($moisture, r.moisture, 0) AS moistureVal,
           coalesce($temperature, r.temperature, 0) AS tempVal,
           coalesce($soilHealthScore, 0) AS passedScore,
           coalesce($soilCondition, "") AS passedCondition
      
      WITH f, phVal, moistureVal, tempVal,
           CASE
             WHEN passedScore > 0 THEN passedScore
             ELSE
               toInteger(round((
                 CASE WHEN phVal < 5.2 THEN 35 WHEN phVal < 5.8 THEN 62 WHEN phVal > 7.2 THEN 58 ELSE 88 END +
                 CASE WHEN moistureVal < 40 THEN 35 WHEN moistureVal < 55 THEN 62 WHEN moistureVal > 80 THEN 70 ELSE 86 END
               ) / 2.0))
           END AS finalScore,
           CASE
             WHEN passedCondition <> "" THEN passedCondition
             ELSE
               CASE
                 WHEN phVal < 5.2 OR moistureVal < 40 THEN 'High Risk'
                 WHEN phVal < 5.8 OR moistureVal < 55 THEN 'Moderate'
                 ELSE 'Healthy'
               END
           END AS finalCondition
           
      CREATE (a:Assessment {
        assessmentId: $assessmentId,
        farmId: f.farmId,
        farmName: f.name,
        crop: $crop,
        ph: phVal,
        moisture: moistureVal,
        temperature: tempVal,
        soilCondition: finalCondition,
        soilHealthScore: finalScore,
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
        ph,
        moisture,
        temperature,
        soilCondition,
        soilHealthScore,
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
export default router

