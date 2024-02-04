import { useState, useEffect } from "react";
import { loginApi, registerApi } from "../services/api";
import { User } from "../types";

function useAuth() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (token && user) {
      setUser(user);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const { jwt, user } = await loginApi(username, password);
    localStorage.setItem("token", jwt);
    localStorage.setItem(
      "user",
      JSON.stringify({ username: user.username, id: user.id })
    );
    setUser(user);
    return user;
  };

  const register = async (username: string, password: string) => {
    const { jwt, user } = await registerApi(username, password);
    localStorage.setItem("token", jwt);
    localStorage.setItem(
      "user",
      JSON.stringify({ username: user.username, id: user.id })
    );
    setUser(user);
    return user;
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(undefined);
  };

  return { user, login, register, logOut };
}

export default useAuth;
