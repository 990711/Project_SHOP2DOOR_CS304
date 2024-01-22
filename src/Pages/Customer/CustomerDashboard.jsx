import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ShopOwnerRegisterService from "../../Services/ShopOwnerRegisterService";
import OrderService from "../../Services/OrderService";
import "../../styles/Customer.css";
import ShopBox from "./ShopBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useUser } from "./UserContext";

import Modal from "react-modal"; // Import react-modal
Modal.setAppElement("#root"); // Set the root element of your app

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [selectedShops, setSelectedShops] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const { state, dispatch } = useUser();

  useEffect(() => {
    ShopOwnerRegisterService.getShopOwners()
      .then((response) => {
        setShops(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shops:", error);
      });
  }, []);

  useEffect(() => {
    OrderService.createNewOrder(state.username)
      .then((response) => {
        console.log(response.data.order_id);
        dispatch({ type: 'ADD_ORDER_ID', payload: { orderID: response.data.order_id } });
      })
      .catch((error) => {
        console.error("Error fetching shops:", error);
      });
  }, []);

  // Filter shops by search term
  const filteredShops = shops.filter((shop) =>
    shop.shop_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="customer-header">
        <h1 className="customer-header-name">SHOP2DOOR</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="customer-header-search"
        />
        <Link to="/customermainlayout/cart" className="customer-header-icons">
          <ShoppingCartIcon className="customer-header-icons" />
        </Link>
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
