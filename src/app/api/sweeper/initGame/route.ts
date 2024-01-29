import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { obfuscateMines, randomizeMines } from "@/services/sweeperService"
import { ApiErrors } from "@/middleware"
import { InitiatedGame } from "@/typed/typed"

/* Initialize new game: generate id and fresh minegrid for user + save */
export async function POST() {
  try {
    const { MONGODB_MINESWEEPER_COLLECTION } = process.env || {}

    const { database } = (await clientPromise()) || {}

    const mines = randomizeMines(10)

    const result = await database.collection(MONGODB_MINESWEEPER_COLLECTION).insertOne({ mines })

    const game: InitiatedGame = {
      _id: result.insertedId,
      // obfuscate response a bit so user can't see directly from it where mines are at
      obfuscatedMines: obfuscateMines(mines),
    }

    return NextResponse.json({ ...game })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: ApiErrors.InternalError }, { status: 500 })
  }
}
