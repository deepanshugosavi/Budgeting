import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsFillInboxesFill } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { FaUserAlt } from "react-icons/fa";

export const ScreenData = [
  {
    title: "Home",
    icon: <AiFillHome />,
    path: "/",
  },
  {
    title: "Products",
    icon: <BsFillInboxesFill />,
    path: "/products",
  },
  {
    title: "Graphs",
    icon: <GoGraph />,
    path: "/graphs",
  },
  {
    title: "User",
    icon: <FaUserAlt />,
    path: "/user",
  },
];
