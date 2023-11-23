import axios from 'axios';

const SUPPLIER_API_BASE_URL = "http://localhost:8080/api/v1/supplier";

class SupplierRegisterService {
    getSuppliers() {
        return axios.get(SUPPLIER_API_BASE_URL);
    }

    createSupplier(supplier) {
        return axios.post(SUPPLIER_API_BASE_URL, supplier);
    }

    getSupplierById(supplierId) {
        return axios.get(SUPPLIER_API_BASE_URL + '/' + supplierId);
    }

    getSupplierByUserName(supplierUsername) {
        return axios.get(SUPPLIER_API_BASE_URL + '/' + supplierUsername);
    }

    updateSupplier(supplier) {
        return axios.put(SUPPLIER_API_BASE_URL + '/' + supplier.id, supplier);
    }

    deleteSupplier(supplierId) {
        return axios.delete(SUPPLIER_API_BASE_URL + '/' + supplierId);
    }
}

export default new SupplierRegisterService();
