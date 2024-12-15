import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import logo from "/todo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "./Link";
import { ModeToggle } from "./ui/mode-toggle";

export default function Navbar() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };
  return (
    <div className="w-screen md:px-24 md:py-6 fixed top-0 left-0 z-10">
      <nav className="py-2 px-4 md:px-36 bg-primary shadow-xl md:rounded-full text-xl text-center flex flex-row justify-between items-center md:mr-4">
        <div className="w-24">
          <Link to="/" className="">
            <img src={logo} alt="logo" className="w-10 h-10" />
          </Link>
        </div>

        <Link to="/todos" className="w-24 text-primary-foreground">
          Todos
        </Link>
        <div className="flex items-center justify-between w-24">
          <ModeToggle />
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img
                  src={user?.picture}
                  className="object-fill w-10 h-10 rounded-full"
                  alt="User Avatar"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="hover:cursor-pointer"
                >
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => loginWithRedirect()}
              className="text-xl hover:underline w-10"
            >
              Log In
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}
