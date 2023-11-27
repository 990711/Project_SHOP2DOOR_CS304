import React from "react";
import { Link } from "react-router-dom";

const ShopBox = ({ shop }) => {
  return (
    <Link to={`/${shop.id}`} className="shop-box-link">
      <div className="shop-box">
        {/* <img src={shop.shopImg} alt={shop.name} /> */}
        <h4>{shop.shop_name}</h4>
        <p>Branch{shop.branch}</p>
      </div>
    </Link>
  );
};

export default ShopBox;
