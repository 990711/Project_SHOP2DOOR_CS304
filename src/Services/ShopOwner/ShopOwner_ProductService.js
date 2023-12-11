import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListing from './ShopOwner_ProductManagement/ProductListing';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/product-listing" element={<ProductListing />} />
      </Routes>
    </Router>
  );
};

export default App;
