
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Register from './Pages/Register'
import Login from './Pages/Login';
import ViewProducts from './Pages/ViewProducts';
import AddProduct from './Pages/AddProducts';
import ModifyProducts from './Pages/ModifyProducts';
import FoodSupplier from './Pages/FoodSupplier';
import Inventory from './Pages/Inventory';
import UpdateProductComponent from './Pages/UpdateProductComponent';
import ProductDetail from './Pages/ProductDetailView';
import AddRecord from './Pages/AddRecord';
import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider>
    <div>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" exact element={<Login />}></Route>                {/* Login page */}
            <Route path="/register" element={<Register />}></Route>           {/* Register page */}
            <Route path="/products" element={<ViewProducts />}></Route>       {/* When a user login, show this page */}
            <Route path="/modifyProduct" element={<ModifyProducts />}></Route>      {/* Update delete product page */}
            <Route path="/product/:id" element={<ProductDetail />} />               {/* Product details page. "id is replaced by product ID when selecting a product" */}
            <Route path="/addProducts" element={<AddProduct />}></Route>
            <Route path = "/update-products/:id" element = {<UpdateProductComponent />}></Route>
            <Route path='/inventory' element={<Inventory />}></Route>
            <Route path='/addRecord' element={<AddRecord />}></Route>
            <Route path='/foodSupplier' element={<FoodSupplier />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
    </UserProvider>
  );
}

export default App;
