import React, { useState, useContext } from "react";
import LoginPopup from "../../components/LoginPopup/LoginPopup";
import Navbar from "../../components/Navbar/Navbar";
import "./Menu.css";
import FoodItem from "../../components/FoodItem/FoodItem";
import { StoreContext } from "../../components/context/StoreContext";
import Footer from "../../components/Footer/Footer";
const Menu = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { food_list } = useContext(StoreContext);
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <Navbar setShowLogin={setShowLogin} />

      <div className="food-display-list">
        {food_list.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Menu;
