import React, { useEffect } from "react";
import "./css/home.css";
import { Pie, Bar, Line } from "react-chartjs-2";

function Home(props) {
  useEffect(() => {}, []);
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
        <Pie
          data={selfPieChart}
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
