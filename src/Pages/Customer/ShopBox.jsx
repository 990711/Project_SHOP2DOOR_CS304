import React from "react";
import { Link } from "react-router-dom";

const ShopBox = ({ shop }) => {
  const imageUrl = `../../../${shop.shop_name}.jpg`;

  return (
    <Link to={`/${shop.shop_id}`} className="shop-box-link">
      <div className="shop-box">
        <img className="shop-box-img" src={imageUrl} alt={shop.shop_name} />
        <h4>{shop.shop_name}</h4>
        <p>{shop.branch}</p>
      </div>
    </Link>
  );
};

export default ShopBox;
