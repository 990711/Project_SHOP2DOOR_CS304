import axios from 'axios';

const DELIVERY_RIDER_API_BASE_URL = "http://localhost:8080/api/v1/DeliveryRiderDetails";

class DeliveryRiderRegisterService {
    getDeliveryRiders() {
        return axios.get(DELIVERY_RIDER_API_BASE_URL);
    }

    createDeliveryRider(deliveryRider) {
        return axios.post(DELIVERY_RIDER_API_BASE_URL, deliveryRider);
    }

    getDeliveryRiderById(deliveryRiderId) {
        return axios.get(DELIVERY_RIDER_API_BASE_URL + '/' + deliveryRiderId);
    }

    getDeliveryRiderByUserName(deliveryRiderUsername) {
        return axios.get(DELIVERY_RIDER_API_BASE_URL + '/' + deliveryRiderUsername);
    }

    updateDeliveryRider(deliveryRider) {
        return axios.put(DELIVERY_RIDER_API_BASE_URL + '/' + deliveryRider.id, deliveryRider);
    }

    deleteDeliveryRider(deliveryRiderId) {
        return axios.delete(DELIVERY_RIDER_API_BASE_URL + '/' + deliveryRiderId);
    }
}

export default new DeliveryRiderRegisterService();