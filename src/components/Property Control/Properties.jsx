import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../Styles/properties.scss";
import b1 from "../../assets/images/b1.jpg";
import {
  faAdd,
  faArrowDown,
  faCogs,
  faList,
  faLocation,
  faSearch,
  faTable,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Properties() {
  return (
    <div className="properties">
      <div className="top">
        <div className="top-left">
          <div className="top__grid1">
            <div className="top__grid1--icon">
              <FontAwesomeIcon className="user" icon={faUser} />
              <p>Tenants</p>
            </div>
            <FontAwesomeIcon className="drop-down" icon={faArrowDown} />
            <p className="text">ajksdg</p>
          </div>
          <div className="top__grid1">
            <div className="top__grid1--icon">
              <FontAwesomeIcon className="user" icon={faUser} />
              <p>Tenants</p>
            </div>
            <FontAwesomeIcon className="drop-down" icon={faArrowDown} />
            <p className="text">ajksdg</p>
          </div>
          <div className="top__grid3">
            <div className="search-bar">
              {" "}
              <input type="text" placeholder="Search Property" />
              <FontAwesomeIcon className="search" icon={faSearch} />
            </div>
          </div>
        </div>
        <div className="top-right">
          <div></div>
          <div className="add-property">
            <FontAwesomeIcon className="add" icon={faAdd} />
            <p>Add Property</p>
          </div>
          <div></div>
          <></>
        </div>
      </div>
      <div className="dispaly">
        <div className="display__top">
          <FontAwesomeIcon className="list" icon={faList} />
          <FontAwesomeIcon className="grid" icon={faTable} />
        </div>
        <div className="display__grid">
          <div className="grid__column">
            <p className="grid__column--image">
              <img src={b1} alt="property" />
            </p>
            <p className="grid__column--name">Property Name</p>
            <p className="grid__column--type">Property Type</p>
            <p className="grid__column--address">
              <FontAwesomeIcon className="location" icon={faLocation} />
              Address
            </p>
            <p className="grid__column--occupants">
              <span className="number">1000</span>  Occupants
            </p>
            <p className="grid__column--manage">
                <FontAwesomeIcon className="settings" icon={faCogs} />
                Manage Assets
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
