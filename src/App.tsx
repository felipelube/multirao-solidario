import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageWithMap } from "./components/layouts/PageWithMap";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageWithMap />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
      },
    ],
  },
]);

export function App() {
  return (
    <div className="h-screen w-full flex flex-col relative">
      <RouterProvider router={router} />
    </div>
  );
}
