import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/admin_assets/assets'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <Link to={"/add"}>
      <div className='navbar'>
        <img className='logo' src={assets.logo} alt="logo-image" />
        <img className='profile' src={assets.profile_image} alt="profile-image" />
      </div>
    </Link>

  )
}

export default Navbar