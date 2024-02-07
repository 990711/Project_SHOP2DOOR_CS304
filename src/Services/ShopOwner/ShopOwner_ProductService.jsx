
import axios from 'axios';

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/Item";
const product_by_shop_username = "http://localhost:8080/api/v1/ItemByShop";

class ShopOwner_ProductService{
    getProducts(){
        return axios.get(PRODUCT_API_BASE_URL);

    }

    createProduct(ShopUserName, product){
        return axios.put(`http://localhost:8080/api/v1/ShopOwnerItem/${ShopUserName}`,product);
    }

    


    getShopOwners(){
        return axios.put(`http://localhost:8080/api/v1/ShopOwnerDetails`);
    }

    getProductById(productId){
        return axios.get(PRODUCT_API_BASE_URL +'/' + productId);

    }

    getProductByShopUserName(ShopUserName) {
        return axios.get(`http://localhost:8080/api/v1/ItemByShopUsername/${ShopUserName}`);
    }
    

    updateProduct(product){
        return axios.put(PRODUCT_API_BASE_URL +'/' + product.id, product);

    }

    deleteProduct(productId){
        return axios.delete(`http://localhost:8080/api/v1/deleteItem/${productId}`);

    }

}
export default new ShopOwner_ProductService()

