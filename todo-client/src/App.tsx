import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./views/Error";
import Todos from "./views/Todos";
import Root from "./views/Root";
import { todosLoader } from "./loaders";
import { useMemo } from "react";
import { useAxiosInterceptor } from "./lib/apiClient";
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  const { getAccessTokenSilently } = useAuth0();
  useAxiosInterceptor();
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
            loader: function({ request }) {
              return todosLoader(request, getAccessTokenSilently);
            },
            errorElement: <Error />,
          },
        ],
      },
    ]);
  }, [getAccessTokenSilently]);

  return <RouterProvider router={router} />;
}
