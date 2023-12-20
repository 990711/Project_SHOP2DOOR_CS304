import axios from 'axios';

const RESTAURANT_API_BASE_URL = "http://localhost:8080/api/v1/RestaurantDetails";

class RestaurantRegisterService {
    getRestaurants() {
        return axios.get(RESTAURANT_API_BASE_URL);
    }

    createRestaurant(restaurant) {
        return axios.post(RESTAURANT_API_BASE_URL, restaurant);
    }

    getRestaurantById(restaurantId) {
        return axios.get(RESTAURANT_API_BASE_URL + '/' + restaurantId);
    }

    getRestaurantByUserName(restaurantUsername) {
        return axios.get(RESTAURANT_API_BASE_URL + '/' + restaurantUsername);
    }

    updateRestaurant(restaurant) {
        return axios.put(RESTAURANT_API_BASE_URL + '/' + restaurant.id, restaurant);
    }

    deleteRestaurant(restaurantId) {
        return axios.delete(RESTAURANT_API_BASE_URL + '/' + restaurantId);
    }
}

export default new RestaurantRegisterService();
