import React from "react";
import { Route, Switch } from "react-router-dom";
import { Navigation } from "../shared/enums/Navigation";
import PrivateRoute from "./PrivateRoute";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import ShoppingList from "../Pages/ShoppingList/ShoppingList";
import Paper from "../shared/components/papers/Paper";
import styles from "./Routes.module.scss";
import UnknownPage from "./../Pages/UnknownPage/UnknownPage";
import Home from "../Pages/Home/Home";

const Routes = () => {
  return (
    <div className={styles.mainContainer}>
      <Paper className={styles.paper}>
        <Switch>
          <PrivateRoute exact path={Navigation.Home} component={Home} />
          <Route path={Navigation.Login} component={Login} />
          <Route path={Navigation.Register} component={Register} />
          <Route component={UnknownPage} />
        </Switch>
      </Paper>
    </div>
  );
};

export default Routes;
