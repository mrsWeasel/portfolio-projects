import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { generateMineGrid, isGameWon } from "@/services/sweeperService"

export async function PUT(request: Request) {
  const data = await request.json()

  try {
    const { MONGODB_MINESWEEPER_COLLECTION } = process.env || {}

    const { id, visited } = data || {}
    if (!id) throw new Error("Data missing from request")

    const objectId = new ObjectId(id)

    const { database } = (await clientPromise()) || {}

    const game = await database.collection(MONGODB_MINESWEEPER_COLLECTION).findOne({ _id: objectId })
    if (!game) {
      throw new Error("Game not found in database")
    }

    if (!game.startTime) {
      throw new Error("Game not started yet")
    }

    if (game.endTime) {
      throw new Error("Game already ended")
    }

    const mineGrid = generateMineGrid(game.mines, 10)

    if (!isGameWon(visited, mineGrid)) {
      return NextResponse.json({ status: "Game lost" })
    }

    const updatedGame = {
      time: Math.floor((new Date().getTime() - game.startTime.getTime()) / 1000),
    }

    await database.collection(MONGODB_MINESWEEPER_COLLECTION).updateOne({ _id: objectId }, { $set: { ...updatedGame } })
    return NextResponse.json({ status: `Game won, time: ${updatedGame.time} seconds` })
  } catch (error) {
    let errorMessage = "Error handling request"
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`
    }
    return NextResponse.json(errorMessage)
  }
}
