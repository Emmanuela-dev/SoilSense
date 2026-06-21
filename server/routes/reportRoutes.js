import express from "express"
import { read } from "../db.js"

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const result = await read(`
      MATCH (a:Assessment)
      WITH
        count(a) AS totalAssessments,
        sum(CASE WHEN a.soilCondition = 'High Risk' THEN 1 ELSE 0 END) AS highRiskCount,
        avg(a.ph) AS averagePH,
        avg(a.moisture) AS averageMoisture
      RETURN {
        averagePH: round(toFloat(coalesce(averagePH, 0)) * 10) / 10,
        averageMoisture: toInteger(round(toFloat(coalesce(averageMoisture, 0)))),
        commonIssue: CASE
          WHEN highRiskCount > 0 THEN 'Soil Acidity'
          WHEN toFloat(coalesce(averagePH, 0)) < 5.8 THEN 'Soil Acidity'
          WHEN toFloat(coalesce(averageMoisture, 0)) < 55 THEN 'Low Moisture'
          ELSE 'Maintain Soil Health'
        END
      } AS report
    `)

    const report = result.records[0].get("report")
    res.json(report)
  } catch (error) {
    next(error)
  }
})

export default router
