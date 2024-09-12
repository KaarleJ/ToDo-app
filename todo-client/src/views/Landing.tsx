import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "@/components/Link";

export default function Landing() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <div className="w-full relative">
      <h1 className="mt-28">Write up tasks you want to be done</h1>
      <h3 className="my-6">ToDo-App on web</h3>
      <p className="max-w-2xl my-4">
        Your ultimate solution for managing tasks
        efficiently and effectively. Juggle multiple projects
        or simply keep track of daily chores, ToDo-App provides a seamless
        and intuitive interface to help you stay organized. Get started now and
        experience the ease of managing your tasks with ToDo-App!
      </p>
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
