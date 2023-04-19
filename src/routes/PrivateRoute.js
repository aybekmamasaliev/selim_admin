import React from "react";
import { Navigate } from "react-router-dom";

function PrivateAuthRoute({
  component: RouteComponent,
  fallbackPath,
  isLoggedIn,
}) {
  if (!isLoggedIn) return <Navigate to={fallbackPath} replace />;

  return RouteComponent;
}

export default PrivateAuthRoute;
