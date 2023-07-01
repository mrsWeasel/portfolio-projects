import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
    const data = await request.json()
    console.log(data)

    try {
        const {MONGODB_LEADERBOARD_DB, MONGODB_MINESWEEPER_COLLECTION} = process.env || {}

        if (!MONGODB_LEADERBOARD_DB || !MONGODB_MINESWEEPER_COLLECTION) {
            throw new Error ('Database details missing')
        }

        const client = await clientPromise;
        const db = client.db(MONGODB_LEADERBOARD_DB);

        const newGame = {
            startTime: new Date()
        }
        
        await db.collection(MONGODB_MINESWEEPER_COLLECTION).insertOne(newGame)
        return NextResponse.json({status: `started new game at ${newGame.startTime}`})

    } catch (e) {
        console.error(e);
    }
}