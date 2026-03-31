import { NextResponse } from "next/server";
import sql from "../../../utils/database";

export async function POST(request) {
    const reqBody = await request.json();

    try {
        await sql`
            INSERT INTO users (name, email, password)
            VALUES (${reqBody.name}, ${reqBody.email}, ${reqBody.password})
        `;
        return NextResponse.json({ message: "ユーザー登録成功" });
    } catch (err) {
        return NextResponse.json({ message: `ユーザー登録失敗：${err}` });
    }
}
