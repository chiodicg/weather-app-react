import React from "react";
import FormattedDate from "./FormattedDate";

export default function Today(props) {
  return (
  <div className="Today">
    <div className="row align-items-center details">
      <div className="col-md place">
        <h2>{props.data.city}</h2>
        <div className="description">{props.data.description}</div>
        <div className="date-time">
        <FormattedDate date={props.data.date}/>
        </div>
        <div className="humid-wind">
          {props.data.humidity}% humidity, {Math.round(props.data.wind)} km/h
        </div>
      </div>
      <div className="col-md today">
        <span id="today">Today</span>
        <br />
        <img src={props.data.icon} alt={props.data.description} />{" "}
        {Math.round(props.data.temperature)}ºC
        <div className="temp" id="max-min-today">
          Max: {Math.round(props.data.maxTemp)}ºC, Min: {Math.round(props.data.minTemp)}ºC
        </div>
      </div>
    </div>
  </div>)
}