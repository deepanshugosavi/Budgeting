import React, { useEffect, useState } from "react";
import "./css/home.css";
import { Pie, Bar, Line } from "react-chartjs-2";
import axios from "axios";

function Home(props) {
  const [userData, setUserData] = useState([]);
  const [familyData, setFamilyData] = useState([]);
  const [categoryAmount, setCategoryAmount] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/get_user_transaction?userName=${localStorage.getItem(
          "user_name"
        )}&userPassword=${localStorage.getItem("user_hash")}`
      )
      .then((res) => {
        console.log(res.data["result"]);
        if (res.data["result"] !== "invalid user") {
          setUserData(res.data["result"]["user_data"]);
          setFamilyData(res.data["result"]["family_data"]);
        }
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    let obj = {};
    let cat = [];
    let amount = [];
    let color = [];

    userData.map((v, i) => {
      if (obj.hasOwnProperty(v["type"])) {
        console.log("It is There");
        let newAmount = v["amount"] + obj[v["type"]];
        obj = { ...obj, [v["type"]]: newAmount };
      } else {
        console.log("Not There");
        obj = { ...obj, [v["type"]]: v["amount"] };
      }
    });
    console.log(obj);
    for (const key in obj) {
      cat = [...cat, key];
      amount = [...amount, obj[key]];
      color = [...color, getRandomColor()];
    }
    console.log(cat);
    console.log(amount);
    console.log(color);
    setCategoryAmount({ category: cat, amount: amount, color: color });
  }, [userData]);
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const selfLineChart = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Amount",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [65, 59, 80, 81, 56],
      },
    ],
  };
  const selfPieChart = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Amount",
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
        ],
        data: [65, 59, 80, 81, 56],
      },
    ],
  };
  const selfExpensesByCategory = {
    labels: categoryAmount["category"],
    datasets: [
      {
        label: "Amount",
        backgroundColor: categoryAmount["color"],
        hoverBackgroundColor:
          categoryAmount["color"] !== undefined
            ? categoryAmount["color"].map((v) => {
                return v + "66";
              })
            : [],
        data: categoryAmount["amount"],
      },
    ],
  };

  return (
    <div className="home__container">
      <div className="home__box1">
        <Line
          data={selfLineChart}
          options={{
            title: {
              display: true,
              text: "Average Budgeting per month",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "bottom",
            },
          }}
        />
      </div>
      <div className="home__box2">
        <Pie
          data={selfPieChart}
          options={{
            title: {
              display: true,
              text: "Family Member Expenses",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
      <div className="home__box3">
        {userData.length === 0 ? (
          "--NO DATA--"
        ) : (
          <Pie
            data={selfExpensesByCategory}
            options={{
              title: {
                display: true,
                text: "Self Expenses By Category Type",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        )}
      </div>
      <div className="home__box4">
        <Bar
          data={selfLineChart}
          options={{
            title: {
              display: true,
              text: "Year Budgeting",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "bottom",
            },
          }}
        />
      </div>
    </div>
  );
}

export default Home;
