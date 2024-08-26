import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { User } from "@auth0/auth0-react";

export default function Navbar() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="w-screen md:px-24 md:py-6 fixed top-0 left-0">
      <nav className="py-2 px-4 md:px-36 bg-primary shadow-xl md:rounded-full text-lg text-primary-foreground flex flex-row justify-between items-center md:mr-4 z-50">
        <a href="/">Home</a>
        <a href="/todos">Todos</a>
        {isAuthenticated ? <AvatarMenu user={user} /> : <LoginButton />}
      </nav>
    </div>
  );
}

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
}

function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <Button
      variant={"ghost"}
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </Button>
  );
}

function AvatarMenu({ user }: { user: User | undefined}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-10 h-10 rounded-full">
        <img src={user?.picture} className="object-fill rounded-full"></img>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
