import "./App.css";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ProductListing from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductListing';
import CreateProduct from './Pages/ShopOwner/ShopOwner_ProductManagement/CreateProduct';
import UpdateProduct from './Pages/ShopOwner/ShopOwner_ProductManagement/UpdateProduct';


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

//import loginService from "../../Services/loginService";






function App() {
  return (
    <div>
      <Router>
      <Header />
        <Routes>
        
          <Route path = "/jobListing" element = {<JobListing />}></Route>
          <Route path = "/productListing" element = {<ProductListing />}></Route>
          <Route path = "/createproduct" element = {<CreateProduct />}></Route>
          <Route path = "/updateproduct/:id" element = {<UpdateProduct />}></Route>

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

          <Route path="/" element={<TabPanel />}>
          <Route path="productListing" element={<ProductListing />} />
        </Route>





        </Routes>
      </Router>
    </div>
  );
}
export default App;


