import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";

export default function Landing() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <div>
      <h1 className="my-6">Write up tasks you want to be done</h1>
      <h3>ToDo-App on web</h3>
      <Button className="text-foreground my-6" asChild={isAuthenticated}>
        {isAuthenticated ? (
          <a href="/todos">Get Started</a>
        ) : (
          <a onClick={() => loginWithRedirect()}>Get Started</a>
        )}
      </Button>
    </div>
  );
}
