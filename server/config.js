import dotenv from "dotenv"

dotenv.config()

export const config = {
  port: Number(process.env.PORT || 5174),
  neo4j: {
    uri: process.env.NEO4J_URI || "neo4j://localhost:7687",
    user: process.env.NEO4J_USER || "neo4j",
    password: process.env.NEO4J_PASSWORD || "password",
  },
}
