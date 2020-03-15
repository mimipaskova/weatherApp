import React from "react";
import "./day-forecast.scss";

export default function DayForecast({ dayData }: { dayData: Array<any> }) {
  const date = new Date(dayData[0].dt * 1000).toLocaleDateString();
  let minimumTemp = Math.min(...dayData.map(day => day.main.temp_min));
  let maximumTemp = Math.max(...dayData.map(day => day.main.temp_max));
  let averageTemp = (
    dayData.map(day => day.main.temp).reduce((acc, val) => acc + val) /
    dayData.length
  ).toPrecision(2);
  return (
    <div>
      <div className="day-forecast">
        <h1>For date: {date}</h1>
        <div>Average temperature is: {averageTemp} </div>
        <div>Average minimum temperature is: {minimumTemp} </div>
        <div>Average maximum temperature is: {maximumTemp} </div>
      </div>
    </div>
  );
}
