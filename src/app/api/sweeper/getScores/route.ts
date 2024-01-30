import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { ApiError } from "@/typed/typed"
import { getHighScores } from "@/services/apiValidation"

export const revalidate = 0

export async function GET() {
  try {
    const { MONGODB_MINESWEEPER_COLLECTION: sweeperCollection } = process.env || {}

    const { database } = (await clientPromise()) || {}

    if (!database || !sweeperCollection) {
      throw new Error("database details missing")
    }

    const results: unknown[] = []

    // TODO: mines could be removed even in db query!
    await database
      .collection(sweeperCollection)
      .find({ time: { $exists: true } })
      .sort({ time: 1, startTime: 1 })
      .limit(10)
      .forEach((r) => {
        results.push({ _id: r._id.toString(), time: r.time, startTime: new Date(r.startTime) })
      })

    const scores = getHighScores(results)

    return NextResponse.json([...scores])
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: ApiError.InternalError }, { status: 500 })
  }
}
