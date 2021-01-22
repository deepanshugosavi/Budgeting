import React, { useEffect, useState } from "react";
import "./css/transaction.css";
import { GiClothes } from "react-icons/gi";
import { AiFillDownCircle } from "react-icons/ai";
import { IoIosArrowUp } from "react-icons/io";
import axios from "axios";

function Transaction(props) {
  const [transactionList, setTransactionList] = useState([]);
  const [activeDescription, setActiveDescription] = useState({});
  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/get_user_transaction?userName=${localStorage.getItem(
          "user_name"
        )}&userPassword=${localStorage.getItem("user_hash")}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data["result"] !== null) {
          setTransactionList(res.data["result"]["user_data"]);
        }
      })
      .catch((e) => console.log(e));
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
            return (
              <div className="transaction_list_item">
                <div className="transactin_list_item_row1">
                  <GiClothes size="40px" />
                  <div className="transaction_category">{v["type"]}</div>
                  <div className="transaction_data_time">{v["date_time"]}</div>
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
    </div>
  );
}

export default Transaction;
