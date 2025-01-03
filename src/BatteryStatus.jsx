import React, { useState, useEffect } from 'react';

const BatteryStatus = () => {
  const [batteryStatus, setBatteryStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBatteryStatus = async () => {
      try {
        const response = await fetch('http://localhost/battery-api/get_battery_status.php');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBatteryStatus(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBatteryStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!batteryStatus) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>Battery Status</h1>
      <p><strong>ID:</strong> {batteryStatus.id}</p>
      <p><strong>Voltage:</strong> {batteryStatus.voltage}V</p>
      <p><strong>Status:</strong> {batteryStatus.status}</p>
      <p><strong>Timestamp:</strong> {new Date(batteryStatus.timestamp).toLocaleString()}</p>
    </div>
  );
};

export default BatteryStatus;
