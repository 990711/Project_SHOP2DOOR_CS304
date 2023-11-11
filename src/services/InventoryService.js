import axios from 'axios';

const INVENTORY_API_BASE_URL = "http://localhost:8080/api/v1/inventory";

class InventoryService{
    getRecords(){
        return axios.get(INVENTORY_API_BASE_URL);

    }
    addRecord(record){
        return axios.post(INVENTORY_API_BASE_URL, record);
    }

    // getProductById(productId){
    //     return axios.get(INVENTORY_API_BASE_URL +'/' + productId);
    // }

    // updateProduct(product){
    //     return axios.put(INVENTORY_API_BASE_URL +'/' + product.id, product);
    // }

    deleteRecord(recordID){
        return axios.delete(INVENTORY_API_BASE_URL +'/' + recordID);
    }

}
export default new InventoryService()
