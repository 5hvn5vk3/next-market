"use client";
import { useItemCreate } from "@/hooks/useItemCreate";

const CreateItem = () => {
    const { formData, handleChange, handleSubmit } = useItemCreate();
    return (
        <div>
            <h1 className="page-title">アイテム作成</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value={formData.title}
                    onChange={handleChange}
                    type="text"
                    name="title"
                    placeholder="アイテム名"
                    required
                />
                <input
                    value={formData.price}
                    onChange={handleChange}
                    type="text"
                    name="price"
                    placeholder="価格"
                    required
                />
                <input
                    value={formData.image}
                    onChange={handleChange}
                    type="text"
                    name="image"
                    placeholder="画像"
                    required
                />
                <textarea
                    value={formData.description}
                    onChange={handleChange}
                    name="description"
                    rows={15}
                    placeholder="商品説明"
                    required
                ></textarea>
                <button>作成</button>
            </form>
        </div>
    );
};

export default CreateItem;
