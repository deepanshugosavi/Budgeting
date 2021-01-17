import React from "react";
import "./css/add_transaction.css";

function AddTransaction(props) {
  return (
    <div className="add_transaction_container">
      <div className="add_transaction_mid_container">
        <div className="add_transaction_card">
          <div className="add_transaction_heading">Add Transaction</div>
          <div className="add_transaction_items">
            <label htmlFor="type">Type:</label>
            <select id="type" name="type">
              <option value="0">Select type:</option>
              <option value="clothing">clothing</option>
              <option value="food">food</option>
              <option value="medicine">medicine</option>
              <option value="bills">bills</option>
            </select>
          </div>
          <div className="add_transaction_items">
            <label htmlFor="time">Date & Time:</label>
            <input id="time" type="datetime-local" />
          </div>
          <div className="add_transaction_items">
            <label htmlFor="desc">Description:</label>
            <textarea id="desc" type="text" />
          </div>
          <div className="add_transaction_items">
            <label htmlFor="amount">Amount:</label>
            <input id="amount" type="number" min="0" />
          </div>
          <button className="add_transaction_btn">ADD</button>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
