import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"

export const revalidate = 0

export async function GET() {
  try {
    const { MONGODB_MINESWEEPER_COLLECTION } = process.env || {}

    const { database } = (await clientPromise()) || {}

    const results: any[] = []

    await database
      .collection(MONGODB_MINESWEEPER_COLLECTION)
      .find({ time: { $exists: true } })
      .sort({ time: 1, startTime: 1 })
      .limit(10)
      .forEach((r: any) => {
        results.push(r)
      })

    return NextResponse.json(results)
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}
