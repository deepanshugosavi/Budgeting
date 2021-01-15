import React from "react";
import "../css/family.css";
import BrandingHeader from "./BrandingHeader";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill, RiQuillPenFill } from "react-icons/ri";
import { Link, Redirect } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from ".././mango-family.json";
import useWindowSize from "../../hooks/WindowsSize";

function Family(props) {
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
          <div>
            <Lottie options={defaultOptions} height={350} width={400} />
          </div>
        ) : (
          <></>
        )}
        <div className="family__card">
          <label className="family__label" htmlFor="family_username">
            <RiQuillPenFill className="email__icon" color="white" size="20px" />
            <span>Family Name</span>
          </label>
          <input
            className="family__input"
            id="family_username"
            type="text"
            placeholder="Enter your fullname"
          />

          <label className="family__label" htmlFor="family_password">
            <RiLockPasswordFill
              className="email__icon"
              color="white"
              size="22px"
            />
            <span> Family Key</span>
          </label>
          <input
            className="family__input"
            id="family_password"
            type="password"
            placeholder="Enter your password"
          />
          {props.status === "create_family" ? (
            <Link to="/Budgeting/main">
              <button className="family_family__btn">Create Family</button>
            </Link>
          ) : (
            <Link to="/Budgeting/main">
              <button className="family_family__btn">Join Family</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Family;
