import Image from "next/image";
import Link from "next/link";
export const dynamic = "force-dynamic";
const getAllItems = async () => {
    const response = await fetch("http://localhost:3000/api/item/readall");
    const jsonData = await response.json();
    const allItems = jsonData.allItems;
    return allItems;
};
const ReadAllItems = async () => {
    const allItems = await getAllItems();
    return (
        <div className="grid-container-in">
            {allItems.map((item) => (
                <Link href={`/item/readsingle/${item.id}`} key={item.id}>
                    <Image
                        src={item.image}
                        width={750}
                        height={500}
                        alt="item-image"
                    />
                    <p>{item.price}</p>
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                </Link>
            ))}
        </div>
    );
};

export default ReadAllItems;
