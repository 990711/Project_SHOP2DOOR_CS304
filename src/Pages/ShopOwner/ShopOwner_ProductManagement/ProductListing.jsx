import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopOwner_ProductService from '../../../Services/ShopOwner/ShopOwner_ProductService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../../../styles/ShopOwner.css";

import Modal from 'react-modal'; // Import react-modal
Modal.setAppElement('#root'); // Set the root element of your app

const ProductListing = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);



  useEffect(() => {
    ShopOwner_ProductService.getProducts().then((res) => {
      setProducts(res.data);
    });
  }, []);

  const deleteProduct = (id) => {
    ShopOwner_ProductService.deleteProduct(id).then((res) => {
      setProducts(products.filter((product) => product.id !== id));
    });
  };
  const CreateProduct = () => {
    navigate('/CreateProduct');
 };

 const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
);

const handleRowClick = (product) => {
  setSelectedProduct(product);
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
  setSelectedProduct(null);
  
};

const deleteModal = () => {
  const userConfirmed = window.confirm('Are you sure you want to delete this product?');
  
  if (userConfirmed) {
    setIsModalOpen(false);
    setSelectedProduct(null);
    deleteProduct(selectedProduct?.id);
  }

  // Close the modal regardless of user's choice
  setIsModalOpen(false);
  setSelectedProduct(null);
};

const handleUpdate = () => {
  navigate(`/UpdateProduct/${selectedProduct.id}`);};



return (
  <div className="title">Product Management
 
<div style={{ display: 'flex', alignItems: 'center' ,marginLeft: '2px'}}>
  
    <button
      style={{ width: '250px' }}
      onClick={CreateProduct}
    >
      Add Product
    </button>
  
  <div style={{ flexGrow: 1, margin: '20px'}}>
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
          
          <TableCell className="TableCell">Name</TableCell>
            
            <TableCell className="TableCell">Description</TableCell>
            <TableCell className="TableCell">Price</TableCell>
            <TableCell className="TableCell">Quantity</TableCell>
            <TableCell className="TableCell">Discount Price</TableCell>
            <TableCell className="TableCell">Discount Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {filteredProducts.map((product) => (
            <TableRow 
            key={product.id} 
            className="TableRow"
            onClick={() => handleRowClick(product)}>
              
              <TableCell>{product.name}</TableCell>
              
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.discountPrice}</TableCell>
              <TableCell>{product.discountPercentage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>{/* Modal for updating the product */}
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
          {/* Display details of the selected product */}
          <p>Name: {selectedProduct?.name}</p>
          <p>Description: {selectedProduct?.description}</p>
            <p>Price: {selectedProduct?.price}</p>
            <p>Quantity: {selectedProduct?.quantity}</p>
            <p>Discount Price: {selectedProduct?.discountPrice}</p>
            <p>Discount Percentage: {selectedProduct?.discountPercentage}</p>
          {/* Add other details as needed */}
          
          

          <div className="button-container">
                  <button style={{ marginRight: '10px' }} onClick={handleUpdate}>
                  Update
                  </button>
                  <button onClick={deleteModal }>Delete</button>
                  </div>
                  
        </div>
      </Modal>
    </div>
  );
};

export default ProductListing;