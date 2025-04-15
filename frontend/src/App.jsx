import React, { useState } from "react";
//import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
//import Footer from "./components/Footer/Footer";
//import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import CafeHub from "./pages/CafeHub/CafeHub";
import Login from "./pages/Login/Login";
import ALcafehub from "./pages/ALcafehub/ALcafehub";
import LocalPlaceOrder from "./pages/LocalPlaceOrder/LocalPlaceOrder";
import Menu from "./pages/Menu/Menu";

const App = () => {
  //const [showLogin,setShowLogin]= useState(false)
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<CafeHub />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/CafeHub" element={<ALcafehub />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/localorder" element={<LocalPlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
