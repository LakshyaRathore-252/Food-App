import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, url, cartItem } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    // console.log(cartItem)
    food_list?.map((item) => {
      if (cartItem[item?._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item?._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }

    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast.error("Payment Failed")
      }

    } catch (error) {
      console.log(error)
    }
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
      toast.error("Please Login First");
    } else if (getTotalCartAmount() === 0) {
      toast.error("Please Select Items")
      navigate('/cart');

    }
  }, [token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name='firstName' onChange={changeHandler} type="text" placeholder='First Name' required />
          <input onChange={changeHandler} name='lastName' type="text" placeholder='Last Name' required />
        </div>
        <input name='email' onChange={changeHandler} type="email" placeholder='Email address' required />
        <input name='street' onChange={changeHandler} type="text" placeholder='Street' required />
        <div className="multi-fields">
          <input name='city' onChange={changeHandler} type="text" placeholder='City' required />
          <input name='state' onChange={changeHandler} type="text" placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={changeHandler} type="text" placeholder='Zip-Code' required />
          <input name='country' onChange={changeHandler} type="text" placeholder='Country' required />
        </div>
        <input name='phone' onChange={changeHandler} type='text' placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals </h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>$ {getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>$ {getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p>$ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder