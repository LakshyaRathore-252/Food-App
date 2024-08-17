import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/admin_assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to={"/add"} className="sidebar-option">
          <img src={assets.add_icon} alt="add-icon" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to={"/list"} className="sidebar-option">
          <img src={assets.order_icon} alt="order-icon" />
          <p>List Items</p>
        </NavLink>
        <NavLink to={"/orders"}s className="sidebar-option">
          <img src={assets.order_icon} alt="order-icon" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar