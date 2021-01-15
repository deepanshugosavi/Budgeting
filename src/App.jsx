import React from "react";
import { Route } from "react-router-dom";
import Login from "./Screens/components/Login";
import CreateAccount from "./Screens/components/CreateAccount";
import Family from "./Screens/components/Family";
import MainScreen from "./Screens/components/MainScreen";

function App(props) {
  return (
    <>
      <Route exact path="/Budgeting/" component={Login} />
      <Route exact path="/Budgeting/create" component={CreateAccount} />
      <Route exact path="/Budgeting/main" component={MainScreen} />
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
    </>
  );
}

export default App;
