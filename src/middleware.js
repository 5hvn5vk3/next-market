import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request){
    // const token = await request.headers.get("Authorization")?.split(" ")[1]
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTc2MDE3MjA0NX0.p5Mj2-oqNv0mU79rsCoE91kFxvimyhifV5ycoX3AegY" // dummy@gmail.comのトークン
    if(!token){
        return NextResponse.json({message: "トークンがありません"})
    }
    try{
        const secretKey = new TextEncoder().encode("next-market-route-handlers")
        const decodedJwt = await jwtVerify(token, secretKey)
        console.log("decodedJwt:", decodedJwt)
        return NextResponse.next()
    }catch{
        return NextResponse.json({message: "トークンが正しくないので、ログインしてください"})
    }
}

export const config = {  matcher: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"],}

/*
{
  "message": "ログイン成功",
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTc2MDE3MjA0NX0.p5Mj2-oqNv0mU79rsCoE91kFxvimyhifV5ycoX3AegY"
}
*/