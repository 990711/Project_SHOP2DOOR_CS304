import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import Login from './Login';
import { useNavigate } from "react-router-dom";
import ShopOwner_ProductService from '../../../Services/ShopOwner/ShopOwner_ProductService';
import "../../../styles/ShopOwner.css";
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const UpdateProduct = () => {
  const location = useLocation();
  const user = location.state?.user;
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({
      name: '',
      image: '',
      brand: '',
      description: '',
      category: '',
      price: '',
      quantity: '',
      discount_percentage: '',
      
    });

    useEffect(() => {
        ShopOwner_ProductService.getProductById(id).then((res) => {
          let productData = res.data;
          setProduct((prevProduct) => ({
            ...prevProduct,
            name: productData.name || '',
            image: productData.image || '',
            brand: productData.brand || '',
            description: productData.description || '',
            category: productData.category || '',
            price: productData.price || '',
            quantity: productData.quantity || '',
            discount_percentage: productData.discount_percentage || '',
          }));
        });
      }, [id]);
  
    const saveProduct = (e) => {
      e.preventDefault();
  
      ShopOwner_ProductService.createProduct(product).then((res) => {
        navigate('/productlisting',{ state: { user } });
      });
    };
  
    const cancel = () => {
      navigate('/productlisting',{ state: { user } });
    };

    const updateProduct = (e) => {
        e.preventDefault();
    
        let updatedProduct = {
            id:id,
            name: product.name,
            image: product.image,
            brand: product.brand,
            description: product.description,
            category: product.category,
            price: product.price,
            quantity: product.quantity,
            discount_percentage: product.discount_percentage,
            
        };
    
        console.log('updatedProduct =>' + JSON.stringify(updatedProduct));
    
        ShopOwner_ProductService.updateProduct(updatedProduct)
        .then((res) => {
          console.log('Server response:', res);
          navigate('/productlisting',{ state: { user } });
        })
        .catch((error) => {
          console.error('Error from server:', error);
        });
      };

  
    const changeNameHandler = (event) => {
      setProduct({ ...product, name: event.target.value });
    };

    const changeBrandHandler = (event) => {
      setProduct({ ...product, brand: event.target.value });
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
  
    /*
  
    const changeDiscountPercentageHandler = (event) => {
      setProduct({ ...product, discountPercentage: event.target.value });
    };
*/

    const changeImageHandler = (event) => {
      setProduct({ ...product, image: event.target.value });
    };

    const changeDiscountPercentageHandler = (event) => {
      const inputDiscountPercentage = event.target.value;
    
      // Check if the input is a valid number between 0 and 1
      const isValidDiscountPercentage =
        !isNaN(inputDiscountPercentage) &&
        inputDiscountPercentage >= 0 &&
        inputDiscountPercentage <= 1;
    
      if (isValidDiscountPercentage) {
        setProduct({ ...product, discount_percentage: inputDiscountPercentage });
      } else {
        // You may want to handle invalid input, such as displaying an error message
        console.error('Invalid Discount Percentage');
      }
    };

    const changeCategoryHandler = (event) => {
      console.log('Selected category:', event.target.value);
      setProduct({ ...product, category: event.target.value });
    };
  
    
  
    return (
        <div>
            <br/>
           
            <div className="container">
            <div className="title">Update Product</div>
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
                      
                      <label>Discount Percentage (Example: 0.2 for 20%)</label>
                      <input
                        placeholder='Discount Percentage'
                        name='discountPercentage'
                        value={product.discount_percentage}
                        onChange={changeDiscountPercentageHandler}
                      />
                      {product.discount_percentage === '' && (
                        <p style={{ color: 'red', fontSize: '12px', margin: '0' }}>
                          Please enter a valid discount percentage between 0 and 1.
                        </p>
                      )}
                    
                    
                    <div>
                    <div className="button-container">
                    <button style={{ marginRight: '10px' }} onClick={updateProduct}>
                        Save
                    </button>
    
                    </div>
                    </div>
                  </form>
        </div>
        </div>
      );
    }
  
  export default UpdateProduct;