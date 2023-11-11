import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/Grocery Delivery Final.png";

const ProductBox = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-box-link">
      <div className="product-box">
        <img src={product.productImg} alt={product.name} />
        <h5>{product.name}</h5>
        <p>Unit Price: Rs.{product.price}</p>
      </div>
    </Link>
  );
};

export default ProductBox;
