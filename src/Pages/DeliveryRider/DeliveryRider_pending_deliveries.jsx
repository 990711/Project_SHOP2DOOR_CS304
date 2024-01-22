// PendingDeliveries.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryService from '../../Services/DeliveryService'; // Adjust the path
import Table from './Table'; // Adjust the path

const DeliveryRider_pending_deliveries = () => {
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    DeliveryService.getPendingDeliveries().then((res) => {
      setDeliveries(res.data);
    });
  }, []);

  const filteredDeliveries = deliveries.filter((delivery) =>
    delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { id: 'customerName', label: 'Customer Name' },
    { id: 'address', label: 'Delivery Address' },
    { id: 'orderDetails', label: 'Order Details' },
    // Add other columns as needed
  ];

  return (
    <div>
      <div className="title">Pending Deliveries</div>
      {/* Add a search input and display the deliveries using the Table component */}
      <Table data={filteredDeliveries} columns={columns} />
    </div>
  );
};

export default DeliveryRider_pending_deliveries;
