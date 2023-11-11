import React, { useState } from 'react';
import ProductService from '../services/ProductService';
import { useNavigate } from 'react-router-dom';

function AddProductComponent() {
  
  const navigate = useNavigate();
  const [product, setProduct] = useState({
  name: '',
  description: '',
    price: '',
    quantity: '',
    category: '',
    nutritionalInformation: ''
        
  });

  const saveProduct = (e) => {
    e.preventDefault();

    ProductService.addProduct(product).then((res) => {
      navigate('/products');
    });
  };
 
  const cancel = () => {
    navigate('/products');
  };

  const changeNameHandler = (event) => {
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
        setProduct({ ...product, nutritional_information: event.target.value });
    };

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h3 className='text-center'>Add Product</h3>
            <div className='card-body'>
              <form>
                <div className='form-group'>
                  <label> Name</label>
                  <input
                    placeholder='Name'
                    name='name'
                    className='form-control'
                    value={product.name}
                    onChange={changeNameHandler}
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
                />
            </div>

            <div className='form-group'>
                <label> Price</label>
                <input
                    placeholder='Price'
                    name='price'
                    className='form-control'
                    value={product.price}
                    onChange={changePriceHandler}
                />
            </div>

            <div className='form-group'>
                <label> Quantity</label>
                <input
                    placeholder='Quantity'
                    name='quantity'
                    className='form-control'
                    value={product.quantity}
                    onChange={changeQuantityHandler}
                />
            </div>

            <div className='form-group'>
                <label> Category</label>
                <input
                    placeholder='Category'
                    name='category'
                    className='form-control'
                    value={product.category}
                    onChange={changeCategoryHandler}
                />
            </div>

            <div className='form-group'>
                <label> Nutritional Information</label>
                <input
                    placeholder='Nutritional Information'
                    name='nutritional_information'
                    className='form-control'
                    value={product.nutritional_information}
                    onChange={changeNutritionalInformationHandler}
                />
            </div>


                <button className='btn btn-success' onClick={saveProduct}>
                  Save
                </button>

                <button className='btn btn-danger' onClick={cancel} style={{ marginLeft: '5px' }}>
                    Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductComponent;
