import { NextRequest } from "next/server";

export async function GET(){
    return NextRequest.json({message: "こんにちは"})
}