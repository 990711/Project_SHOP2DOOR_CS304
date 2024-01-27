
import axios from 'axios';

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1";

class ShopOwner_ServicesForCustomers{
    GetItemsByShopID(ShopID){
        return axios.get(PRODUCT_API_BASE_URL + '/ItemByShopId/' + ShopID);
    }

    GetAllItems(){
        return axios.get(PRODUCT_API_BASE_URL + '/Item');
    }
}
export default new ShopOwner_ServicesForCustomers()

