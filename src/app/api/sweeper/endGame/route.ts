import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { generateMineGrid, isGameWon } from "@/services/sweeperService"
import { ApiErrors } from "@/middleware"

export async function PUT(request: Request) {
  try {
    const data = await request.json()

    const { MONGODB_MINESWEEPER_COLLECTION } = process.env || {}

    const { id, visited } = data || {}

    if (!id) {
      return NextResponse.json({ message: ApiErrors.InvalidRequest }, { status: 400 })
    }

    const objectId = new ObjectId(id)

    const { database } = (await clientPromise()) || {}

    const game = await database.collection(MONGODB_MINESWEEPER_COLLECTION).findOne({ _id: objectId })
    if (!game || !game.startTime || game.endTime) {
      return NextResponse.json({ message: ApiErrors.InvalidRequest }, { status: 400 })
    }

    const mineGrid = generateMineGrid(game.mines, 10)

    if (!isGameWon(visited, mineGrid)) {
      return NextResponse.json({ message: "Game lost" }, { status: 200 })
    }

    const updatedGame = {
      time: Math.floor((new Date().getTime() - game.startTime.getTime()) / 1000),
    }

    await database.collection(MONGODB_MINESWEEPER_COLLECTION).updateOne({ _id: objectId }, { $set: { ...updatedGame } })
    return NextResponse.json({ message: `Game won, time: ${updatedGame.time} seconds` }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: ApiErrors.InternalError }, { status: 500 })
  }
}
