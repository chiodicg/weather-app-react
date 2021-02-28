import React, { useState } from 'react';
import axios from 'axios';
import Loader from "react-loader-spinner";
import Today from "./Today";

import "./Weather.css";

export default function Weather(props) {
  const [city, setCity] = useState(props.city);
  const [weather, setWeather] = useState({ ready: false});
  
  let units = "metric";
  /*const [units, setUnits] = useState("metric");*/

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
      date: new Date(response.data.dt * 1000)
    });
  }

  function search() {
    const apiKey = "7de7d337ce8802b808862965eb088195";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
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
        <Today data={weather} />
    </div>
    )
    } else {
      search()
      return (<div className="loading">Loading...
      <br />
      <Loader type="ThreeDots" color="#4dbbea" height={80} width={80} timeout={10}/></div>)
    }
}
