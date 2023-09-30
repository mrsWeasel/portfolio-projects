// MongoDB developer guide: Integrate MongoDB into Vercel Functions for the Serverless Experience
// https://www.mongodb.com/developer/languages/javascript/integrate-mongodb-vercel-functions-serverless-experience/

import { MongoClient, MongoClientOptions } from "mongodb"

const uri = process.env.MONGODB_URI || ""

// const options: MongoClientOptions = {
//   // useUnifiedTopology: true,
//   useNewUrlParser: true,
// }

const options = {}

let mongoClient: MongoClient | null = null
let database: any = null

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local")
}

if (!process.env.MONGODB_LEADERBOARD_DB) {
  throw new Error("Please add your database to .env.local")
}

export async function clientPromise() {
  try {
    if (mongoClient && database) {
      return { mongoClient, database }
    }
    if (process.env.NODE_ENV === "development") {
      if (!global._mongoClient) {
        mongoClient = await new MongoClient(uri, options).connect()
        console.log("Created new database connection")
        global._mongoClient = mongoClient
      } else {
        mongoClient = global._mongoClient
      }
    } else {
      mongoClient = await new MongoClient(uri, options).connect()
      console.log("Created new database connection")
    }
    database = await mongoClient?.db(process.env.MONGODB_LEADERBOARD_DB)
    return { mongoClient, database }
  } catch (e) {
    console.error(e)
  }
}
