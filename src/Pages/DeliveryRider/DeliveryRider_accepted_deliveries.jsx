// AcceptedDeliveries.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryService from '../../Services/DeliveryService'; // Adjust the path
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';

const DeliveryRider_accepted_deliveries = () => {
  
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [currentModalType, setCurrentModalType] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null); // Add state for customer details
  const [shopDetails, setShopDetails] = useState(null); // Add state for shop details


  useEffect(() => {
    if (user) {
      DeliveryService.getAcceptedDeliveries(user).then((res) => {
        console.log('API Response:', res.data);
        setDeliveries(res.data);
      });
    }
  }, [user]);

  const fetchCustomerDetails = async (orderId) => {
    try {
      const response = await DeliveryService.getwaitingorder_customer_details(orderId);
      // Set the customer details in state
      setCustomerDetails(response.data);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  const fetchShopDetails = async (orderId) => {
    try {
      const response = await DeliveryService.getwaitingorder_shop_details(orderId);
      // Set the shop details in state
      setShopDetails(response.data);
    } catch (error) {
      console.error('Error fetching shop details:', error);
    }
  };

  const filteredDeliveries = deliveries.filter((delivery) =>
    delivery.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (order_id) => {
    console.log('Clicked row:', order_id);
    setSelectedDelivery(order_id);
    setIsModalOpen(true);
    // Fetch customer details when the row is clicked
    fetchCustomerDetails(order_id);
    fetchShopDetails(order_id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDelivery(null);
    setModalType(null);
  };

  const openCustomerDetailsModal = async () => {
    try {
      const response = await DeliveryService.getwaitingorder_customer_details(selectedDelivery);
      // Handle the customer details response, you can set the data to state and render it in the modal
      console.log('Customer Details:', response.data);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
    setCurrentModalType('customerDetails');
    setModalType('customerDetails');
  };

  const openShopDetailsModal = async () => {
    try {
      const response = await DeliveryService.getwaitingorder_shop_details(selectedDelivery);
      // Handle the shop details response, you can set the data to state and render it in the modal
      console.log('Shop Details:', response.data);
       } catch (error) {
      console.error('Error fetching shop details:', error);
    }
    setCurrentModalType('shopDetails');
    setModalType('shopDetails');
  };

  const openOrderCompletedModal = async () => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm('Are you sure you completed this order?');
  
    if (isConfirmed) {
      try {
        // Make a PUT request using Axios to accept the order
        const response = await DeliveryService.putcomplete_order(selectedDelivery);
  
        // Assuming your API returns a success message
        console.log('Order completed successfully:', response.data);

        window.location.reload();
  
        // Reset modal and state
        setCurrentModalType(null);
        setModalType(null);
  
        // You may also want to update the UI or perform additional actions after accepting the order
      } catch (error) {
        console.error('Error completing order:', error);
        // Handle error, show an error message, etc.
      }
    }
    // If the user clicks "Cancel," do nothing
  };

  

  const renderModalContent = () => {
    switch (currentModalType) {
      case 'customerDetails':
        // Render content for Customer Details modal
        return (
          <div>
            <button onClick={() => setCurrentModalType(null)}>Back</button>
            <div>Customer Details</div>
            {customerDetails && (
              <>
                <p>Customer Name: {customerDetails[0]}</p>
                <p>Customer Address: {customerDetails[1]}</p>
                <p>Customer Contact Number: {customerDetails[2]}</p>
              </>
            )}
          </div>
        );
        case 'shopDetails':
          // Render content for Shop Details modal
          return (
            <div>
              <button onClick={() => setCurrentModalType(null)}>Back</button>
              <div style={{ marginBottom: '10px' }}>Shop Details</div>
              {shopDetails && shopDetails.length > 0 && (
                <>
                  {shopDetails.map((shop, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                      {/* Render shop details here */}
                      <div>
                      <p>Shop Name: {shop[0]}</p>
                      <p>Shop Location: {shop[1]}</p>
                      <p>Shop Branch: {shop[2]}</p>
                      <p>Shop Contact Number: {shop[3]}</p>
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
            <p>Order Id: {selectedDelivery}</p>
            <div>
              <button onClick={openCustomerDetailsModal}>Customer Details</button>
            </div>
            <div>
              <button onClick={openShopDetailsModal}>Shop Details</button>
            </div>
            <div>
              <button onClick={openOrderCompletedModal}>Complete Order</button>
            </div>
          </div>
        );
    }
  };
  


  return (
    <div>
      <div className="title">Accepted Deliveries</div>

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

      <TableContainer component={Paper} className="TableContainer">
        <Table aria-label="simple table" className="Table">
          <TableHead>
            <TableRow>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Order Id
              </TableCell>
              {/* Add additional columns based on your data */}
              
              {/* Add more columns as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveries.map((order_id, index) => (
              <TableRow
                key={order_id || index}
                className="TableRow"
                onClick={() => {
                  console.log('Clicked delivery:', order_id);
                  handleRowClick(order_id);
                }}
              >
                <TableCell>{order_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '600px',
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

export default DeliveryRider_accepted_deliveries;