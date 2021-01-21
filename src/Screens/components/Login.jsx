import React, { useEffect, useState } from "react";
import "../css/login.css";
import BrandingHeader from "./BrandingHeader";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, Redirect } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../welcome.json";
import useWindowSize from "../../hooks/WindowsSize";
import axios from "axios";

function Login(props) {
  const size = useWindowSize();
  const [state, setState] = useState({
    loginStatus: localStorage.getItem("user_hash"),
    errorMessages: null,
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    repeat: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const loginHandler = () => {
    if (username !== "" && password !== "") {
      axios
        .post("http://127.0.0.1:8000/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          if (
            res.data["result"] === "invalid password" ||
            res.data["result"] === "invalid username"
          )
            setState({ errorMessages: res.data["result"] });
          if (res.data["result"] === "Login Success") {
            localStorage.setItem(
              "user_hash",
              res.data["payload"]["user_password"]
            );
            localStorage.setItem("user_name", res.data["payload"]["user_name"]);
            localStorage.setItem("full_name", res.data["payload"]["full_name"]);
            localStorage.setItem("image_url", res.data["payload"]["image_url"]);
            localStorage.setItem(
              "family_name",
              res.data["payload"]["family_name"]
            );
            setState({ errorMessages: res.data["result"] });
          }
        })
        .catch((e) => {
          setState({ errorMessages: e.toString() });
        });
      // setState({ errorMessages: "something went wrong" });
    }
  };

  if (state.loginStatus !== null) return <Redirect to="/Budgeting/main" />;
  return (
    <div className="global__container">
      <BrandingHeader />

      <div className="main__container">
        {size.width > 700 ? (
          <div className="welcome__animation">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        ) : (
          <></>
        )}

        <div className="login__card">
          <label className="login__label" htmlFor="login_username">
            <FaUser className="email__icon" color="white" size="20px" />
            <span> Username</span>
          </label>
          <input
            className="login__input"
            id="login_username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={usernameHandler}
          />
          <label className="login__label" htmlFor="login_password">
            <RiLockPasswordFill
              className="email__icon"
              color="white"
              size="22px"
            />
            <span> Password</span>
          </label>
          <input
            className="login__input"
            id="login_password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={passwordHandler}
          />
          {state.errorMessages ? (
            <p
              className="validation"
              style={{
                color: "red",
                marginTop: "30px",
                fontSize: "18px",
                textTransform: "capitalize",
              }}
            >
              *{state.errorMessages}
            </p>
          ) : (
            <></>
          )}

          <button className="login__btn" onClick={loginHandler}>
            LOGIN
          </button>
          <div className="or__style">OR</div>
          <Link to="/Budgeting/create">
            <button className="create__btn">Create an Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

/*

import React from "react";
import "../css/login.css";
import BrandingHeader from "./BrandingHeader";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../welcome.json";

function Login(props) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="global__container">
      <BrandingHeader />
      <div className="main__container">
        <div>
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
        <div className="login__card">
          
          <label className="login__label" htmlFor="login_username">
            <FaUser className="email__icon" color="white" size="20px" />
            <span> Username</span>
          </label>
          <input
            className="login__input"
            id="login_username"
            type="text"
            placeholder="Enter your username"
          />
          <label className="login__label" htmlFor="login_password">
            <RiLockPasswordFill
              className="email__icon"
              color="white"
              size="22px"
            />
            <span> Password</span>
          </label>
          <input
            className="login__input"
            id="login_password"
            type="password"
            placeholder="Enter your password"
          />

          <button className="login__btn">LOGIN</button>
          <div className="or__style">OR</div>
          <Link to="/create">
            <button className="create__btn">Create an Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

*/
