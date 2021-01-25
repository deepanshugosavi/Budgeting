import React, { useEffect, useState } from "react";
import "./css/home.css";
import { Pie, Bar, Line } from "react-chartjs-2";
import axios from "axios";

function Home(props) {
  const [userData, setUserData] = useState([]);
  const [familyData, setFamilyData] = useState([]);
  const [categoryAmount, setCategoryAmount] = useState({
    category: [],
    amount: [],
    color: [],
  });
  const [familyAmount, setFamilyAmount] = useState({
    member_name: [],
    amount: [],
    color: [],
  });
  const [dailyAmount, setDailyAmount] = useState({
    date: [],
    amount: [],
  });
  const [monthAmount, setMonthAmount] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://whispering-fjord-28264.herokuapp.com/get_user_transaction?userName=${localStorage.getItem(
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
        let newAmount = v["amount"] + obj[v["type"]];
        obj = { ...obj, [v["type"]]: newAmount };
      } else {
        obj = { ...obj, [v["type"]]: v["amount"] };
      }
    });

    for (const key in obj) {
      cat = [...cat, key];
      amount = [...amount, obj[key]];
      color = [...color, getRandomColor()];
    }

    setCategoryAmount({ category: cat, amount: amount, color: color });
  }, [userData]);

  useEffect(() => {
    let obj = {};
    let date_time = [];
    let amount = [];
    userData.map((v, i) => {
      let date = v["date_time"].substr(0, 10);

      if (obj.hasOwnProperty(date)) {
        let newAmount = v["amount"] + obj[date];
        obj = { ...obj, [date]: newAmount };
      } else {
        obj = { ...obj, [date]: v["amount"] };
      }
    });

    let dateObj = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    for (const key in obj) {
      let tyear = key.substr(0, 4);
      let tmonth = key.substr(5, 2);
      let tday = key.substr(8, 2);

      console.log(
        tyear,
        tmonth,
        tday,
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate()
      );

      if (
        tyear == dateObj.getFullYear() &&
        tmonth == dateObj.getMonth() + 1 &&
        tday >= dateObj.getDate()
      ) {
        console.log(true);
        date_time = [...date_time, key];
        amount = [...amount, obj[key]];
      }
    }

    setDailyAmount({ date: date_time, amount: amount });
  }, [userData]);

  useEffect(() => {
    let obj = {};
    let amount = [];
    userData.map((v, i) => {
      let tmonth = v["date_time"].substr(5, 2);

      if (obj.hasOwnProperty(tmonth)) {
        let newAmount = v["amount"] + obj[tmonth];
        obj = { ...obj, [tmonth]: newAmount };
      } else {
        obj = { ...obj, [tmonth]: v["amount"] };
      }
    });

    for (const key in obj) {
      switch (key) {
        case "01":
          amount[0] = obj[key];
          break;
        case "02":
          amount[1] = obj[key];
          break;
        case "03":
          amount[2] = obj[key];
          break;
        case "04":
          amount[3] = obj[key];
          break;
        case "05":
          amount[4] = obj[key];
          break;
        case "06":
          amount[5] = obj[key];
          break;
        case "07":
          amount[6] = obj[key];
          break;
        case "08":
          amount[7] = obj[key];
          break;
        case "09":
          amount[8] = obj[key];
          break;
        case "10":
          amount[9] = obj[key];
          break;
        case "11":
          amount[10] = obj[key];
          break;
        case "12":
          amount[11] = obj[key];
          break;

        default:
          break;
      }
    }

    setMonthAmount(amount);
  }, [userData]);

  useEffect(() => {
    let obj = {};
    let mName = [];
    let amount = [];
    let color = [];
    familyData.map((v, i) => {
      if (obj.hasOwnProperty(v["user_name"])) {
        let newAmount = v["amount"] + obj[v["user_name"]];
        obj = { ...obj, [v["user_name"]]: newAmount };
      } else {
        obj = { ...obj, [v["user_name"]]: v["amount"] };
      }
    });
    for (const key in obj) {
      mName = [...mName, "@" + key];
      amount = [...amount, obj[key]];
      color = [...color, getRandomColor()];
    }
    setFamilyAmount({ member_name: mName, amount: amount, color: color });
  }, [familyData]);

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const selfMonthChart = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Amount",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#6FEF8F",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: monthAmount,
      },
    ],
  };
  const selfDailyExpenses = {
    labels: dailyAmount["date"],
    datasets: [
      {
        label: "Amount",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: dailyAmount["amount"],
      },
    ],
  };

  const selfExpensesByCategory = {
    labels: categoryAmount["category"],
    datasets: [
      {
        label: "Amount",
        backgroundColor: categoryAmount["color"],
        hoverBackgroundColor: categoryAmount["color"]
          ? categoryAmount["color"].map((v) => {
              return v + "66";
            })
          : [],
        data: categoryAmount["amount"],
      },
    ],
  };

  const familyMemberExpenses = {
    labels: familyAmount["member_name"],
    datasets: [
      {
        label: "Amount",
        backgroundColor: familyAmount["color"],
        hoverBackgroundColor: familyAmount["color"]
          ? familyAmount["color"].map((v) => {
              return v + "66";
            })
          : [],
        data: familyAmount["amount"],
      },
    ],
  };

  return (
    <div className="home__container">
      <div className="home__box1">
        <Line
          data={selfDailyExpenses}
          options={{
            title: {
              display: true,
              text: "Last 7 Days Expenses",
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
          data={familyMemberExpenses}
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
      </div>
      <div className="home__box4">
        <Bar
          data={selfMonthChart}
          options={{
            title: {
              display: true,
              text: "Mouthly Expenses",
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
