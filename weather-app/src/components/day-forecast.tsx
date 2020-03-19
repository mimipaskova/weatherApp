import React from "react";
import "./day-forecast.scss";

export default function DayForecast({ dayData }: { dayData: Array<any> }) {
  const date = new Date(dayData[0].dt * 1000);
  let minimumTemp = Math.min(...dayData.map(day => day.main.temp_min));
  let maximumTemp = Math.max(...dayData.map(day => day.main.temp_max));
  let averageTemp = (
    dayData.map(day => day.main.temp).reduce((acc, val) => acc + val) /
    dayData.length
  ).toPrecision(2);
  return (
    <div>
      <div className="day-forecast">
        <h1>{date.toLocaleDateString()}</h1>
        <h1>{date.toLocaleString("en-us", { weekday: "long" })}</h1>
        <div className={minimumTemp < 0 ? "color-red" : "color-blue"}>
          {averageTemp}
        </div>
        <div className={minimumTemp < 0 ? "color-red" : "color-blue"}>
          {minimumTemp}
        </div>
        <div className={minimumTemp < 0 ? "color-red" : "color-blue"}>
          {maximumTemp}
        </div>
      </div>
    </div>
  );
}
