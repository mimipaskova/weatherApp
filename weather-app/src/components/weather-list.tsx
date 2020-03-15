import React from "react";
import { ICurrentWeather } from "../utils/current-weather.model";
import CurrentWeather from "./current-weather";
import _ from "lodash";
import DayForecast from "./day-forecast";
import TemperatureGraph from "./temperature-graph";

export default function WeatherList({
  forecast
}: {
  forecast: ICurrentWeather[];
}) {
  if (forecast.length === 0) {
    return null;
  }

  let days = _.chain(forecast)
    .groupBy(({ dt }) => new Date(dt * 1000).getDate())
    .map((value, key) => ({ date: key, dayData: value }))
    .value();
  console.log(days);

  return (
    <div>
      <TemperatureGraph temperatures={forecast}></TemperatureGraph>
      {days.map(date => (
        <DayForecast dayData={date.dayData} key={date.date}></DayForecast>
      ))}
      {/* <ul>
        {forecast.map(currentWeather => {
          return (
            <CurrentWeather
              weather={currentWeather}
              key={currentWeather.dt}
            ></CurrentWeather>
          );
        })}
      </ul> */}
    </div>
  );
}
