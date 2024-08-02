import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../Styles/productslist.scss";
import { 
  faTrash, 
  faPlus, 
  faTimes, faCircleXmark, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Select from "../Users/UserSelect";
import Input from "../Users/UserInput";
import Button from "../Util/Button";
import WaveLoading from "../Util/WaveLoading";

export default function ProductsList() {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products`, {
      method: "get",      
    })
    .then((res) => {
      if (res.ok) return res.json();
      else throw Error("Fetch Failed!")
    })
    .then((data) => {
      setData(data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    })
  }, [refresh, offset]);

  return (
    <div className="agrodealers">
      <div className="container">
        <div className="top">
          <h4>Products</h4>
          <div>
            <button className="btn-outline" onClick={() => setClicked(true)}>
              <FontAwesomeIcon icon={faPlus} />&nbsp;&nbsp;
              Add Product
            </button>
          </div>
        </div>

        <div className="filter">
          <div className="add">
            <FontAwesomeIcon icon={filter ? faCircleXmark :faPlusCircle} />
            <p>{filter ? "Close Filter" : "Add Filter"}</p>
          </div>
        </div>
        <div className="head">
          <h4>No.</h4>
          <h4>Name</h4>
          <h4>Type</h4>
          <h4>Application Method</h4>
          <h4>Target</h4>
          <h4>Actions</h4>
        </div>

        <div>
          {data && 
            data.map((item, index) => {
              return (
                <div key={index} className="body">
                  <div className="index">{index + 1}</div>
                    <h5>{item.Name}</h5>
                    <div>                      
                      <h5>{item.Type}</h5>
                      <p>{item.Manufucturer}</p>
                    </div>
                    <p>{item.ApplicationMethod}</p>
                    <p>{item.Target}</p>
                  <div>
                    <FontAwesomeIcon 
                      icon={faTrash} 
                      className="fa" 
                      // onClick={() => deleteDealer(item.AgroDealerID)}
                    />
                  </div>
                </div>
              )
            })
          }
        </div>
        {loading && <WaveLoading />}
      </div>      
      {clicked 
        && 
        <Popup
          clicked={clicked} 
          setClicked={setClicked}
          refresh={refresh} 
          setRefresh={setRefresh}
        />
      }
    </div>
  );
}

const Popup = (props) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const targets = ["Crops", "Livestock"];
  const categories = [
    "Fertilizers",
    "Farm Equipment",
    "Pest and Disease Controls",
    "Breeding Supplies",
    "Feed and Supplements",
    "Veterinary Instruments",
  ];

  const nameRef = useRef();
  const manufacturerRef = useRef();
  const applicationMethodRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();
  const targetRef = useRef();
  const typeRef = useRef();
  const categoryRef = useRef();

  const createProduct = () => {
    const body = {
      Name: nameRef.current.value,
      Type: typeRef.current.value,
      Categories: categoryRef.current.value,
      Manufucturer: manufacturerRef.current.value,
      ApplicationMethod: applicationMethodRef.current.value,
      Target: targetRef.current.value,
      Description: descriptionRef.current.value,
      File: imageRef.current.value,
    };

    setError("");
    setLoading(true);

    const validateForm = () => {
      if (
        !body.Name ||
        !body.Manufucturer ||
        !body.ApplicationMethod ||
        !body.Description ||
        !body.File ||
        !body.Target ||
        !body.Type ||
        !body.Categories
      ) {
        setError("All fields are required");
        return false;
      }
      return true;
    };

    if (validateForm()) {
      fetch("/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {          
          if (data.success) {
            props.setClicked(false);
            props.setRefresh(!props.refresh);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error creating product:", err);
          setError("An error occurred");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="popup">
      <div className="wrap">
        <div className="head">
          <h3>New Product</h3>
          <FontAwesomeIcon
            onClick={() => props.setClicked(false)}
            className="fa-times"
            icon={faTimes}
          />
        </div>

        <hr />
        <div className="new">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Select data={categories} ref={categoryRef} label="Category*" />
            <Input ref={typeRef} label="Type*" />
            <Input type="text" ref={nameRef} label="Product Name*" />
            <Input type="text" ref={manufacturerRef} label="Manufacturer*" />
            <Input
              type="text"
              ref={applicationMethodRef}
              label="Application Method*"
            />
            <Select data={targets} ref={targetRef} label="Target*" />
            <Input type="textarea" ref={descriptionRef} label="Description*" />
            <Input type="file" ref={imageRef} label="Image*" />
            <h6>{error}</h6>
            <Button handleClick={createProduct} value="Submit" />
          </form>
          {loading && <WaveLoading />}
        </div>
      </div>
    </div>
  );
};
