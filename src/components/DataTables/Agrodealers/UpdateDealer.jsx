import React, { useEffect, useState, useRef } from "react";
import Input from "../../Util/InputF";
import Button from "../../Util/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import WaveLoading from "../../Util/WaveLoading";

export default function UpdateDealer(props) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [error, setError] = useState("");

  const NameRef = useRef();
  const PhoneRef = useRef();
  const StoreNameRef = useRef();
  const CountyRef = useRef();
  const SubCountyRef = useRef();
  const WardRef = useRef();
  const MarketRef = useRef();
  const LongitudeRef = useRef();
  const LatitudeRef = useRef();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/agrodealers/${props.id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch dealer details");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      setDetails(data[0]);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching dealer details:", err);
      setLoading(false);
    });
  }, []);

  const updateDetails = () => {
    setLoading(true);
    setError("");

    const body = {
      Name: NameRef.current.value,
      Phone: PhoneRef.current.value,
      StoreName: StoreNameRef.current.value,
      County: CountyRef.current.value,
      SubCounty: SubCountyRef.current.value,
      Ward: WardRef.current.value,
      Market: MarketRef.current.value,
      Longitude: LongitudeRef.current.value,
      Latitude: LatitudeRef.current.value,
    };
    
    if (validateForm(body)) {
      fetch(`/api/agrodealers/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update dealer details");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          setLoading(false);
          props.setShowUpdateForm(false);
          props.setRefresh((prev) => !prev);
        } else {
          setError(data.error);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to update dealer details");
        setLoading(false);
      });
    }
  };

  const validateForm = (body) => {
    setLoading(true);
    if (body.Name.split(" ").length < 2 || !body.Name) {
      setError("Please enter at least two names");
      setLoading(false);
      return false;
    }
    if (body.Phone.length !== 10 || !body.Phone) {
      setError("Invalid phone number");
      setLoading(false);
      return false;
    }
    if (!body.County) {
      setError("County is required");
      setLoading(false);
      return false;
    }
    if (!body.SubCounty) {
      setError("Sub County is required");
      setLoading(false);
      return false;
    }
    if (!body.Ward) {
      setError("Ward is required");
      setLoading(false);
      return false;
    }
    // if any other record is empty set null as the value
    for (let key in body) {
      if (!body[key]) {
        body[key] = null;
      }
    }
    return true;
  };

  return (
    <div className="popup">
        <div className="wrap">
            <div className="head">
                <h3>Update details</h3>
                <FontAwesomeIcon 
                  icon={faX} 
                  onClick={() => props.setShowUpdateForm(false)} 
                  className="fa"
                />
            </div>
            <hr />
            <div className="form">
              <form onSubmit={(e) => e.preventDefault(e)}>
                <Input 
                  type="text"
                  label="Owner Name"
                  value={details.Name}
                  ref={NameRef}
                />
                <Input 
                  type="text"
                  label="Owner Phone"
                  value={details.Phone}
                  ref={PhoneRef}
                />
                <Input 
                  type="text"
                  label="Store Name"
                  value={details.StoreName}
                  ref={StoreNameRef}
                />
                <div className="div2equal">
                  <Input 
                    type="text"
                    label="County"
                    value={details.County}
                    ref={CountyRef}
                  />
                  <Input 
                    type="text"
                    label="Sub County"
                    value={details.SubCounty}
                    ref={SubCountyRef}
                  />
                </div>
                <div className="div2equal">
                  <Input 
                    type="text"
                    label="Ward"
                    value={details.Ward}
                    ref={WardRef}
                  />
                  <Input 
                    type="text"
                    label="Market"
                    value={details.Market}
                    ref={MarketRef}
                  />
                </div>
                <div className="div2equal">
                  <Input 
                    type="text"
                    label="Longitude"
                    value={details.Longitude}
                    ref={LongitudeRef}
                  />
                  <Input 
                    type="text"
                    label="Latitude"
                    value={details.Latitude}
                    ref={LatitudeRef}
                  />
                </div>
                <h6>{error}</h6>
                <Button value="Update Details" handleClick={updateDetails} />
              </form>
            </div>
        </div>
        {loading && <WaveLoading />}
    </div>
  );
};