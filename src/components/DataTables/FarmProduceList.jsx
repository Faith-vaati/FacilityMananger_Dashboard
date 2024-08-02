import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../Styles/farmproduce.scss";
import { faTrash, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Select from "../Users/UserSelect";
import Input from "../Users/UserInput";
import Button from "../Util/Button";
import WaveLoading from "../Util/WaveLoading";
import Pagination from "../Util/Pagination";

export default function FarmProduceList() {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/farmproduce/${offset}`, {
      method: "get",
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw Error("Fetch Failed!");
      })
      .then((data) => {
        setData(data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [refresh, offset]);

  return (
    <div className="farmproduce">
      <div className="container">
        <div className="top">
          <h4>Farm Produce</h4>
          <div>
            <button className="btn-outline" onClick={() => setClicked(true)}>
              <FontAwesomeIcon icon={faPlus} />
              &nbsp;&nbsp; Add Item
            </button>
          </div>
        </div>

        <div className="filters">
          <div className="">
            <button className="btn-outline">
              <FontAwesomeIcon icon={faPlus} className="fa-plus" />
              &nbsp;&nbsp;
              {toggleFilter ? "Close" : "Add"} Filter
            </button>
          </div>
        </div>
        <div className="head">
          <h4>No.</h4>
          <h4>Type</h4>
          <h4>Name</h4>
          <h4>Variety</h4>
          <h4>Actions</h4>
        </div>

        <div>
          {data &&
            data?.map((item, index) => {
              return (
                <div key={index} className="body">
                  <div className="index">{index + 1}</div>
                  <h5>{item.Type}</h5>
                  <h5>{item.Name}</h5>
                  <p>{item.Variety}</p>
                  <div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="fa"
                      // onClick={() => deleteDealer(item.AgroDealerID)}
                    />
                  </div>
                </div>
              );
            })}
          {data && (
            <Pagination
              total={data?.total}
              currentPage={offset}
              onPageChange={(v) => {
                setOffset(v);
              }}
            />
          )}
        </div>
        {loading && <WaveLoading />}
      </div>
      {clicked && (
        <Popup
          clicked={clicked}
          setClicked={setClicked}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
}

const Popup = (props) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const types = ["Crop", "Livestock"];

  const typeRef = useRef();
  const nameRef = useRef();
  const varietyRef = useRef();
  const imageRef = useRef();

  const [body, updateBody] = useState({
    Type: null,
    Name: null,
    Variety: null,
    File: null,
  });

  const createProduct = () => {
    console.log("clicked");
    let d = body;
    d.Type = typeRef.current.value;
    d.Name = nameRef.current.value;
    d.Variety = varietyRef.current.value;
    d.File = imageRef.current.files[0];

    updateBody(d);

    const chck = Object.values(d);
    let valid = true;
    chck.map((item) => {
      if (item === "") {
        valid = false;
      }
    });

    if (!valid) return setError("All fields are required!");
    if (d.File === undefined) return setError(" File is required!");
    setLoading(true);
    const formData = new FormData();

    for (const i in body) {
      formData.append(i, body[i]);
    }

    setError("");
    setLoading(true);

    fetch("/api/farmproduce/create", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "",
      },
      body: formData,
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
        console.log(err);
        setLoading(false);
        setError("Oops! Something went wrong!");
      });
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
            <Select data={types} ref={typeRef} label="Type*" />
            <Input type="text" ref={nameRef} label="Product Name*" />
            <Input type="text" ref={varietyRef} label="Variety*" />
            <div className="usrinput">
              <h4>Upload Image</h4>
              <input
                ref={imageRef}
                type="file"
                label="Upload File *"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                accept=".png, .jpg, .jpeg"
              />
            </div>
            <h6>{error}</h6>
            <Button handleClick={createProduct} value="Submit" />
          </form>
          {loading && <WaveLoading />}
        </div>
      </div>
    </div>
  );
};
