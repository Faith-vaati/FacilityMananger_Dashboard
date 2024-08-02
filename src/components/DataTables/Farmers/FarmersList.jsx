import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../Styles/agrodealerslist.scss";
import {
  faPencil,
  faPlus,
  faTrash,
  faPlusCircle,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import WaveLoading from "../../Util/WaveLoading";
import NewFarmerForm from "./NewFarmer";

export default function FarmersList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/farmers`, {
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
  }, [refresh]);

  const deleteFarmer = (id) => {
    setLoading(true);
    fetch(`/api/farmer/delete/${id}`, {
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

  return (
    <div className="agrodealers">
      <div className="container">
        <div className="top">
          <h4>Farmers</h4>
          <div>
            <button className="btn-outline" onClick={() => setShowForm(true)}>
              <FontAwesomeIcon icon={faPlus} />
              &nbsp;&nbsp; Add Farmer
            </button>
          </div>
        </div>

        <div className="filter">
          <div className="add">
            <FontAwesomeIcon icon={filter ? faCircleXmark :faPlusCircle} />
            <p>{filter ? "Close Filter" : "Add Filter"}</p>
          </div>
        </div>

        <div className="t-head">
          <h4>No.</h4>
          <h4>Name</h4>
          <h4>Farmer Type</h4>
          <h4>Farming Type</h4>
          <h4>Actions</h4>
        </div>

        <div>
          {data &&
            data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="t-body"
                  onClick={() => {
                    window.location.href = `/farmer/${item.FarmerID}`;
                  }}
                >
                  <div className="index">{index + 1}</div>
                  <div>
                    <h5>{item.Name}</h5>
                    <p>{item.Phone}</p>
                  </div>
                  <div>
                    <h5>{item.FarmerType}</h5>
                  </div>
                  <div>
                    <p>{item.FarmingType}</p>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faPencil} className="fa" />
                    &nbsp;&nbsp;
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="fa"
                      onClick={(e) => {
                        deleteFarmer(item.FarmerID);
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        {loading && <WaveLoading />}
      </div>
      {showForm && (
        <NewFarmerForm
          setShowForm={setShowForm}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
};
