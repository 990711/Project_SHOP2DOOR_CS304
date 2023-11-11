import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/Grocery Delivery Final.png";

const ProductBoxModify = ({ product }) => {
  return (
    <Link to={`/productModify/${product.id}`} className="product-box-link">
      <div className="product-box">
        <img src={img} alt={product.name} />
        <h5>{product.name}</h5>
        <p>Unit Price: Rs.{product.price}</p>
      </div>
    </Link>
  );
};

export default ProductBoxModify;
