import React from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import "../css/branding_heading.css";

function BrandingHeader(props) {
  return (
    <div className="header__container">
      <GiTakeMyMoney className="brand__logo" size="40px" />
      <div className="brand__name"> Budgeting</div>
    </div>
  );
}

export default BrandingHeader;
