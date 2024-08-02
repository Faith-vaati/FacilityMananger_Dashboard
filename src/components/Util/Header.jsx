import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/imgs/logo.png";

export default function Header(props) {
  var jwt = require("jsonwebtoken");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [clicked, setClicked] = useState(false);

  const toggleMenu = () => {
    setClicked(!clicked);
  };

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



  return (
    <div>
      <div className="header">
        <i
          className="fa fa-bars"
          onClick={() => {
            props.setShowing(!props.showing);
          }}
        ></i>
        <div className="right">
          <p>{currentUser.Name}</p>
          <i className="fa fa-user"></i>
        </div>
      </div>
    </div>
  );
}
