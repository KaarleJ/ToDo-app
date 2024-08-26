import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./views/Error";
import Landing from "./views/Landing";
import Todos from "./views/Todos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: "/todos",
    element: <Todos />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
