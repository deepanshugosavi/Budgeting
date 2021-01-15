import React, { useEffect, useState } from "react";
import "../css/login.css";
import BrandingHeader from "./BrandingHeader";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../welcome.json";
import useWindowSize from "../../hooks/WindowsSize";

function Login(props) {
  const size = useWindowSize();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    repeat: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
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
