import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation, faCogs } from "@fortawesome/free-solid-svg-icons";
import b1 from "../../assets/images/b1.jpg";
import b2 from "../../assets/images/b2.jpg";
import b3 from "../../assets/images/b3.jpg";
import b4 from "../../assets/images/b4.jpg";
import b5 from "../../assets/images/b5.jpg";

const properties = [
  {
    id: 1,
    image: b1,
    name: "Property Name 1",
    type: "Residential",
    address: "123 Main St",
    occupants: 1000,
  },
  {
    id: 2,
    image: b2,
    name: "Property Name 2",
    type: "Commercial",
    address: "456 Market St",
    occupants: 500,
  },
  {
    id: 3,
    image: b3,
    name: "Property Name 3",
    type: "Commercial",
    address: "456 Market St",
    occupants: 500,
  },
  {
    id: 4,
    image: b4,
    name: "Property Name 4",
    type: "Commercial",
    address: "456 Market St",
    occupants: 500,
  },
  {
    id: 5,
    image: b5,
    name: "Property Name 5",
    type: "Residential",
    address: "456 Market St",
    occupants: 500,
  },
];

const PropertyGrid = () => (
  <div className="display__grid">
    {properties.map((property) => (
      <div key={property.id} className="grid__column">
        <p className="grid__column--image">
          <img src={property.image} alt={property.name} />
        </p>
        <p className="grid__column--name">{property.name}</p>
        <p className="grid__column--type">{property.type}</p>
        <p className="grid__column--address">
          <FontAwesomeIcon className="location" icon={faLocation} />
          {property.address}
        </p>
        <p className="grid__column--occupants">
          <span className="number">{property.occupants}</span> Occupants
        </p>
        <p className="grid__column--manage">
          <FontAwesomeIcon className="settings" icon={faCogs} />
          Manage Assets
        </p>
      </div>
    ))}
  </div>
);

export default PropertyGrid;
