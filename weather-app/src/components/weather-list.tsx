import React from "react";
import { ICurrentWeather } from "../utils/current-weather.model";
import CurrentWeather from "./current-weather";

export default function WeatherList({
  forecast
}: {
  forecast: ICurrentWeather[];
}) {
  if (forecast.length === 0) {
    return null;
  }

  return (
    <div>
      <ul>
        {forecast.map(currentWeather => {
          return (
            <CurrentWeather
              weather={currentWeather}
              key={currentWeather.dt}
            ></CurrentWeather>
          );
        })}
      </ul>
    </div>
  );
}
