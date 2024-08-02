import React, { useEffect, useState } from "react";

function formatDate(inputDate) {
  const date = new Date(inputDate);

  // Format the day with the appropriate suffix
  const day = date.getDate();
  const dayWithSuffix = getDayWithSuffix(day);

  const options = { year: "numeric", month: "short" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return `${dayWithSuffix} ${formattedDate}`;
}

function getDayWithSuffix(day) {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }

  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

export default function SelectedUser(props) {

  const [userID, setUserID] = useState(null);

  useEffect(() => {
    if (props?.userDetails?.ERTeamID) {
      setUserID(props?.userDetails?.ERTeamID);
    } else {
      setUserID(props?.userDetails?.UserID);
    }
  }, [userID]);
 
  function updateUser(status) {
    props.setLoading(true);
    fetch(`/api/${props.url}/${userID}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ Status: !status }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else throw Error("");
      })
      .then((data) => {
        props.setLoading(false);
        props.setRefresh(!props.refresh);

        window.location.reload();
      })
      .catch((err) => {
        props.setLoading(false);
      });
  }

  function deleteUser() {
    props.setLoading(true);
    fetch(`/api/${props.url}/${userID}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else throw Error("");
      })
      .then((data) => {
        props.setLoading(false);
        props.setRefresh(!props.refresh);

        window.location.reload();
      })
      .catch((err) => {
        props.setLoading(false);
      });
  }

  return (
    <>
      <p>Name: {props?.userDetails?.Name}</p>
      <p>Email: {props?.userDetails?.Email}</p>
      <p>Phone: {props?.userDetails?.Phone}</p>
      {props?.userDetails?.Gender && <p>Gender: {props?.userDetails?.Gender}</p>}
      {props?.userDetails?.Position && <p>Position: {props?.userDetails?.Position}</p>}
      {props?.userDetails?.Department && <p>Department: {props?.userDetails?.Department}</p>}
      {props?.userDetails?.Role && <p>Role: {props?.userDetails?.Role}</p>}
      {props?.userDetails?.OrganisationName && <p>Organisation Name: {props?.userDetails?.OrganisationName}</p>}
      {props?.userDetails?.Service && <p>Service: {props?.userDetails?.Service}</p>}
      {props?.userDetails?.TotalResponses && <p>Total Responses: {props?.userDetails?.TotalResponses}</p>}
      {props?.userDetails?.City && <p>City: {props?.userDetails?.City}</p>}
      {props?.userDetails?.Address && <p>Address: {props?.userDetails?.Address}</p>}
      {props?.userDetails?.BuildingName && <p>BuildingName: {props?.userDetails?.BuildingName}</p>}
      {props?.userDetails?.OfficeNumber && <p>OfficeNumber: {props?.userDetails?.OfficeNumber}</p>}
      {props?.userDetails?.Landmark && <p>Landmark: {props?.userDetails?.Landmark}</p>}
      <p>Status: {props?.userDetails?.Status ? "Active" : "Disabled"}</p>
      <p>Date Created: {formatDate(props?.userDetails?.createdAt)}</p>
      <p>Date Updated: {formatDate(props?.userDetails?.updatedAt)}</p>

      <div className="actions">
        <h6
          onClick={() => {
            updateUser(props?.userDetails?.Status);
          }}
        >
          {props?.userDetails?.Status ? "Deactivate" : "Activate"}
        </h6>
        <h6
          onClick={() => {
            deleteUser();
          }}
        >
          Delete
        </h6>
      </div>
    </>
  );
}
