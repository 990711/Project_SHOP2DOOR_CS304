import axios from 'axios';

const SHOP_OWNER_API_BASE_URL = "http://localhost:8080/api/v1/Item";

class ItemsServices {
    GetItemsByShopID(ShopID) {
        return axios.get(SHOP_OWNER_API_BASE_URL + '/' + ShopID);
    }
}

export default new ItemsServices();