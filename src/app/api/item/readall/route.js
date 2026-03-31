import { NextResponse } from "next/server";
import sql from "../../../utils/database";

export async function GET() {
    try {
        const data = await sql`
            SELECT *
            FROM items
            ORDER BY created_at ASC
        `;
        return NextResponse.json({
            message: "アイテム読み取り成功（オール）",
            allItems: data,
        });
    } catch (err) {
        return NextResponse.json({
            message: `アイテム読み取り失敗（オール）：${err}`,
        });
    }
}

export const revalidate = 0;
