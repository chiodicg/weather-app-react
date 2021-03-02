import React from "react";
import Icons from "./Icons";
import FormattedDate from "./FormattedDate";

export default function ForecastPreview(props) {
  if (props.unit === "metric") {
    return (
      <div className="col-md forecast-days">
        <h2><FormattedDate date={new Date(props.data.dt * 1000)} forecast={true}/></h2>
        <div className="forecast-temperature">
          <span className="icon">
            <Icons code={props.data.weather[0].icon} />
          </span>
          <span id="temperature">
            {Math.round(props.data.temp.day)}
          </span>
          <span className="units">
            {props.degreeUnit}
          </span>
        </div>
        <div className="max-min">
          Max: {Math.round(props.data.temp.max)}
          <span className="units">
            {props.degreeUnit}</span>, Min: {Math.round(props.data.temp.min)}
          <span className="units">{props.degreeUnit}</span>
        </div>
      </div>)
  } else {
    return (
      <div className="col-md forecast-days">
        <h2>
          <FormattedDate
            date={new Date(props.data.dt * 1000)}
            forecast={true}
          />
        </h2>
        <div className="forecast-temperature">
          <span className="icon">
            <Icons code={props.data.weather[0].icon} />
          </span>
          <span id="temperature">
            {Math.round((props.data.temp.day * 9) / 5 + 32)}
          </span>
          <span className="units">{props.degreeUnit}</span>
        </div>
        <div className="max-min">
          {" "}
          Max: {Math.round((props.data.temp.max * 9) / 5 + 32)}
          <span className="units">{props.degreeUnit}</span>, Min:{" "}
          {Math.round((props.data.temp.min * 9) / 5 + 32)}
          <span className="units">{props.degreeUnit}</span>
        </div>
      </div>
    );
  }
}