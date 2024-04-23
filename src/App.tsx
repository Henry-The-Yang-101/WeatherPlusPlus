import React, { useEffect, useState } from 'react';
import logo from './Assets/logo.svg';
import './App.css';
import Loading from './components/Loading'

// Define the type for the weather data based on your API's response structure.
interface WeatherData {
  current: {
    temp: number;
  };
}

function App() {
  const [hasLocation, setHasLocation] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  
  const success = (position: GeolocationPosition) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    setHasLocation(true);
  }

  const error = () => {
    console.log("Unable to retrieve your location");
    setHasLocation(false);
  }

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=a99f3e2670e131021b6a9da5b3b1fa8a&units=metric`);
      const data: WeatherData = await response.json();
      setWeatherData(data);
      console.log("Fetched weather");
    } catch (error) {
      setWeatherData(null);
      console.error('Error fetching weather data:', error);
    }
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }

  useEffect(() => {
    if (hasLocation) {
      fetchWeatherData();
    }
  }, [hasLocation]);

  return (
    <div className="App">
      {weatherData 
        ? <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
            Latitude: {latitude}, Longitude: {longitude}
            </p>
            <button type="button" className="btn btn-primary" onClick={fetchWeatherData}>Fetch Weather Data</button>
            <div>
              <p>Current Temperature: {weatherData.current.temp}ºC</p>
            </div>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        : <Loading/>
      }
      
    </div>
  );
}

export default App;
