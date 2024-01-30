import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { ApiError, WonGame } from "@/typed/typed"

export const revalidate = 0

export async function GET() {
  try {
    const { MONGODB_MINESWEEPER_COLLECTION: sweeperCollection } = process.env || {}

    const { database } = (await clientPromise()) || {}

    if (!database || !sweeperCollection) {
      throw new Error("database details missing")
    }

    const results: Omit<WonGame, "mines">[] = []

    await database
      .collection(sweeperCollection)
      .find({ time: { $exists: true } })
      .sort({ time: 1, startTime: 1 })
      .limit(10)
      .forEach((r) => {
        results.push({ _id: r._id.toString(), time: r.time, startTime: new Date(r.startTime) } as Omit<
          WonGame,
          "mines"
        >)
      })

    return NextResponse.json([...results])
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: ApiError.InternalError }, { status: 500 })
  }
}
