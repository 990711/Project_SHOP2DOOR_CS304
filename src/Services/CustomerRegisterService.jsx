import axios from 'axios';

const CUSTOMER_API_BASE_URL = "http://localhost:8080/api/v1/CustomerDetails";

class CustomerRegisterService{
    getCustomers(){
        return axios.get(CUSTOMER_API_BASE_URL);

    }

    
    createCustomer(customer){
        return axios.post(CUSTOMER_API_BASE_URL, customer);
    }
    


    getCustomerById(customerId){
        return axios.get(CUSTOMER_API_BASE_URL +'/' + customerId);

    }

    getCustomerByUserName(customername){
        return axios.get(CUSTOMER_API_BASE_URL +'/' + customername);

    }

    updateCustomer(customer){
        return axios.put(CUSTOMER_API_BASE_URL +'/' + customer.id, customer);

    }

    deleteCustomer(customerId){
        return axios.delete(CUSTOMER_API_BASE_URL +'/' + customerId);

    }

}
export default new CustomerRegisterService()

