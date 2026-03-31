import { NextResponse } from "next/server";
import sql from "../../../../utils/database";

export async function GET(request, context) {
    const params = await context.params;

    try {
        const data = await sql`
            SELECT *
            FROM items
            WHERE id = ${params.id}
            LIMIT 1
        `;

        if (!data.length) {
            throw new Error("item not found");
        }

        return NextResponse.json({
            message: "アイテム読み取り成功（シングル）",
            singleItem: data[0],
        });
    } catch (err) {
        return NextResponse.json({
            message: `アイテム読み取り失敗（シングル：${err}`,
        });
    }
}
