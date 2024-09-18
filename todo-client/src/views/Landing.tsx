import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "@/components/Link";

export default function Landing() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <div className="h-full flex my-20 mx-4 md:mx-0">
      <div className="w-full">
        <h1>Write up tasks you want done</h1>
        <h3 className="mb-6 text-muted-foreground">ToDo-App on web</h3>
        <p className="max-w-2xl overflow-hidden text-lg my-12">
          Your ultimate solution for managing tasks efficiently and effectively.
          Juggle multiple projects or simply keep track of daily chores. Get
          started now and experience the ease of managing your tasks with
          ToDo-App!
        </p>
        <Button
          className="my-4 text-xl"
          size="lg"
          asChild={isAuthenticated}
        >
          {isAuthenticated ? (
            <Link to="/todos">Get Started</Link>
          ) : (
            <a onClick={() => loginWithRedirect()}>Get Started</a>
          )}
        </Button>
      </div>
      <div className="w-full relative hidden md:flex">
        <img
          src="https://images.unsplash.com/photo-1661534855533-63d347a52303?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="organised desk"
          className="w-full h-full object-cover object-right shadow-2xl shadow-primary dark:shadow-secondary-foreground rounded-sm"
        />
      </div>
    </div>
  );
}
