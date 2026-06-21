import neo4j from "neo4j-driver"
import { config } from "./config.js"

export const driver = neo4j.driver(
  config.neo4j.uri,
  neo4j.auth.basic(config.neo4j.user, config.neo4j.password),
  {
    maxConnectionPoolSize: 25,
    connectionTimeout: 15000,
  },
)

export async function read(cypher, params = {}) {
  const session = driver.session({ defaultAccessMode: neo4j.session.READ })

  try {
    return await session.executeRead((tx) => tx.run(cypher, params))
  } finally {
    await session.close()
  }
}

export async function write(cypher, params = {}) {
  const session = driver.session({ defaultAccessMode: neo4j.session.WRITE })

  try {
    return await session.executeWrite((tx) => tx.run(cypher, params))
  } finally {
    await session.close()
  }
}

export async function verifyDatabase() {
  const session = driver.session()

  try {
    await session.executeRead((tx) => tx.run("RETURN 1"))
  } finally {
    await session.close()
  }
}

export async function closeDatabase() {
  await driver.close()
}
