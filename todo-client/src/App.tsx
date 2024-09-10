import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./views/Error";
import Todos from "./views/Todos";
import Root from "./views/Root";
import { todosLoader } from "./loaders";
import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";

export default function App() {
  const { getAccessTokenSilently } = useAuth0();

  const router = useMemo(() => {
    return createBrowserRouter([
      {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
          {
            path: "todos",
            element: <Todos />,
            loader: todosLoader({ getAccessTokenSilently }),
          },
        ],
      },
    ]);
  }, [getAccessTokenSilently]);

  return <RouterProvider router={router} />;
}
