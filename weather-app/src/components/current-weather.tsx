import React from "react";
import { ICurrentWeather } from "../utils/current-weather.model";

export default function CurrentWeather({
  weather
}: {
  weather: ICurrentWeather;
}) {
  return (
    <div key={weather.dt}>
      <div className="first-row">
        On date {convertToDate(weather.dt)}
        Temerature: {weather.main.temp}, feels like {weather.main.feels_like}
        Mininum temperature {weather.main.temp_min} Maximum temperature
        {weather.main.temp_max} Humidity {weather.main.humidity} Pressure{" "}
        {weather.main.pressure}
      </div>
      <div>
        Wind speed {weather.wind.speed}, Wind direction {weather.wind.deg}
      </div>
      <div>Cloudiness {weather.clouds.all} % </div>
    </div>
  );
}

const convertToDate = (unixTimeStamp: number) => {
  return new Date(unixTimeStamp * 1000).toISOString();
};
