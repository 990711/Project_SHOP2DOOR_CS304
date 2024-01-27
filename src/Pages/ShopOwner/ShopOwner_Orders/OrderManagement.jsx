import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from 'react-modal';
import { format } from 'date-fns';
import "../../../styles/ShopOwner.css";
import OrderService from '../../../Services/OrderService';
import { useLocation } from 'react-router-dom';

// Set the root element of your app for the modal
Modal.setAppElement('#root');

const OrderManagement = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentModalType, setCurrentModalType] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null); // Add state for shop details
  const [modalType, setModalType] = useState(null);

  const filteredOrders = orders.filter((order) =>
    order.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    OrderService.getOrders(user).then((res) => {
      console.log('API Response:', res.data);
      setOrders(res.data);
    });
  }, [user]);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await OrderService.getPendingOrderItems(user,orderId);
      // Set the customer details in state
      setOrderDetails(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return '';
    }

    return format(new Date(date), 'dd-MM-yyyy'); // Format as "dd-mm-yyyy"
  };

  const handleRowClick = (order_id) => {
    console.log('Clicked row:', order_id);
    setSelectedOrder(order_id);
    setIsModalOpen(true); // Set isModalOpen to true when a row is clicked
    //setCurrentModalType('orderDetails'); // Set the modal type directly
    fetchOrderDetails(order_id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    //setShopDetails(null); // Clear shopDetails when modal is closed
    setModalType(null);
  };
/*
  const openOrderDetailsModal = async () => {
    try {
      const response = await OrderService.getPendingOrderItems(user,selectedOrder);
      // Assuming getOrderDetails is a function that fetches details based on the order ID
      console.log('Order Details:', response.data);
      //setOrderDetails(response.data.orderDetails); // Assuming shopDetails is part of the response
      //setCurrentModalType('orderDetails');
    } catch (error) {
      console.error('Error fetching Order details:', error);
    }
    setCurrentModalType('orderDetails');
    setModalType('orderDetails');
  };
  */

  const openOrderDetailsModal = async () => {
    try {
      const response = await OrderService.getPendingOrderItems(user, selectedOrder);
      console.log('Order Details:', response.data);
      setOrderDetails(response.data);
      setCurrentModalType('orderDetails');
      setModalType('orderDetails');
    } catch (error) {
      console.error('Error fetching Order details:', error);
    }
  };
/*  

  const renderModalContent = () => {
    switch (currentModalType) {
      case 'orderDetails':
        return (
          <div>
            <div style={{ marginBottom: '10px' }}>Order Details</div>
            {orderDetails && orderDetails.length > 0 && (
              <>
                {orderDetails.map((item, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    {/* Render item details here }
                    <div>
                      <p>Item Id: {item[0]}</p>
                      <p>Quantity: {item[1]}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        );
      default:
        // Render content for default modal (e.g., Accept Order modal)
        return (
          <div>
            <p>Order Id: {selectedOrder}</p>
            <div>
              <button onClick={openOrderDetailsModal}>Order Details</button>
            </div>
          </div>
        );
    }
    

   
  };
  */

  const renderModalContent = () => {
    switch (currentModalType) {
      case 'orderDetails':
        return (
          <div>
            <div style={{ marginBottom: '10px' }}>Order Details</div>
            {orderDetails && orderDetails.itemList && orderDetails.itemList.length > 0 && (
              <>
                <p>Total Bill: {orderDetails.totalBill}</p>
                <ul>
                  {orderDetails.itemList.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <div>
                        <p>Item Id: {item.item_id}</p>
                        <p>Item Name: {item.item_name}</p>
                        <p>Item Brand: {item.item_brand}</p>
                        <p>Item Category: {item.item_category}</p>
                        <p>Item Price: {item.item_price}</p>
                        <p>Item Description: {item.item_description}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        );
      default:
        // Render content for default modal (e.g., Accept Order modal)
        return (
          <div>
            <p>Order Id: {selectedOrder}</p>
            <div>
              <button onClick={openOrderDetailsModal}>Order Details</button>
            </div>
          </div>
        );
    }
  };
  

  return (
    <div>
      <div className="title">
        Pending Orders
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '2px' }}>
        <div style={{ flexGrow: 1, margin: '20px' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '75%' }}
          />
        </div>
      </div>

      <div>
        <TableContainer component={Paper} className="TableContainer" style={{ overflowX: 'auto' }}>
          <Table aria-label="simple table" className="Table">
            <TableHead>
              <TableRow>
                <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                  Order Id
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order_id, index) => (
                <TableRow
                  key={order_id || index}
                  className="TableRow"
                  onClick={() => {
                    console.log('Clicked order:', order_id);
                    handleRowClick(order_id);
                  }}
                >
                  <TableCell>{order_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Modal for displaying order details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '400px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default OrderManagement;
