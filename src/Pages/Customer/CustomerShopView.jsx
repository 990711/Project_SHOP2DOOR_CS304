import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemsServices from "../../Services/ItemsService";
import "../../styles/Customer.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Modal from "react-modal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ItemBox from "./ItemBox";

Modal.setAppElement("#root");

const CustomerViewShop = () => {
  const { shop_name, branch, ShopCode } = useParams();
  const navigate = useNavigate();
  const ShopId = (ShopCode - 1234) / 1000;

  const [searchTerm, setSearchTerm] = useState("");
  const [Items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [itemsByCategory, setItemsByCategory] = useState({});
  const [currentTab, setCurrentTab] = useState(0); // Track the current active tab

  useEffect(() => {
    ItemsServices.GetItemsByShopID(ShopId)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shops:", error);
      });
  }, [ShopId]);

  useEffect(() => {
    setCategories(getCategories(Items));
    setItemsByCategory(separateItemsIntoCategories(Items));
  }, [Items]);

  const getCategories = (data) => {
    let categories = [...new Set(data.map((item) => item.category))];
    return categories;
  };

  const separateItemsIntoCategories = (items) => {
    let itemsByCategory = {};

    items.forEach((item) => {
      if (itemsByCategory[item.category]) {
        itemsByCategory[item.category].items.push(item);
        itemsByCategory[item.category].count++;
      } else {
        itemsByCategory[item.category] = { items: [item], count: 1 };
      }
    });

    return itemsByCategory;
  };

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

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
        <ShoppingCartIcon className="customer-header-icons" />
      </div>
      <div className="customer-shop-view-header">
        <h2>{shop_name + " - " + branch}</h2>
      </div>

      <div className="shop-view-tabs">
        <Tabs>
          <TabList>
            {categories.map((category, index) => (
              <Tab key={index}>{category}</Tab>
            ))}
          </TabList>

          {categories.map((category, index) => (
            <TabPanel key={index}>
              {/* Render items based on the selected category */}
              <div className="shop-view-tabs-container">
              {itemsByCategory[category] && Array.isArray(itemsByCategory[category].items) && (
  itemsByCategory[category].items.map((item) => (
    <ItemBox key={item.id} item={item} itemsCount={itemsByCategory[category].count} />
  ))
)}
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerViewShop;