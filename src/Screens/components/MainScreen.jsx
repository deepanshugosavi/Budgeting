import React from "react";
import AddTransaction from "../main/AddTransaction";
import Home from "../main/Home";
import Transaction from "../main/Transaction";
import User from "../main/User";
import Navbar from "./Navbar";

function MainScreen(props) {
  const screen = props.screen_name;
  return (
    <div className="global__container">
      <Navbar />
      {screen === "home" ? (
        <Home />
      ) : screen === "transaction" ? (
        <Transaction />
      ) : screen === "add_transaction" ? (
        <AddTransaction />
      ) : screen === "user" ? (
        <User />
      ) : (
        <>NULL Screen</>
      )}
    </div>
  );
}

export default MainScreen;
