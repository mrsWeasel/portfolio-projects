import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { generateMineGrid, isGameWon } from "@/services/sweeperService"
import { ApiError, GameStatus } from "@/typed/typed"
import { getApiErrorResponse, validateDbStartedGame } from "@/services/apiValidation"

export async function PUT(request: Request) {
  try {
    const data = await request.json()

    const { _id, visited } = data || {}

    if (!_id) {
      console.error("Field _id missing from request")
      return NextResponse.json({ message: ApiError.InvalidRequest }, { status: 400 })
    }

    const objectId = new ObjectId(_id)

    const { MONGODB_MINESWEEPER_COLLECTION: sweeperCollection } = process.env || {}
    const { database } = (await clientPromise()) || {}

    if (!database || !sweeperCollection) {
      console.error("Database details missing")
      return NextResponse.json({ message: ApiError.InternalError }, { status: 500 })
    }

    // fetch game from db and validate
    const result = (await database.collection(sweeperCollection).findOne({ _id: objectId })) as unknown
    const game = validateDbStartedGame(result)

    const mineGrid = generateMineGrid(game.mines, 10)

    if (!isGameWon(visited, mineGrid)) {
      return NextResponse.json({ _id, result: GameStatus.LOST })
    }

    const updatedTime = Math.floor((new Date().getTime() - game.startTime.getTime()) / 1000)

    await database.collection(sweeperCollection).updateOne({ _id: objectId }, { $set: { time: updatedTime } })
    return NextResponse.json({ _id, time: updatedTime, result: GameStatus.WON })
  } catch (error) {
    const { message, status } = getApiErrorResponse(error)
    return NextResponse.json({ message }, { status })
  }
}
