"use client";
import { useState } from "react";
const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const jsonData = await response.json();
            localStorage.setItem("token", jsonData.token);
            alert(jsonData.message);
        } catch {
            alert("ログイン失敗");
        }
    };
    return (
        <div>
            <h1 className="page-title">ログイン</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value={user.email}
                    onChange={handleChange}
                    type="text"
                    name="email"
                    placeholder="メールアドレス"
                />
                <input
                    value={user.password}
                    onChange={handleChange}
                    type="text"
                    name="password"
                    placeholder="パスワード"
                />
                <button>ログイン</button>
            </form>
        </div>
    );
};

export default Login;
