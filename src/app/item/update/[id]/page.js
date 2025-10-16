"use client";
import useAuth from "@/utils/useAuth";
import useItemUpdate from "@/app/hooks/useItemUpdate";

const UpdateItem = (context) => {
    const loginUserEmail = useAuth();
    const { item, handleChange, handleSubmit } = useItemUpdate(
        context.params.id,
        loginUserEmail
    );

    if (loginUserEmail === item.email) {
        return (
            <div>
                <h1 className="page-title">アイテム編集</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        value={item.title}
                        onChange={handleChange}
                        type="text"
                        name="title"
                        placeholder="アイテム名"
                        required
                    />
                    <input
                        value={item.price}
                        onChange={handleChange}
                        type="text"
                        name="price"
                        placeholder="価格"
                        required
                    />
                    <input
                        value={item.image}
                        onChange={handleChange}
                        type="text"
                        name="image"
                        placeholder="画像"
                        required
                    />
                    <textarea
                        value={item.description}
                        onChange={handleChange}
                        name="description"
                        rows={15}
                        placeholder="商品説明"
                        required
                    ></textarea>
                    <button>編集</button>
                </form>
            </div>
        );
    }
};

export default UpdateItem;
