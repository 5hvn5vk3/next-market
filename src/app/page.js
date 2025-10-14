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
                    <img src={item.image} />
                    <p>{item.price}</p>
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ReadAllItems;
