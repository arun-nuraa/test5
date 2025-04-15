import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../components/context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginPopup from '../../components/LoginPopup/LoginPopup'
import Navbar from '../../components/Navbar/Navbar'

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext);
  const [showLogin,setShowLogin]= useState(false)
 



  const placeOrder = async (event)=>{
event.preventDefault();
let orderItems = [];
food_list.map((item)=>{
  if (cartItems[item._id]>0) {
    let itemInfo = item;
    itemInfo["quantity"]= cartItems[item._id];
    orderItems.push(itemInfo);
  }
})
let orderData= {
  items:orderItems,
  amount:getTotalCartAmount(),
}
let response = await axios.post(url+"/api/order/localplace",orderData,{headers:{token}});
if (response.data.success) {
  const {session_url}= response.data;
  window.location.replace(session_url);
}
else{
  alert("Error");
}

  }
  const navigate = useNavigate();
useEffect(()=>{
if (!token) {
  navigate('/cart')
  alert("Please Login!");
}
else if (getTotalCartAmount()===0) {
  navigate('/cart')
  alert("Your cart is empty!");
}
},[token])


  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <Navbar setShowLogin={setShowLogin}/>
    
    
    <form onSubmit={placeOrder} className='place-order'>




      <div className="place-order-right">
      <div className="cart-total">
      <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()}</b>
            </div>
            
          </div>
          <button type='submit' >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
    </>
  )
}

export default PlaceOrder
