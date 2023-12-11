import { useLocation } from 'react-router-dom';
import React from 'react';

function ShopAnalytics() {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div>
      {/* Your ShopAnalytics content goes here */}
      ShopAnalytics
    </div>
  );
}

export default ShopAnalytics;
