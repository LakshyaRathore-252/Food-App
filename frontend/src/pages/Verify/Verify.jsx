import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import './Verify.css'
import { toast } from 'react-toastify'
const Verify = () => {

    const [searchParams, setSeachParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();

    const { url, token } = useContext(StoreContext)
    const verifyPayment = async () => {
        try {

            const response = await axios.post(
                url + '/api/order/verify',          // The URL of the API endpoint
                { success, orderId },               // The request body (payload)
                {                                   // The configuration object (including headers)
                    headers: {
                        'Content-Type': 'application/json',  // Specify the content type as JSON
                        'token': token                       // Include the token in the headers
                    }
                }
            );

            if (response.data.success) {
                navigate('/myorders');
                toast.success(response.data.message || "Payment Successful")
            } else {
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [])
    return (
        <div className='verify'>
            <div className="spinner"></div>

        </div>
    )
}

export default Verify