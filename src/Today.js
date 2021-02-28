import React from "react";
import FormattedDate from "./FormattedDate";
import Icons from "./Icons";
import "./Today.css"

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
        <div className="today-temperature">
          <span className="icon">
          <Icons code={props.data.icon} /></span>
          <span id="today-temperature">{Math.round(props.data.temperature)}ºC</span>
        </div>
        <div className="temp" id="max-min-today">
          Max: {Math.round(props.data.maxTemp)}ºC, Min: {Math.round(props.data.minTemp)}ºC
        </div>
      </div>
    </div>
  </div>)
}