import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import Login from './Login';
import { useNavigate } from "react-router-dom";
import ShopOwner_ProductService from '../../../Services/ShopOwner/ShopOwner_ProductService';
import "../../../styles/ShopOwner.css";
import { useLocation } from 'react-router-dom';

const CreateProduct = () => {
  const location = useLocation();
  const user = location.state?.user;
  const category = location.state?.category;
    const navigate = useNavigate();
    const [product, setProduct] = useState({
      name: '',
      image: '',
      brand: '',
      description: '',
      category: '',
      price: '',
      quantity: '',
      discountPrice: '',
      discountPercentage: '',
      
    });
  
    const saveProduct = (e) => {
      e.preventDefault();
  
      ShopOwner_ProductService.createProduct(product).then((res) => {
        navigate('/productlisting',{ state: { user } });
      });
    };
  
    const cancel = () => {
      navigate('/productlisting',{ state: { user } });
    };
  
    const changeNameHandler = (event) => {
      setProduct({ ...product, name: event.target.value });
    };

    const changeImageHandler = (event) => {
      setProduct({ ...product, image: event.target.value });
    };

    const changeBrandHandler = (event) => {
      setProduct({ ...product, brand: event.target.value });
    };

    const changeCategoryHandler = (event) => {
      setProduct({ ...product, category: event.target.value });
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

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProduct({ ...product, image: reader.result });
        };
  
        reader.readAsDataURL(file);
      }
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


                    <label>Image</label>
                    <input
                      placeholder='Image'
                      name='image'
                      value={product.image}
                      onChange={changeImageHandler}
                      //type="file"
                      //accept="image/*"
                      //onChange={handleImageUpload}
                    />

                    <label>Brand</label>
                    <input
                      placeholder='Brand'
                      name='brand'
                      value={product.brand}
                      onChange={changeBrandHandler}
                    />

                 
                    <label>Description</label>
                    <input
                      placeholder='Description'
                      name='description'
                      value={product.description}
                      onChange={changeDescriptionHandler}
                    />

                    <label>Category</label>
                    <select
                      name='category'
                      value={product.category}
                      onChange={changeCategoryHandler}
                      style={{ height: '40px' }}
                    >
                      <option value="">Select Category</option>
                      <option value="Fresh Products">Fresh Products</option>
                      <option value="Dairy and Eggs">Dairy and Eggs</option>
                      <option value="Meat and Seafood">Meat and Seafood</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Canned Goods">Canned Goods</option>
                      <option value="Frozen Foods">Frozen Foods</option>
                      <option value="Pantry Staples">Pantry Staples</option>
                      <option value="Snacks">Snacks</option>
                      <option value="Condiments">Condiments</option>
                      <option value="Spices and Herbs">Spices and Herbs</option>
                      <option value="Cleaning Supplies">Cleaning Supplies</option>
                      <option value="Personal Care">Personal Care</option>
                      <option value="Baby Care">Baby Care</option>
                      <option value="Household Items">Household Items</option>
                      <option value="Pet Supplies">Pet Supplies</option>
                      <option value="Health and Wellness">Health and Wellness</option>
                      <option value="Alcoholic Beverages">Alcoholic Beverages</option>
                      <option value="Special Diet">Special Diet</option>
                      <option value="Other">Other</option>
                    </select>

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