import React from "react";
import "../css/createaccount.css";
import BrandingHeader from "./BrandingHeader";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill, RiQuillPenFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function CreateAccount(props) {
  return (
    <div className="global__container">
      <BrandingHeader />
      <div className="main__container">
        <div className="create__card">
          <label className="create__label" htmlFor="create_username">
            <RiQuillPenFill className="email__icon" color="white" size="20px" />
            <span> Full Name</span>
          </label>
          <input
            className="create__input"
            id="create_username"
            type="text"
            placeholder="Enter your fullname"
          />
          <label className="create__label" htmlFor="create_username">
            <FaUser className="email__icon" color="white" size="20px" />
            <span> Username</span>
          </label>
          <input
            className="create__input"
            id="create_username"
            type="text"
            placeholder="Enter your username"
          />
          <label className="create__label" htmlFor="create_password">
            <RiLockPasswordFill
              className="email__icon"
              color="white"
              size="22px"
            />
            <span> Password</span>
          </label>
          <input
            className="create__input"
            id="create_password"
            type="password"
            placeholder="Enter your password"
          />

          <Link to="/Budgeting/create-family">
            <button className="create_family__btn">Create New Family</button>
          </Link>
          <div className="or__style">OR</div>
          <Link to="/Budgeting/join-family">
            <button className="join_family__btn">Join Existing Family</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
