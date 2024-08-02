import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 2 },
  { name: "Feb", value: 5.5 },
  { name: "Mar", value: 2 },
  { name: "Apr", value: 8.5 },
  { name: "May", value: 1.5 },
  { name: "Jun", value: 5 },
];

const CustomLineChart = (props) => {
  return (
    <ResponsiveContainer width="100%" aspect={props.aspect}>
      <LineChart width={500} height={142} data={data}>
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
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
