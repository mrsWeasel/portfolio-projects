import { NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"

/* Delete all scores */
export async function DELETE(request: Request) {
  try {
    // used for api tests only

    // TODO: get authorization header and use for cron jobs too
    // process.env.CRON_SECRET
    if (process.env.NODE_ENV !== "development") {
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
