import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Input from "../../Util/InputF";
import Button from "../../Util/Button";
import WaveLoading from "../../Util/WaveLoading";

export default function NewFarmer(props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const NameRef = useRef();
  const PhoneRef = useRef();
  const FarmerTypeRef = useRef();
  const FarmingTypeRef = useRef();
  const LongitudeRef = useRef();
  const LatitudeRef = useRef();

  const createFarmer = () => {
    const body = {
      Name: NameRef.current.value,
      Phone: PhoneRef.current.value,
      Password: "123456",
      FarmerType: FarmerTypeRef.current.value,
      FarmingType: FarmingTypeRef.current.value,
      Longitude: LongitudeRef.current.value,
      Latitude: LatitudeRef.current.value,
    };

    console.log(body);

    const validateForm = () => {
      if (!body.Name || !body.Phone || !body.Longitude || !body.Latitude) {
        setError("All fields are required");
        setLoading(false);
        return false;
      }
      return true;
    };

    if (validateForm()) {
      setLoading(true);
      fetch(`/api/farmer/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to create dealer");
          }
          return res.json();
        })
        .then((data) => {
            if(data.error){
                setError(data.error);
                setLoading(false);
                return;
            } 
            setLoading(false);
            props.setRefresh(!props.refresh);
            props.setShowForm(false);
        })
        .catch((err) => {
          console.error("Error creating dealer:", err);
          setError("An error occurred");
          setLoading(false);
        });
    }
  };

  return (
    <div className="popup">
      <div className="wrap">
        <div className="head">
          <h3>Add New Farmer</h3>
          <FontAwesomeIcon
            className="fa"
            icon={faX}
            onClick={() => props.setShowForm(false)}
          />
        </div>
        <hr />
        <div className="form">
          <form onSubmit={(e) => e.preventDefault()}>
            <Input ref={NameRef} label="Name" type="text" />
            <Input ref={PhoneRef} label="Phone Number" type="number" />
            <Input ref={FarmerTypeRef} label="Farmer Type" type="text" />
            <Input ref={FarmingTypeRef} label="Farming Type" type="text" />

            <div className="div2equal">
              <Input ref={LongitudeRef} label="Longitude" type="number" />
              <Input ref={LatitudeRef} label="Latitude" type="number" />
            </div>
            <h6>{error}</h6>
            <Button value="Add Farmer" handleClick={createFarmer} />
          </form>
        </div>
      </div>
      {loading && <WaveLoading />}
    </div>
  );
};