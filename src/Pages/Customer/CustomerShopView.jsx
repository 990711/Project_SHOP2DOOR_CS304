import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShopOwnerRegisterService from "../../Services/ShopOwnerRegisterService";
import "../../styles/Customer.css";

import Modal from "react-modal"; // Import react-modal
Modal.setAppElement("#root"); // Set the root element of your app

const CustomerViewShop = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  useEffect(() => {
    ShopOwnerRegisterService.getShopOwners()
      .then((response) => {
        setShops(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shops:", error);
      });
  }, []);

  const filteredShops = shops.filter((shop) =>
    shop.shop_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (shop) => {
    setSelectedShop(shop);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedShop(null);
  };

  return (
    <div className="title">
      <button onClick={() => navigate("/customermainlayout/dashboard")}>
        SHOP2DOOR
      </button>

      <div style={{ display: "flex", alignItems: "center", marginLeft: "2px" }}>
        <div style={{ flexGrow: 1, margin: "20px" }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "75%" }}
          />
          <div className="dashboard-content">
            {/* Items goes here */}
            <h1>Shops</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerViewShop;
