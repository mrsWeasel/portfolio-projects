import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export enum ApiErrors {
  InternalError = "INTERNAL_ERROR",
  InvalidRequest = "INVALID_REQUEST",
  GameNotFound = "GAME_NOT_FOUND",
  GameNotStarted = "GAME_NOT_STARTED",
  GameAlreadyEnded = "GAME_ALREADY_ENDED",
}

export default function dbMiddleware(_request: NextRequest) {
  const { MONGODB_LEADERBOARD_DB, MONGODB_MINESWEEPER_COLLECTION } = process.env || {}
  if (!MONGODB_LEADERBOARD_DB || !MONGODB_MINESWEEPER_COLLECTION) {
    return NextResponse.json({ message: ApiErrors.InternalError }, { status: 500 })
  }
  console.log("everything ok with db")
  return NextResponse.next() // Pass control to the next Middleware or route handler
}

export const config = {
  matcher: ["/api/sweeper/:path*"],
}
