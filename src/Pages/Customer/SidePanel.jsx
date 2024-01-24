import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import Font Awesome
import {
  faHome,
  faClipboardList,
  faList,
  faEnvelope,
  faQuestionCircle,
  faCog,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const SidePanel = () => {
  const location = useLocation();

  return (
    <div className="sidePanel">
      <Link
        to="/customermainlayout/dashboard"
        className={
          location.pathname === "/customermainlayout/dashboard" ||
          location.pathname.includes("/customermainlayout/shop/")
            ? "active"
            : ""
        }
      >
        <FontAwesomeIcon icon={faHome} className="fa-icon" /> Dashboard
      </Link>
      <Link
        to="/customermainlayout/orders"
        className={
          location.pathname === "/customermainlayout/orders" ? "active" : ""
        }
      >
        <FontAwesomeIcon icon={faClipboardList} className="fa-icon" /> Orders
      </Link>

      <Link
        to="/customermainlayout/categories"
        className={
          location.pathname === "/customermainlayout/categories" ? "active" : ""
        }
      >
        <FontAwesomeIcon icon={faList} className="fa-icon" /> Categories
      </Link>

      <Link
        to="/customermainlayout/cart"
        className={
          location.pathname === "/customermainlayout/cart" ? "active" : ""
        }
      >
        <FontAwesomeIcon icon={faShoppingCart} className="fa-icon" /> Shopping
        Cart
      </Link>

      <Link to="#" className={location.pathname === "/" ? "active" : ""}>
        <FontAwesomeIcon icon={faEnvelope} className="fa-icon" /> Message
      </Link>
      <Link to="#" className={location.pathname === "/" ? "active" : ""}>
        <FontAwesomeIcon icon={faQuestionCircle} className="fa-icon" /> Help
      </Link>
      <Link
        to="/customermainlayout/profile"
        className={
          location.pathname === "/customermainlayout/profile" ? "active" : ""
        }
      >
        <FontAwesomeIcon icon={faUser} className="fa-icon" /> Profile
      </Link>
    </div>
  );
};

export default SidePanel;
