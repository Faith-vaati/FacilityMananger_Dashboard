import React, { useState } from "react";
import "../../Styles/userhome.scss";
import PortalUsers from "./PortalUsers";
import PublicUsers from "./PublicUsers";

export default function UserHome(props) {
  const [active, setActive] = useState("Portal Users");

  return (
    <div className="userhome">
      <div className="vtop">
        <div className="container">          
          <Item txt="Portal Users" active={active} setActive={setActive} />
          <Item txt="Public Users" active={active} setActive={setActive} />
        </div>
      </div>

      <div>
        {active === "Portal Users" && <PortalUsers />}
        {active === "Public Users" && <PublicUsers />}
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
