import React, { useState } from 'react';
import axios from 'axios';
import Loader from "react-loader-spinner";
import Today from "./Today";
import Forecast from "./Forecast";

import "./Weather.css";

export default function Weather(props) {
  const [city, setCity] = useState(props.city);
  const [weather, setWeather] = useState({ ready: false});
  const [unit, setUnit] = useState("metric");
  const [windUnit, setWindUnit] = useState("km/h");
  const [degree, setDegree] = useState("ºC");
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  function showTemperature(response) {
    setWeather({
      ready: true,
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: response.data.weather[0].icon,
      maxTemp: response.data.main.temp_max,
      minTemp: response.data.main.temp_min,
      date: new Date(response.data.dt * 1000),
      lat: response.data.coord.lat,
      lon: response.data.coord.lon
    });
  }

  function search() {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showTemperature).catch((error) => {if (error.response && error.response.status === 404) {
      console.clear();
      alert("Please, check the city name");
    }});
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city.length > 0) {
      search();
    } else {
      alert(`Enter a city`);
    }
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  function convertToFahrenheit(event) {
    event.preventDefault();
    setUnit("imperial");
    setDegree("ºF");
    setWindUnit("m/h");
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weather.city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(showTemperature).catch((error) => {if (error.response && error.response.status === 404) {
      console.clear();
      alert("Please, check the city name");
    }});
  }
  
  function convertToCelsius(event) {
    event.preventDefault();
    setUnit("metric");
    setDegree("ºC");
    setWindUnit("km/h");
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weather.city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  }

  function getCurrentLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    axios.get(apiGeoUrl).then(showTemperature);
  }

  function getGeolocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getCurrentLocation)
  }

  if (weather.ready) {
    return (
    <div className="Weather">
      <div className="Search ">
        <form
          id="search-form"
          onSubmit={handleSubmit}
        >
          <div className="row align-items-center justify-content-center">
            <div className="col-4">
              <input
              type="search"
              className="form-control"
              id="search-input"
              placeholder="Enter city"
              autoFocus="on"
              onChange={updateCity}
              />
            </div>
            <div className="col-1">
              <button type="submit" className="btn btn-success go">
            Go
              </button>
            </div>
            <div className="col-1">
              <button type="button" className="btn btn-outline-info geolocation" onClick={getGeolocation}>
                <i className="fas fa-globe"></i>
              </button>
            </div>
          <div className="col-1">
            <button type="button" className="btn btn-light" onClick={convertToCelsius}>
            ºC
            </button>
          </div>
          <div className="col-1">
            <button type="button" className="btn btn-light" onClick={convertToFahrenheit}>
            ºF
            </button>
          </div>
        </div>
      </form>
        </div>
        <br />
        <Today data={weather} degreeUnit={degree} windUnit={windUnit}/>
        <br />
        <Forecast lat={weather.lat} lon={weather.lon} unit={unit} degreeUnit={degree} />
    </div>
    )
    } else {
      search()
      return (<div className="loading">Loading...
      <br />
      <Loader type="ThreeDots" color="#4dbbea" height={80} width={80} timeout={10}/></div>)
    }
}