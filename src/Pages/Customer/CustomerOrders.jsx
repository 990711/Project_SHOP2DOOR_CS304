import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShopOwner_ProductService from "../../Services/ShopOwner/ShopOwner_ProductService";
import "../../styles/Customer.css";

import Modal from "react-modal"; // Import react-modal
Modal.setAppElement("#root"); // Set the root element of your app

const CustomerOrders = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    ShopOwner_ProductService.getProducts().then((res) => {
      setProducts(res.data);
    });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
      <div className="title">
        <button onClick={() => navigate("/customermainlayout/dashboard")}>
          SHOP2DOOR
        </button>

        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "2px" }}
        >

        </div>
      </div>
  );
};

export default CustomerOrders;
