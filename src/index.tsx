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
import {
  LocationProvider,
  useLocation,
} from "./components/providers/LocationProvider";
import { EventService } from "./services/EventsService";
import AuthErrorBoundary from "./components/AuthErrorBoundary";
import { AuthProvider } from "./components/providers/AuthProvider";
import { EventPage } from "./components/pages/EventPage";

const MutiraoSolidarioApp = () => {
  const { latitude, longitude } = useLocation() ?? {};

  const router = createBrowserRouter([
    {
      path: ROUTES.home,
      element: <PageWithMap />,
      errorElement: <AuthErrorBoundary />,
      loader: () =>
        EventService.getPublicEvents({
          ...(latitude && longitude
            ? { latitude: latitude, longitude: longitude }
            : {}),
        }),
      children: [
        {
          path: ROUTES.home,
          element: <HomePage />,
          loader: () =>
            EventService.getEvents({
              ...(latitude && longitude
                ? { latitude: latitude, longitude: longitude }
                : {}),
            }),
        },
        {
          path: ROUTES.event,
          element: <EventPage />,
          loader: ({ params }) => EventService.getEvent(+params.id!),
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

  return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <LocationProvider>
    <AuthProvider>
      <MutiraoSolidarioApp />
    </AuthProvider>
  </LocationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
