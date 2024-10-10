import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./views/Error";
import Todos from "./views/Todos";
import Root from "./views/Root";
import { todosLoader } from "./loaders";
import { useMemo } from "react";
import { useAxiosInterceptor } from "./lib/apiClient";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticationGuard } from "./components/AuthenticationGuard";

export default function App() {
  const { isAuthenticated } = useAuth0();
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
            element: <AuthenticationGuard component={Todos}/>,
            loader: function({ request }) {
              return todosLoader(request, isAuthenticated);
            },
            errorElement: <Error />,
          },
        ],
      },
    ]);
  }, [isAuthenticated]);

  return <RouterProvider router={router} />;
}
