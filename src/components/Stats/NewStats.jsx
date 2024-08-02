import React, { useEffect, useRef, useState } from "react";
import "../../Styles/newstats.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faBell, faDollarSign, faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { GoNumber } from "react-icons/go";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import order from "../../assets/images/order.png";
import CustomPieChart from "./CustomPieChart";
import GaugeChart from "react-gauge-chart";

import OverallActivity from "./TabItems/OverallActivity";
import Orders from "./TabItems/Orders";
import Products from "./TabItems/Products";
import Users from "./TabItems/Users";

const data = [
  { name: "Category 1", value: 400 },
  { name: "Category 2", value: 200 },
  { name: "Category 3", value: 500 },
  { name: "Category 4", value: 800 },
];

export default function NewStats(props) {
  const [aspect, setAspect] = useState(1);
  const [active, setActive] = useState("Overall Activity");

  return (
    <div className="newstats">
      <div className="top">
        <div className="top-left">
          <h2>Dashboard</h2>
        </div>
        <div className="top-right">
          <FontAwesomeIcon icon={faArrowsRotate} className="icon-rotate" />
          <FontAwesomeIcon icon={faBell} className="icon" />
          <FontAwesomeIcon icon={faUser} className="icon" />
        </div>
      </div>

      <div className="taskstats">
        <div className="left">
          <div className="bar">
            <div></div>
            <h2>Product Requests and Sales</h2>
          </div>
          <div className="outer">
            <div className="ll">
              <div className="section">
                <div className="single">
                  <img src={order} alt=""/>
                  <div>
                    <h4>20</h4>
                    <p>Total requests from farmers</p>
                  </div>
                </div>
              </div>
              <div className="section">
                <div className="single">
                  <FontAwesomeIcon icon={faUser} className="ts" />
                  <div>
                    <h4>20</h4>
                    <p>Number of Sales from Farm Produce</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="chart">
              <CustomPieChart
                data={data}
                colors={["#F48F87", "#FFB21E", "#0298C8", "#F1736A"]}
                aspect={aspect}
              />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="bar">
            <div></div>
            <h2>Financial Metrics</h2>
          </div>
          <div className="budget">
            <div className="data">
                <div className="item">
                    <FontAwesomeIcon icon={faDollarSign} className="ts" />
                    <div>
                        <h4>Kes 50,000</h4>
                        <p>Total Sales Revenue</p>
                    </div>
                </div>
                <div className="item">
                    <FontAwesomeIcon icon={faSackDollar} className="ts" />
                    <div>
                        <h4>Kes 250</h4>
                        <p>Avg transaction value</p>
                    </div>
                </div>
                <div className="item">
                    <GoNumber className="ts"/>
                    <div>
                        <h4>200</h4>
                        <p>No. of Transactions</p>
                    </div>
                </div>
            </div>
            <div className="right">
              <p>Sales Performance Against Target</p>
              <div className="gauge-chart">
                <GaugeChart
                  className="gauge"
                  id="gauge-chart2"
                  nrOfLevels={3}
                  colors={["red", "orange", "green"]}
                  arcWidth={0.3}
                  percent={0.5}
                  textColor="gray"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tabs">
        <div className="vtop">
          <div className="container">
            <TabItem
              txt="Overall Activity"
              active={active}
              setActive={setActive}
            />
            <TabItem txt="Orders" active={active} setActive={setActive} />
            <TabItem txt="Products" active={active} setActive={setActive} />
            <TabItem txt="Users" active={active} setActive={setActive} />
          </div>
        </div>

        <div>
          {active === "Overall Activity" && <OverallActivity />}
          {active === "Orders" && <Orders />}
          {active === "Products" && <Products />}
          {active === "Users" && <Users />}
        </div>
      </div>
    </div>
  );
}

const TabItem = (props) => {
  return (
    <div
      onClick={() => {
        props.setActive(props.txt);
      }}
      className={props.active === props.txt ? "vactive" : "vitem"}
    >
      <h4>{props.txt}</h4>
    </div>
  );
};
