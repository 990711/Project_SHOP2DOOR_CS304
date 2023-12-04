import "./App.css";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ProductListing from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductListing';
import CreateProduct from './Pages/ShopOwner/ShopOwner_ProductManagement/CreateProduct';
import UpdateProduct from './Pages/ShopOwner/ShopOwner_ProductManagement/UpdateProduct';


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
import Register from './Pages/Authentication/Register_Forms/Register';
import Login from './Pages/Authentication/Login/Login';

import Customer_Register from './Pages/Authentication/Register_Forms/Customer_Register';
import ShopOwner_Register from './Pages/Authentication/Register_Forms/ShopOwner_Register';
import Supplier_Register from './Pages/Authentication/Register_Forms/Supplier_Register';
import DeliveryRider_Register from './Pages/Authentication/Register_Forms/DeliveryRider_Register';
import Home from './Pages/Authentication/Home';
import Customer from './Pages/Authentication/Customer';
import DeliveryRider from './Pages/Authentication/DeliveryRider';
import Layout from './Pages/Authentication/Layout';
import Lounge from './Pages/Authentication/Lounge';
import ShopOwner from './Pages/Authentication/ShopOwner';
import Supplier from './Pages/Authentication/Supplier';
import Restaurant_Register from './Pages/Authentication/Register_Forms/Restaurant_Register';

import LinkPage from './Pages/Authentication/LinkPage';
import Missing from './Pages/Authentication/Missing';
import TabPanel from './Pages/TabPanel';
import Header from './Components/Header'; 
import MainLayout from './Pages/ShopOwner/MainLayout';
import MainLayout2 from './Components/MainLayout2.jsx'; 

import CustomerMainLayout from './Pages/Customer/CustomerMainLayout';
import CustomerDashboard from './Pages/Customer/CustomerDashboard';
import CustomerOrders from './Pages/Customer/CustomerOrders';
import CustomerCategories from './Pages/Customer/CustomerCategory';



//import loginService from "../../Services/loginService";


function App() {
  return (
    <div>
      <Router>
      <Header />


        <Routes>

        <Route path="/customermainlayout" element={<CustomerMainLayout />}>
          <Route index element={<CustomerDashboard/>}/>
          <Route path="/customermainlayout/dashboard" element={<CustomerDashboard />} />
          <Route path="/customermainlayout/shop/:shop_name/:branch/:ShopCode" element={<CustomerViewShop />} />
          <Route path="/customermainlayout/categories" element={<CustomerCategories />} />
        </Route>

        <Route path = "/" element = {<MainLayout />}>
            <Route index element={<Dashboard/>}/>
            <Route path = "/productListing" element = {<ProductListing />}></Route>
            <Route path = "/dashboard" element = {<Dashboard />}></Route>
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
            <Route path="/createproduct" element = {<CreateProduct/>}></Route>
            <Route path="/updateproduct/:id" element={<UpdateProduct />} />
            <Route path="/updatejobposting/:id" element={<UpdateJobPosting />} />
            <Route path="/addjobposting" element = {<AddJobPosting/>}></Route>

        </Route>

        


        <Route path = "/mainlayout2" element = {<MainLayout2 />}/>


          
          <Route path = "/register" element = {<Register />}></Route>
          <Route path = "/login" element = {<Login />}></Route>
          <Route path = "/customerRegister" element = {<Customer_Register />}></Route>
          <Route path = "/shopOwnerRegister" element = {<ShopOwner_Register />}></Route>
          <Route path = "/supplierRegister" element = {<Supplier_Register />}></Route>
          <Route path = "/deliveryRiderRegister" element = {<DeliveryRider_Register />}></Route>
          <Route path = "/restaurantRegister" element = {<Restaurant_Register />}></Route>

          <Route path = "/layout" element = {<Layout />}></Route>
          <Route path = "/linkPage" element = {<LinkPage />}></Route>

          

            <Route path = "/lounge" element = {<Lounge />}></Route>
            <Route path = "/shopOwner" element = {<ShopOwner />}></Route>
            <Route path = "/supplier" element = {<Supplier />}></Route>
            <Route path = "/home" element = {<Home />}></Route>
            <Route path = "/customer" element = {<Customer />}></Route>
            <Route path = "/deliveryRider" element = {<DeliveryRider />}></Route>
          
          <Route path = "/missing" element = {<Missing />}></Route>

  





        </Routes>
      </Router>
    </div>
  );
}
export default App;


