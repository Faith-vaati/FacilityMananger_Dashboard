import {
  faSearch,
  faTimes,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import "../../Styles/users.scss";
import Button from "../Util/Button";
import Input from "./UserInput";
import WaveLoading from "../Util/WaveLoading";
import Pagination from "../Util/Pagination";
import Select from "./UserSelect";
import SelectedUser from "./SelectedUser";
import UserBox from "./UserBox";

export default function PortalUsers() {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [userID, setUserID] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const selected = useRef();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/auth/paginated/${offset *12}`, {
      method: "get",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        setLoading(false);
        setData(data);
        if (data.result.length > 0) {
          setUserID(data.result[0].UserID);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [refresh, offset]);

  useEffect(() => {
    selectedUser();
  }, [userID]);

  const selectedUser = () => {
    setLoading(true);
    fetch(`/api/auth/${userID}`, {
      method: "get",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        setLoading(false);
        setUserDetails(data);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  function quickSearch(value) {
    setData(null);
    setLoading(true);
    fetch(`/api/auth/quicksearch/${value}`, {
      method: "get",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        setLoading(false);
        setData(data);
        console.log(data);
        if (data.result.length > 0) {
          setUserID(data.result[0].UserID);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  return (
    <div className="users">
      <div className="list">
        <div className="utp">
          <h3>Portal Users</h3>
          <p
            onClick={() => {
              setClicked(true);
            }}
          >
            <FontAwesomeIcon className="fa-add" icon={faUserPlus} /> New User
          </p>
          <div className="search">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Name..."
              onChange={(e) => {
                const v = e.target.value;
                if (v !== "") {
                  quickSearch(v);
                } else {
                  setRefresh(!refresh);
                }
              }}
            />
            <FontAwesomeIcon className="fa-search" icon={faSearch} />
          </div>
        </div>
        <hr />

        <div className="div31">
          <div>
            <div className="lcontainer">
              <div className="user-list">
                {data &&
                  data?.results?.length > 0 &&
                  data?.results?.map((item, index) => {
                    return (
                      <UserBox
                        key={index}
                        item={item}
                        userID={userID}
                        setUserID={setUserID}
                        selected={isMobile ? selected : null}
                      />
                    );
                  })}
              </div>
            </div>
            
            {data && data?.total && (
              <Pagination
                total={data?.total}
                currentPage={offset}
                onPageChange={(v) => {
                  setOffset(v);
                }}
              />              
            )}
          </div>

          <div ref={selected}>
            <div className="selected">
              <h4>User Details</h4>
              <hr />

              {userDetails ? (
                userDetails && (
                  <SelectedUser
                    setLoading={setLoading}
                    userDetails={userDetails}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    url="auth"
                  />
                )
              ) : (
                <>
                  <p>Click on a user to see their details</p>
                </>
              )}
            </div>
          </div>
        </div>

        {loading && <WaveLoading />}
      </div>
      {clicked && (
        <Popup
          setClicked={setClicked}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}
    </div>
  );
}

const Popup = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fname = useRef();
  const sname = useRef();
  const email = useRef();
  const phone = useRef();
  const position = useRef();
  const department = useRef();
  const role = useRef();
  const password = useRef();
  const cpassword = useRef();

  function titleCase(str) {
    let splitStr = str.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  const createUser = () => {
    const body = {
      Name:
        titleCase(fname.current.value.trim()) +
        " " +
        titleCase(sname.current.value.trim()),
      Phone: phone.current.value,
      Email: email.current.value.toLowerCase().trim(),
      Position: position.current.value,
      Department: department.current.value,
      Role: role.current.value,
      Password: password.current.value,
    };

    console.log(body);
    setError("");

    const validateForm = () => {
      let result = true;
      if (!validateEmail(body.Email)) {
        result = false;
        setError("Please Enter a valid email address!");
        setLoading(false);
        return result;
      }
      if (
        !validatePassword(body.Password) ||
        !validatePassword(cpassword.current.value)
      ) {
        result = false;
        setError("Password must be at least 6 characters!");
        setLoading(false);
        return result;
      }
      if (body.Password !== cpassword.current.value) {
        result = false;
        setError("Passwords do not match!!!");
        setLoading(false);
        return result;
      }
      if (!body.Phone || body.Phone.length !== 10) {
        result = false;
        setError("Enter a valid phone number");
        setLoading(false);
        return result;
      }
      if (fname.current.value === "" || sname.current.value === "") {
        result = false;
        setError("Two names are required!");
        setLoading(false);
        return result;
      }

      return result;
    };

    if (validateForm()) {
      setLoading(true);
      fetch(`/api/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else throw Error("");
        })
        .then((data) => {
          setLoading(false);
          if (data.success) {
            setError(data.success);
            setTimeout(() => {
              props.setClicked(false);
              props.setRefresh(!props.refresh);
            }, 2000);
          } else {
            setError(data.error);
          }
        })
        .catch((err) => {
          setLoading(false);
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
    <div className="popup">
      <div className="wrap">
        <div className="head">
          <h3>New Portal User</h3>
          <FontAwesomeIcon
            onClick={() => {
              props.setClicked(false);
            }}
            className="fa-times"
            icon={faTimes}
          />
        </div>

        <hr />        
        <h6>{error}</h6>
        <div className="new">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="div2equal">
              <Input ref={fname} type="text" label="First Name *" />
              <Input ref={sname} type="text" label="Surname *" />
            </div>
            <div className="div2equal">
              <Input ref={email} type="email" label="Email *" />
              <Input ref={phone} type="number" label="Phone *" />
            </div>
            <div className="div2equal">
              <Input ref={position} type="text" label="Position *" />
              <Input ref={department} type="text" label="Department *" />
            </div>
            
            <Select
              ref={role}
              data={["Regular User", "Guest", "Admin", "Data Collector"]}
              label="Role *"
            />

            <div className="div2equal">
              <Input ref={password} type="password" label="Password *" />
              <Input
                ref={cpassword}
                type="password"
                label="Confirm Password *"
              />
            </div>
            <Button handleClick={createUser} value="Submit" />
          </form>
          {loading && <WaveLoading />}
        </div>
      </div>
    </div>
  );
};
