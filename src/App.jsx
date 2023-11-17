import "./App.css";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ProductListing from './Pages/ShopOwner/ShopOwner_ProductManagement/ProductListing';
import JobListing from './Pages/ShopOwner/ShopOwner_JobPostings/JobListing';
import Register from './Pages/Register';
import Login from './Pages/Login';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path = "/jobListing" element = {<JobListing />}></Route>
          <Route path = "/productListing" element = {<ProductListing />}></Route>
          <Route path = "/register" element = {<Register />}></Route>
          <Route path = "/login" element = {<Login />}></Route>

        </Routes>
      </Router>
    </div>
  );
}
export default App;


