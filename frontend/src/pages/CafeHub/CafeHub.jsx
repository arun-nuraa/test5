import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import styles from "./styles.module.css";
import { assets } from "../../assets/assets";
const CafeHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const scannerRef = useRef(null);
  const navigate = useNavigate();
  const dtext = ["home", "teatime"];

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
    <>
      <nav className={styles.navbar}>
        <h1>CafeHub</h1>
        <Link to="/Login">
          <button className={styles.loginBtn}>Login</button>
        </Link>
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
            <img
              src={assets.scan}
              alt="Scan"
              className={styles.scanIcon}
            />
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
    </>
  );
};

export default CafeHub;
