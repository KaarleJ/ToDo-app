import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./views/Error";
import Todos from "./views/Todos";
import Root from "./views/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "todos",
        element: <Todos />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
