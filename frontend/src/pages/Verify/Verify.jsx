import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';
import LoginPopup from '../../components/LoginPopup/LoginPopup'
import Navbar from '../../components/Navbar/Navbar'
import { useState } from 'react'

const Verify = () => {
    const [searchParams,setSearchParams]=useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const [showLogin,setShowLogin]= useState(false)
  
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async ()=>{
        const response = await axios.post(url+"/api/order/verify",{success,orderId});
        if (response.data.success) {
            navigate("/myorders");
        }
        else{
            navigate("/")
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[])
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <Navbar setShowLogin={setShowLogin}/>
    <div className='verify'>
        <div className="spinner">

        </div>
      
    </div>
    </>
  )
}

export default Verify
