import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ScreenData } from "../ScreenData";
import "../css/navbar.css";
import { GiTakeMyMoney } from "react-icons/gi";

function Navbar(props) {
  const [active, setActive] = useState(false);

  const handleOnClick = () => {
    setActive(!active);
  };
  const base_app_path = "/main";

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
            <AiOutlineClose color="#ffd369" size="30px" />
          </div>
          <img
            className="nav_profile_image"
            src="https://instagram.fbom12-1.fna.fbcdn.net/v/t51.2885-19/s320x320/44377325_265856334115493_7888223780072325120_n.jpg?_nc_ht=instagram.fbom12-1.fna.fbcdn.net&_nc_ohc=Czi0fqP2tAEAX_0ql0K&tp=1&oh=9e289aecc9f662816548d36314dd1737&oe=602B6CE4"
            alt="profile-image"
          />
          <div className="nav_username">@deepanshugosavi</div>
        </div>
        {ScreenData.map((v, i) => {
          return (
            <Link to={base_app_path + v.path} className="menu__item" key={i}>
              <div className="menu__icon"> {v.icon} </div>
              <div className="menu__title">{v.title}</div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default Navbar;
