import React, { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import InventoryService from "../services/InventoryService";
import { useNavigate } from 'react-router-dom';

const Inventory = () => {
  const navigate = useNavigate();
    const [inventories, setInventories] = useState([]);

    function formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    }

    const deleteInventory = (id) => {
        InventoryService.deleteRecord(id).then((res) => {
          setInventories(inventories.filter((inventory) => inventory.id !== id));
        });
    };

    useEffect(() => {
        InventoryService.getRecords().then((res) => {
          setInventories(res.data);
        });
    }, []);

  return (
    <Layout>
    <h3 className="text-center">Inventory Records</h3>
    <div className="row">
        <table className="table table-striped table-boarded">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Product</th>
                    <th>Shop Name</th>
                    <th>Quantity</th>
                    <th>Unit price</th>
                    <th>Contact No.</th>
                    <th>Notes</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {inventories.map((inventory) => (
                    <tr key={inventory.id}>
                        <td>{formatDate(inventory.date)}</td>
                        <td>{inventory.productName}</td>
                        <td>{inventory.shopName}</td>
                        <td>{inventory.quantity}</td>
                        <td>{inventory.price}</td>
                        <td>{inventory.mobileNo}</td>
                        <td>{inventory.notes}</td>
                        <td>
                            <button
                                style={{ marginLeft: '10px' }}
                                onClick={() => deleteInventory(inventory.id)}
                                className="btn btn-danger"
                            >
                                {' '}Delete{' '}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</Layout>
  );
};

export default Inventory;
