import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import logo from "/todo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { User } from "@auth0/auth0-react";
import Link from "./Link";

export default function Navbar() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="w-screen md:px-24 md:py-6 fixed top-0 left-0">
      <nav className="py-2 px-4 md:px-36 bg-primary shadow-xl md:rounded-full text-xl text-center text-foreground flex flex-row justify-between items-center md:mr-4 z-50">
        <Link to="/" className="w-20">
          <img src={logo} alt="logo" className="w-10 h-10 object-cover" />
        </Link>
        <Link to="/todos" className="w-20">
          Todos
        </Link>
        {isAuthenticated ? <AvatarMenu user={user} /> : <LoginButton />}
      </nav>
    </div>
  );
}

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => loginWithRedirect()}
      className="text-xl text-foreground hover:underline w-20"
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
      className=""
    >
      Log Out
    </Button>
  );
}

function AvatarMenu({ user }: { user: User | undefined }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-20">
        <img src={user?.picture} className="object-fill w-10 h-10 rounded-full"></img>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
