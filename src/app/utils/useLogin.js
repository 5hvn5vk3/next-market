"use client";

import { useRouter } from "next/navigation";

const useLogin = () => {
  const router = useRouter();

  const login = async (email, password) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const jsonData = await response.json();
      localStorage.setItem("token", jsonData.token);
      alert(jsonData.message);
      router.push("/");
      return jsonData;
    } catch (err) {
      alert("ログイン失敗");
      return null;
    }
  };

  return { login };
};

export default useLogin;
