import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { ApiError } from "@/typed/typed"
import { getApiErrorResponse, validateScores } from "@/services/apiValidation"

export const revalidate = 0

export async function GET() {
  try {
    const { MONGODB_MINESWEEPER_COLLECTION: sweeperCollection } = process.env || {}

    const { database } = (await clientPromise()) || {}

    if (!database || !sweeperCollection) {
      console.error("Database details missing")
      return NextResponse.json({ message: ApiError.InternalError }, { status: 500 })
    }

    const results: unknown[] = []

    await database
      .collection(sweeperCollection)
      .find({ time: { $exists: true } })
      .project({ time: 1, startTime: 1 })
      .sort({ time: 1, startTime: 1 })
      .limit(10)
      .forEach((r) => {
        results.push({ _id: r._id.toString(), time: r.time, startTime: new Date(r.startTime) })
      })

    const scores = validateScores(results)

    return NextResponse.json([...scores])
  } catch (error) {
    const { message, status } = getApiErrorResponse(error)
    return NextResponse.json({ message }, { status })
  }
}
