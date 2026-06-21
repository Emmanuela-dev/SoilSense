import express from "express"
import { read } from "../db.js"

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const result = await read(`
      MATCH (a:Assessment)
      WITH
        count(a) AS totalAssessments,
        sum(CASE WHEN a.soilCondition = 'Healthy' THEN 1 ELSE 0 END) AS healthySoils,
        sum(CASE WHEN a.soilCondition = 'High Risk' THEN 1 ELSE 0 END) AS highRiskSoils,
        avg(a.ph) AS averagePH,
        avg(a.moisture) AS averageMoisture
      RETURN {
        totalAssessments: toInteger(totalAssessments),
        healthySoils: toInteger(healthySoils),
        highRiskSoils: toInteger(highRiskSoils),
        averagePH: round(toFloat(coalesce(averagePH, 0)) * 10) / 10,
        averageMoisture: toInteger(round(toFloat(coalesce(averageMoisture, 0))))
      } AS dashboard
    `)

    res.json(result.records[0].get("dashboard"))
  } catch (error) {
    next(error)
  }
})

export default router
