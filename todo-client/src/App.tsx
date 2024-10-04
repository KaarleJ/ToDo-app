import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./views/Error";
import Todos from "./views/Todos";
import Root from "./views/Root";
import { todosLoader } from "./loaders";
import { useMemo } from "react";

export default function App() {
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
            loader: todosLoader,
            errorElement: <Error />,
          },
        ],
      },
    ]);
  }, []);

  return <RouterProvider router={router} />;
}
