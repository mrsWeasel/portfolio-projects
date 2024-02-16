import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { ApiError, DeleteSettings } from "@/typed/typed"
import { getApiErrorResponse, validateDeleteSettingsUrlParam } from "@/services/apiValidation"

/* 
Method needs to be GET (and not DELETE) for now - Vercel does not support anything else for cron jobs.
This api route is for deleting scores - used by api tests and cron jobs only.

Url has query param 'delete' which defines how the delete operation functions. There are two options:
1. 'all' is used by api tests to clear database before each test.
2. 'onlyNotWon' is used by Vercels cron job - it cleans away lost and unfinished games to keep production db tidy.
*/
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)

    const param = url?.searchParams?.get("delete")
    const deleteSettings = validateDeleteSettingsUrlParam(param)

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
    const filter = deleteSettings === DeleteSettings.All ? {} : { time: { $exists: false } }

    const result = await database.collection(sweeperCollection).deleteMany(filter)

    return NextResponse.json(result)
  } catch (error) {
    const { message, status } = getApiErrorResponse(error)
    return NextResponse.json({ message }, { status })
  }
}
