import Form from "./form";
import { getSingleItem } from "@/item/readsingle/[id]/page";

const DeleteItem = async (context) => {
    const params = await context.params;
    const singleItem = await getSingleItem(params.id);
    return (
        <div>
            <h1 className="page-title">アイテム削除</h1>
            <Form params={params} singleItem={singleItem} />
        </div>
    );
};

export default DeleteItem;
