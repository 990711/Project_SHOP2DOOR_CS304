import React from "react";
import { Link } from "react-router-dom";

const ShopBox = ({ shop }) => {
  const imageUrl = `../../../${shop.shop_id % 4}.jpg`;

  return (
    <Link to={`/customermainlayout/shop/${shop.shop_name}`} className="shop-box-link">
      <div className="shop-box">
        <img className="shop-box-img" src={imageUrl} alt={shop.shop_name} />
        <h4>{shop.shop_name}</h4>
        <p>{shop.branch}</p>
      </div>
    </Link>
  );
};

export default ShopBox;
