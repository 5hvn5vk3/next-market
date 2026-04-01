"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerResponse = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/register`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        },
      );
      const jsonData = await registerResponse.json();
      alert(jsonData.message);
      try {
        const loginResponse = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/user/login`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          },
        );
        const loginJsonData = await loginResponse.json();
        localStorage.setItem("token", loginJsonData.token);
        alert(loginJsonData.message);
        router.push("/");
      } catch (err) {
        alert("ログイン失敗");
      }
    } catch (err) {
      alert("ユーザー登録失敗");
    }
  };

  return (
    <div>
      <h1 className="page-title">ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          placeholder="名前"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          placeholder="メールアドレス"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          name="password"
          placeholder="パスワード"
          required
        />
        <button>登録</button>
      </form>
    </div>
  );
};

export default Register;
