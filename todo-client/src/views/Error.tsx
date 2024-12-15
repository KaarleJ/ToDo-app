import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.error(error);
  const { statusText, message } = error as {
    statusText?: string;
    message?: string;
  };
  return (
    <section className="text-center text-primary w-full h-screen flex flex-col items-center justify-center">
      <header className="mb-4">
        <h1 className="text-5xl font-bold">Oops!</h1>
        <h2 className="text-2xl mt-2">An unexpected error has occurred.</h2>
      </header>
      <p className="text-lg italic">
        {statusText || message || "Unknown error"}
      </p>
    </section>
  );
}
