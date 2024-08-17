import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/admin_assets/assets'
import '../List/spinner.css'

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error(response.data.message || "Error Occurred while Fetching orders");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      setLoading(true);
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: e.target.value

      })

      if (response.data.success) {
        await fetchAllOrders();
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
        console.log(response.data.message)


      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  return loading ? (<div className='loader-center'><span className="loader"></span></div>) : (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders?.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="parcel_icon" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, idx) => (
                  `${item.name} x ${item.quantity}${idx < order.items.length - 1 ? ',' : ''}`
                ))}
              </p>
              <p className='order-item-food'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='order-item-address' >
                <p>{order.address.street + ","}</p>
                <p >{order.address.city + ", " + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
              <option value="Food Processing">Food Proccessing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
