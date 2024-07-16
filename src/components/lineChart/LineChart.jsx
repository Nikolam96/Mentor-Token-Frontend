import React from "react";
import { Line } from "react-chartjs-2";
import styles from "./lineChart.module.css";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ aggregation }) => {
  const max = Math.max(...aggregation) / 2;

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: aggregation,
        borderColor: "#7C4DFF",
        borderWidth: 3,
        fill: false,
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          stepSize: max,
          font: {
            size: 14,
          },
          color: "#B0B0B0",
        },
        grid: {
          display: true,
          color: "#DDDDDD",
        },
      },
      x: {
        ticks: {
          font: {
            size: 14,
          },
          color: "#B0B0B0",
        },
        grid: {
          display: false,
        },
      },
    },

    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Target accomplishment over the year",
        font: {
          size: 16,
          family: "Arial",
          weight: 300,
        },
        align: "start",

        color: "rgba(86, 106, 127, 1)",
        padding: {
          bottom: 25,
          top: 10,
        },
      },
    },
  };

  return (
    <div className={styles.lineChart}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
