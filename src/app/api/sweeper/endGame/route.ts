import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PUT(request: Request) {
  const data = await request.json()

  try {
    const { MONGODB_LEADERBOARD_DB, MONGODB_MINESWEEPER_COLLECTION } = process.env || {}
    if (!MONGODB_LEADERBOARD_DB || !MONGODB_MINESWEEPER_COLLECTION) {
      throw new Error("Database details missing")
    }

    const { id } = data || {}
    if (!id) throw new Error("Player id missing from request")
    const objectId = new ObjectId(id)

    const client = await clientPromise
    const db = client.db(MONGODB_LEADERBOARD_DB)

    const game = await db.collection(MONGODB_MINESWEEPER_COLLECTION).findOne({ _id: objectId })
    if (!game) {
      throw new Error("Game not found in database")
    }

    if (game.endTime) {
      throw new Error("Game already ended")
    }

    const updatedGame = {
      endTime: new Date(),
    }

    await db.collection(MONGODB_MINESWEEPER_COLLECTION).updateOne({ _id: objectId }, { $set: { ...updatedGame } })
    return NextResponse.json({ status: `Game ended at ${updatedGame.endTime}` })
  } catch (error) {
    let errorMessage = "Error handling request"
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`
    }
    return NextResponse.json(errorMessage)
  }
}
