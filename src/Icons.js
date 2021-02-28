import React from "react";
import ReactAnimatedWeather from 'react-animated-weather';

export default function Icons(props) {
  let mappingCode = {
    "01d": {icon: "CLEAR_DAY", color: "#ffac1e"},
    "01n": {icon: "CLEAR_NIGHT", color: "#074868"},
    "02d": {icon: "PARTLY_CLOUDY_DAY", color: "#ddc35a"},
    "02n": {icon: "PARTLY_CLOUDY_NIGHT", color: "#355566"},
    "03d": {icon: "PARTLY_CLOUDY_DAY", color: "#ddc35a"},
    "03n": {icon: "PARTLY_CLOUDY_NIGHT", color: "#355566"},
    "04d": {icon: "CLOUDY", color: "#77797a"},
    "04n": {icon: "CLOUDY", color: "#77797a"},
    "09d": {icon: "RAIN", color: "#8997bf"},
    "09n": {icon: "RAIN", color: "#727c99"},
    "10d": {icon: "RAIN", color: "#6574a0"},
    "10n": {icon: "RAIN", color: "#485272"},
    "11d": {icon: "RAIN", color: "#4c5e93"},
    "11n": {icon: "RAIN", color: "#3e4c77"},
    "13d": {icon: "SNOW", color: "#afafaf"},
    "13n": {icon: "SNOW", color: "#afafaf"},
    "50d": {icon: "FOG", color: "#bcbcbc"},
    "50n": {icon: "FOG", color: "#abb0b2"}
  }
  return (
      <ReactAnimatedWeather
        icon={mappingCode[props.code].icon}
        color={mappingCode[props.code].color}
        size={45}
        animate={true}
      />)
}