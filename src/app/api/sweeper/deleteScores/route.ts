import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"

/* Delete all scores - used for api tests and cron job only */
export async function DELETE(request: Request) {
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

    const result = await database.collection(process.env.MONGODB_MINESWEEPER_COLLECTION).deleteMany({})

    return NextResponse.json(result)
  } catch (e) {
    console.error(e)
  }
}
