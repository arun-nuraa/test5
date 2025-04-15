/*import React from 'react'
import LoginPopup from '../../components/LoginPopup/LoginPopup'
import Navbar from '../../components/Navbar/Navbar'
import { useState } from 'react'

const Login = () => {
    const [showLogin,setShowLogin]= useState(false)
  return (

    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
        <Navbar setShowLogin={setShowLogin}/>
        </>
  )
}

export default Login
*/
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../components/context/StoreContext";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
  const navigate = useNavigate();
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl =
      url + (currState === "Login" ? "/api/user/login" : "/api/user/register");

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/CafeHub");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className={styles.main_container}>
        <nav className={styles.navbar}>
          <Link to="/">
            <button className={styles.white_btn}>Home</button>
          </Link>
        </nav>
      </div>

      <div className="login-container">
        <form onSubmit={onLogin} className="login-form">
          <h2>{currState}</h2>

          <div className="login-inputs">
            {currState === "Sign Up" && (
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Your name"
                required
              />
            )}
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Your email"
              required
            />
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder="Your Password"
              required
            />
          </div>

          <button className="btn" type="submit">
            {currState === "Sign Up" ? "Create Account" : "Login"}
          </button>

          <div className="login-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>

          {currState === "Login" ? (
            <p>
              Don't have an account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Sign up here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
