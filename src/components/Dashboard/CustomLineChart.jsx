import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Jan", value: 140 },
  { name: "Feb", value: 150 },
  { name: "March", value: 220 },
  { name: "April", value: 110 },
  { name: "May", value: 170 },
  { name: "June", value: 140 },
  { name: "July", value: 180 },
  { name: "Aug", value: 170},
  { name: "Sep", value: 160 },
  { name: "Oct", value: 230},
  { name: "Nov", value: 165 },
  { name: "Dec", value: 240 },
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
