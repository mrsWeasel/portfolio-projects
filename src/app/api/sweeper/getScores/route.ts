import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const { MONGODB_LEADERBOARD_DB, MONGODB_MINESWEEPER_COLLECTION } = process.env || {}

    if (!MONGODB_LEADERBOARD_DB || !MONGODB_MINESWEEPER_COLLECTION) {
      throw new Error("Database details missing")
    }

    const client = await clientPromise
    const db = client.db(MONGODB_LEADERBOARD_DB)

    const results: any[] = []

    await db
      .collection(MONGODB_MINESWEEPER_COLLECTION)
      .find({ time: { $exists: true } })
      .sort({ time: 1, startTime: 1 })
      .limit(10)
      .forEach((r) => {
        results.push(r)
      })

    return NextResponse.json(results)
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}
