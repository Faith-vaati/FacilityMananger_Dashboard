import React, { useRef, useState } from "react";
import "../Styles/login.scss";
import bg from "../assets/images/login.png";
import logo from "../assets/images/logo.png";
import Input from "../components/Users/UserInput";
import Button from "../components/Util/Button";
import ForgetPassword from "../components/Login/ForgetPassword";
import WaveLoading from "../components/Util/WaveLoading";

export default function Login() {
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toggleForgot, setToggleForgot] = useState(false);
  const [body, updateBody] = useState({
    Email: null,
    Password: null,
  });

  const rfEmail = useRef();
  const rfPassword = useRef();

  const login = () => {
    let d = body;
    d.Email = rfEmail.current.value.toLowerCase().trim();
    d.Password = rfPassword.current.value;
    updateBody(d);
    setIsError("");

    if (!validateEmail(body.Email))
      return setIsError("Please Enter a Valid Email Address!");
    if (!validatePassword(body.Password))
      return setIsError("Password must be at least 6 characters!");

    if (validateEmail(body.Email) && validatePassword(body.Password)) {
      setIsLoading(true);
      fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw Error("Login Failed");
          }
        })
        .then((data) => {
          if (data.success) {
            localStorage.setItem("aeraewfd", data.token);
            localStorage.removeItem("path");
            setIsError(data.success);
            setIsLoading(false);
            window.location.href = "/";
          } else {
            setIsLoading(false);
            setIsError(data.error);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setIsError("Login failed");
        });
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validatePassword = (password) => {
    return password.length >= 6;
  };
  return (
    <div className="lg-container">
      <div className="left">
        <img src={bg} alt="" loading="lazy"/>
      </div>
      <div className="right">
        <div className="body">
          <div className="head">
            <img src={logo} alt="" />
            <h2>Log In</h2>
            {isError && <h6>{isError}</h6>}
          </div>
          <div className="form-container">
            <form action="" onSubmit={(e) => e.preventDefault(e)}>
              <Input
                type="text"
                label="Email Address"
                placeholder="Email Address"
                ref={rfEmail}
              />
              <Input
                type="password"
                label="Password"
                placeholder="Password"
                ref={rfPassword}
              />
              <p>
                Forgot Password?{" "}
                <span
                  onClick={() => {
                    setToggleForgot(true);
                  }}
                >
                  Click here
                </span>
              </p>
              <Button value="Login" handleClick={login} />
            </form>
          </div>
        </div>
      </div>
      {toggleForgot && <ForgetPassword setToggleForgot={setToggleForgot} />}
      {isLoading && <WaveLoading />}
    </div>
  );
}
