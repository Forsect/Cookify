import React from "react";
import { Route, Switch } from "react-router-dom";
import { Navigation } from "../shared/enums/Navigation";
import PrivateRoute from "./PrivateRoute";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";

const Routes = () => {
  return (
    <Switch>
      <Route path={Navigation.Login} component={Login} />
      <Route path={Navigation.Register} component={Register} />
      <PrivateRoute path={Navigation.Home} component={Home} />
    </Switch>
  );
};

export default Routes;
