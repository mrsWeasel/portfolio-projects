import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { ApiError } from "@/typed/typed"
import { getApiErrorResponse } from "@/services/apiValidation"

type DeleteSettings = "all" | "onlyNotWon"

/* 
Method needs to be GET for now - Vercel does not support anything else for cron jobs
This api route is for deleting scores - used by api tests and cron jobs only 
*/
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)

    const deleteSettings = url?.searchParams?.get("delete") as DeleteSettings

    const authToken = request.headers.get("authorization")?.replace("Bearer ", "") || ""

    if (!authToken || authToken !== process.env.CRON_SECRET) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      )
    }

    const { MONGODB_MINESWEEPER_COLLECTION: sweeperCollection } = process.env
    const { database } = (await clientPromise()) || {}

    if (!database || !sweeperCollection) {
      console.error("Database details missing")
      return NextResponse.json({ message: ApiError.InternalError }, { status: 500 })
    }

    // delete either everything OR just the games that do not have field "time" (lost / unfinished ones)
    const filter = deleteSettings === "all" ? {} : { time: { $exists: false } }

    const result = await database.collection(sweeperCollection).deleteMany(filter)

    return NextResponse.json(result)
  } catch (error) {
    const { message, status } = getApiErrorResponse(error)
    return NextResponse.json({ message }, { status })
  }
}
