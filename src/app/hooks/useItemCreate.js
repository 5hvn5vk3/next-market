"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/utils/useAuth";

export const useItemCreate = () => {
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
            const response = await fetch(
                "http://localhost:3000/api/item/create",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify({
                        title: formData.title,
                        price: formData.price,
                        image: formData.image,
                        description: formData.description,
                        email: loginUserEmail,
                    }),
                }
            );
            const jsonData = await response.json();
            alert(jsonData.message);
            router.push("/");
        } catch (err) {
            alert("アイテム作成失敗");
        }
    };
    return {
        formData,
        loginUserEmail,
        handleChange,
        handleSubmit,
    };
};
