import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { generateMineGrid, isGameWon } from "@/services/sweeperService"
import { ApiErrors } from "@/middleware"
import { WonGame } from "@/typed/typed"

export async function PUT(request: Request) {
  try {
    const data = await request.json()

    const { MONGODB_MINESWEEPER_COLLECTION } = process.env || {}

    const { _id, visited } = data || {}

    if (!_id) {
      return NextResponse.json({ message: ApiErrors.InvalidRequest }, { status: 400 })
    }

    const objectId = new ObjectId(_id)

    const { database } = (await clientPromise()) || {}

    const game: WonGame = await database.collection(MONGODB_MINESWEEPER_COLLECTION).findOne({ _id: objectId })
    if (!game || !game.startTime || game.time) {
      return NextResponse.json({ message: ApiErrors.InvalidRequest }, { status: 400 })
    }

    const mineGrid = generateMineGrid(game.mines, 10)

    if (!isGameWon(visited, mineGrid)) {
      return NextResponse.json({ message: "Game lost" }, { status: 200 })
    }

    const updatedTime = Math.floor((new Date().getTime() - game.startTime.getTime()) / 1000)

    await database
      .collection(MONGODB_MINESWEEPER_COLLECTION)
      .updateOne({ _id: objectId }, { $set: { time: updatedTime } })
    return NextResponse.json({ ...game, time: updatedTime })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: ApiErrors.InternalError }, { status: 500 })
  }
}
