import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { ApiErrors } from "@/middleware"

type DeleteSettings = "all" | "onlyNotWon"

/* 
Method needs to be GET for now - Vercel does not support anything else for cron jobs
This api route is for deleting scores - used by api tests and cron jobs only 
*/
export async function GET(request: Request) {
  const url = new URL(request.url)

  const deleteSettings = url?.searchParams?.get("delete") as DeleteSettings

  try {
    if (process.env.NODE_ENV === "development") {
      request.headers.set("authorization", `Bearer ${process.env.CRON_SECRET}`)
    }

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

    const { database } = (await clientPromise()) || {}

    // delete either everything OR just the games that do not have field "time" (lost / unfinished ones)
    const filter = deleteSettings === "all" ? {} : { time: { $exists: false } }

    const result = await database.collection(process.env.MONGODB_MINESWEEPER_COLLECTION).deleteMany(filter)

    return NextResponse.json(result)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: ApiErrors.InternalError }, { status: 500 })
  }
}
