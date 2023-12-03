import "./App.css";
import React, { useState } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ProductListing from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductListing';
import CreateProduct from './Pages/ShopOwner/ShopOwner_ProductManagement/CreateProduct';
import UpdateProduct from './Pages/ShopOwner/ShopOwner_ProductManagement/UpdateProduct';
import Image from './Pages/Authentication/Register_Forms/Image';


import FreshProducts from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/FreshProducts';
import DairyAndEggs from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/DairyAndEggs.jsx';
import MeatAndSeafood from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/MeatAndSeafood.jsx';
import Bakery from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/Bakery';
import CannedGoods from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/CannedGoods';
import FrozenFoods from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/FrozenFoods';
import PantryStaples from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/PantryStaples';
import Snacks from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/Snacks';
import Condiments from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/Condiments';
import SpicesAndHerbs from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/SpicesAndHerbs.jsx';
import CleaningSupplies from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/CleaningSupplies';
import PersonalCare from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/PersonalCare';
import BabyCare from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/BabyCare';
import HouseholdItems from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/HouseholdItems';
import PetSupplies from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/PetSupplies';
import HealthAndWellness from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/HealthAndWellness.jsx';
import AlcoholicBeverages from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/AlcoholicBeverages';
import SpecialDiet from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/SpecialDiet';
import Other from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductsByCategory/Other';



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
import Register from './Pages/Authentication/Register_Forms/delete these pages later/Register.jsx';
import Login from './Pages/Authentication/Login/Login';

import Customer_Register from './Pages/Authentication/Register_Forms/delete these pages later/Customer_Register.jsx';
import ShopOwner_Register from './Pages/Authentication/Register_Forms/delete these pages later/ShopOwner_Register.jsx';
import Supplier_Register from './Pages/Authentication/Register_Forms/delete these pages later/Supplier_Register.jsx';
import DeliveryRider_Register from './Pages/Authentication/Register_Forms/delete these pages later/DeliveryRider_Register.jsx';
import Home from './Pages/Authentication/delete later/Home.jsx';
import Customer from './Pages/Authentication/delete later/Customer.jsx';
import DeliveryRider from './Pages/Authentication/delete later/DeliveryRider.jsx';
import Layout from './Pages/Authentication/delete later/Layout.jsx';
import Lounge from './Pages/Authentication/delete later/Lounge.jsx';
import ShopOwner from './Pages/Authentication/delete later/ShopOwner.jsx';
import Supplier from './Pages/Authentication/delete later/Supplier.jsx';
import Restaurant_Register from './Pages/Authentication/Register_Forms/delete these pages later/Restaurant_Register.jsx';

import LinkPage from './Pages/Authentication/delete later/LinkPage.jsx';
import Missing from './Pages/Authentication/delete later/Missing.jsx';
import TabPanel from './Pages/TabPanel';
import Header from './Components/Header'; 
import MainLayout from './Pages/ShopOwner/MainLayout';
import ShopOwnerProfile from './Pages/ShopOwner/ShopOwnerProfile';
import UpdateShopOwnerProfile from './Pages/ShopOwner/UpdateShopOwnerProfile';


import MainLayout2 from './Components/MainLayout2.jsx'; 

import CustomerMainLayout from './Pages/Customer/CustomerMainLayout';
import CustomerDashboard from './Pages/Customer/CustomerDashboard';
import CustomerOrders from './Pages/Customer/CustomerOrders';


import RegisterLayout from './Pages/Authentication/Register_Forms/RegisterLayout';
import ProtectedRoute from './Pages/Authentication/ProtectedRoute';



//import loginService from "../../Services/loginService";






function App() {

  const [user, setUser] = useState('');

  return (
    <div>
      <Router>
      <Header />


        <Routes>

        <Route path="/customermainlayout" element={<CustomerMainLayout />}>
          <Route index element={<CustomerDashboard/>}/>
          <Route path="/customermainlayout/dashboard" element={<CustomerDashboard />} />
          <Route path="/customermainlayout/shop/:shop_name/:branch/:ShopCode" element={<CustomerViewShop />} />
        
          <Route path="/customermainlayout/freshproducts" element={<FreshProducts />} />
          <Route path="/customermainlayout/dairyandeggs" element={<DairyAndEggs />} />
          <Route path="/customermainlayout/meatandseafood" element={<MeatAndSeafood />} />
          <Route path="/customermainlayout/bakery" element={<Bakery />} />
          <Route path="/customermainlayout/cannedgoods" element={<CannedGoods />} />
          <Route path="/customermainlayout/frozenfoods" element={<FrozenFoods />} />
          <Route path="/customermainlayout/pantrystaples" element={<PantryStaples />} />
          <Route path="/customermainlayout/snacks" element={<Snacks />} />
          <Route path="/customermainlayout/condiments" element={<Condiments />} />
          <Route path="/customermainlayout/spicesandherbs" element={<SpicesAndHerbs />} />
          <Route path="/customermainlayout/cleaningsupplies" element={<CleaningSupplies />} />
          <Route path="/customermainlayout/personalcare" element={<PersonalCare />} />
          <Route path="/customermainlayout/babycare" element={<BabyCare />} />
          <Route path="/customermainlayout/householditems" element={<HouseholdItems />} />
          <Route path="/customermainlayout/petsupplies" element={<PetSupplies />} />
          <Route path="/customermainlayout/healthandwellness" element={<HealthAndWellness />} />
          <Route path="/customermainlayout/alcoholicbeverages" element={<AlcoholicBeverages />} />
          <Route path="/customermainlayout/specialdiet" element={<SpecialDiet />} />
          <Route path="/customermainlayout/other" element={<Other />} />
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
            <Route path="/updateshopownerprofile" element = {<UpdateShopOwnerProfile/>}></Route>

        </Route>


        <Route path = "/registerlayout" element = {<RegisterLayout />}>
          <Route index element={<Image/>}/>
          <Route path = "image" element = {<Image />}></Route>
        </Route>

        <Route path="/login" element={<Login setUser={setUser} />}>
          <Route index element={<Image/>}/>
          <Route path = "image" element = {<Image />}></Route>
        </Route>



        


        <Route path = "/mainlayout2" element = {<MainLayout2 />}/>


          
          <Route path = "/register" element = {<Register />}></Route>
          <Route path = "/customerRegister/:id" element = {<Customer_Register />}></Route>
          <Route path = "/shopOwnerRegister/:id" element = {<ShopOwner_Register />}></Route>
          <Route path = "/supplierRegister/:id" element = {<Supplier_Register />}></Route>
          <Route path = "/deliveryRiderRegister/:id" element = {<DeliveryRider_Register />}></Route>
          <Route path = "/restaurantRegister/:id" element = {<Restaurant_Register />}></Route>

 


          


  





        </Routes>
      </Router>
    </div>
  );
}
export default App;


