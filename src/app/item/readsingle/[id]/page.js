import Image from "next/image";
import Link from "next/link";
export const getSingleItem = async (id) => {
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/item/readsingle/${id}`);
    const jsonData = await response.json();
    const singleItem = jsonData.singleItem;
    return singleItem;
};
const ReadSingleItem = async (context) => {
    const params = await context.params;
    const singleItem = await getSingleItem(params.id);
    return (
        <div>
            <Image
                src={singleItem.image}
                width={750}
                height={500}
                alt="item-image"
                priority
            />
            <p>{singleItem.price}</p>
            <p>{singleItem.title}</p>
            <p>{singleItem.description}</p>
            <div>
                <Link href={`/item/update/${singleItem.id}`}>アイテム編集</Link>
                <Link href={`/item/delete/${singleItem.id}`}>アイテム削除</Link>
            </div>
        </div>
    );
};

export default ReadSingleItem;
