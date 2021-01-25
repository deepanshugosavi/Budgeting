import React, { useState } from "react";
import "../css/family.css";
import BrandingHeader from "./BrandingHeader";
import { RiLockPasswordFill, RiQuillPenFill } from "react-icons/ri";
import { Redirect, useHistory } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from ".././mango-family.json";
import useWindowSize from "../../hooks/WindowsSize";
import axios from "axios";
import Loading from "../Loading";

function Family(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    user_data: JSON.parse(localStorage.getItem("user_data")),
    errorMessages: null,
  });
  const [familyName, setFamilyName] = useState("");
  const [familyKey, setFamilyKey] = useState("");
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

  const handleFamilyName = (event) => {
    setFamilyName(event.target.value);
  };
  const handleFamilyKey = (event) => {
    setFamilyKey(event.target.value);
  };

  const handleCreate = () => {
    if (familyName.length < 6 || familyKey.length < 6) {
      setState({
        ...state,
        errorMessages: "Family Name/Password is too small",
      });
    } else {
      setLoading(true);
      axios
        .post("https://whispering-fjord-28264.herokuapp.com/register", {
          fullname: state.user_data["fullName"],
          username: state.user_data["username"],
          password: state.user_data["password"],
          create: true,
          family_name: familyName,
          family_key: familyKey,
        })
        .then((res) => {
          if (res.data["result"] === "created") {
            localStorage.clear();
            localStorage.setItem(
              "user_hash",
              res.data["payload"]["user_password"]
            );
            localStorage.setItem("user_name", res.data["payload"]["user_name"]);
            localStorage.setItem("full_name", res.data["payload"]["full_name"]);
            localStorage.setItem("image_url", "");
            localStorage.setItem(
              "family_name",
              res.data["payload"]["family_name"]
            );
            history.push("/Budgeting/main");
          } else {
            setState({ ...state, errorMessages: res.data["result"] });
          }
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          setState({ ...state, errorMessages: e.toString() });
        });
    }
  };

  const handleJoin = () => {
    if (familyName.length < 6 || familyKey.length < 6) {
      setState({
        ...state,
        errorMessages: "Family Name/Password is too small",
      });
    } else {
      setLoading(true);
      axios
        .post("https://whispering-fjord-28264.herokuapp.com/register", {
          fullname: state.user_data["fullName"],
          username: state.user_data["username"],
          password: state.user_data["password"],
          create: false,
          family_name: familyName,
          family_key: familyKey,
        })
        .then((res) => {
          if (res.data["result"] === "joined") {
            localStorage.clear();
            localStorage.setItem(
              "user_hash",
              res.data["payload"]["user_password"]
            );
            localStorage.setItem("user_name", res.data["payload"]["user_name"]);
            localStorage.setItem("full_name", res.data["payload"]["full_name"]);
            localStorage.setItem("image_url", "");
            localStorage.setItem(
              "family_name",
              res.data["payload"]["family_name"]
            );
            history.push("/main");
          } else {
            setState({ ...state, errorMessages: res.data["result"] });
          }
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          setState({ ...state, errorMessages: e.toString() });
        });
    }
  };
  if (state.user_data === null) return <Redirect to="/" />;
  return (
    <div className="global__container">
      <BrandingHeader />
      {loading ? (
        <Loading />
      ) : (
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
              <RiQuillPenFill
                className="email__icon"
                color="white"
                size="20px"
              />
              <span>Family Name</span>
            </label>
            <input
              className="family__input"
              id="family_name"
              type="text"
              value={familyName}
              onChange={handleFamilyName}
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
              value={familyKey}
              onChange={handleFamilyKey}
              placeholder="Enter your password"
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
            {props.status === "create_family" ? (
              <button className="family_family__btn" onClick={handleCreate}>
                Create Family
              </button>
            ) : (
              <button className="family_family__btn" onClick={handleJoin}>
                Join Family
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Family;
