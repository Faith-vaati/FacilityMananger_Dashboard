import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../Styles/agrodealerslist.scss";
import { faCircleXmark, faPencil, faPlus, faPlusCircle, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import WaveLoading from "../../Util/WaveLoading";
import Input from "../../Util/InputF";
import Button from "../../Util/Button";
import UpdateDealer from "./UpdateDealer";
import Pagination from "../../Util/Pagination";

export default function AgrodealersList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentDealerID, setCurrentDealerID] = useState(null);
  const [filter, setFilter] = useState(false);
  const [column, setColumn] = useState(null);
  const [operator, setOperator] = useState(null);
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (!column || !operator || !value) {
      setLoading(true);
      fetch(`/api/agrodealers`, {
        method: "GET",
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    } else {
      setLoading(true);
      fetch(`/api/agrodealers/filter/${column}/${operator}/${value}`, {
        method: "GET",
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    }
  }, [refresh, column, operator, value]);

  const deleteDealer = (id) => {
    setLoading(true);
    fetch(`/api/agrodealers/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete dealer");
      }
      return res.json();
    })
    .then((data) => {
      console.log("Dealer deleted:", data);
      setLoading(false);
      setRefresh(!refresh);
    })
    .catch((err) => {
      console.error("Error deleting dealer:", err);
      setLoading(false);
    });
  };

  const handleEditClick = (id) => {
    setCurrentDealerID(id);
    setShowUpdateForm(true);
  };

  return (
    <div className="agrodealers">
      <div className="container">
        <div className="top">
          <h4>Agrodealers</h4>
          <div>
            <button className="btn-outline" onClick={() => setShowForm(true)}>
              <FontAwesomeIcon icon={faPlus} />&nbsp;&nbsp;
              Add Agrodealer
            </button>
          </div>
        </div>

        <div className="filter">
          <div 
            onClick={() => {
              if (!filter) {
                setFilter(true);
                setColumn("Name");
                setOperator("ILIKE");
              } else {
                setFilter(false);
                setColumn(null);
                setOperator(null);
                setValue(null);
              }
            }}
            className="add"
          >
            <FontAwesomeIcon icon={filter ? faCircleXmark :faPlusCircle} />
            <p>{filter ? "Close Filter" : "Add Filter"}</p>
          </div>
          {filter &&
            <div className="math">
              <select onChange={(e) => setColumn(e.target.value)}>
                <option value="Name">Name</option>
                <option value="Phone">Phone</option>
                <option value="StoreName">Store Name</option>
                <option value="Market">Market</option>
                <option value="County">County</option>
                <option value="SubCounty">Sub County</option>
                <option value="Ward">Ward</option>
              </select>
              <select onChange={(e) => setOperator(e.target.value)}>
                <option value="ILIKE">Contains</option>
                <option value="=">Equals</option>
              </select>
              <input 
                onChange={(e) => {
                  if (e.target.value === "") {
                    setValue(null);
                  } else {
                    setValue(e.target.value);
                  }
                }}
                type="text"
                placeholder="Value"
                required 
              />
              <button onClick={() => setFilter(false)}>
                close
              </button>
            </div>
          }
          {column && operator && value && (
            <div className="values">
              <p>{column}</p>
              <h6>{operator}</h6>
              <p>{value}</p>
              <FontAwesomeIcon 
                icon={faCircleXmark} 
                className="fa"
                onClick={() => {
                  setColumn(null);
                  setOperator(null);
                  setValue(null);
                }}
              />
            </div>
          )}
        </div>

        <div className="t-head">
          <h4>No.</h4>
          <h4>Name & Phone</h4>
          <h4>Store Name</h4>
          <h4>Market & Location</h4>
          <h4>Actions</h4>
        </div>

        <div >
          {data && 
            data.map((item, index) => {
              return (
                <div key={index} className="t-body">
                  <div className="index">{index + 1}</div>
                  <div>
                    <h5>{item.Name}</h5>
                    <p>{item.Phone}</p>
                  </div>
                  <div>
                    <p>{item.StoreName}</p>
                  </div>
                  <div>
                    <h5>{item.Market}</h5>
                    <p>{item.County}, {item.SubCounty}, {item.Ward}</p>
                  </div>
                  <div>
                    <FontAwesomeIcon 
                        icon={faPencil} 
                        className="fa"
                        onClick={() => handleEditClick(item.AgroDealerID)}
                    /> &nbsp;&nbsp;
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="fa"
                      onClick={() => deleteDealer(item.AgroDealerID)}
                    />
                  </div>                  
                </div>
              );
            })
          }
        </div>
        <Pagination total={data.length} />
        {loading && <WaveLoading />}
      </div>      
      {showForm 
        && 
        <NewDealerForm
          setShowForm={setShowForm} 
          refresh={refresh} 
          setRefresh={setRefresh}
        />
      }
      {showUpdateForm && 
        <UpdateDealer 
          setRefresh={setRefresh} 
          setShowUpdateForm={setShowUpdateForm} 
          id={currentDealerID} 
        />
      }
    </div>
  );
};


const NewDealerForm = (props) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const NameRef = useRef();
  const PhoneRef = useRef();
  const StoreNameRef = useRef();
  const CountyRef = useRef();
  const SubCountyRef = useRef();
  const WardRef = useRef();
  const MarketRef = useRef();
  const LongitudeRef = useRef();
  const LatitudeRef = useRef();


  const createDealer = () => {
    const body = {
      Name: NameRef.current.value,
      Phone: PhoneRef.current.value,
      Password: "123456",
      StoreName: StoreNameRef.current.value,
      County: CountyRef.current.value,
      SubCounty: SubCountyRef.current.value,
      Ward: WardRef.current.value,
      Market: MarketRef.current.value,
      Longitude: LongitudeRef.current.value,
      Latitude: LatitudeRef.current.value,
    };

    console.log(body);

    const validateForm = () => {
      if (body.Name.split(" ").length < 2) {
        setError("Please enter at least two names");
        setLoading(false);
        return false;
      }
      if (body.Phone.length !== 10) {
        setError("Invalid phone number");
        setLoading(false);
        return false;
      }
      if (
        !body.Name ||
        !body.Phone ||
        !body.StoreName ||
        !body.County ||
        !body.SubCounty ||
        !body.Ward ||
        !body.Market ||
        !body.Longitude ||
        !body.Latitude
      ) {
        setError("All fields are required");
        setLoading(false);
        return false;
      }
      
      return true;
    };

    if (validateForm()) {
      setLoading(true);
      fetch(`/api/agrodealers/create`, {
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
        console.log(data);
        if (data.error) {
          setError(data.error);
          setLoading(false);
          return;
        } else {
          setLoading(false);
          props.setRefresh(!props.refresh);
          props.setShowForm(false);
        }
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
          <h3>Add New Agrodealer</h3>
          <FontAwesomeIcon className="fa" icon={faX} onClick={() => props.setShowForm(false)}/>          
        </div>
        <hr />
        <div className="form">
          <form onSubmit={(e) => e.preventDefault()}>            
            <Input ref={NameRef} label="Owner Name" type="text" />
            <Input ref={PhoneRef} label="Phone Number" type="number" />
            <Input ref={StoreNameRef} label="Store Name" type="text" />
            <div className="div2equal">
              <Input ref={CountyRef} label="County" type="text" />
              <Input ref={SubCountyRef} label="Sub County" type="text" />
            </div>
            <div className="div2equal">
              <Input ref={WardRef} label="Ward" type="text" />
              <Input ref={MarketRef} label="Market" type="text" />
            </div>

            <div className="div2equal">
              <Input ref={LongitudeRef} label="Longitude" type="number" />
              <Input ref={LatitudeRef} label="Latitude" type="number" />
            </div>
            <h6>{error}</h6>
            <Button value="Add Agrodealer" handleClick={createDealer}/>
          </form>
        </div>
      </div>
      {loading && <WaveLoading />}
    </div>
  )
};