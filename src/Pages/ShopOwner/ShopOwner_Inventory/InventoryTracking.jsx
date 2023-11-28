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

const InventoryTracking = () => {
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
      <div className="title">Inventory</div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '2px' }}>
        <div style={{ margin: '20px', width: '75%' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%' }}
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
                Brand
              </TableCell>
              
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Category
              </TableCell>
              
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Quantity
              </TableCell>
              
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Reorder Point
              </TableCell>
              <TableCell className="TableCell" style={{ fontWeight: 'bold' }}>
                Low Stock Alert
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product, index) => (
              <TableRow
                key={product.id || index}
                className={`TableRow ${product.quantity < product.reorderPoint ? 'low-stock' : ''}`}
                onClick={() => handleRowClick(product)}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.reorderPoint}</TableCell>
                <TableCell>
                  {product.quantity < product.reorderPoint && (
                    <span className="low-stock-alert">Low Stock</span>
                  )}
                </TableCell>
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
          <p>Category: {selectedProduct?.category}</p>
          <p>Quantity: {selectedProduct?.quantity}</p>
          <p>Quantity: {selectedProduct?.reorderPoint}</p>

          <div className="button-container" style={{ display: 'flex', justifyContent: 'center' }}>
            <button style={{ marginRight: '10px' }} onClick={handleUpdate}>
              Update
            </button>
          </div>

        </div>
      </Modal>
    </div>
  );
};

export default InventoryTracking;
