import { useRef, useState } from "react";
import Input from "../Util/Input";
import Loading from "../Util/Loading";

export default function ForgetPassword(props) {
  const rfEmail = useRef();
  const [msg, setMessage] = useState();
  const [isError, setIsError] = useState();
  const [loading, setLoading] = useState(false);
  const [body, updateBody] = useState({
    Email: null,
  });

  const forgetPassword = () => {
    let d = body;
    d.Email = rfEmail.current.getValue().toLowerCase().trim();
    updateBody(d);

    if (!verifyEmail(body.Email)) {
      return setIsError("Please provide a valid email address!");
    }

    if (verifyEmail(body.Email)) {
      setLoading(true);
      fetch("/api/auth/forgot", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (res.ok) return res.json();
          else throw Error("Failed");
        })
        .then((data) => {
          if (data.success) {
            setLoading(false);
            return setMessage(data.success);
          } else {
            setLoading(false);
            return setIsError(data.error);
          }
        })
        .catch((error) => {
          setLoading(false);
          setIsError(error);
        });
    }
  };

  const verifyEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <div className="contain">
      <div className="card1">
        <div className="title">
          <h3>Forgot Password</h3>
          <p>We'll generate a password</p>
          <p className="msg">{msg}</p>
          <p className="err">{isError}</p>
        </div>
        <div className="body">
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault(e);
            }}
          >
            <Input ref={rfEmail} type="text" placeholder="Email address" />
            <button
              className="submit"
              onClick={() => {
                forgetPassword();
              }}
            >
              Submit
            </button>
          </form>
        </div>
        <h4
          onClick={() => {
            props.setToggleForgot(false);
          }}
        >
          Close
        </h4>
        {loading && (
          <div className="ld">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
