"use client";

import { useEffect, useState } from "react";

const UserName = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const syncUserName = () => {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("name");

      if (token && name) {
        setUserName(name);
        return;
      }

      setUserName("");
    };

    syncUserName();

    window.addEventListener("auth-changed", syncUserName);
    window.addEventListener("storage", syncUserName);

    return () => {
      window.removeEventListener("auth-changed", syncUserName);
      window.removeEventListener("storage", syncUserName);
    };
  }, []);

  if (!userName) return <li className="user-name">ユーザー：ゲスト</li>;

  return <li className="user-name">ユーザー：{userName}さん</li>;
};

export default UserName;
