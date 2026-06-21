import express from "express"
import { read } from "../db.js"
import { getRecommendation } from "../utils.js"

const router = express.Router()

router.get("/:assessmentId", async (req, res, next) => {
  try {
    const result = await read(
      `
      MATCH (a:Assessment)
      WHERE a.assessmentId = $assessmentId
      RETURN a
      `,
      { assessmentId: req.params.assessmentId },
    )

    if (result.records.length === 0) {
      res.status(404).json({ message: "Assessment not found" })
      return
    }

    res.json(getRecommendation(result.records[0].get("a").properties))
  } catch (error) {
    next(error)
  }
})

export default router
