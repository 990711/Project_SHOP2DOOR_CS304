import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Customer.css";
import { useUser } from "./UserContext";
import CustomerRegisterService from "../../Services/CustomerRegisterService";
import profile_icon from "../../assets/profile_icon.png";
import Popup from "./PopupMessage";

const CustomerProfile = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useUser();

  const [customer, setCustomer] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    username: "",
    password: "",
    role: "",
  });
  const [isUpdated, setIsUpdated] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    CustomerRegisterService.getCustomerByUserName(state.username)
      .then((response) => {
        setCustomer(response.data);
        setUpdatedDetails({
          name: response.data.name,
          email: response.data.email,
          address: response.data.address,
          phone: response.data.phone,
          username: response.data.username,
          password: response.data.password,
          role: response.data.role,
        });

        console.log(updatedDetails);
      })
      .catch((error) => {
        console.error("Error fetching customer:", error);
      });
  }, [isUpdated]);

  const handleUpdateDetails = async () => {
    try {
      const response = await CustomerRegisterService.updateCustomer(
        updatedDetails
      );
      console.log("Response:", response?.data);
      setIsUpdated(!isUpdated);
      setShowPopup(true);
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div className="customer-header">
        <h1 className="customer-header-name">SHOP2DOOR</h1>
      </div>

      <div
        className="profile-details-area"
        style={{ flexGrow: 1, margin: "20px" }}
      >
        {/* Display customer details */}
        <h2>Customer Profile</h2>
        <div className="customer-profile">
          <img
            src={profile_icon}
            alt="Profile"
            className="customer-profile-image"
          />
        </div>
        <form className="profile-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={updatedDetails.name}
              onChange={(e) =>
                setUpdatedDetails({ ...updatedDetails, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              className="form-control"
              value={updatedDetails.email}
              onChange={(e) =>
                setUpdatedDetails({ ...updatedDetails, email: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              className="form-control"
              value={updatedDetails.address}
              onChange={(e) =>
                setUpdatedDetails({
                  ...updatedDetails,
                  address: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              className="form-control"
              value={updatedDetails.phone}
              onChange={(e) =>
                setUpdatedDetails({
                  ...updatedDetails,
                  phone: e.target.value,
                })
              }
            />
          </div>
          <div className="shopping-cart-btn-panel">
            <button
              type="button"
              className="shopping-btn user-update-btn"
              onClick={handleUpdateDetails}
            >
              Update Details
            </button>
          </div>
        </form>
      </div>
      {showPopup && (
        <Popup
          message="Profile updated successfully!"
          onClose={handlePopupClose}
        />
      )}
    </div>
  );
};

export default CustomerProfile;
