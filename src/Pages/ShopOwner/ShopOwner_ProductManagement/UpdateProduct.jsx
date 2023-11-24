import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import Login from './Login';
import { useNavigate } from "react-router-dom";
import ShopOwner_ProductService from '../../../Services/ShopOwner/ShopOwner_ProductService';
import "../../../styles/ShopOwner.css";
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({
      name: '',
      description: '',
      price: '',
      quantity: '',
      discountPrice: '',
      discountPercentage: '',
      
    });

    useEffect(() => {
        ShopOwner_ProductService.getProductById(id).then((res) => {
          let productData = res.data;
          setProduct((prevProduct) => ({
            ...prevProduct,
            name: productData.name || '',
            description: productData.description || '',
            price: productData.price || '',
            quantity: productData.quantity || '',
            discountPrice: productData.discountPrice || '',
            discountPercentage: productData.discountPercentage || '',
          }));
        });
      }, [id]);
  
    const saveProduct = (e) => {
      e.preventDefault();
  
      ShopOwner_ProductService.createProduct(product).then((res) => {
        navigate('/productlisting');
      });
    };
  
    const cancel = () => {
      navigate('/productlisting');
    };

    const updateProduct = (e) => {
        e.preventDefault();
    
        let updatedProduct = {
            id:id,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            discountPrice: product.discountPrice,
            discountPercentage: product.discountPercentage,
            
        };
    
        console.log('updatedProduct =>' + JSON.stringify(updatedProduct));
    
        ShopOwner_ProductService.updateProduct(updatedProduct)
        .then((res) => {
          console.log('Server response:', res);
          navigate('/productlisting');
        })
        .catch((error) => {
          console.error('Error from server:', error);
        });
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
            <div className="title">Update Product</div>
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