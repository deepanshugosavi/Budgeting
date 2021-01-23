import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, NavLink, Redirect } from "react-router-dom";
import { ScreenData } from "../ScreenData";
import "../css/navbar.css";
import { GiTakeMyMoney } from "react-icons/gi";

function Navbar(props) {
  const [active, setActive] = useState(false);
  const [state, setState] = useState({
    user_hash: localStorage.getItem("user_hash"),
    image_url: localStorage.getItem("image_url"),
    user_name: localStorage.getItem("user_name"),
  });

  const handleOnClick = () => {
    setActive(!active);
  };
  const base_app_path = "/Budgeting/main";

  if (state.user_hash === null) return <Redirect to="/Budgeting" />;

  return (
    <div className="navbar">
      {/* Navbar Toggle Button */}
      <div className="navbar__heading">
        <FaBars
          color="black"
          size="30px"
          className="navbar__btn"
          onClick={handleOnClick}
        />
        <div className="navbar__logo">
          <GiTakeMyMoney className="brand__logo" size="40px" />
          <div className="brand__name"> Budgeting</div>
        </div>
      </div>

      <nav className={active ? "navbar__active navbar__menu" : "navbar__menu"}>
        <div className="nav_profile">
          <div className="cancel__btn" onClick={handleOnClick}>
            <AiOutlineClose color="#ffac41" size="30px" />
          </div>
          <Link to="/Budgeting/main/user">
            <div className="nav_profile_image_container">
              <img
                className="nav_profile_image"
                src={
                  state.image_url === ""
                    ? "https://img.favpng.com/2/24/0/computer-icons-avatar-user-profile-png-favpng-HPjiNes3x112h0jw38sbfpDY9.jpg"
                    : state.image_url
                }
                alt="profile-image"
              />
            </div>
            <div className="nav_username">@{state.user_name}</div>
          </Link>
        </div>
        {ScreenData.map((v, i) => {
          if (v.title === "Logout")
            return (
              <div
                className="menu__item"
                key={i}
                onClick={() => {
                  localStorage.clear();
                  setState({
                    user_hash: localStorage.getItem("user_hash"),
                  });
                }}
              >
                <div className="menu__icon"> {v.icon} </div>
                <div className="menu__title">{v.title}</div>
              </div>
            );
          return (
            <NavLink
              activeClassName={
                v.title === "Home" ? null : "nav_menu_item_active"
              }
              to={base_app_path + v.path}
              className="menu__item"
              key={i}
            >
              <div className="menu__icon"> {v.icon} </div>
              <div className="menu__title">{v.title}</div>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

export default Navbar;
