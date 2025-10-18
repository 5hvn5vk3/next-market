"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/utils/useAuth";

const CreateItem = () => {
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
    });

    const router = useRouter();
    const loginUserEmail = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/item/create", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    title: formData.title,
                    price: formData.price,
                    image: formData.image,
                    description: formData.description,
                    email: loginUserEmail,
                }),
            });
            const jsonData = await response.json();
            alert(jsonData.message);
            router.push("/");
        } catch (err) {
            alert("アイテム作成失敗");
        }
    };
    if (loginUserEmail) {
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
    }
};

export default CreateItem;
