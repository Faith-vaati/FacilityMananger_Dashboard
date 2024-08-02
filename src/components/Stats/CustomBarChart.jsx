import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function CustomBarChart(props) {
  const [clicked, setClicked] = useState(null);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "3px",
            border: "1px solid #60606040",
            boxShadow: "1px 1px #60606050",
          }}
          className="custom-tooltip"
        >
          <p
            style={{ border: "none" }}
            className="label"
          >{`${label} : ${withCommas(payload[0]?.value)}`}</p>
        </div>
      );
    }

    return null;
  };

  function withCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  return (
    <div className="chrt">
      <ResponsiveContainer width={"100%"} aspect={props.aspect}>
        <BarChart margin={{ left: -25 }} data={props?.data} cx="0%">
          <CartesianGrid stroke="#f5f5f5" />
          <YAxis
            style={{ fill: "#29B6F6" }}
            tick={{ fill: "red" }}
            fontSize={10}
            tickLine={{ stroke: "#29B6F6" }}
            dataKey="value"
          />
          <XAxis
            style={{ fill: "#29B6F6" }}
            tick={{ fill: "red" }}
            fontSize={10}
            tickLine={{ stroke: "#29B6F6" }}
            dataKey="name"
          />
          <Tooltip
            wrapperStyle={{ outline: "none" }}
            content={<CustomTooltip />}
          />
          <Bar dataKey="value" fill={randomColor()}>
            {props?.data?.map((entry, index) => (
              <Cell key={index} fill={randomColor()} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
