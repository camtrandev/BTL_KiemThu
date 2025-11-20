import { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../../../frontend/src/assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error loading orders");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  // Update order status
  const updateOrder = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`${url}/api/order/${orderId}`, {
        status: newStatus
      });

      if (response.data.success) {
        toast.success("Order updated!");
        fetchAllOrders();
      } else {
        toast.error("Failed to update");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="orders">
      <h2>All Orders</h2>

      {orders.map((order, index) => (
        <div className="order-item" key={index}>

          {/* Ảnh */}
          <img src={assets.parcel_icon} alt="order" />

          {/* Thông tin khách hàng */}
          <div>
            <p className="order-item-name">{order.address.firstName} {order.address.lastName}</p>
            <p className="order-item-address">{order.address.street}, {order.address.city}</p>
            <p>Phone: {order.address.phone}</p>
          </div>

          {/* Tổng tiền */}
          <p><b>${order.amount}</b></p>

          {/* Danh sách món */}
          <p>
            {order.items.map((item, i) => (
              <span key={i}>{item.name} x{item.quantity}<br /></span>
            ))}
          </p>

          {/* Status */}
          <select
            value={order.status}
            onChange={(e) => updateOrder(order._id, e.target.value)}
          >
            <option value="Food Processing">Food Processing</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>

        </div>
      ))}
    </div>
  );
};

export default Orders;
