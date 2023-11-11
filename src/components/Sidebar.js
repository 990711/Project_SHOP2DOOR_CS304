// Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import Font Awesome
import { faShoppingCart, faPlusCircle, faEdit, faList, faFile, faUser } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <Link to="/products" className={location.pathname === "/products" ? "active" : ""}>
	  	<FontAwesomeIcon icon={faShoppingCart} className="fa-icon"/> My Products
      </Link>
      <Link to="/addProducts" className={location.pathname === "/addProducts" ? "active" : ""}>
        <FontAwesomeIcon icon={faPlusCircle}  className="fa-icon"/> Add Products
      </Link>
      <Link to="/modifyProduct" className={location.pathname === "/modifyProduct" ? "active" : ""}>
        <FontAwesomeIcon icon={faEdit}  className="fa-icon"/> Modify Products
      </Link>
      <Link to="/inventory" className={location.pathname === "/inventory" ? "active" : ""}>
        <FontAwesomeIcon icon={faList}  className="fa-icon"/> Inventory
      </Link>
      <Link to="/addRecord" className={location.pathname === "/addRecord" ? "active" : ""}>
        <FontAwesomeIcon icon={faFile}  className="fa-icon"/> Add New Record
      </Link>
      <Link to="/foodSupplier" className={location.pathname === "/foodSupplier" ? "active" : ""}>
        <FontAwesomeIcon icon={faUser}  className="fa-icon"/> Profile
      </Link>
      {/* Add more links for other pages */}
    </div>
  );
};

export default Sidebar;
