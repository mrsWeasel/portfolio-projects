import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { ApiErrors } from "@/middleware"
import { WonGame } from "@/typed/typed"

export const revalidate = 0

export async function GET() {
  try {
    const { MONGODB_MINESWEEPER_COLLECTION } = process.env || {}

    const { database } = (await clientPromise()) || {}

    const results: Omit<WonGame, "mines">[] = []

    await database
      .collection(MONGODB_MINESWEEPER_COLLECTION)
      .find({ time: { $exists: true } })
      .sort({ time: 1, startTime: 1 })
      .limit(10)
      .forEach((r: Omit<WonGame, "mines">) => {
        results.push({ _id: r._id, time: r.time, startTime: new Date(r.startTime) })
      })

    return NextResponse.json([...results])
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: ApiErrors.InternalError }, { status: 500 })
  }
}
