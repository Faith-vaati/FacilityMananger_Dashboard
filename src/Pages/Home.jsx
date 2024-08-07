import React, { useEffect, useState } from "react";
import "../Styles/home.scss";
import Navigation from "../components/Util/Navigation";
import UserHome from "../components/Users/UserHome";
import HomeGis from "../components/GIS/HomeGis";
import Properties from "../components/Property Control/Properties";
import Tenants from "../components/Tenants/Tenants";
import Assets from "../components/Asset Manangement/Assets";
import Workforce from "../components/Workforce Manangement/Workforce";
import Landing from "../components/Dashboard/Landing";

export default function Home(props) {
  const [showing, setShowing] = useState(true);
  const pathname = window.location.pathname.split("/");

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setShowing(false);
    } else {
      setShowing(true);
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <div className="home">
      <div
        style={{ gridTemplateColumns: !showing ? "auto 1fr" : "250px 1fr" }}
        className="main"
      >
        <div className="left_panel">
          <Navigation showing={showing} setShowing={setShowing} />
        </div>
        <div className="right_panel">
          <div className="full">
            {pathname[1] === "" && <Landing />}
            {pathname[1] === "gis" && <HomeGis />}
            {pathname[1] === "properties" && <Properties />}
            {pathname[1] === "tenants" && <Tenants />}
            {pathname[1] === "assets" && <Assets />}
            {pathname[1] === "workforce" && <Workforce />}
            {pathname[1] === "users" && <UserHome showing={showing} />}
          </div>
        </div>
      </div>
    </div>
  );
}
