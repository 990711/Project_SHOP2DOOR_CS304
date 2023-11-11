import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import ProductService from '../services/ProductService';

const ProductDetailView = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        id: id,
        name: "",
        description: '',
        price: '',
        quantity: '',
        category: '',
        nutritionalInformation: ''
    });

    useEffect(() => {
        ProductService.getProductById(id).then((res) => {
            let productData = res.data;
            setProduct({
                ...product,
                name: productData.name,
                description: productData.description,
                price: productData.price,
                quantity: productData.quantity,
                category: productData.category,
                nutritionalInformation: productData.nutritionalInformation,
                productImg: productData.productImg

            });
        });
    }, [id]);

    const goBack = (e) => {
        e.preventDefault();
        navigate('/products');

    };

    const changeProductNameHandler = (event) => {
        setProduct({ ...product, name: event.target.value });
    };

    const changeDescriptionHandler = (event) => {
        setProduct({ ...product, description: event.target.value });
    };
    const changePriceHandler = (event) => {
        setProduct({ ...product, price: event.target.value });
    };
    const changeQuantityHandler = (event) => {
        setProduct({ ...product, quantity: event.target.value });
    };
    const changeCategoryHandler = (event) => {
        setProduct({ ...product, category: event.target.value });
    };
    const changeNutritionalInformationHandler = (event) => {
        setProduct({ ...product, nutritionalInformation: event.target.value });
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h2 className="text-center">Product Details</h2>
                        <div className="card-body">
                            <form>
                                <div className="form-group from-detail-img">
                                    <img src={product.productImg} className="detail-img" alt={product.name} />
                                </div>
                                <div className="form-group">
                                    <label> Product Name</label>
                                    <input
                                        placeholder="Product Name"
                                        name="productName"
                                        className="form-control"
                                        value={product.name}
                                        onChange={changeProductNameHandler}
                                        readOnly={true}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label> Description</label>
                                    <input
                                        placeholder='Description'
                                        name='description'
                                        className='form-control'
                                        value={product.description}
                                        onChange={changeDescriptionHandler}
                                        readOnly={true}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label> Unit Price</label>
                                    <input
                                        placeholder='Price'
                                        name='price'
                                        className='form-control'
                                        value={product.price}
                                        onChange={changePriceHandler}
                                        readOnly={true}
                                    />
                                </div>

                                {/* <div className='form-group'>
                                    <label> Quantity</label>
                                    <input
                                        placeholder='Quantity'
                                        name='quantity'
                                        className='form-control'
                                        value={product.quantity}
                                        onChange={changeQuantityHandler}
                                    />
                                </div> */}

                                <div className='form-group'>
                                    <label> Category</label>
                                    <input
                                        placeholder='Category'
                                        name='category'
                                        className='form-control'
                                        value={product.category}
                                        onChange={changeCategoryHandler}
                                        readOnly={true}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label> Nutritional Information</label>
                                    <input
                                        placeholder='Nutritional Information'
                                        name='nutritional_information'
                                        className='form-control'
                                        value={product.nutritionalInformation}
                                        onChange={changeNutritionalInformationHandler}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="product-details-buttons">
                                    <button className="btn btn-success" onClick={goBack}>
                                        Ok
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetailView;

