import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function generateFarmerAdvice(soilData, ruleBasedResults) {
  const prompt = `
You are SoilSense AI, an expert agronomist advising Kenyan smallholder farmers.
Speak warmly, in simple English, max 3 short paragraphs.

Soil readings:
- pH: ${soilData.ph}
- Moisture: ${soilData.moisture}%
- Temperature: ${soilData.temperature}°C
- Crop: ${soilData.crop}
- Location: ${soilData.location}
- Rain expected: ${soilData.rainExpected ? "Yes" : "No"}

Our analysis found:
- Soil health score: ${ruleBasedResults.healthScore}/100
- Risk level: ${ruleBasedResults.riskLevel}
- Top recommendation: ${ruleBasedResults.topRecommendation}

Write personalized advice: what to do TODAY, this WEEK, and a yield-boosting tip.
End with one encouraging sentence.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
