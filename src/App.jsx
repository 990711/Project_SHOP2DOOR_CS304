import "./App.css";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ProductListing from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductListing';
import JobListing from './Pages/ShopOwner/ShopOwner_JobPostings/JobListing';
import Register from './Pages/Authentication/Register';
import Login from './Pages/Authentication/Login';

import Customer_Register from './Pages/Authentication/Customer_Register';
import ShopOwner_Register from './Pages/Authentication/ShopOwner_Register';
import Supplier_Register from './Pages/Authentication/Supplier_Register';
import DeliveryRider_Register from './Pages/Authentication/DeliveryRider_Register';


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


