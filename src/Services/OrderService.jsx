import axios from "axios";

const ORDER_API_BASE_URL = "http://localhost:8080/api/v1/order";

class OrderService{
    getOrders(ShopUserName){
        return axios.get(`http://localhost:8080/api/v1/getPendingOrders/${ShopUserName}`);

    }

    getPendingOrderItems(ShopUserName, orderId){
        return axios.get(`http://localhost:8080/api/v1/getPendingOrderItems/${ShopUserName}/${orderId}`);

    }

    getCompletedOrders(ShopUserName){
        return axios.get(`http://localhost:8080/api/v1/getCompletedOrders/${ShopUserName}`);

    }

    getCompletedOrderItems(ShopUserName, orderId){
        return axios.get(`http://localhost:8080/api/v1/getCompletedOrderItems/${ShopUserName}/${orderId}`);

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
  
  getOrders() {
    return axios.get(ORDER_API_BASE_URL);
  }

  createNewOrder(username) {
    return axios.post(ORDER_API_BASE_URL + "/" + username);
  }

  createOrders(order) {
    return axios.post(ORDER_API_BASE_URL, order);
  }

  async getOrderById(orderId) {
    try {
          const response = await axios
              .get(ORDER_API_BASE_URL);
          const order = response.data.find((order_1) => order_1.order_id === orderId);
          return order || null;
      } catch (error) {
          console.error("Error fetching order:", error);
          throw error; // Rethrow the error for handling in the calling code
      }
  }

  updateOrder(order) {
    return axios.put(ORDER_API_BASE_URL + "/" + order.id, order);
  }

  deleteOrder(orderId) {
    return axios.delete(ORDER_API_BASE_URL + "/" + orderId);
  }

  confirmOrder(orderId) {
    return axios.put(ORDER_API_BASE_URL + "Confirm/" + orderId);
  }
}
export default new OrderService();
