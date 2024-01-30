import { useState, useEffect } from "react";
import { User } from "../types";

function useAuth() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    // We comment this out for now
    // const token = localStorage.getItem("token");
    // const user = localStorage.getItem("user");
    const user = {
      username: 'Baldur',
      id: 1
    }
    const token = 'thisisaverysecrettokenlolxd'
    if (token) {
      setUser(user);
    } else {
      setUser(undefined);
    }
  }, []);

  return { user }
}

export default useAuth;
