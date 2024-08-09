import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../Styles/tenants.scss';
import { faFilter, faPlus, faSearch, faToggleOn } from '@fortawesome/free-solid-svg-icons';
export default function Tenants() {
  return (
    <div>
      <div className="tenants">
        <div className="top">
          <div className="add">
            <FontAwesomeIcon className="add-icon" icon={faPlus} />
            <p>New Tenant</p>
          </div>
          <div className="search">
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
            <input type="text" placeholder="Search" />
          </div>
          <div className="filter">
            <div className="month">
              <p>Month</p>
              <FontAwesomeIcon className="filter-icon" icon={faFilter} />
            </div>
            <p>Year</p>
          </div>
        </div>
        <div className="title">
          <p>Rent Due</p>
          <FontAwesomeIcon className="switch-icon" icon={faToggleOn} />
        </div>
        <div className="list">
          <div className="list__top">
            <p></p>
            <p>Name</p>
            <p>House Number</p>
            <p>Rent Amount</p>
            <p>Rent Status</p>
            <p>Phone Number</p>
            <p>Actions</p>
          </div>
          <div className="list__content">
            <p>John Doe</p>
            <p>2A</p>
            <p>₦ 100,000</p>
            <p>12th May, 2023</p>
            <p>08012345678</p>
            <p>fdjdk</p>
            <p>fdjdk</p>
          </div>
        </div>
      </div>
    </div>
  );
}
