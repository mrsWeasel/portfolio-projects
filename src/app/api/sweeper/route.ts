import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function POST(request: Request) {
    const data = await request.json()
    console.log(data)

    try {
        const client = await clientPromise;
        const db = client.db("leaderboard-dev");

        const newGame = {
            startTime: new Date()
        }
        
        await db.collection("minesweeper").insertOne(newGame)
        return NextResponse.json({status: `started new game at ${newGame.startTime}`})

    } catch (e) {
        console.error(e);
    }
}