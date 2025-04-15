import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { StoreContext } from "../../components/context/StoreContext";
import { Html5QrcodeScanner } from "html5-qrcode";
import { assets } from "../../assets/assets";
const ALcafehub = () => {
  const { setToken } = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const scannerRef = useRef(null);
  const navigate = useNavigate();
  const dtext = ["home", "teatime"];
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (searchQuery.toLowerCase() === "tea time") {
        navigate("/Home");
      } else {
        alert("Restaurant not found!");
      }
    }
  };

  const stopScanner = () => {
    setShowScanner(false);
    if (scannerRef.current) {
      scannerRef.current.clear().then(() => {
        scannerRef.current = null;
        document.getElementById("qr-reader").innerHTML = "";
      });
    }
  };

  const startScanner = () => {
    setShowScanner(true);
  };

  useEffect(() => {
    if (showScanner && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner("qr-reader", {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      });

      scannerRef.current.render(
        (decodedText) => {
          if (dtext.includes(decodedText.trim().toLowerCase())) {
            navigate("/Home");
            stopScanner();
          } else {
            alert("Invalid QR!");
          }
        },
        (error) => console.warn(error)
      );
    }
  }, [showScanner]);

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>CafeHub</h1>
        <button className={styles.white_btn} onClick={logout}>
          Logout
        </button>
      </nav>

      <div className={styles.main}>
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search for a restaurant..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        <div className={styles.qrSection}>
          <button className={styles.scanBtn} onClick={startScanner}>
            <img src={assets.scan} alt="Scan" className={styles.scanIcon} />
            Scan QR Code
          </button>
        </div>

        {showScanner && (
          <div className={styles.qrContainer}>
            <div className={styles.qrBox}>
              <div className={styles.scannerFrame}></div>
              <div id="qr-reader" className={styles.qrReader}></div>
            </div>
            <button className={styles.closeBtn} onClick={stopScanner}>
              ✖ Close Scanner
            </button>
          </div>
        )}

        <div className={styles.restList} onClick={() => navigate("/Home")}>
          <div className={styles.restCard}>
            <img
              src={assets.teatime}
              alt="Tea Time"
              className={styles.restImg}
            />
            <div className={styles.restInfo}>
              <h3>TEA-TIME</h3>
              <p>Amazing food. Try our special dishes now!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ALcafehub;

/*

import React, { useContext, useState, useRef } from "react";
//import React from 'react'
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../components/context/StoreContext";

import { Html5QrcodeScanner } from "html5-qrcode";

const ALcafehub = () => {
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const scannerRef = useRef(null);

  // Handle Search Enter Key
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (searchQuery.toLowerCase() === "tea time") {
        navigate("/Home");
      } else {
        alert("Restaurant not found!");
      }
    }
  };

  // Start QR Scanner
  const startScanner = () => {
    setShowScanner(true);
    if (!scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner("qr-reader", {
        fps: 10,
        qrbox: 250,
      });

      scannerRef.current.render(
        (decodedText) => {
          const normalizedText = decodedText.trim().toLowerCase();
          if (normalizedText === "teatime") {
            alert("Valid QR Code! Navigating to Home...");
            navigate("/Home");
            setShowScanner(false);
            scannerRef.current.clear(); // Clear the scanner after successful scan
          } else {
            console.log("Scanned Text:", decodedText);
            alert("Invalid QR Code!");
          }
        },
        (error) => {
          console.error("QR Code scanning error:", error);
        }
      );
    }
  };

  // Cleanup Scanner
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, []);

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>CafeHub</h1>
        <Link to="/Login">
          <button className={styles.white_btn} onClick={logout}>
            Logout
          </button>
        </Link>
      </nav>

      {/* Search Bar *\}

      <div className={styles.search_bar_container}>
        <input
          type="text"
          className={styles.search_bar}
          placeholder="Search for a restaurant..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      {/* QR Scanner *\}
      <div className={styles.qr_section}>
        <button className={styles.qr_button} onClick={startScanner}>
          <img
            src="./src/img/scan.png"
            alt="QR Scanner"
            className={styles.qr_image}
          />
          Scan QR
        </button>
      </div>

      {/* QR Scanner Interface *\}
      {showScanner && <div id="qr-reader" className={styles.qr_reader}></div>}

      {/* Restaurant List (Single Example) *\}
      <div
        className={styles.restaurant_container}
        onClick={() => navigate("/Home")}
      >
        <div className={styles.restaurant_card}>
          <img
            src="./src/img/teatime.png"
            alt="Restaurant"
            className={styles.restaurant_img}
          />
          <div className={styles.restaurant_info}>
            <h3>TEA-TIME</h3>
            <p>Amazing food. Try our special dishes now!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ALcafehub;

*/
