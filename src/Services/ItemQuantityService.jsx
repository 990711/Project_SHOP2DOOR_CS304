import axios from "axios";

const ORDER_API_BASE_URL = "http://localhost:8080/api/v1/itemquantity";

class ItemQuantityService {
  addNewItemQuantity(orderID, itemID, quantityJson) {
    return axios.post(
      ORDER_API_BASE_URL + "/" + orderID + "/" + itemID,
      quantityJson
    );
  }

  getOrderItemQuantities(orderID) {
    return axios.get(ORDER_API_BASE_URL + "/" + orderID);
  }

  deleteItemQuantity(itemID, orderID) {
    return axios.delete(ORDER_API_BASE_URL + "/" + orderID + "/" + itemID);
  }
}

export default new ItemQuantityService();
