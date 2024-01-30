import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { generateMineGrid, isGameWon } from "@/services/sweeperService"
import { ApiError, WonGame } from "@/typed/typed"

export async function PUT(request: Request) {
  try {
    const data = await request.json()

    const { _id, visited } = data || {}

    if (!_id) {
      return NextResponse.json({ message: ApiError.InvalidRequest }, { status: 400 })
    }

    const objectId = new ObjectId(_id)

    const { MONGODB_MINESWEEPER_COLLECTION: sweeperCollection } = process.env || {}
    const { database } = (await clientPromise()) || {}

    if (!database || !sweeperCollection) {
      throw new Error("database details missing")
    }

    const game = (await database.collection(sweeperCollection).findOne({ _id: objectId })) as WonGame | null

    if (!game || !game.startTime || game.time) {
      return NextResponse.json({ message: ApiError.InvalidRequest }, { status: 400 })
    }

    const mineGrid = generateMineGrid(game.mines, 10)

    if (!isGameWon(visited, mineGrid)) {
      return NextResponse.json({ message: "Game lost" }, { status: 200 })
    }

    const updatedTime = Math.floor((new Date().getTime() - game.startTime.getTime()) / 1000)

    await database.collection(sweeperCollection).updateOne({ _id: objectId }, { $set: { time: updatedTime } })
    return NextResponse.json({ ...game, time: updatedTime })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: ApiError.InternalError }, { status: 500 })
  }
}
