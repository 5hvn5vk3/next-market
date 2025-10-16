"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const useItemUpdate = (itemId, loginUserEmail) => {
    const [item, setItem] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
        email: "",
    });
    const router = useRouter();

    useEffect(() => {
        const getSingleItem = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/item/readsingle/${itemId}`
                );
                const jsonData = await response.json();
                const singleItem = jsonData.singleItem;
                setItem({
                    title: singleItem.title,
                    price: singleItem.price,
                    image: singleItem.image,
                    description: singleItem.description,
                    email: singleItem.email,
                });
            } catch (err) {
                alert("アイテム取得失敗");
            }
        };
        if (itemId) {
            getSingleItem();
        }
    }, [itemId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:3000/api/item/update/${itemId}`,
                {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify({
                        title: item.title,
                        price: item.price,
                        image: item.image,
                        description: item.description,
                        email: loginUserEmail,
                    }),
                }
            );
            const jsonData = await response.json();
            alert(jsonData.message);
            router.push("/");
        } catch (err) {
            alert("アイテム編集失敗");
        }
    };

    return {
        item,
        handleChange,
        handleSubmit,
    };
};

export default useItemUpdate;
