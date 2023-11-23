
import axios from 'axios';

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/shopowner_products";

class ShopOwner_ProductService{
    getProducts(){
        return axios.get(PRODUCT_API_BASE_URL);

    }

    createProduct(product){
        return axios.post(PRODUCT_API_BASE_URL, product);
    }

    getProductById(productId){
        return axios.get(PRODUCT_API_BASE_URL +'/' + productId);

    }

    updateProduct(product){
        return axios.put(PRODUCT_API_BASE_URL +'/' + product.id, product);

    }

    deleteProduct(productId){
        return axios.delete(PRODUCT_API_BASE_URL +'/' + productId);

    }

}
export default new ShopOwner_ProductService()

