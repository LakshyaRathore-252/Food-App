import React, { useContext, useEffect, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../assets/frontend_assets/assets';
import { StoreContext } from '../../src/context/StoreContext'
import axios from 'axios';
import { toast } from 'react-toastify'

const LoginPopUp = ({ setShowLogin }) => {

    const { url, token, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign Up");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onchangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))

    }


    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;

        if (currState === "Login") {
            newUrl += "/api/user/login";
            try {
                const response = await axios.post(newUrl, data);
                console.log(response.data);

                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    setShowLogin(false);
                    console.log(response.data);
                    toast.success(response.data.message || "Something went wrong");
                }
                else {
                    toast.error(response.data.message || "Something went wrong");
                }
            } catch (error) {
                // console.log(error)
                toast.error(error.response.data.message || "Something went wrong");
            }
        } else {
            newUrl += "/api/user/register";
            try {
                const response = await axios.post(newUrl, data);

                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    setShowLogin(false);
                    toast.success(response.data.message || "Something went wrong");
                }
                else {
                    toast.error(response.data.message || "Something went wrong");
                }
            } catch (error) {
                toast.error(error.response.data.message || "Something went wrong");
            }
        }

    }



    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt={assets.cross_icon} />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> :
                        <input type='text' name='name' onChange={onchangeHandler} value={data.name} placeholder='Your Name' required />
                    }
                    <input type='email' name='email' onChange={onchangeHandler} placeholder='Your Email' required />
                    <input type='password' name='password' onChange={onchangeHandler} placeholder='Password' required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing , i agree to the terms of use & Privacy Policy.</p>
                </div>
                {currState === "Login" ? <p>Create a new account ? <span onClick={() => setCurrState("Sign Up")}>Click Here</span> </p> :
                    <p>Already have a account ? <span onClick={() => setCurrState("Login")}>Login Here</span></p>}
            </form>
        </div>
    )
}

export default LoginPopUp