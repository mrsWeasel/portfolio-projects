import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export enum ApiErrors {
  InternalError = "INTERNAL_ERROR",
  InvalidRequest = "INVALID_REQUEST",
}

export default async function sweeperMiddleware(request: NextRequest) {
  // check that database details exist
  const { MONGODB_LEADERBOARD_DB, MONGODB_MINESWEEPER_COLLECTION } = process.env || {}
  if (!MONGODB_LEADERBOARD_DB || !MONGODB_MINESWEEPER_COLLECTION) {
    return NextResponse.json({ message: ApiErrors.InternalError }, { status: 500 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/sweeper/:path*"],
}
