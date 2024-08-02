import React from "react";
import order from "../../../assets/images/order.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faSquareCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import GaugeChart from "react-gauge-chart";
import CustomLineChart from "../CustomLineGraph";

export default function Orders() {
  return (
    <div className="orders">
      <div className="metrics">
        <div className="lft">
          <div className="sts">
            <img src={order} className="ts" alt="" />
            <div>
              <h4>20</h4>
              <p>All Orders</p>
            </div>
          </div>
          <div className="sts">
            <FontAwesomeIcon icon={faSquareCheck} className="ts" />
            <div>
              <h4>20</h4>
              <p>Fulfilled Orders</p>
            </div>
          </div>
          <div className="sts">
            <FontAwesomeIcon icon={faClock} className="ts" />
            <div>
              <h4>20</h4>
              <p>Order Procesing Time</p>
            </div>
          </div>
        </div>
        <div className="rgt">
            <p>Order fulfilment rate</p>
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
      <div className="chart">
        <p>Order Fuilfiment over time</p>
        <CustomLineChart aspect={2}/>
      </div>
    </div>
  );
}
