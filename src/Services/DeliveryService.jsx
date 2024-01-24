import axios from 'axios';

const DELIVERY_API_BASE_URL = "http://localhost:8080/api/v1/viewWaitingOrders";

class DeliveryService {

    getwaitingorder_customer_details(orderId) {
        return axios.get(`http://localhost:8080/api/v1/viewCustomerDetails/${orderId}`);
    }

    getwaitingorder_shop_details(orderId) {
        return axios.get(`http://localhost:8080/api/v1/viewShopDetails/${orderId}`);
    }


    getPendingDeliveries() {
        return axios.get(DELIVERY_API_BASE_URL);
    }

    getCompletedDeliveries(rider_username) {
        return axios.get(`http://localhost:8080/api/v1/viewCompletedOrders/${rider_username}`);
    }
   
    getAcceptedDeliveries(rider_username) {
        return axios.get(`http://localhost:8080/api/v1/viewAcceptedOrders/${rider_username}`);
    }

    putaccept_order(selectedDelivery,rider_username) {
        return axios.put(`http://localhost:8080/api/v1/orderRider/${selectedDelivery}/${rider_username}`);
    }

    putcomplete_order(orderId) {
        return axios.put(`http://localhost:8080/api/v1/completeOrder/${orderId}`);
    }

}

export default new DeliveryService();
