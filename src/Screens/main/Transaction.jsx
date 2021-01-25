import React, { useEffect, useState } from "react";
import "./css/transaction.css";
import { BsFillHouseFill } from "react-icons/bs";
import { AiFillDownCircle, AiFillCar, AiFillMedicineBox } from "react-icons/ai";
import {
  GiCommercialAirplane,
  GiLipstick,
  GiPayMoney,
  GiElectric,
  GiWaterDrop,
  GiDropEarrings,
  GiClothes,
} from "react-icons/gi";
import { FaGraduationCap, FaMobileAlt, FaShoppingCart } from "react-icons/fa";
import { MdDevicesOther } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { IoFastFoodSharp } from "react-icons/io5";
import axios from "axios";
import Loading from "../Loading";

function Transaction(props) {
  const [loading, setLoading] = useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [activeDescription, setActiveDescription] = useState({});
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://whispering-fjord-28264.herokuapp.com/get_user_transaction?userName=${localStorage.getItem(
          "user_name"
        )}&userPassword=${localStorage.getItem("user_hash")}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data["result"] !== null) {
          setTransactionList(res.data["result"]["user_data"]);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);
  const handleActiveDescription = (data) => {
    if (
      activeDescription[data] === null ||
      activeDescription[data] === undefined
    )
      setActiveDescription({ ...activeDescription, [data]: true });
    else {
      setActiveDescription({
        ...activeDescription,
        [data]: !activeDescription[data],
      });
    }
  };

  const handleDelete = (index) => {
    axios
      .post("http://127.0.0.1:8000/delete_transaction", {
        transactionID: transactionList[index]["transaction_id"],
      })
      .then((res) => {
        if (res.data["result"] === "deleted successfully") {
          let newTransactionList = transactionList.filter((v, i) => {
            if (index === i) {
              return null;
            }
            return v;
          });
          setTransactionList(newTransactionList);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="transaction__container">
      {loading ? (
        <Loading />
      ) : (
        <div className="transaction_list_container">
          <div className="transaction_heading">Transactions</div>
          {transactionList.length === 0 ? (
            <div
              style={{
                color: "white",
                justifySelf: "center",
                alignSelf: "center",
                marginTop: "20px",
              }}
            >
              -- No Transaction --
            </div>
          ) : (
            transactionList.map((v, i) => {
              console.log(activeDescription[i]);
              let dt = v["date_time"].replace("T", " ");
              return (
                <div className="transaction_list_item">
                  <div className="transactin_list_item_row1">
                    {v["type"] === "gadgets" ? (
                      <MdDevicesOther size="40px" />
                    ) : v["type"] === "travelling" ? (
                      <GiCommercialAirplane size="30px" />
                    ) : v["type"] === "vehicle" ? (
                      <AiFillCar size="40px" />
                    ) : v["type"] === "education" ? (
                      <FaGraduationCap size="40px" />
                    ) : v["type"] === "medicines" ? (
                      <AiFillMedicineBox size="40px" />
                    ) : v["type"] === "cosmetics" ? (
                      <GiLipstick size="40px" />
                    ) : v["type"] === "tax" ? (
                      <GiPayMoney size="40px" />
                    ) : v["type"] === "electric bill" ? (
                      <GiElectric size="40px" />
                    ) : v["type"] === "water bill" ? (
                      <GiWaterDrop size="40px" />
                    ) : v["type"] === "recharge" ? (
                      <FaMobileAlt size="40px" />
                    ) : v["type"] === "jewellery" ? (
                      <GiDropEarrings size="40px" />
                    ) : v["type"] === "cloths" ? (
                      <GiClothes size="40px" />
                    ) : v["type"] === "food" ? (
                      <IoFastFoodSharp size="30px" />
                    ) : v["type"] === "house" ? (
                      <BsFillHouseFill size="40px" />
                    ) : (
                      <FaShoppingCart />
                    )}
                    <div className="transaction_category">{v["type"]}</div>
                    <div className="transaction_data_time">{dt}</div>
                    <div className="transaction_item_description_btn">
                      {activeDescription[i] === undefined ||
                      activeDescription[i] === false ? (
                        <AiFillDownCircle
                          color="white"
                          size="30px"
                          onClick={() => handleActiveDescription(i)}
                        />
                      ) : (
                        <IoIosArrowUp
                          size="20px"
                          color="#393E46"
                          onClick={() => handleActiveDescription(i)}
                        />
                      )}
                    </div>
                    <div className="transaction_amount">Rs. {v["amount"]}</div>
                    <button
                      className="transaction_item_delete_btn"
                      onClick={() => handleDelete(i)}
                    >
                      DELETE
                    </button>
                  </div>
                  <div
                    className={
                      activeDescription[i] === undefined ||
                      activeDescription[i] === false
                        ? "transaction_item_description_unactive"
                        : "transaction_item_description_active"
                    }
                  >
                    <div className="transaction_item_description_heading">
                      Description:
                    </div>
                    <div className="transaction_description">
                      {v["description"]}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default Transaction;
