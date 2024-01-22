import "./App.css";
import React, { useState } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ProductListing from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductListing';
import CreateProduct from './Pages/ShopOwner/ShopOwner_ProductManagement/CreateProduct';
import UpdateProduct from './Pages/ShopOwner/ShopOwner_ProductManagement/UpdateProduct';
import Image from './Pages/Authentication/Register_Forms/Image';


import AddJobPosting from './Pages/ShopOwner/ShopOwner_JobPostings/AddJobPosting';
import UpdateJobPosting from './Pages/ShopOwner/ShopOwner_JobPostings/UpdateJobPosting';
import OrderManagement from './Pages/ShopOwner/ShopOwner_Orders/OrderManagement';
import PayemntIntegration from './Pages/ShopOwner/ShopOwner_Orders/PayemntIntegration';
import DeliverySheduling from './Pages/ShopOwner/ShopOwner_Orders/DeliverySheduling';
import RiderManagement from './Pages/ShopOwner/ShopOwner_Orders/RiderManagement';
import InventoryTracking from './Pages/ShopOwner/ShopOwner_Inventory/InventoryTracking';
import Promotions from './Pages/ShopOwner/ShopOwner_Promotions/Promotions';
import ShopAnalytics from './Pages/ShopOwner/ShopOwner_Analytics/ShopAnalytics';
import SupplierInteraction from './Pages/ShopOwner/ShopOwner_Suppliers/SupplierInteraction';
import SupplierPayments from './Pages/ShopOwner/ShopOwner_Suppliers/SupplierPayments';
import UserInteraction from './Pages/ShopOwner/ShopOwner_Support/UserInteraction';
import ShopSupport from './Pages/ShopOwner/ShopOwner_Support/ShopSupport';
import ShopRatings from './Pages/ShopOwner/ShopOwner_Support/ShopRatings';
import ShopNotifications from './Pages/ShopOwner/ShopOwner_Support/ShopNotifications';
import FeedbackManagement from './Pages/ShopOwner/ShopOwner_Support/FeedbackManagement';
import ShopSettings from './Pages/ShopOwner/ShopOwner_Settings/ShopSettings';
import Dashboard from './Pages/ShopOwner/ShopOwner_Dashboard/Dashboard';
import CustomerViewShop from "./Pages/Customer/CustomerShopView.jsx";

import JobListing from './Pages/ShopOwner/ShopOwner_JobPostings/JobListing';
import Login from './Pages/Authentication/Login/Login';


import Header from './Components/Header'; 
import MainLayout from './Pages/ShopOwner/MainLayout';
import ShopOwnerProfile from './Pages/ShopOwner/ShopOwnerProfile';
import UpdateShopOwnerProfile from './Pages/ShopOwner/UpdateShopOwnerProfile';

import CustomerMainLayout from './Pages/Customer/CustomerMainLayout';
import CustomerDashboard from './Pages/Customer/CustomerDashboard';
import CustomerOrders from './Pages/Customer/CustomerOrders';

import CustomerCategories from './Pages/Customer/CustomerCategory';
import { UserProvider } from './Pages/Customer/UserContext';
import CartPage from "./Pages/Customer/CartPage.jsx";


import RegisterLayout from './Pages/Authentication/Register_Forms/RegisterLayout';
import ProtectedRoute from './Pages/Authentication/ProtectedRoute';




//import loginService from "../../Services/loginService";


function App() {

  const [user, setUser] = useState('');

  return (
    <div>
      <Router>
      <Header />


        <UserProvider>
        <Routes>
          <Route path="/customermainlayout" element={<CustomerMainLayout />}>
            <Route index element={<CustomerDashboard/>}/>
            <Route path="/customermainlayout/dashboard" element={<CustomerDashboard />} />
            <Route path="/customermainlayout/shop/:shop_name/:branch/:ShopCode" element={<CustomerViewShop />} />
            <Route path="/customermainlayout/categories" element={<CustomerCategories />} />
            <Route path="/customermainlayout/orders" element={<CustomerOrders />} />
            <Route path="/customermainlayout/cart" element={<CartPage />} />
          </Route>


        

      


        <Route path = "/" element = {<ProtectedRoute ><MainLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard/>}/>
            <Route path = "/productListing" element = {<ProductListing />}></Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path = "/joblisting" element = {<JobListing />}></Route>
            <Route path = "/createproduct" element = {<CreateProduct />}></Route>
            <Route path = "/updateproduct/:id" element = {<UpdateProduct />}></Route>

            <Route path="/ordermanagement" element={<OrderManagement/>}/>
            <Route path="/paymentintegration" element={<PayemntIntegration/>}/>
            <Route path="/deliveryscheduling" element={<DeliverySheduling/>}/>
            <Route path="/ridermanagement" element={<RiderManagement/>}/>
            
            <Route path="/inventorytracking" element={<InventoryTracking/>}/>
            <Route path="/promotions" element={<Promotions/>}/>
            <Route path="/shopanalytics" element={<ShopAnalytics/>}/>
            <Route path="/supplierinteraction" element={<SupplierInteraction/>}/>
            <Route path="/supplierpayments" element={<SupplierPayments/>}/>
            <Route path="/userinteraction" element={<UserInteraction/>}/>
            <Route path="/shopsupport" element={<ShopSupport/>}/>
            <Route path="/shopratings" element={<ShopRatings/>}/>
            <Route path="/shopnotifications" element={<ShopNotifications/>}/>
            <Route path="/feedbackmanagement" element={<FeedbackManagement/>}/>
            <Route path="/shopsettings" element={<ShopSettings/>}/>
            <Route path="/updatejobposting/:id" element={<UpdateJobPosting />} />
            <Route path="/addjobposting" element = {<AddJobPosting/>}></Route>
            <Route path="/shopownerprofile" element = {<ShopOwnerProfile/>}></Route>
            <Route path="/updateshopownerprofile/:username" element = {<UpdateShopOwnerProfile/>}></Route>

        </Route>


        <Route path = "/registerlayout" element = {<RegisterLayout />}>
          <Route index element={<Image/>}/>
          <Route path = "image" element = {<Image />}></Route>
        </Route>

        <Route path="/login" element={<Login setUser={setUser} />}>
          <Route index element={<Image/>}/>
          <Route path = "image" element = {<Image />}></Route>
        </Route>



        


        </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}
export default App;


