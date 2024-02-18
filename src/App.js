import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  
  const success = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  const error = () => {
    console.log("Unable to retrieve your location");
  }

  const logCoords = () => {
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=a99f3e2670e131021b6a9da5b3b1fa8a&units=metric`);
      const data = await response.json();
      setWeatherData(data);
      console.log("Fetched weather");
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        Latitude: {latitude}, Longitude: {longitude}
        </p>
        <button type="button" class="btn btn-primary" onClick={logCoords}>Log Coordinates</button>
        <button type="button" class="btn btn-primary" onClick={fetchWeatherData}>Fetch Weather Data</button>
        {weatherData ? (
        // Render your UI using weatherData
        <div>
          <p>Current Temperature: {weatherData.current.temp}ºC</p>
        </div>
      ) : (
        // Render loading state or handle error
        <p>Loading weather data...</p>
      )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
