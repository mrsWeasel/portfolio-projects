import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { obfuscateMines, randomizeMines } from "@/services/sweeperService"
import { ApiErrors } from "@/middleware"

/* Initialize new game: generate id and fresh minegrid for user + save */
export async function POST() {
  try {
    const { MONGODB_MINESWEEPER_COLLECTION } = process.env || {}

    const { database } = (await clientPromise()) || {}

    const mines = randomizeMines(10)

    const result = await database.collection(MONGODB_MINESWEEPER_COLLECTION).insertOne({ mines })

    // obscure response a bit so user can't see directly from it where mines are at
    const responseMines = obfuscateMines(mines)

    return NextResponse.json({ mines: responseMines, id: result.insertedId })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: ApiErrors.InternalError }, { status: 500 })
  }
}
