import React, { useEffect, useState } from "react";
import "./css/add_transaction.css";
import Lottie from "react-lottie";
import animationSideData from "./../money-growth.json";
import animationLoadingData from "./../loading-dots-in-yellow.json";
import animationDoneData from "./../tick-pop.json";
import axios from "axios";
import { SiCashapp } from "react-icons/si";
import { AiFillCrown } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import useWindowSize from "../../hooks/WindowsSize";

function AddTransaction(props) {
  const size = useWindowSize();
  const [state, setState] = useState({
    errorMessages: null,
    buttonState: null,
  });
  const [btnState, setBtnState] = useState(null);
  const [data_time, setDateTime] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [type, setType] = useState([]);
  const [selectedType, setSelectedType] = useState(0);
  const defaultSideOptions = {
    loop: true,
    autoplay: true,
    animationData: animationSideData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultLoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: animationLoadingData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultDoneOptions = {
    loop: true,
    autoplay: true,
    animationData: animationDoneData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/expenses_type")
      .then((res) => {
        console.log(res.data);
        setType(res.data);
      })
      .catch((e) => setState({ errorMessages: e.toString() }));
  }, []);

  const handleAddData = () => {
    if (data_time === "") {
      setState({ errorMessages: "Date & Time Required" });
    } else if (amount === 0) {
      setState({ errorMessages: "Amount Should be Greater than Zero" });
    } else if (description === null || description === "") {
      setState({ errorMessages: "Description Required" });
    } else if (selectedType === 0) {
      setState({ errorMessages: "Type Required" });
    } else {
      setState({ errorMessages: null });
      setBtnState("loading");
      axios
        .post("http://127.0.0.1:8000/transaction", {
          amount: amount,
          date_time: data_time,
          type: selectedType,
          description: description,
          user_name: localStorage.getItem("user_name"),
          family_name: localStorage.getItem("family_name"),
          user_password: localStorage.getItem("user_hash"),
        })
        .then((res) => {
          console.log(res.data);

          if (res.data["result"] === "transaction added successfully") {
            setBtnState("done");
            setTimeout(() => {
              setBtnState(null);
              setAmount(0);
              setDateTime("");
              setDescription("");
              setSelectedType(0);
            }, 1800);
          } else {
            setState({ errorMessages: res.data["result"] });
          }
        })
        .catch((e) => console.log(e));
    }
  };
  const handleInputs = (event) => {
    if (event.target.id === "amount") {
      setAmount(parseFloat(event.target.value));
    } else if (event.target.id === "time") {
      setDateTime(event.target.value);
    } else if (event.target.id === "desc") {
      setDescription(event.target.value);
    } else if (event.target.id === "type") {
      setSelectedType(event.target.value);
    }
  };
  return (
    <div className="add_transaction_container">
      <div className="add_transaction_mid_container">
        {size.width > 700 ? (
          <div>
            <Lottie options={defaultSideOptions} height={400} width={400} />
          </div>
        ) : (
          <></>
        )}

        <div className="add_transaction_card">
          <div className="add_transaction_heading">Add Transaction</div>
          <div className="add_transaction_items">
            <label htmlFor="type">
              <AiFillCrown size="30px" color="black" />
              Type:
            </label>
            <select
              id="type"
              name="type"
              onChange={handleInputs}
              value={selectedType}
            >
              <option value="0">Select type:</option>

              {type.map((v, i) => {
                return <option value={v["type_id"]}>{v["type"]}</option>;
              })}
            </select>
          </div>
          <div className="add_transaction_items">
            <label htmlFor="time">
              <FaCalendarAlt
                size="24px"
                color="black"
                style={{ marginRight: "4px" }}
              />
              Date & Time:
            </label>
            <input
              id="time"
              type="datetime-local"
              value={data_time}
              onChange={handleInputs}
            />
          </div>
          <div className="add_transaction_items">
            <label htmlFor="desc">
              <MdDescription size="30px" color="black" />
              Description:
            </label>
            <textarea
              id="desc"
              type="text"
              value={description}
              onChange={handleInputs}
            />
          </div>
          <div className="add_transaction_items">
            <label htmlFor="amount">
              <SiCashapp size="26px" color="black" /> Amount:
            </label>
            <input
              id="amount"
              type="number"
              min="0"
              value={amount}
              onChange={handleInputs}
            />
          </div>
          {state.errorMessages ? (
            <p
              className="validation"
              style={{
                color: "red",
                marginTop: "6px",
                marginBottom: "10px",
                fontSize: "18px",
                textTransform: "capitalize",
              }}
            >
              *{state.errorMessages}
            </p>
          ) : (
            <></>
          )}
          <div>
            {btnState === "loading" ? (
              <Lottie
                options={defaultLoadingOptions}
                height={100}
                width={100}
              />
            ) : btnState === "done" ? (
              <Lottie options={defaultDoneOptions} height={100} width={100} />
            ) : (
              <button className="add_transaction_btn" onClick={handleAddData}>
                ADD
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
