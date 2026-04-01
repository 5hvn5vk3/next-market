import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import sql from "../../../utils/database";

export async function POST(request) {
  const reqBody = await request.json();

  try {
    const data = await sql`
            SELECT *
            FROM users
            WHERE email = ${reqBody.email}
            LIMIT 1
        `;

    if (data.length) {
      // ユーザーデータが存在する場合の処理

      if (reqBody.password === data[0].password) {
        // パスワードが正しい場合の処理

        const secretKey = new TextEncoder().encode(
          "next-market-route-handlers",
        );

        const payload = {
          email: reqBody.email,
        };

        const token = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("1d")
          .sign(secretKey);

        return NextResponse.json({
          message: "ログイン成功",
          token: token,
          name: data[0].name,
        });
      } else {
        // パスワードが間違っている場合の処理
        return NextResponse.json({
          message: "ログイン失敗：パスワードが間違っています",
        });
      }
    } else {
      // ユーザーデータが存在しない場合の処理
      return NextResponse.json({
        message: "ログイン失敗：ユーザー登録をしてください",
      });
    }
  } catch {
    return NextResponse.json({ message: "ログイン失敗" });
  }
}
