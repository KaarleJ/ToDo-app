import { useAuth0 } from "@auth0/auth0-react";
import logo from "/todo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
  ModeToggle,
} from "kaarlejshadcn";
import type { User } from "@auth0/auth0-react";
import Link from "./Link";

export default function Navbar() {
  const { user, isAuthenticated } = useAuth0();

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
          {isAuthenticated ? <AvatarMenu user={user} /> : <LoginButton />}
        </div>
      </nav>
    </div>
  );
}

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => loginWithRedirect()}
      className="text-xl hover:underline w-10"
    >
      Log In
    </Button>
  );
}

function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <Button
      variant={"ghost"}
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      className="px-1 py-1"
    >
      Log Out
    </Button>
  );
}

function AvatarMenu({ user }: { user: User | undefined }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          src={user?.picture}
          className="object-fill w-10 h-10 rounded-full"
        ></img>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
