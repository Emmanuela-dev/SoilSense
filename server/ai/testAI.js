// SOILSENSE AI — Test File
// Run: node server/ai/testAI.

import { analyzeSoil } from "./aiEngine.js"

// Test with Nyamirama Farm data
const testData = {
  ph: 4.8,
  moisture: 25,
  temperature: 28,
  crop: "maize",
  location: "Kiambu Town, Kenya",
  rainExpected: true,
}

console.log("🌱 SoilSense AI Engine Test")
console.log("================================")
console.log("Input Data:", testData)
console.log("================================")

try {
  const result = await analyzeSoil(testData)

  console.log("\n✅ AI Analysis Complete!")
  console.log("\n📊 SOIL HEALTH SCORE:", result.soilHealth.score, "/100")
  console.log("🏷️  LABEL:", result.soilHealth.label)
  console.log("\n⚠️  OVERALL RISK:", result.risks.overall.level)
  console.log("💬 RISK MESSAGE:", result.risks.overall.message)
  console.log("\n💡 TOTAL RECOMMENDATIONS:", result.recommendations.total)
  console.log("🚨 CRITICAL:", result.recommendations.critical)
  console.log("🔴 HIGH:", result.recommendations.high)
  console.log("🟡 MEDIUM:", result.recommendations.medium)
  console.log("🟢 LOW:", result.recommendations.low)

  console.log("\n📋 TOP RECOMMENDATION:")
  console.log("  Title:", result.recommendations.items[0]?.title)
  console.log("  Priority:", result.recommendations.items[0]?.priority)
  console.log("  Description:", result.recommendations.items[0]?.description)

  console.log("\n🤖 AI CONFIDENCE:", result.explanations.confidence.score + "%")
  console.log("📝 CONFIDENCE NOTE:", result.explanations.confidence.note)

  console.log("\n📖 OVERALL EXPLANATION:")
  console.log(result.explanations.overall)

  console.log("\n⚡ Processing Time:", result.metadata.processingTimeMs + "ms")
  console.log("\n✅ All AI modules working correctly!")

} catch (error) {
  console.error("❌ AI Engine Error:", error.message)
}