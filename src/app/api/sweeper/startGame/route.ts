import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { ApiError, InitiatedGame, StartedGame } from "@/typed/typed"

export async function PUT(request: Request) {
  const data = await request.json()

  try {
    const { MONGODB_MINESWEEPER_COLLECTION: sweeperCollection } = process.env || {}

    const { _id } = data || {}

    if (!_id) {
      return NextResponse.json({ message: ApiError.InvalidRequest }, { status: 400 })
    }

    const objectId = new ObjectId(_id)

    const { database } = (await clientPromise()) || {}

    if (!database || !sweeperCollection) {
      throw new Error("database details missing")
    }

    // TODO: can't use type InitiatedGame here
    const game = await database.collection(sweeperCollection).findOne({ _id: objectId })

    if (!game || game.startTime) {
      return NextResponse.json({ message: ApiError.InvalidRequest }, { status: 400 })
    }

    const updatedGame: Pick<StartedGame, "startTime"> = {
      startTime: new Date(),
    }

    await database
      .collection(sweeperCollection)
      .updateOne({ _id: objectId }, { $set: { startTime: updatedGame.startTime } })

    return NextResponse.json({ ...updatedGame })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: ApiError.InternalError }, { status: 500 })
  }
}
