import React, { useState } from "react";
import "./css/transaction.css";
import { GiClothes } from "react-icons/gi";
import { AiFillDownCircle } from "react-icons/ai";
import { IoIosArrowUp } from "react-icons/io";

function Transaction(props) {
  const [activeDescription, setActiveDescription] = useState({});
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
  const arr = [1, 2, 3, 4, 5];
  return (
    <div className="transaction__container">
      <div className="transaction_list_container">
        <div className="transaction_heading">Transactions</div>
        {arr.map((v, i) => {
          console.log(activeDescription[i]);
          return (
            <div className="transaction_list_item">
              <div className="transactin_list_item_row1">
                <GiClothes size="40px" />
                <div className="transaction_category">Clothing</div>
                <div className="transaction_data_time">12:00AM</div>
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
                <div className="transaction_amount">Rs. 1000</div>
                <button className="transaction_item_delete_btn">DELETE</button>
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
                  1-T-shirt 1-T-shirt 1-T-shirt 1-T-shirt 1-T-shirt 1-T-shirt
                  1-T-shirt 1-T-shirt 1-T-shirt 1-T-shirt 1-T-shirt 1-T-shirt
                  1-T-shirt 1-T-shirt 1-T-shirt 1-T-shirt 1-T-shirt
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Transaction;
