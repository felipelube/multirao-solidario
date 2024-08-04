import React from "react";
import { Navigate, useRouteError } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import { ApiError } from "../../services/ApiService";

const withAuthErrorHandling = <P extends object>(
  WrappedComponent?: React.ComponentType<P>
) => {
  const ComponentWithAuthErrorHandling: React.FC<P> = (props) => {
    const apiError = (useRouteError() as ApiError) ?? {};

    if (
      apiError &&
      (apiError.statusCode === 401 || apiError.statusCode === 403)
    ) {
      return <Navigate to={ROUTES.signIn} />;
    }

    return WrappedComponent ? <WrappedComponent {...(props as P)} /> : null;
  };

  return ComponentWithAuthErrorHandling;
};

export default withAuthErrorHandling;
