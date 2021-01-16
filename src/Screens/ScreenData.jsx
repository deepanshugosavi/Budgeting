import React from "react";
import { GrTransaction } from "react-icons/gr";
import { BiAddToQueue } from "react-icons/bi";
import { BiLogOutCircle, BiHomeSmile } from "react-icons/bi";

export const ScreenData = [
  {
    title: "Home",
    icon: <BiHomeSmile />,
    path: "/",
  },
  {
    title: "Transaction",
    icon: <GrTransaction />,
    path: "/transaction",
  },
  {
    title: "Add Data",
    icon: <BiAddToQueue />,
    path: "/add_transaction",
  },
  {
    title: "Logout",
    icon: <BiLogOutCircle />,
    path: "/logout",
  },
];
