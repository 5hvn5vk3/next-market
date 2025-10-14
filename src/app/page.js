import Image from "next/image";
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
        <div>
            {allItems.map((item) => (
                <div key={item.id}>
                    <Image
                        src={item.image}
                        width={750}
                        height={500}
                        alt="item-image"
                    />
                    <p>{item.price}</p>
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ReadAllItems;
