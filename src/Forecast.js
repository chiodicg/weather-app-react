import React, { useState } from "react";
import axios from 'axios';
import Loader from "react-loader-spinner";
import ForecastPreview from "./ForecastPreview";


import "./Forecast.css";

export default function Forecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);
  let unit = props.unit;

  function showForecast(response) {
    setForecast(response.data);
    setLoaded(true);
  }

  function searchForecast() {
    let apiKey = "7de7d337ce8802b808862965eb088195";
    let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&appid=${apiKey}&units=${unit}`;
    axios.get(apiForecastUrl).then(showForecast);
  }

  if (loaded && props.lat === forecast.lat && props.lon === forecast.lon) {
    return (
      <div className="Forecast">
        <div className="row align-items-center forecast-1">
          <ForecastPreview data={forecast.daily[1]} degreeUnit={props.degreeUnit} unit={unit} />
          <ForecastPreview data={forecast.daily[2]} degreeUnit={props.degreeUnit} unit={unit} />
        </div>
        <br />
        <div className="row align-items-center forecast-2">
          <ForecastPreview data={forecast.daily[3]} degreeUnit={props.degreeUnit} unit={unit} />
          <ForecastPreview data={forecast.daily[4]} degreeUnit={props.degreeUnit} unit={unit} />
        </div>
        <br />
        <div className="row align-items-center forecast-3">
          <ForecastPreview data={forecast.daily[5]} degreeUnit={props.degreeUnit} unit={unit} />
          <ForecastPreview data={forecast.daily[6]} degreeUnit={props.degreeUnit} unit={unit} />
        </div>
      </div>)
} else {
  searchForecast();
  return (<div className="loading">Loading...
      <br />
      <Loader type="ThreeDots" color="#4dbbea" height={80} width={80} timeout={10}/></div>)
}
}