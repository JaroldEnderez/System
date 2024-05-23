import React, { useState } from 'react';

const Progress = () => {
  // Define state variables for time interval and task progress
  const [timeInterval, setTimeInterval] = useState('hourly');
  const [progress, setProgress] = useState(0);

  // Function to handle time interval change
  const handleTimeIntervalChange = (event) => {
    setTimeInterval(event.target.value);
    // Here you can adjust the progress calculation based on the selected time interval
    // For demonstration purposes, I'm just resetting the progress to 0
    setProgress(0);
  };

  // Function to increase progress
  const increaseProgress = () => {
    setProgress(prevProgress => Math.min(prevProgress + 10, 100));
  };

  // Function to decrease progress
  const decreaseProgress = () => {
    setProgress(prevProgress => Math.max(prevProgress - 10, 0));
  };

  return (
    <div>
      <h3>Task Progress</h3>
      {/* Dropdown menu for selecting time interval */}
      <select value={timeInterval} onChange={handleTimeIntervalChange}>
        <option value="hourly">Hourly</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>

      {/* Progress bar to visualize task progress */}
      <div style={{ marginTop: '10px' }}>
        <p>Progress: {progress}%</p>
        <div style={{ width: '300px', height: '20px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#4caf50' }}></div>
        </div>
      </div>

      {/* Buttons to increase or decrease progress */}
      <div style={{ marginTop: '10px' }}>
        <button onClick={increaseProgress}>Increase Progress</button>
        <button onClick={decreaseProgress}>Decrease Progress</button>
      </div>
    </div>
  );
};

export default Progress;
