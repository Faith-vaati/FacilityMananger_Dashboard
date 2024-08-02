import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/imgs/logo.svg";

const Item = (props) => {
  const onClick = () => {
    window.location.href = "/" + props.url;
  };
  return (
    <>
      {props.active === props.txt ? (
        <h4
          onClick={() => {
            onClick();
          }}
          className="active"
        >
          {props.txt}
        </h4>
      ) : (
        <h4
          onClick={() => {
            onClick();
          }}
        >
          {props.txt}
        </h4>
      )}
    </>
  );
};

export default function ModalHeader(props) {
  return (
    <div className="modalheader">
      <div className="mc">
        <img
          onClick={() => {
            window.location.href = "/home";
          }}
          src={logo}
          alt="Kiambu Logo"
        />

        <Item txt="Home" url="home" active={props.active} />
        <Item txt="Data" url="data" active={props.active} />
        {props.currentUser?.Role === "Admin" && (
          <Item txt="Users" url="users" active={props.active} />
        )}
        <div className="dropdown">
          <h3>{props.currentUser?.Name && props.currentUser.Name} &nbsp; </h3>
          <div className="list">
            <h4
              onClick={() => {
                props.toggleMenu();
                props.setToggleAccount(true);
              }}
            >
              Account
            </h4>
            <h4
              onClick={() => {
                props.toggleMenu();
                props.setToggleDetails(true);
              }}
            >
              Edit Details
            </h4>
            <h4
              onClick={() => {
                props.toggleMenu();
                props.setChangePassword(true);
              }}
            >
              Change Password
            </h4>
            <h4
              onClick={() => {
                props.logout();
              }}
            >
              Logout
            </h4>
          </div>

          <i
            className="fa fa-close"
            onClick={() => {
              props.toggleMenu();
            }}
          >
            &#xf00d;
          </i>
        </div>
      </div>
    </div>
  );
}
