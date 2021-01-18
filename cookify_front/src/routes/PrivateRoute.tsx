import React, { useEffect, useCallback, useState } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Navigation } from "../shared/enums/Navigation";
import { refreshToken } from "./../shared/api/AuthProvider";

interface PrivateRouteProps {
  path: string;
  component: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, component }: PrivateRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);

  const getIsAuthenticated = useCallback(async () => {
    const jwtToken = await refreshToken();

    if (jwtToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    getIsAuthenticated();
  }, [getIsAuthenticated]);

  if (isAuthenticated === null) {
    return <></>;
  }

  return isAuthenticated ? <Route path={path} render={() => React.createElement(component)} /> : <Redirect to={Navigation.Login} />;
};

export default PrivateRoute;
