import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaCloud } from 'react-icons/fa';
import logo from './assets/logo.png';
import BatteryStatus from './BatteryStatus';

function App() {
  const [ledState, setLedState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [batteryVoltage, setBatteryVoltage] = useState(0); //0 - 100 
  const [batteryPresentage, setBatteryPresentage] = useState(0);
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    // setBatteryPresentage((batteryVoltage/15)*100);
    setBatteryPresentage(Math.round(batteryVoltage ));

  }, [batteryVoltage])

  // const [batteryStatus, setBatteryStatus] = useState(null);
  const [error, setError] = useState(null);

  const ipAddress = "http://192.168.4.1";  // Replace with your ESP32 IP address
  // const phpBackendUrl = "http://localhost/smartmonkey_backend.php"; // Path to your PHP backend

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
      const fetchBatteryStatus = async () => {
        try {
          const response = await fetch('http://localhost/battery/batteryCopy.php');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          if(data){
            setBatteryVoltage(parseFloat(data.Voltage));
            setDateTime(data.datetime);
          }
          // setBatteryStatus(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBatteryStatus();
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

  // Function to format date as a readable string
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('en-US', options);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <img src={logo} alt="Smart Monkey Logo" className="logo-image" />
        {/* <select className="language-select">
          <option value="en">Select Language</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select> */}
      </header>
        <div className='fdt'>{formatDateTime(dateTime)}</div>

      {/* Battery Status */}
      <div className="battery-status">
        <CircularProgressbar
          value={batteryPresentage}
          text={`${batteryPresentage}%`}
          styles={buildStyles({
            textColor: '#000',
            pathColor: '#ff4d4d',
            trailColor: '#d6d6d6',
          })}
        />
        <p className="bst">Battery Status</p>
      </div>

      {/* Alert Button */}
      {/* <div className="alert-button-container">
        <button className="alert-button">There Here!</button>
      </div> */}

      {/* LED Slider */}
      {/* <div className="device-status">
        <p>Device LED</p>
        <label className="switch">
          <input
            type="checkbox"
            checked={ledState}
            onChange={handleLedChange}
          />
          <span className="slider"></span>
        </label>
      </div> */}
    </div>
  );
}

export default App;
