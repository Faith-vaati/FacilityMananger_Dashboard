import React, { useEffect, useState } from "react";
import "../Styles/home.scss";
import Navigation from "../components/Util/Navigation";
import UserHome from "../components/Users/UserHome";
import HomeGis from "../components/GIS/HomeGis";
import Agrodealers from "../components/DataTables/Agrodealers/AgrodealersList";
import FarmersList from "../components/DataTables/Farmers/FarmersList";
import NewStats from "../components/Stats/NewStats";
import Products from "../components/DataTables/ProductsList";
import FarmProduceList from "../components/DataTables/FarmProduceList";
import FarmerDetails from "../components/DataTables/Farmers/FarmerDetails";

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
            {pathname[1] === "" && <NewStats />}
            {pathname[1] === "gis" && <HomeGis />}
            {pathname[1] === "agrodealers" && <Agrodealers />}
            {pathname[1] === "products" && <Products />}
            {pathname[1] === "farmproduce" && <FarmProduceList />}
            {pathname[1] === "farmers" && <FarmersList />}
            {pathname[1] === "farmer" && <FarmerDetails />}
            {pathname[1] === "users" && <UserHome showing={showing} />}
          </div>
        </div>
      </div>
    </div>
  );
}
