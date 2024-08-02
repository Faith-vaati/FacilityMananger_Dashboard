import React, { useEffect, useState } from "react";
import {
  faClock,
  faHome,
  faMap,
  faRightToBracket,
  faTools,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import person from "../../assets/images/person.jpg";

export default function Navigation(props) {
  const pathname = window.location.pathname.split("/");
  var jwt = require("jsonwebtoken");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("aeraewfd");

    if (token) {
      try {
        var decoded = jwt.decode(token);
        setCurrentUser(decoded);
        if (Date.now() >= decoded.exp * 1000) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  const Item = (params) => {
    const [showing, setShowing] = useState(false);

    return (
      <div
        style={{
          backgroundColor: showing ? "#60606010" : "transparent",
        }}
      >
        <div
          onClick={() => {
            if (params.options?.length === 0) {
              window.location.href = params.url;
            }
            if (params.url === "/logout") {
              localStorage.removeItem("aeraewfd");
              window.location.href = "/login";
            }
          }}
          className={params.link === params.active ? "active" : "item"}
          style={{
            padding: params.showing ? "1em" : "5x 0 5px 0",
            gridTemplateColumns: params.showing ? "20px auto" : "auto",
          }}
        >
          <FontAwesomeIcon icon={params.icon} />
          {params.showing && <p>{params.txt}</p>}
        </div>
        {showing &&
          params.options.length > 0 &&
          params.options.map((item, i) => {
            return (
              <a key={i} href={params.url + "/" + item}>
                {item}
              </a>
            );
          })}
      </div>
    );
  };

  return (
    <div
      style={{ width: props.showing ? "249px" : "fit-content" }}
      className="navigation"
    >
      <div className="logo">
        <div>
          <h4>FMS</h4>
          <h4>Dashboard</h4>
        </div>
      </div>
      <div className="line-container">
        <div className="circle-point start-point"></div>
        <div className="circle-point end-point"></div>
      </div>
      <Item
        url="/"
        txt="Dashboard"
        active={pathname[1]}
        link=""
        icon={faHome}
        options={[]}
        showing={props.showing}
      />
      <Item
        txt="GIS"
        link="gis"
        active={pathname[1]}
        icon={faMap}
        url="/gis"
        options={[]}
        showing={props.showing}
      />
      <Item
        txt="Properties"
        link="properties"
        active={pathname[1]}
        icon={faClock}
        url="/properties"
        options={[]}
        showing={props.showing}
      />
      <Item
        txt="Tenants"
        link="tenants"
        active={pathname[1]}
        icon={faClock}
        url="/tenants"
        options={[]}
        showing={props.showing}
      />
      <Item
        txt="Assets"
        link="assets"
        active={pathname[1]}
        icon={faClock}
        url="/assets"
        options={[]}
        showing={props.showing}
      />
      <Item
        txt="Workforce"
        link="workforce"
        active={pathname[1]}
        icon={faClock}
        url="/workforce"
        options={[]}
        showing={props.showing}
      />
      <Item
        txt="Users"
        active={pathname[1]}
        url="/users"
        link="users"
        icon={faUsers}
        options={[]}
        showing={props.showing}
      />
      <Item
        txt="Settings"
        url="/settings"
        active={pathname[1]}
        link="settings"
        icon={faTools}
        code="&#xf013;"
        options={[]}
        showing={props.showing}
      />
      <div className="contactdev">
        <div className="line-container">
          <div className="circle-point start-point"></div>
          <div className="circle-point end-point"></div>
        </div>

        <div className="div3equal">
          <img src={person} height={50} width={50} alt="Contact Developer" />
          <div>
            <h4>{currentUser.Name}</h4>
            <p>{currentUser.Email}</p>
          </div>
          <FontAwesomeIcon
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            icon={faRightToBracket}
            color="gray"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};
