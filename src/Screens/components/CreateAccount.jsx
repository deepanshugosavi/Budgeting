import React, { useState } from "react";
import "../css/createaccount.css";
import BrandingHeader from "./BrandingHeader";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill, RiQuillPenFill } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";

function CreateAccount(props) {
  const history = useHistory();
  const [state, setState] = useState({
    errorMessages: null,
  });
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const fullNameHandler = (event) => {
    setFullName(event.target.value);
  };

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const handleUsernameCheck = () => {};

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const BtnHandler = (event) => {
    if (username.length < 6)
      setState({ errorMessages: "username is too small" });
    else {
      setState({ errorMessages: null });
      setLoading(true);
      axios
        .post("http://127.0.0.1:8000/check_username", { userName: username })
        .then((res) => {
          console.log(res.data["result"]);
          if (res.data["result"] === "correct username") {
            setState({ errorMessages: null });
            if (event.target.className === "join_family__btn") {
              if (fullName.length < 6 || password.length < 6) {
                setState({
                  errorMessages: "Fullname/Password is too short",
                });
              } else {
                localStorage.setItem(
                  "user_data",
                  JSON.stringify({
                    username: username,
                    password: password,
                    fullName: fullName,
                    wants: "join",
                  })
                );
                history.push("/Budgeting/join-family");
              }
            } else {
              if (fullName.length < 6 || password.length < 6) {
                setState({
                  errorMessages: "Fullname/Password is too short",
                });
              } else {
                localStorage.setItem(
                  "user_data",
                  JSON.stringify({
                    username: username,
                    password: password,
                    fullName: fullName,
                    wants: "create",
                  })
                );

                history.push("/Budgeting/create-family");
              }
            }
          } else {
            setState({ errorMessages: res.data["result"] });
          }
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          setState({
            errorMessages: e.toString(),
          });
        });
    }
  };
  return (
    <div className="global__container">
      <BrandingHeader />
      {loading ? (
        <Loading />
      ) : (
        <div className="main__container">
          <div className="create__card">
            <label className="create__label" htmlFor="create_username">
              <RiQuillPenFill
                className="email__icon"
                color="white"
                size="20px"
              />
              <span> Full Name</span>
            </label>
            <input
              className="create__input"
              type="text"
              placeholder="Enter your fullname"
              onChange={fullNameHandler}
              value={fullName}
            />
            <label className="create__label" htmlFor="create_username">
              <FaUser className="email__icon" color="white" size="20px" />
              <span> Username</span>
            </label>
            <input
              className="create__input"
              type="text"
              placeholder="Enter your username"
              onChange={usernameHandler}
              value={username}
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
              type="password"
              placeholder="Enter your password"
              onChange={passwordHandler}
              value={password}
              onClick={handleUsernameCheck}
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

            <button className="create_family__btn" onClick={BtnHandler}>
              Create New Family
            </button>

            <div className="or__style">OR</div>

            <button className="join_family__btn" onClick={BtnHandler}>
              Join Existing Family
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateAccount;
