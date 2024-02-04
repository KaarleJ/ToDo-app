import { useState, useEffect } from "react";
import { loginApi, registerApi } from "../services/api";
import { User } from "../types";

function useAuth() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (token && user) {
      setUser(user);
    }
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const { jwt, user } = await loginApi(username, password);
      localStorage.setItem("token", jwt);
      localStorage.setItem(
        "user",
        JSON.stringify({ username: user.username, id: user.id })
      );
      setUser(user);
      setLoading(false);
      return user;
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        alert(error.message);
        console.log(error.message);
      }
    }
  };

  const register = async (username: string, password: string) => {
    try {
      setLoading(true);
      const { jwt, user } = await registerApi(username, password);
      localStorage.setItem("token", jwt);
      localStorage.setItem(
        "user",
        JSON.stringify({ username: user.username, id: user.id })
      );
      setUser(user);
      setLoading(false);
      return user;
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        alert(error.message);
        console.log(error.message);
      }
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(undefined);
  };

  return { user, loading, login, register, logOut };
}

export default useAuth;
