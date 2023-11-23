import axios from 'axios';

const SHOP_OWNER_API_BASE_URL = "http://localhost:8080/api/v1/shopowner";

class ShopOwnerRegisterService {
    getShopOwners() {
        return axios.get(SHOP_OWNER_API_BASE_URL);
    }

    createShopOwner(shopOwner) {
        return axios.post(SHOP_OWNER_API_BASE_URL, shopOwner);
    }

    getShopOwnerById(shopOwnerId) {
        return axios.get(SHOP_OWNER_API_BASE_URL + '/' + shopOwnerId);
    }

    getShopOwnerByUserName(shopOwnerUsername) {
        return axios.get(SHOP_OWNER_API_BASE_URL + '/' + shopOwnerUsername);
    }

    updateShopOwner(shopOwner) {
        return axios.put(SHOP_OWNER_API_BASE_URL + '/' + shopOwner.id, shopOwner);
    }

    deleteShopOwner(shopOwnerId) {
        return axios.delete(SHOP_OWNER_API_BASE_URL + '/' + shopOwnerId);
    }
}

export default new ShopOwnerRegisterService();
