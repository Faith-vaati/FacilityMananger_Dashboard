import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../Styles/landing.scss";
import "../../Styles/_grid.scss";
import CustomLineChart from "./CustomLineChart";
import CustomDoughnutChart from "./CustomDoughnutChart";

import {
  faArrowUp,
  faBell,
  faChartLine,
  faExclamation,
  faFileExport,
  faFunnelDollar,
  faGem,
  faList,
  faMoneyBillTrendUp,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const data = [
  { id: 1, name: "Re-painting of external walls", cost: 50000 },
  { id: 2, name: "Repair of leaking roof", cost: 30000 },
  { id: 3, name: "Replacement of broken windows", cost: 20000 },
  { id: 4, name: "Repair of faulty plumbing system", cost: 10000 },
  { id: 5, name: "Replacement of broken doors", cost: 5000 },
];

export default function Landing() {
  return (
    <div className="landing">
      <div className="top-row">
        <div className="col-1-of-4">
          <div className="top-sect">
            <div className="top-sect_1">
              <div className="top-sect_1-icon">
                <FontAwesomeIcon className="user" icon={faUser} />
              </div>
              <div className="top-sect_1-name">
                <p>Tenants</p>
              </div>
            </div>
            <div className="top-sect_2">
              <p className="top-sect_2-1">1281</p>
            </div>
            <div className="top-sect_3">
              <div className="top-sect_3-icon">
                <FontAwesomeIcon className="arrow" icon={faArrowUp} />
              </div>
              <div className="top-sect_3-name">
                <p>
                  <span className="p-color">30 %</span> since Apr 2023
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1-of-4">
          <div className="top-sect">
            <div className="top-sect_1">
              <div className="top-sect_1-icon">
                <FontAwesomeIcon className="bill" icon={faMoneyBillTrendUp} />
              </div>
              <div className="top-sect_1-name">
                <p>Total Rent Collected</p>
              </div>
            </div>
            <div className="top-sect_2">
              <p className="top-sect_2-2">
                <span className="top-sect_2-2-currency">Kes</span> 2.5 M
              </p>
            </div>
            <div className="top-sect_3">
              <div className="top-sect_3-icon">
                <FontAwesomeIcon className="chart" icon={faChartLine} />
              </div>
              <div className="top-sect_3-name">
                <p>View Reports</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1-of-4">
          <div className="top-sect">
            <div className="top-sect_1">
              <div className="top-sect_1-icon">
                <FontAwesomeIcon className="excl" icon={faExclamation} />
              </div>
              <div className="top-sect_1-name">
                <p> Rent Arrears</p>
              </div>
            </div>
            <div className="top-sect_2">
              <p className="top-sect_2-3">
                <span className="top-sect_2-2-currency">Kes</span> 250,000
              </p>
            </div>
            <div className="top-sect_3">
              <div className="top-sect_3-icon">
                <FontAwesomeIcon className="bell" icon={faBell} />
              </div>
              <div className="top-sect_3-name">
                <p>Send Reminders</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1-of-4">
          <div className="top-sect">
            <div className="top-sect_1">
              <div className="top-sect_1-icon">
                <FontAwesomeIcon className="gem" icon={faGem} />
              </div>
              <div className="top-sect_1-name">
                <p>Assets & Inventory</p>
              </div>
            </div>
            <div className="top-sect_2">
              <p className="top-sect_2-4">1281</p>
            </div>
            <div className="last-two">
              <div className="top-sect_3">
                <div className="top-sect_3-icon">
                  <FontAwesomeIcon className="list" icon={faList} />
                </div>
                <div className="top-sect_3-name">
                  <p>View all</p>
                </div>
              </div>
              <div className="top-sect_3">
                <div className="top-sect_3-icon">
                  <FontAwesomeIcon className="chart" icon={faChartLine} />
                </div>
                <div className="top-sect_3-name">
                  <p>See Reports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chart-sect">
        <div className="chart-sect-top">
          <div className="chart-sect-top_title">
            <p>Perfomance</p>
          </div>
          <div className="chart-sect-top_export-right">
            <FontAwesomeIcon
              className="chart-sect-top_export-right-icon"
              icon={faFileExport}
            />
            <p className="chart-sect-top_export-right-text">Export</p>
          </div>
          <div className="chart-sect-top_filter-right">
            <p className="chart-sect-top_right-text">This Month</p>
            <FontAwesomeIcon
              className="chart-sect-top_filter-right-icon"
              icon={faFunnelDollar}
            />
          </div>
        </div>
        <div className="chart-sect-graph">
          {" "}
          <CustomLineChart />
        </div>
      </div>
      <div className="middle2">
        <div className="grid-row">
          <div className="col-1-of-2">
            <div className="middle2__left">
              <div className="middle2__left--heading">
                <p>Tenants Requests</p>
              </div>
              <div className="middle2__left--chart">
                <CustomDoughnutChart />
              </div>
              <p className="middle2__left--text">Assign Tasks</p>
            </div>
          </div>
          <div className="col-1-of-2">
            <div className="middle2__right">
              <div className="middle2__right--heading">
                Upcoming Maintenance
              </div>
              <div className="middle2__right--top">
                <p className="title--top">Title</p>
                <p className="cost--top">Cost</p>
              </div>
              {data.map((item) => (
                <div className=" middle2__right--middle">
                  <div className="title">
                    {item.id}. {item.name}
                  </div>
                  <div className="cost">{item.cost}</div>
                </div>
              ))}
              <button className="total">Total: Kes 100,000</button>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="bottom__heading">
          <p>Ongoing Tasks</p>
        </div>
        <div className="bottom__heading">
          <div className="bottom__title--grid">
            <p className="bottom__title--grid-name">Task</p>
            <p className="bottom__title--grid-asignee">Assigned To</p>
            <p className="bottom__title--grid-date">Assigned On</p>
            <p className="bottom__title--grid-progress">Progress</p>
          </div>
          <div className="bottom__inner--grid">
            <p className="bottom__inner--grid-name">Task</p>
            <p className="bottom__inner--grid-asignee">Assigned To</p>
            <p className="bottom__inner--grid-date">Assigned On</p>
            <p className="bottom__inner--grid-progress">Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}
