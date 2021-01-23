import React from "react";
import Lottie from "react-lottie";
import animationData from "./loader-animation.json";
import "./css/loading.css";

function Loading(props) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="loading__container">
      <Lottie options={defaultOptions} width={200} height={200} />
    </div>
  );
}

export default Loading;
