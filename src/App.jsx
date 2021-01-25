import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Screens/components/Login";
import CreateAccount from "./Screens/components/CreateAccount";
import Family from "./Screens/components/Family";
import MainScreen from "./Screens/components/MainScreen";

function App(props) {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/create" component={CreateAccount} />
      <Route
        exact
        path="/main"
        component={() => <MainScreen screen_name="home" />}
      />
      <Route
        exact
        path="/main/transaction"
        component={() => <MainScreen screen_name="transaction" />}
      />
      <Route
        exact
        path="/main/add_transaction"
        component={() => <MainScreen screen_name="add_transaction" />}
      />
      <Route
        exact
        path="/main/user"
        component={() => <MainScreen screen_name="user" />}
      />
      <Route
        exact
        path="/create-family"
        component={() => <Family status="create_family" />}
      />
      <Route
        exact
        path="/join-family"
        component={() => <Family status="join_family" />}
      />
    </Switch>
  );
}

export default App;
