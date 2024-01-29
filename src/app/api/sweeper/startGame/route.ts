import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { ApiErrors } from "@/middleware"
import { StartedGame } from "@/typed/typed"

export async function PUT(request: Request) {
  const data = await request.json()

  try {
    const { MONGODB_MINESWEEPER_COLLECTION } = process.env || {}

    const { _id } = data || {}

    if (!_id) {
      return NextResponse.json({ message: ApiErrors.InvalidRequest }, { status: 400 })
    }

    const objectId = new ObjectId(_id)

    const { database } = (await clientPromise()) || {}

    const game = await database.collection(MONGODB_MINESWEEPER_COLLECTION).findOne({ _id: objectId })

    if (!game || game.startTime) {
      return NextResponse.json({ message: ApiErrors.InvalidRequest }, { status: 400 })
    }

    const updatedGame: Pick<StartedGame, "startTime"> = {
      startTime: new Date(),
    }

    await database
      .collection(MONGODB_MINESWEEPER_COLLECTION)
      .updateOne({ _id: objectId }, { $set: { startTime: updatedGame.startTime } })

    return NextResponse.json({ ...updatedGame })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: ApiErrors.InternalError }, { status: 500 })
  }
}
