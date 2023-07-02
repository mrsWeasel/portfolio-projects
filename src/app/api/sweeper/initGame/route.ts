import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { generateMineGrid, randomizeMines } from "@/services/sweeperService"

/* Initialize new game: generate id and fresh minegrid for user + save */
export async function POST() {
  try {
    const { MONGODB_LEADERBOARD_DB, MONGODB_MINESWEEPER_COLLECTION } = process.env || {}

    if (!MONGODB_LEADERBOARD_DB || !MONGODB_MINESWEEPER_COLLECTION) {
      throw new Error("Database details missing")
    }

    const client = await clientPromise
    const db = client.db(MONGODB_LEADERBOARD_DB)

    const newGame = {
      mines: randomizeMines(10),
    }

    const result = await db.collection(MONGODB_MINESWEEPER_COLLECTION).insertOne(newGame)
    // TODO: maybe obscure response a bit so user can't see directly from it where mines are at
    return NextResponse.json({ mines: newGame.mines, id: result.insertedId })
  } catch (e) {
    console.error(e)
  }
}
