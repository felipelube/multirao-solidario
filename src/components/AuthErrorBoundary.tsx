import React, { ReactNode } from "react";
import withAuthErrorHandling from "./hoc/withAuthErrorHandling";

interface AuthErrorBoundaryProps {
  children?: ReactNode;
}

const AuthErrorBoundary: React.FC<AuthErrorBoundaryProps> = ({ children }) => {
  const WrappedChildren = withAuthErrorHandling(() => <>{children}</>);

  return <WrappedChildren />;
};

export default AuthErrorBoundary;
