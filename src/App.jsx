import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Screens/components/Login";
import CreateAccount from "./Screens/components/CreateAccount";
import Family from "./Screens/components/Family";
import MainScreen from "./Screens/components/MainScreen";

function App(props) {
  return (
    <Switch>
      <Route exact path="/Budgeting/" component={Login} />
      <Route exact path="/Budgeting/create" component={CreateAccount} />
      <Route
        exact
        path="/Budgeting/main"
        component={() => <MainScreen screen_name="home" />}
      />
      <Route
        exact
        path="/Budgeting/main/transaction"
        component={() => <MainScreen screen_name="transaction" />}
      />
      <Route
        exact
        path="/Budgeting/main/add_transaction"
        component={() => <MainScreen screen_name="add_transaction" />}
      />
      <Route
        exact
        path="/Budgeting/main/user"
        component={() => <MainScreen screen_name="user" />}
      />
      <Route
        exact
        path="/Budgeting/create-family"
        component={() => <Family status="create_family" />}
      />
      <Route
        exact
        path="/Budgeting/join-family"
        component={() => <Family status="join_family" />}
      />
    </Switch>
  );
}

export default App;
