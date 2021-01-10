import React from "react";
import { Route, Switch } from "react-router-dom";
import { Navigation } from "../shared/enums/Navigation";
import PrivateRoute from "./PrivateRoute";
import Register from "../Pages/Register/Register";

const Routes = () => {
  return (
    <Switch>
      {/* <PrivateRoute path={Navigation.Home} component={() => ""} /> */}
      <Route path={Navigation.Login} />
      <Route path={Navigation.Register} component={Register} />
    </Switch>
  );
};

export default Routes;
