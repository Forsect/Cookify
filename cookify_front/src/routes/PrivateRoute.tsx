import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Navigation } from "../shared/enums/Navigation";

interface PrivateRouteProps {
  path: string;
  component: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  component,
}: PrivateRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);

  useEffect(() => {
    localStorage.getItem("JWT")
      ? setIsAuthenticated(true)
      : setIsAuthenticated(false);
  }, []);

  if (isAuthenticated === null) {
    return <></>;
  }

  return isAuthenticated ? (
    <Route path={path} render={() => React.createElement(component)} />
  ) : (
    <Redirect to={Navigation.Login} />
  );
};

export default PrivateRoute;
