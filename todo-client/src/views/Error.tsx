import { useRouteError } from 'react-router-dom';

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function Error() {
  const error = useRouteError();
  console.error(error);

  const typedError = error as RouteError;

  return (
    <div className="text-center text-primary w-full">
      <h1>Oops!</h1>
      <h2>An unexpected error has occurred.</h2>
      <p>
        <i>{typedError.statusText || typedError.message}</i>
      </p>
    </div>
  );
}
