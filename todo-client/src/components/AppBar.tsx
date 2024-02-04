import Modal from "./Modal";
import { useState } from "react";
import UserForm from "./UserForm";
import { User } from "../types";
import Loader from "./Loader";

interface AppBarProps {
  user?: User;
  login: (username: string, password: string) => Promise<User | undefined>;
  register: (username: string, password: string) => Promise<User | undefined>;
  logOut: () => void;
  loading: boolean;
}

const AppBar = ({ user, loading, login, register, logOut }: AppBarProps) => {
  const [action, setAction] = useState<"login" | "register" | "none">("none");

  let formTitle: string;
  if (action === "login") {
    formTitle = "Login";
  } else if (action === "register") {
    formTitle = "Register";
  } else {
    formTitle = "";
  }

  const handleAuth = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    if (action === "login") {
      await login(username, password);
      setAction("none");
    } else if (action === "register") {
      await register(username, password);
      setAction("none");
    }
  };

  return (
    <div className="relative bg-violet-950 w-screen text-center p-5 mb-20 shadow-2xl shadow-indigo-800">
      <h1 className="text-5xl font-bold text-white">ToDo-App</h1>
      {!user ? (
        <>
          <div className="flex flex-row justify-center sm:justify-between items-center sm:absolute sm:right-20 sm:bottom-7 mt-5">
            <button
              className="text-xl text-white mx-3 hover:text-cyan-600 transition-all"
              onClick={() => setAction("login")}
            >
              login
            </button>
            <button
              className="text-xl text-white mx-3 hover:text-cyan-600 transition-all"
              onClick={() => setAction("register")}
            >
              register
            </button>
          </div>
          <Modal
            className="!bg-purple-900 p-5"
            show={action === "login" || action === "register"}
            onClose={() => setAction("none")}
          >
            {loading ? (
              <Loader size="64" className="mx-20 my-24" />
            ) : (
              <UserForm
                className="p-5"
                title={formTitle}
                onSubmit={handleAuth}
              />
            )}
          </Modal>
        </>
      ) : (
        <button
          className="text-xl text-white mx-3 hover:text-cyan-600 transition-all"
          onClick={logOut}
        >
          logout
        </button>
      )}
    </div>
  );
};

export default AppBar;
