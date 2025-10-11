import { NextResponse } from "next/server"
import { SignJWT } from "jose"
import supabase from "../../../utils/database"
export async function POST(request){
    const reqBody = await request.json()
    try{
        const { data, error } = await supabase.from("users").select().eq("email", reqBody.email).single()
        console.log(data)
        if(!error){
            // ユーザーデータが存在する場合の処理
            if(data.password === reqBody.password){
                // パスワードが正しい場合の処理
                const secretKey = new TextEncoder().encode("next-market-route-handlers")
                const payload = {
                    email: reqBody.email
                }
                const token = await new SignJWT(payload)
                    .setProtectedHeader({ alg: "HS256" })
                    .setExpirationTime("1d")
                    .sign(secretKey)
                console.log(token) // 本当にトークンが発行されるのかの確認
                return NextResponse.json({message: "ログイン成功", token})
            }else{
                // パスワードが間違っている場合の処理
                return NextResponse.json({message: "ログイン失敗：パスワードが間違っています"})
            }
        }else{
            // ユーザーデータが存在しない場合の処理
            return NextResponse.json({message: "ログイン失敗：ユーザー登録をしてください"})
        }
    }catch{
        return NextResponse.json({message: "ログイン失敗"}) 
    }
}