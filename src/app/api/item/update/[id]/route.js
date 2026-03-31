import { NextResponse } from "next/server";
import sql from "../../../../utils/database";

export async function PUT(request, context) {
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
                UPDATE items
                SET
                    title = ${reqBody.title},
                    price = ${reqBody.price},
                    image = ${reqBody.image},
                    description = ${reqBody.description},
                    email = ${reqBody.email}
                WHERE id = ${params.id}
            `;
            return NextResponse.json({ message: "アイテム編集成功" });
        } else {
            return NextResponse.json({
                message: "他の人が作成したアイテムです",
            });
        }
    } catch (err) {
        return NextResponse.json({ message: `アイテム編集失敗：${err}` });
    }
}
