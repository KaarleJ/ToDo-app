import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "@/components/Link";

export default function Landing() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <div>
      <h1 className="my-6">Write up tasks you want to be done</h1>
      <h3>ToDo-App on web</h3>
      <Button className="text-foreground my-6" asChild={isAuthenticated}>
        {isAuthenticated ? (
          <Link to="/todos">Get Started</Link>
        ) : (
          <a onClick={() => loginWithRedirect()}>Get Started</a>
        )}
      </Button>
    </div>
  );
}
