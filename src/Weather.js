import React, { useState } from 'react';
import axios from 'axios';

import "./Weather.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({
    city: "Dundee",
    description: "Light snow",
    icon: "https://ssl.gstatic.com/onebox/weather/64/snow_light.png",
    humidity: 93,
    wind: 9,
    temperature: -1,
    maxTemp: 0,
    minTemp: -2,
    date: formatDate(Date.now())});

  function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hour = date.getHours();
    if (hour < 10) {hour = `0${hour}`}
    let minutes = date.getMinutes();
    if (minutes < 10) {minutes = `0${minutes}`}
    return `${weekday(timestamp)}, ${hour}:${minutes}`;
  }

  function weekday(timestamp) {
    let date = new Date(timestamp);
    let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
  ];
   let day = days[date.getDay()];
   return `${day}`;
  }

  function showTemperature(response) {
    setWeather({
      city: city,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      maxTemp: response.data.main.temp_max,
      minTemp: response.data.main.temp_min,
      date: formatDate(response.data.dt * 1000)
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city.length > 0) {
      let apiKey = "7de7d337ce8802b808862965eb088195";
      let units = "metric";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
      axios.get(apiUrl).then(showTemperature);
    } else {
      alert(`Enter a city`);
    }
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  return (
  <div className="Weather">
    <div className="Search">
      <form
          className="row align-items-center"
          id="search-form"
          onSubmit={handleSubmit}
        >
          <div className="col-7 form-group">
            <input
              type="search"
              className="form-control"
              id="search-input"
              placeholder="Enter city"
              onChange={updateCity}
            />
          </div>
          <div className="col-3">
            <button type="submit" className="btn btn-success go">
            Search
            </button>
            <button type="button" className="btn btn-outline-info geolocation">
              <i className="fas fa-globe"></i>
            </button>
          </div>
          <div className="col-2">
            <button type="button" className="btn btn-light" id="degrees-link">
            ºC / ºF
            </button>
          </div>
        </form>
        </div>
        <br />
    <div className="Today">
      <div className="row align-items-center details">
        <div className="col-md place">
          <h2>{weather.city}</h2>
          <div className="description">{weather.description}</div>
          <div className="date-time">{weather.date}</div>
          <div className="humid-wind">
            {weather.humidity}% humidity, {weather.wind} km/h
          </div>
        </div>
        <div className="col-md today">
          <span id="today">Today</span>
          <br />
          <img src={weather.icon} alt={weather.description} />{" "}
          {Math.round(weather.temperature)}ºC
          <div className="temp" id="max-min-today">
            Max: {Math.round(weather.maxTemp)}ºC, Min: {Math.round(weather.minTemp)}ºC
          </div>
        </div>
      </div>
    </div>
    </div>)
}
