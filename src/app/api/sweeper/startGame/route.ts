import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PUT(request: Request) {
  const data = await request.json()

  try {
    const { MONGODB_MINESWEEPER_COLLECTION } = process.env || {}

    const { id } = data || {}
    if (!id) throw new Error("Player id missing from request")
    const objectId = new ObjectId(id)

    const { database } = (await clientPromise()) || {}

    const game = await database.collection(MONGODB_MINESWEEPER_COLLECTION).findOne({ _id: objectId })
    if (!game) {
      throw new Error("Game not found in database")
    }

    if (game.startTime) {
      throw new Error("Game already started")
    }

    const updatedGame = {
      startTime: new Date(),
    }

    await database.collection(MONGODB_MINESWEEPER_COLLECTION).updateOne({ _id: objectId }, { $set: { ...updatedGame } })
    return NextResponse.json({ status: `Started new game at ${updatedGame.startTime}` })
  } catch (error) {
    let errorMessage = "Error handling request"
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`
    }
    return NextResponse.json(errorMessage)
  }
}
