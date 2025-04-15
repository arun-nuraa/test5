import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";
import "./RouteCafehub.css";
//import cafehubBanner from "../assets/cafehub-banner.jpg"; // your image path

const RouteCafehub = () => {
  const { token } = useContext(StoreContext);

  return (
    <div className="route-cafehub-container">
      <Link to={token ? "/CafeHub" : "/"}>
        <button className="go-button">Go To CafeHub</button>
      </Link>
    </div>
  );
};

export default RouteCafehub;
