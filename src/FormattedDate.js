import React from "react";

export default function FormattedDate(props) {
  let hour = props.date.getHours();
  if (hour < 10) {hour = `0${hour}`}
  let minutes = props.date.getMinutes();
  if (minutes < 10) {minutes = `0${minutes}`}
  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
  ];
 let day = days[props.date.getDay()];

 if (props.forecast === true) {
   return (<div>
    {day}
  </div>)
 } else {
  return (<div>
    {day}, {hour}:{minutes}
  </div>)
  }
}