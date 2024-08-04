import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageWithMap } from "./components/layouts/PageWithMap";
import { HomePage } from "./components/pages/Homepage";
import * as SignUpPage from "./components/pages/SignUp";
import * as SignInPage from "./components/pages/SignIn";

import { ROUTES } from "./config/routes";

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <PageWithMap />,
    children: [
      {
        path: ROUTES.home,
        element: <HomePage />,
      },
      {
        path: ROUTES.signUp,
        element: <SignUpPage.Component />,
        errorElement: <SignUpPage.Component />,
        action: SignUpPage.action,
      },
      {
        path: ROUTES.signIn,
        element: <SignInPage.Component />,
        errorElement: <SignInPage.Component />,
        action: SignInPage.action,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
