import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };
  const statusHandler = async(event,orderId)=>{
    // console.log(orderId,event);
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if(response.data.success)
    {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, i) => 
                  i === order.items.length - 1 
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
            </div>
            <div className="order-item-address">
              <p className="order-item-name">{order.address.firstName +" "+order.address.lastName }</p>
              <p>{order.address.street+", "}</p>
              <p>{order.address.city+", "+ order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              <p className="order-item-phone">
                {order.address.phone}
              </p>
            </div>
            <p>Items: {order.items.length} </p>
            <p>₹ {order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>

              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;