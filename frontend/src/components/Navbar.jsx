// ======== Import Dependencies  =========

import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// Import Assests
import { assets } from '../assets/frontend_assets/assets'

// ===== CSS ======
import { toast } from 'react-toastify'
import { StoreContext } from '../context/StoreContext'
import './Navbar.css'

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        setToken("")
        navigate("/");
        toast.success("Logout Successful");
    }

  
    return (
        <div className='navbar'>
            <Link to={"/"}>  <img src={assets.logo} alt='logo' className='logo' /></Link>
            <ul className='navbar-menu'>
                <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
                <a href='#footer' onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact us</a>
            </ul>

            <div className='navbar-right'>
                <img src={assets.search_icon} alt='search-icon' />
                <div className='navbar-search-icon'>
                    <Link to={"/cart"}> <img src={assets.basket_icon} alt='basket-icon' /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>sign in</button> : <div className='navbar-profile'>
                    <img src={assets.profile_icon} alt='profile icon' />
                    <ul className='nav-profile-dropdown'>
                        <li onClick={() => navigate("/myorders")}>
                            <img src={assets.bag_icon} alt='bag_icon' /> <p>Orders</p>
                        </li>
                        <hr />
                        <li onClick={logout}><img src={assets.logout_icon} alt='logout_icon' /><p>Logout </p> </li>
                        <hr />
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default Navbar