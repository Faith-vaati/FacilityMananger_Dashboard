import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function CustomPieChart(props) {
  const [clicked, setClicked] = useState(null);
  const [data, setData] = useState(null);
  let index = 0;

  useEffect(() => {
    if (props.data) {
      let d = props.data;
      d.sort(compare);
      setData(d);
    }
  }, [props.data]);

  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

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
            style={{ fontSize: "small", border: "none" }}
            className="label"
          >{`${payload[0].name} : ${withCommas(payload[0].value)}`}</p>
        </div>
      );
    }

    return null;
  };

  function randomColor() {
    if (props.colors) {
      let c = "";
      c = props.colors[index];
      index = index + 1;
      return c;
    } else {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
  }

  function withCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        fontSize={10}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="chrt">
      <ResponsiveContainer width={"100%"} aspect={props.aspect}>
        <PieChart style={{ margin: "auto" }}>
          {data && (
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="20%"
              outerRadius="90%"
              fill="#8884d8"
              labelLine={false}
              label={renderCustomizedLabel}
              onClick={(data) => {
                // demoOnClick(data);
              }}
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    data[index]?.name === clicked ? "#ff9900" : randomColor()
                  }
                />
              ))}
            </Pie>
          )}
          <Tooltip
            wrapperStyle={{ outline: "none" }}
            content={<CustomTooltip />}
          />
          <Legend
            align="right"
            verticalAlign="middle"
            layout="vertical"
            spacing={20}
            wrapperStyle={{
              right: "10px",
              top: "50%",
              transform: "translate(0, -50%)",
              padding: "2em",
            }}
            formatter={(value, entry, index) => (
              <span
                style={{ color: randomColor(), fontSize: "x-small" }}
                className="chart-text"
              >
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
