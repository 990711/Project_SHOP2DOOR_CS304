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

// Set the root element of your app for the modal
Modal.setAppElement('#root');

const OrderManagement = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter((order) =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date) => {
    if (!date) {
      return '';
    }
  
    return format(new Date(date), 'dd-MM-yyyy'); // Format as "dd-mm-yyyy"
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div>
      <div className="title">
        Order Management
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
                Order Number
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Date
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Time
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Items
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Quantity
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Price
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Discount Percentage
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Discount Price
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Description
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Total
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow
                key={order.orderNumber}
                className="TableRow"
                onClick={() => handleRowClick(order)}
              >
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{formatDate(order.date)}</TableCell>
                <TableCell>{order.time}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.price}</TableCell>
                <TableCell>{order.discountPercentage}</TableCell>
                <TableCell>{order.discountPrice}</TableCell>
                <TableCell>{order.description}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
              
                </TableCell>
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
        <div>
          {/* Display details of the selected order */}
          <p>Order Number: {selectedOrder?.orderNumber}</p>
          <p>Date: {formatDate(selectedOrder?.date)}</p>
          <p>Time: {selectedOrder?.time}</p>
          <p>Items: {selectedOrder?.items}</p>
          <p>Quantity: {selectedOrder?.quantity}</p>
          <p>Price: {selectedOrder?.price}</p>
          <p>Discount Percentage: {selectedOrder?.discountPercentage}</p>
          <p>Discount Price: {selectedOrder?.discountPrice}</p>
          <p>Description: {selectedOrder?.description}</p>
          <p>Total: {selectedOrder?.total}</p>
        </div>
      </Modal>
    </div>
  );
};

export default OrderManagement;

