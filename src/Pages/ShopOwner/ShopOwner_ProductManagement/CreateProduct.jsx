import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import Login from './Login';
import { useNavigate } from "react-router-dom";
import ShopOwner_ProductService from '../../../Services/ShopOwner/ShopOwner_ProductService';
import "../../../styles/ShopOwner.css";

const CreateProduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
      name: '',
      description: '',
      price: '',
      quantity: '',
      discountPrice: '',
      discountPercentage: '',
      
    });
  
    const saveProduct = (e) => {
      e.preventDefault();
  
      ShopOwner_ProductService.createProduct(product).then((res) => {
        navigate('/productlisting');
      });
    };
  
    const cancel = () => {
      navigate('/productlisting');
    };
  
    const changeNameHandler = (event) => {
      setProduct({ ...product, name: event.target.value });
    };
  
    const changeQuantityHandler = (event) => {
      setProduct({ ...product, quantity: event.target.value });
    };
  
    const changePriceHandler = (event) => {
      setProduct({ ...product, price: event.target.value });
    };
  
    const changeDescriptionHandler = (event) => {
      setProduct({ ...product, description: event.target.value });
    };
  
    const changeDiscountPriceHandler = (event) => {
      setProduct({ ...product, discountPrice: event.target.value });
    };
  
    const changeDiscountPercentageHandler = (event) => {
      setProduct({ ...product, discountPercentage: event.target.value });
    };
  
    
  
    return (
      <div>
          <br/>
         
          <div className="container">
          <div className="title">Add Product</div>
              <form action="">
                    <label>Name</label>
                    <input
                      placeholder='Name'
                      name='name'
                      value={product.name}
                      onChange={changeNameHandler}
                    />
                 
                    <label>Description</label>
                    <input
                      placeholder='Description'
                      name='description'
                      value={product.description}
                      onChange={changeDescriptionHandler}
                    />
                    <label>Price</label>
                    <input
                      placeholder='Price'
                      name='price'
                      value={product.price}
                      onChange={changePriceHandler}
                    />
                    <label>Quantity</label>
                    <input
                      placeholder='Quantity'
                      name='quantity'
                      value={product.quantity}
                      onChange={changeQuantityHandler}
                    />
                    <label>Discount Price</label>
                    <input
                      placeholder='Discount Price'
                      name='discountPrice'
                      value={product.discountPrice}
                      onChange={changeDiscountPriceHandler}
                    />
                    <label>Discount Percentage</label>
                    <input
                      placeholder='Discount Percentage'
                      name='discountPercentage'
                      value={product.discountPercentage}
                      onChange={changeDiscountPercentageHandler}
                    />
                  
                  
                  <div>
                  <div className="button-container">
                  <button style={{ marginRight: '10px' }} onClick={saveProduct}>
                    Save
                  </button>
                  <button onClick={cancel}>
                    Cancel
                  </button>
                  </div>
                </div>
                     </form>
                      </div>
                      </div>
    );
  }
  
  export default CreateProduct;