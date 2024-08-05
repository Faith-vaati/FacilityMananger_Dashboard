import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "1", value: 2 },
  { name: "2", value: 5.5 },
  { name: "3", value: 2 },
  { name: "4", value: 8.5 },
  { name: "5", value: 1.5 },
  { name: "6", value: 5 },
];

const CustomLineChart = () => {
  return (
    <LineChart width={1140} height={300} data={data}>
      <Line type="monotone" dataKey="value" stroke="#0CB566" />
      <XAxis
        dataKey="name"
        axisLine={{ stroke: "#0298C8" }}
        tickLine={{ stroke: "#0298C8" }}
      />
      <YAxis
        axisLine={{ stroke: "#0298C8" }}
        tickLine={{ stroke: "#0298C8" }}
      />
      <Tooltip />
    </LineChart>
  );
};

export default CustomLineChart;
