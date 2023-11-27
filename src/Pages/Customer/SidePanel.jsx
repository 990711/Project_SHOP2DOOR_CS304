import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import Font Awesome
import { faHome, faClipboardList, faList, faEnvelope, faQuestionCircle, faCog } from "@fortawesome/free-solid-svg-icons";

const SidePanel = () => {
  const location = useLocation();

  return (
    <div className="sidePanel">
      <Link to="/customermainlayout/dashboard" className={location.pathname === "/customermainlayout/dashboard" ? "active" : ""}>
	  	<FontAwesomeIcon icon={faHome} className="fa-icon"/> Dashboard
      </Link>
      <Link to="/customermainlayout/orders" className={location.pathname === "/customermainlayout/orders" ? "active" : ""}>
        <FontAwesomeIcon icon={faClipboardList}  className="fa-icon"/> Orders
      </Link>
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        <FontAwesomeIcon icon={faList}  className="fa-icon"/> Categories
      </Link>
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        <FontAwesomeIcon icon={faEnvelope}  className="fa-icon"/> Message
      </Link>
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        <FontAwesomeIcon icon={faQuestionCircle}  className="fa-icon"/> Help
      </Link>
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        <FontAwesomeIcon icon={faCog}  className="fa-icon"/> Settings
      </Link>
      {/* Add more links for other pages */}
    </div>
  );
};

export default SidePanel;
