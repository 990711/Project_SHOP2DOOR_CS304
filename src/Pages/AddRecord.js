import React, { useState, useEffect } from 'react';
import InventoryService from '../services/InventoryService';
import ProductService from '../services/ProductService';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function AddRecord() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        date: '',
        productName: '',
        quantity: '',
        price: '',
        shopName: '',
        mobileNo: '',
        notes: ''
    });
    const [productNames, setProductNames] = useState([]); // List of product names
    useEffect(() => {
        // Fetch product names from your service or API
        ProductService.getProductNames().then((res) => {
            setProductNames(res.data);
        });
    }, []);

    const saveRecord = (e) => {
        e.preventDefault();
        InventoryService.addRecord(product).then((res) => {
            navigate('/inventory');
        });
    };

    const cancel = () => {
        navigate('/inventory');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 className='text-center'>Add Inventory Record</h2>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label>Date</label>
                                    <input
                                        type='date' // You may use 'date' input type if it's suitable
                                        name='date'
                                        className='form-control'
                                        value={product.date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Product Name</label>
                                    <select
                                        name='productName'
                                        className='form-control'
                                        value={product.productName}
                                        onChange={handleChange}
                                    >
                                        <option value=''>Select a product</option>
                                        {productNames.map((name, index) => (
                                            <option key={index} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <label>Quantity</label>
                                    <input
                                        type='number'
                                        name='quantity'
                                        className='form-control'
                                        value={product.quantity}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Unit Price</label>
                                    <input
                                        type='number'
                                        name='price'
                                        className='form-control'
                                        value={product.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Shop Name</label>
                                    <input
                                        type='text'
                                        name='shopName'
                                        className='form-control'
                                        value={product.shopName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Mobile Number</label>
                                    <input
                                        type='text'
                                        name='mobileNo'
                                        className='form-control'
                                        value={product.mobileNo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Notes</label>
                                    <input
                                        type='text'
                                        name='notes'
                                        className='form-control'
                                        value={product.notes}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='product-details-buttons'>
                                    <button className='btn btn-success' onClick={saveRecord}>
                                        Save
                                    </button>
                                    <button className='btn btn-danger' onClick={cancel} style={{ marginLeft: '5px' }}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AddRecord;
