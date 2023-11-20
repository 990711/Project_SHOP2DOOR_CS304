import React from "react";
import CustomerProfilePage from "./pages/CustomerProfilePage";
import "./App.css";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ProductListing from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductListing';
<<<<<<< HEAD
import JobListing from './Pages/ShopOwner/ShopOwner_JobPostings/JobListing';
import Register from './Pages/Register';
import Login from './Pages/Login';
=======
import { useState } from "react";
//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
//import RiderMap from "./Components/RiderMap";
import Rider_Header from "./Components/Rider_Header"
import Rider_Profile from "./Pages/Rider_Profile"
>>>>>>> 892b49535e4db6b5c9c60ad6ddee3f67e80fdda2

import Customer_Register from './Pages/Customer_Register';
import ShopOwner_Register from './Pages/ShopOwner_Register';
import Supplier_Register from './Pages/Supplier_Register';
import DeliveryRider_Register from './Pages/DeliveryRider_Register';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path = "/jobListing" element = {<JobListing />}></Route>
          <Route path = "/productListing" element = {<ProductListing />}></Route>
          <Route path = "/register" element = {<Register />}></Route>
          <Route path = "/login" element = {<Login />}></Route>
          <Route path = "/customerRegister" element = {<Customer_Register />}></Route>
          <Route path = "/shopOwnerRegister" element = {<ShopOwner_Register />}></Route>
          <Route path = "/supplierRegister" element = {<Supplier_Register />}></Route>
          <Route path = "/deliveryRiderRegister" element = {<DeliveryRider_Register />}></Route>
          

        </Routes>
      </Router>
    </div>
  );
}
export default App;


