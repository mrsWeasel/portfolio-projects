import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { ApiErrors } from "@/middleware"

export async function PUT(request: Request) {
  const data = await request.json()

  try {
    const { MONGODB_MINESWEEPER_COLLECTION } = process.env || {}

    const { id } = data || {}

    if (!id) {
      return NextResponse.json({ message: ApiErrors.InvalidRequest }, { status: 400 })
    }

    const objectId = new ObjectId(id)

    const { database } = (await clientPromise()) || {}

    const game = await database.collection(MONGODB_MINESWEEPER_COLLECTION).findOne({ _id: objectId })

    if (!game || game.startTime) {
      return NextResponse.json({ message: ApiErrors.InvalidRequest }, { status: 400 })
    }

    const updatedGame = {
      startTime: new Date(),
    }

    await database.collection(MONGODB_MINESWEEPER_COLLECTION).updateOne({ _id: objectId }, { $set: { ...updatedGame } })
    return NextResponse.json({ message: `Started new game at ${updatedGame.startTime}` }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: ApiErrors.InternalError }, { status: 500 })
  }
}
