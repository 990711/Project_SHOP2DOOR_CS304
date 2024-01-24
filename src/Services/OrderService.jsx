import axios from 'axios';

const ORDER_API_BASE_URL = "http://localhost:8080/api/v1/order";

class OrderService{
    getOrders(){
        return axios.get(`http://localhost:8080/api/v1/ShopOwnerOrderDetails/${ShopUserName}`);

    }
    createOrders(order){
        return axios.post(ORDER_API_BASE_URL, order);
    }

    getOrderById(orderId){
        return axios.get(ORDER_API_BASE_URL +'/' + orderId);

    }
 
    updateOrder(order){
        return axios.put(ORDER_API_BASE_URL +'/' + order.id, order);

    }

    deleteOrder(orderId){
        return axios.delete(ORDER_API_BASE_URL +'/' + orderId);

    }

}
export default new OrderService()

