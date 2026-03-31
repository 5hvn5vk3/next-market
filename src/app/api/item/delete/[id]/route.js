import { NextResponse } from "next/server";
import sql from "../../../../utils/database";

export async function DELETE(request, context) {
    const reqBody = await request.json();
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

        if (data[0].email === reqBody.email) {
            await sql`
                DELETE FROM items
                WHERE id = ${params.id}
            `;
            return NextResponse.json({ message: "アイテム削除成功" });
        } else {
            return NextResponse.json({
                message: "他の人が作成したアイテムです",
            });
        }
    } catch (err) {
        return NextResponse.json({ message: `アイテム削除失敗：${err}` });
    }
}
