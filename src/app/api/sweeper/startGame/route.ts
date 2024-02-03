import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { ApiError, StartedGame } from "@/typed/typed"
import { getApiErrorResponse, validateDbInitiatedGame } from "@/services/apiValidation"

export async function PUT(request: Request) {
  const data = await request.json()

  try {
    const { MONGODB_MINESWEEPER_COLLECTION: sweeperCollection } = process.env || {}

    const { _id } = data || {}

    if (!_id) {
      return NextResponse.json({ message: ApiError.InvalidRequest }, { status: 400 })
    }

    const { database } = (await clientPromise()) || {}

    if (!database || !sweeperCollection) {
      console.error("Database details missing")
      return NextResponse.json({ message: ApiError.InternalError }, { status: 500 })
    }

    const objectId = new ObjectId(_id)

    const result = await database.collection(sweeperCollection).findOne({ _id: objectId })
    validateDbInitiatedGame(result)

    const updatedGame: Pick<StartedGame, "startTime"> = {
      startTime: new Date(),
    }

    await database
      .collection(sweeperCollection)
      .updateOne({ _id: objectId }, { $set: { startTime: updatedGame.startTime } })

    return NextResponse.json({ ...updatedGame })
  } catch (error) {
    const { message, status } = getApiErrorResponse(error)
    return NextResponse.json({ message }, { status })
  }
}
