import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../Styles/Landing.scss";
import "../../Styles/_grid.scss";
import CustomLineChart from "./CustomLineChart";
import {
  faArrowUp,
  faBell,
  faChartLine,
  faExclamation,
  faFileExport,
  faFilter,
  faFunnelDollar,
  faGem,
  faList,
  faMoneyBillTrendUp,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
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
        <div className="chart-sect-graph"> <CustomLineChart /></div>
      </div>
    </div>
  );
}
