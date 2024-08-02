import React, { act, useState } from "react";
import "../../Styles/gis.scss";
import Agrodealers from "./Agrodealers";
import Farmers from "./Farmers";

export default function HomeGis() {
  const [active, setActive] = useState("Agrodealers");

  return (
    <div className="home-gis">
      <div className="top">
        <div className="container">
          <Item txt="Agrodealers" active={active} setActive={setActive} />
          <Item txt="Farmers" active={active} setActive={setActive} />
        </div>
      </div>

      <div>
        {active === "Agrodealers" && <Agrodealers />}
        {active === "Farmers" && <Farmers />}
      </div>
    </div>
  );
}

const Item = (props) => {
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
