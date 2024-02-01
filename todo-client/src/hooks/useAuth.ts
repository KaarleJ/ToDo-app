import { useState, useEffect } from "react";
import { User } from "../types";
import axios from "axios";

function useAuth() {
  const [user, setUser] = useState<User>();
  console.log(user);

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
    /*
    const { data } = await axios.post<{ user: User; token: string }>(
      "http://localhost:4000/login",
      {
        username,
        password,
      }
    );

    const { token, user } = data;
    localStorage.setItem("token", token);
    setUser(user);
    return user;
    */

    localStorage.setItem("token", "veryvalidtoken");
    setUser({
      username: "Baldur",
      id: 1,
    });
  };

  const register = async (username: string, password: string) => {
    /*
    const { data } = await axios.post<{ user: User; token: string }>(
      "http://localhost:4000/register",
      {
        username,
        password,
      }
    );

    const { token, user } = data;
    localStorage.setItem("token", token);
    setUser(user);
    return user;
    */
    localStorage.setItem("token", "veryvalidtoken");
    setUser({
      username: "Baldur",
      id: 1,
    });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(undefined);
  }
    

  return { user, login, register, logOut };
}

export default useAuth;
