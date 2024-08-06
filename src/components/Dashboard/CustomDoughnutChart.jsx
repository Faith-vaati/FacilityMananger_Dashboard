// DoughnutChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const CustomDoughnutChart = () => {
  // Sample data for the doughnut chart
  const data = {
    labels: ["Total Fixed", "Pending", "Other"],
    datasets: [
      {
        label: "Requests data",
        data: [90, 30, 12],
        backgroundColor: [
          "rgba(0, 136, 254, 0.2)",
          "rgba(26, 174, 159, 0.2)",
          "rgba(232, 131, 58, 0.2)",
        ],
        borderColor: [
          "rgba(0, 136, 254, 1)",
          "rgba(26, 174, 159, 1)",
          "rgba(232, 131, 58, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the doughnut chart
  const options = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: "30rem", height: "300rem" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default CustomDoughnutChart;
