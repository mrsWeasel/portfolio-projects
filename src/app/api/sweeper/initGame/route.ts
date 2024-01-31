import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { obfuscateMines, randomizeMines } from "@/services/sweeperService"
import { ApiError, InitiatedGame } from "@/typed/typed"
import { validateDbInsertedOneResult } from "@/services/apiValidation"

/* Initialize new game: generate id and fresh minegrid for user + save */
export async function POST() {
  try {
    const { MONGODB_MINESWEEPER_COLLECTION: sweeperCollection } = process.env || {}

    const { database } = (await clientPromise()) || {}

    if (!database || !sweeperCollection) {
      throw new Error("database details missing")
    }

    const mines = randomizeMines(10)

    const result = await database.collection(sweeperCollection).insertOne({ mines })
    const validatedResult = validateDbInsertedOneResult(result)

    const game: InitiatedGame = {
      _id: validatedResult.insertedId.toString(),
      obfuscatedMines: obfuscateMines(mines),
    }

    return NextResponse.json({ ...game })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: ApiError.InternalError }, { status: 500 })
  }
}
