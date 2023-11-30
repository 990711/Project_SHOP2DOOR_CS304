import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShopOwnerRegisterService from "../../Services/ShopOwnerRegisterService";
import "../../styles/Customer.css";
import ShopBox from "./ShopBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Modal from "react-modal"; // Import react-modal
Modal.setAppElement("#root"); // Set the root element of your app

const CustomerDashboard = () => {
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
    <div>
      <div className="customer-header">
        <h1
          className="customer-header-name"
          // onClick={() => navigate("/customermainlayout/dashboard")}
        >
          SHOP2DOOR
        </h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="customer-header-search"
        />
        <ShoppingCartIcon className="customer-header-icons" />
      </div>

      <div style={{ flexGrow: 1, margin: "20px" }}>
        <div className="dashboard-content">
          {filteredShops.map((shop, index) => (
            <ShopBox key={index} shop={shop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
