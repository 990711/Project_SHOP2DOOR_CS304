import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/v1/foodSuppliers";

class ProductService{
    getAllFoodSuppliers(){
        return axios.get(PRODUCT_API_BASE_URL);

    }
    addProduct(product){
        return axios.post(PRODUCT_API_BASE_URL, product);
    }

    getFoodSupplierByName(userId){
        return axios.get(PRODUCT_API_BASE_URL +'/' + userId);
    }

    updateProduct(product){
        return axios.put(PRODUCT_API_BASE_URL +'/' + product.id, product);
    }
}
export default new ProductService()
