import express from "express"
import { read } from "../db.js"

const router = express.Router()

router.get("/map", async (req, res, next) => {
  try {
    const result = await read(`
      MATCH (f:Farm)
      OPTIONAL MATCH (f)-[:HAS_ASSESSMENT]->(a:Assessment)
      WITH f, a
      ORDER BY datetime(a.createdAt) DESC
      WITH f, collect(a)[0] AS latest
      RETURN {
        farmId: f.farmId,
        name: f.name,
        latitude: f.latitude,
        longitude: f.longitude,
        soilHealthScore: coalesce(latest.soilHealthScore, 0),
        status: coalesce(latest.soilCondition, 'Healthy'),
        pH: coalesce(latest.ph, 6.0),
        moisture: coalesce(latest.moisture, 60),
        temperature: coalesce(latest.temperature, 22),
        crop: coalesce(latest.crop, 'maize')
      } AS farm
      ORDER BY f.name
    `)

    res.json(result.records.map((record) => record.get("farm")))
  } catch (error) {
    next(error)
  }
})

export default router
