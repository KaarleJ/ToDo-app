import { useState, useEffect } from "react";
import { loginApi, registerApi } from "../services/api";
import { User } from "../types";

function useAuth() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = {
      username: "Baldur",
      id: 1,
    };
    if (token) {
      setUser(user);
    } else {
      setUser(undefined);
    }
  }, []);

  const login = async (username: string, password: string) => {

    const { jwt, user } = await loginApi(username, password);
    localStorage.setItem("token", jwt);
    setUser(user);
    return user;
  };

  const register = async (username: string, password: string) => {
    const { jwt, user } = await registerApi(username, password);
    localStorage.setItem("token", jwt);
    setUser(user);
    return user;
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(undefined);
  };

  return { user, login, register, logOut };
}

export default useAuth;
