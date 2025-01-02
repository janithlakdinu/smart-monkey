import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaCloud } from 'react-icons/fa';
import logo from './assets/Frame 15.png';
import Test from './Test';

function App() {
  const [ledState, setLedState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [batteryVoltage, setBatteryVoltage] = useState(0); // State to store battery voltage

  const ipAddress = "http://192.168.4.1";  // Replace with your ESP32 IP address
  const phpBackendUrl = "http://localhost/smartmonkey_backend.php"; // Path to your PHP backend

  // Fetch current LED status when the app loads
  useEffect(() => {
    axios
      .get(`${ipAddress}/led`)
      .then((response) => {
        setLedState(response.data.led === "on");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching LED state:", error);
      });
  }, []);

  // Fetch battery voltage from the backend
  useEffect(() => {
    const fetchBatteryVoltage = () => {
      axios
        .get(phpBackendUrl)
        .then((response) => {
          if (response.data && response.data.voltage) {
            setBatteryVoltage(parseFloat(response.data.voltage));
          }
        })
        .catch((error) => {
          console.error("Error fetching battery voltage:", error);
        });
    };

    fetchBatteryVoltage();
    const interval = setInterval(fetchBatteryVoltage, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Handle LED state change
  const handleLedChange = (event) => {
    const newState = event.target.checked;
    setLedState(newState);

    axios
      .post(`${ipAddress}/led`, { state: newState ? "on" : "off" })
      .then(() => {
        console.log("LED state updated");
      })
      .catch((error) => {
        console.error("Error updating LED state:", error);
      });
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <img src={logo} alt="Smart Monkey Logo" className="logo-image" />
        <select className="language-select">
          <option value="en">Select Language</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
      </header>

      {/* Battery Status */}
      <div className="battery-status">
        <CircularProgressbar
          value={batteryVoltage}
          text={`${batteryVoltage}%`}
          styles={buildStyles({
            textColor: '#000',
            pathColor: '#ff4d4d',
            trailColor: '#d6d6d6',
          })}
        />
        <p>Battery Status</p>
      </div>

      {/* Alert Button */}
      <div className="alert-button-container">
        <button className="alert-button">There Here!</button>
      </div>

      {/* LED Slider */}
      <div className="device-status">
        <p>Device LED</p>
        <label className="switch">
          <input
            type="checkbox"
            checked={ledState}
            onChange={handleLedChange}
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* <br> */}
      <Test />
    </div>
  );
}

export default App;
