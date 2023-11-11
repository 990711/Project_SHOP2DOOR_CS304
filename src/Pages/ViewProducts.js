// ViewProducts.js
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProductBox from "../components/ProductBoxView"; // Adjust the import path
import ProductService from "../services/ProductService"; // Import your service
import { useUser } from '../UserContext'; // Import the UserContext

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const { userName } = useUser();

  // console.log({userName});

  useEffect(() => {
    // Fetch products when the component mounts
    ProductService.getProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <Layout>
      <h2 className='text-center'>Products</h2>
      <div className="product-list">
        {products.map((product, index) => (
          <ProductBox key={index} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default ViewProducts;
