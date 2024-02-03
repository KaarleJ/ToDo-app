import { useState, useEffect } from "react";
import { User } from "../types";
import axios from "axios";

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
  
    const { data } = await axios.post<{ user: User, jwt: string }>(
      "http://localhost:8080/api/auth/login",
      {
        username,
        password,
      }
    );

    const { jwt, user } = data;
    localStorage.setItem("token", jwt);
    setUser(user);
    return user;
  };

  const register = async (username: string, password: string) => {
    const { data } = await axios.post<{ user: User; jwt: string }>(
      "http://localhost:8080/api/auth/register",
      {
        username,
        password,
      }
    );

    const { jwt, user } = data;
    localStorage.setItem("token", jwt);
    setUser(user);
    return user;
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(undefined);
  }
    

  return { user, login, register, logOut };
}

export default useAuth;
