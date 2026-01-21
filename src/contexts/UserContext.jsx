/** @format */

import { createContext, useContext, useEffect, useState } from "react";
import { getUserInfo } from "../api/getUserApi";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let alive = true;

    const init = async () => {
      const info = await getUserInfo();
      if (!alive) return;
      setUser(info);
    };

    init();

    return () => {
      alive = false;
    };
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("UserProvider로 감싸지지 않았습니다.");
  return ctx;
}
