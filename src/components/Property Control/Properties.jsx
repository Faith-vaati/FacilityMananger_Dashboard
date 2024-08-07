import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../Styles/properties.scss";
import {
  faAdd,
  faArrowDown,
  faSearch,
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
    </div>
  );
}
