import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"

type DeleteSettings = "all" | "onlyNotWon"

/* Delete all scores - used for api tests and cron job only */
export async function DELETE(request: Request) {
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
  }
}
