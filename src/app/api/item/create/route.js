import { NextResponse } from "next/server";
import sql from "../../../utils/database";

export async function POST(request) {
    const reqBody = await request.json();

    try {
        await sql`
            INSERT INTO items (title, price, image, description, email)
            VALUES (
                ${reqBody.title},
                ${reqBody.price},
                ${reqBody.image},
                ${reqBody.description},
                ${reqBody.email}
            )
        `;
        return NextResponse.json({ message: "アイテム作成成功" });
    } catch (err) {
        return NextResponse.json({ message: `アイテム作成失敗：${err}` });
    }
}
