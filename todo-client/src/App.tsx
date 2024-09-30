import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./views/Error";
import Todos from "./views/Todos";
import Root from "./views/Root";
import { todosLoader } from "./loaders";
import { useMemo } from "react";
import Auth0ProviderWithNavigate from "./components/Auth0ProviderWithNavigate";

export default function App() {

  const router = useMemo(() => {
    return createBrowserRouter([
      {
        path: "/",
        element: (
          <Auth0ProviderWithNavigate>
            <Root />
          </Auth0ProviderWithNavigate>
        ),
        errorElement: <Error />,
        children: [
          {
            path: "todos",
            element: <Todos />,
            loader: todosLoader,
            errorElement: <Error />,
          },
        ],
      },
    ]);
  }, []);

  return <RouterProvider router={router} />;
}
