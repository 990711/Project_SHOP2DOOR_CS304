import axios from 'axios';

const DELIVERY_API_BASE_URL = "http://localhost:8080/api/v1";

class DeliveryService {
    getPendingDeliveries() {
        return axios.get(DELIVERY_API_BASE_URL + '/deliveries/pending');
    }

    getCompletedDeliveries() {
        return axios.get(DELIVERY_API_BASE_URL + '/deliveries/completed');
    }

    getAcceptedDeliveries() {
        return axios.get(DELIVERY_API_BASE_URL + '/deliveries/accepted');
    }
}

export default new DeliveryService();
