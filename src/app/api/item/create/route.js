import { NextResponse } from "next/server";
import supabase from "@/utils/database"

export async function POST(request){
    const reqBody = await request.json()
    try {
        const { error } = await supabase.from("items").insert(reqBody)
        console.log(error)
        if(error) throw new Error()
        return NextResponse.json({message: "アイテム作成成功"})
    } catch {
        return NextResponse.json({message: "アイテム作成失敗"})
    }
};