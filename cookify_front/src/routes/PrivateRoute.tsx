import React, { useEffect, useCallback, useState } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Navigation } from "../shared/enums/Navigation";
import { refreshToken } from "./../shared/api/AuthProvider";

interface PrivateRouteProps {
  path: string;
  component: React.FC<{}>;
  //XD -> https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/matchPath.js
  exact?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
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

  return isAuthenticated ? <Route path={props.path} component={props.component} /> : <Redirect to={Navigation.Login} />;
};

export default PrivateRoute;
