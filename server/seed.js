import { driver, closeDatabase } from "./db.js"
import { getSoilHealthScore } from "./utils.js"

const farms = [
  { farmId: "F001", name: "Kisii Demo Farm", latitude: -0.68, longitude: 34.77, ph: 5.2, moisture: 65, temperature: 24 },
  { farmId: "F002", name: "Nyamirama Farm", latitude: -0.7, longitude: 34.74, ph: 4.8, moisture: 42, temperature: 28 },
  { farmId: "F003", name: "Riana Farm", latitude: -0.66, longitude: 34.8, ph: 5.6, moisture: 58, temperature: 24 },
  { farmId: "F004", name: "Borabu Farm", latitude: -0.72, longitude: 34.72, ph: 6.1, moisture: 68, temperature: 22 },
  { farmId: "F005", name: "Koumbu Farm", latitude: -0.64, longitude: 34.82, ph: 5.5, moisture: 56, temperature: 26 },
  { farmId: "F006", name: "Manga Farm", latitude: -0.69, longitude: 34.76, ph: 6.3, moisture: 70, temperature: 23 },
]

function buildAssessments() {
  const crops = ["Maize", "Beans", "Tea", "Coffee", "Kale", "Banana"]
  const assessments = []

  for (let i = 0; i < 120; i += 1) {
    const farm = farms[i % farms.length]
    const condition = i < 18 ? "High Risk" : i < 63 ? "Moderate" : "Healthy"
    const ph = condition === "High Risk"
      ? 4.8 + (i % 5) * 0.08
      : condition === "Moderate"
        ? 5.45 + (i % 6) * 0.08
        : 6.05 + (i % 6) * 0.08
    const moisture = condition === "High Risk"
      ? 42 + (i % 4) * 3
      : condition === "Moderate"
        ? 58 + (i % 4) * 2
        : 66 + (i % 5) * 2
    const temperature = condition === "High Risk"
      ? 27 + (i % 3)
      : condition === "Moderate"
        ? 23 + (i % 4)
        : 22 + (i % 5)
    const hoursAgo = Math.floor(i / 6)
    const minutes = (i % 6) * 10
    const createdAt = new Date(Date.UTC(2026, 5, 21, 9 - hoursAgo, -minutes)).toISOString()

    assessments.push({
      assessmentId: `A${String(i + 1).padStart(3, "0")}`,
      farmId: farm.farmId,
      farmName: farm.name,
      crop: crops[i % crops.length],
      ph: Number(ph.toFixed(1)),
      moisture,
      temperature,
      soilCondition: condition,
      soilHealthScore: getSoilHealthScore(ph, moisture),
      createdAt,
    })
  }

  return assessments
}

function buildSensorReadings() {
  const readings = []

  farms.forEach((farm) => {
    for (let i = 0; i < 10; i += 1) {
      const minutesAgo = i * 30
      const timestamp = new Date(Date.UTC(2026, 5, 21, 9, 0, 0)).getTime() - minutesAgo * 60 * 1000
      const ph = Number((farm.ph + ((i % 3) - 1) * 0.08).toFixed(1))
      const moisture = Math.round(farm.moisture + ((i % 4) - 1.5) * 2)
      const temperature = Math.round(farm.temperature + ((i % 3) - 1) * 1.5)

      readings.push({
        readingId: `${farm.farmId}-R${String(i + 1).padStart(2, "0")}`,
        farmId: farm.farmId,
        ph,
        moisture,
        temperature,
        timestamp: new Date(timestamp).toISOString(),
      })
    }
  })

  return readings
}

async function createConstraint(tx, name, label, property) {
  await tx.run(`CREATE CONSTRAINT ${name} IF NOT EXISTS FOR (n:${label}) REQUIRE n.${property} IS UNIQUE`)
}

export async function seedDatabase() {
  const assessments = buildAssessments()
  const sensorReadings = buildSensorReadings()
  const session = driver.session()

  try {
    await session.executeWrite(async (tx) => {
      await createConstraint(tx, "farm_id", "Farm", "farmId")
      await createConstraint(tx, "assessment_id", "Assessment", "assessmentId")
      await createConstraint(tx, "sensor_reading_id", "SensorReading", "readingId")

      await tx.run(
        `
        UNWIND $farms AS row
        MERGE (f:Farm {farmId: row.farmId})
        SET f += row
        `,
        { farms },
      )

      await tx.run(
        `
        UNWIND $assessments AS row
        MATCH (f:Farm {farmId: row.farmId})
        MERGE (a:Assessment {assessmentId: row.assessmentId})
        SET a += row
        MERGE (f)-[:HAS_ASSESSMENT]->(a)
        `,
        { assessments },
      )

      await tx.run(
        `
        UNWIND $sensorReadings AS row
        MATCH (f:Farm {farmId: row.farmId})
        MERGE (r:SensorReading {readingId: row.readingId})
        SET r += row
        MERGE (f)-[:HAS_READING]->(r)
        `,
        { sensorReadings },
      )
    })
  } finally {
    await session.close()
  }
}

if (process.argv[1] && process.argv[1].endsWith("server/seed.js")) {
  seedDatabase()
    .then(() => console.log("Neo4j seed data created successfully"))
    .catch((error) => {
      console.error(error)
      process.exitCode = 1
    })
    .finally(() => closeDatabase())
}
