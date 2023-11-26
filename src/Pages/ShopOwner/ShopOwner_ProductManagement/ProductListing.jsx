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
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ProductListing = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
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
      if (res.status === 200) {
        // Update the state with the new list of products after successful deletion
        setProducts(products.filter((product) => product.item_id !== id));
      } else {
        console.error('Failed to delete the product.');
      }
    });
  };
  

  const CreateProduct = () => {
    navigate('/CreateProduct');
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (product) => {
    console.log('Clicked row:', product);
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
      deleteProduct(selectedProduct?.item_id);
      
    } else {
      setIsModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleUpdate = () => {
    console.log('Selected product for update:', selectedProduct);
    if (selectedProduct && selectedProduct.item_id) {
      navigate(`/UpdateProduct/${selectedProduct.item_id}`);
    
    } else {
      console.error('Selected product or ID is undefined.');
    }
  };

  return (
    <div>
      <div className="title">Product Management</div>

      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '2px' }}>
        <button style={{ width: '250px' }} onClick={CreateProduct}>
          Add Product
        </button>
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
                Name
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Image
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Brand
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Description
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Category
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Price
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Quantity
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Discount Price
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Discount Percentage
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product, index) => (
              <TableRow
                key={product.id || index}
                className="TableRow"
                onClick={() => {
                  console.log('Clicked product:', product);
                  handleRowClick(product);
                }}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.image}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.discountPrice}</TableCell>
                <TableCell>{product.discount_percentage}</TableCell>
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
            width: '400px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <div>
          <p>Name: {selectedProduct?.name}</p>
          <p>Brand: {selectedProduct?.brand}</p>
          <p>Description: {selectedProduct?.description}</p>
          <p>Category: {selectedProduct?.category}</p>
          <p>Price: {selectedProduct?.price}</p>
          <p>Quantity: {selectedProduct?.quantity}</p>
          <p>Discount Price: {selectedProduct?.discountPrice}</p>
          <p>Discount Percentage: {selectedProduct?.discountPercentage}</p>

          <div className="button-container">
            <button style={{ marginRight: '10px' }} onClick={handleUpdate}>
              Update
            </button>
            <button onClick={deleteModal}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductListing;
