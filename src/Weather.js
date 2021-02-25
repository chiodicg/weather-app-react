import React, { useState } from 'react';
import axios from 'axios';
import Loader from "react-loader-spinner";
import FormattedDate from "./FormattedDate";

import "./Weather.css";

export default function Weather(props) {
  const [city, setCity] = useState(props.city);
  const [weather, setWeather] = useState({ ready: false});
  const apiKey = "7de7d337ce8802b808862965eb088195";
  const [units, setUnits] = useState("metric");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  function showTemperature(response) {
    setWeather({
      ready: true,
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      maxTemp: response.data.main.temp_max,
      minTemp: response.data.main.temp_min,
      date: new Date(response.data.dt * 1000)
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city.length > 0) {
      axios.get(apiUrl).then(showTemperature);
    } else {
      alert(`Enter a city`);
    }
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  if (weather.ready) {
    return (
    <div className="Weather">
      <div className="Search ">
        <form
          id="search-form"
          onSubmit={handleSubmit}
        >
          <div className="row align-items-center">
            <div className="col-7">
              <input
              type="search"
              className="form-control"
              id="search-input"
              placeholder="Enter city"
              autoFocus="on"
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
            <button type="button" className="btn btn-light w-100" id="degrees-link">
            ºC / ºF
            </button>
          </div>
        </div>
      </form>
        </div>
        <br />
    <div className="Today">
      <div className="row align-items-center details">
        <div className="col-md place">
          <h2>{weather.city}</h2>
          <div className="description">{weather.description}</div>
          <div className="date-time">
            <FormattedDate date={weather.date}/>
          </div>
          <div className="humid-wind">
            {weather.humidity}% humidity, {Math.round(weather.wind)} km/h
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
    } else {
      axios.get(apiUrl).then(showTemperature);
      return (<div className="loading">Loading...
      <br />
      <Loader type="ThreeDots" color="#4dbbea" height={80} width={80} timeout={10}/></div>)
    }
}
