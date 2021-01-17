import React from "react";
import { Route, Switch } from "react-router-dom";
import { Navigation } from "../shared/enums/Navigation";
import PrivateRoute from "./PrivateRoute";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import ShopList from "../Pages/ShopList/ShopList";

const Routes = () => {
  return (
    <Switch>
      {/* <PrivateRoute path={Navigation.Home} component={() => ""} /> */}
      <Route exact path={Navigation.Home} component={ShopList} />
      <Route path={Navigation.Login} component={Login} />
      <Route path={Navigation.Register} component={Register} />
    </Switch>
  );
};

export default Routes;
