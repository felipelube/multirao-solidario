import { Navigate } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";
import { ROUTES } from "../config/routes";
import { PropsWithChildren } from "react";

export function WithRequiredAuthentication({ children }: PropsWithChildren) {
  const { isSignedIn } = useAuth();

  if (isSignedIn === null) {
    return null;
  }

  if (!isSignedIn) {
    return <Navigate to={ROUTES.signIn} />;
  }

  return children;
}
