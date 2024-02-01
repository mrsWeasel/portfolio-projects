// MongoDB developer guide: Integrate MongoDB into Vercel Functions for the Serverless Experience
// https://www.mongodb.com/developer/languages/javascript/integrate-mongodb-vercel-functions-serverless-experience/

import { Db, MongoClient } from "mongodb"

let mongoClient: MongoClient | null = null
let database: Db | null = null

export async function clientPromise() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("Please add your Mongo URI to .env.local")
    }

    if (!process.env.MONGODB_LEADERBOARD_DB) {
      throw new Error("Please add your database to .env.local")
    }

    if (!process.env.MONGODB_MINESWEEPER_COLLECTION) {
      throw new Error("Please add your collection to .env.local")
    }

    const uri = process.env.MONGODB_URI

    if (mongoClient && database) {
      return { mongoClient, database }
    }

    if (process.env.NODE_ENV === "development") {
      if (!global._mongoClient) {
        mongoClient = await new MongoClient(uri, {}).connect()
        console.log("Created new database connection")
        global._mongoClient = mongoClient
      } else {
        mongoClient = global._mongoClient
      }
    } else {
      mongoClient = await new MongoClient(uri, {}).connect()
      console.log("Created new database connection")
    }
    database = await mongoClient?.db(process.env.MONGODB_LEADERBOARD_DB)

    // Add indexing to 'time' field
    // if field already exists, this is a no-op so should not hurt to do it every time when initializing
    const sweeperCollection = database.collection(process.env.MONGODB_MINESWEEPER_COLLECTION)
    sweeperCollection.createIndex({ time: 1 }, { sparse: true })

    return { mongoClient, database }
  } catch (e) {
    console.error(e)
  }
}
