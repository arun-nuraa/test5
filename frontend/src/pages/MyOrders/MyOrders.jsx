import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../components/context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import LoginPopup from "../../components/LoginPopup/LoginPopup";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [ldata, setlData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const fetchLocalOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/luserorders",
        {},
        { headers: { token } }
      );
      setlData(response.data.data);
    } catch (error) {
      console.error("Error fetching local orders", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
      fetchLocalOrders();
    }
  }, [token]);

  const openReceipt = (order) => {
    setSelectedOrder(order);
  };

  const closeReceipt = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} />

      <div className="my-orders">
        <h2>My Local Orders</h2>
        <br />
        <div className="container">
          {ldata.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel" />
              <p>
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} x {item.quantity}
                    {i < order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <button onClick={() => openReceipt(order)}>Get Receipt</button>
            </div>
          ))}
        </div>

        <br />
        <h2>My Delivery Orders</h2>
        <div className="container">
          {data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel" />
              <p>
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} x {item.quantity}
                    {i < order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))}
        </div>
      </div>

      {selectedOrder && (
        <div className="receipt-popup-overlay">
          <div className="receipt-popup">
            <button className="close-btn" onClick={closeReceipt}>
              &times;
            </button>
            <div className="receipt-box">
              <h2 className="receipt-title">Teatime Restaurant</h2>

              <br />

              <p>Date: {new Date(selectedOrder.date).toLocaleDateString()}</p>
              <p>Time: {new Date(selectedOrder.date).toLocaleTimeString()}</p>
              <hr />
              <ul>
                {selectedOrder.items.map((item, index) => (
                  <li key={index}>
                    {item.name} x {item.quantity}
                  </li>
                ))}
              </ul>
              <hr />
              <p>
                <strong>Total Amount:</strong> ${selectedOrder.amount}.00
              </p>
              <p>
                <strong>Payment:</strong> Paid
              </p>
              <div className="barcode-placeholder">|| || || || ||</div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default MyOrders;

/*
<p>Address: vit,main gate </p>
              <p>Tel: 123-456-7890</p>*/
