import React, { useState } from 'react';
import './weather.css'

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = (city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ca695dcbc66c5fa3d0cb955033fd918f`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === '404') {
          setError('City not found');
          setWeather(null);
        } else {
          setWeather(data);
          setError(null);
        }
      })
      .catch(() => {
        setError('Failed to fetch weather data');
        setWeather(null);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    } else {
      alert('Please enter a city name');
    }
  };

  return (

    <>
      <header>
        <h1>Weather App</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(1)}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Feels Like: {(weather.main.feels_like - 273.15).toFixed(1)}°C</p>
          <p>Description: {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </>
    
  );
}

export default WeatherApp;
