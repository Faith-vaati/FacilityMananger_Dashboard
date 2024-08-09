import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const data = [
  { name: "Jan", value: 140 },
  { name: "Feb", value: 150 },
  { name: "March", value: 220 },
  { name: "April", value: 110 },
  { name: "May", value: 170 },
  { name: "June", value: 140 },
  { name: "July", value: 180 },
  { name: "Aug", value: 170 },
  { name: "Sep", value: 160 },
  { name: "Oct", value: 230 },
  { name: "Nov", value: 165 },
  { name: "Dec", value: 240 },
];

const labels = data.map((d) => d.name);
const values = data.map((d) => d.value);

const chartData = {
  labels: labels,
  datasets: [
    {
      label: "Monthly Values",
      data: values,
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(26, 174, 159, 0.1)",
      borderWidth: 1,
      fill: true,
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `Value: ${tooltipItem.raw}`;
        },
      },
    },
  },
};

const CustomLineChart = () => {
  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default CustomLineChart;
