import React, { useEffect, useState } from 'react';

const Test = () => {
  // Create state variables for voltage and status
  const [voltage, setVoltage] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Make a GET request to fetch data when the component is mounted
    fetch('your_php_file.php?action=get_data')
      .then(response => response.json())  // Parse JSON data
      .then(data => {
        console.log("Voltage: ", data.voltage);
        console.log("Status: ", data.status);

        // Update the state with the received data
        setVoltage(data.voltage);
        setStatus(data.status);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);  // Empty dependency array to run the effect only once when the component is mounted

  return (
    <div>
      <h2>Battery Status</h2>
      <p>Voltage: {voltage}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default Test;
