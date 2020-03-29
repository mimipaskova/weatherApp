import React from "react";

import Plot from "react-plotly.js";
import { PlotData } from "plotly.js";
import { ICurrentWeather } from "../utils/current-weather.model";

export default function TemperatureGraph({
  cityWeather,
  secondWeather
}: {
  cityWeather: Array<ICurrentWeather>;
  secondWeather?: Array<ICurrentWeather>;
}) {
  let dataToShow = [];

  const temperature: Partial<PlotData> = {
    x: cityWeather.map(day => new Date(day.dt * 1000).toISOString()),
    y: cityWeather.map((day: any) => day.main.temp),
    type: "scatter",
    mode: "lines+markers",
    marker: { color: "green" },
    name: "Temperature"
  };

  const minTemperature: Partial<PlotData> = {
    x: cityWeather.map(day => new Date(day.dt * 1000).toISOString()),
    y: cityWeather.map((day: any) => day.main.temp_min),
    type: "scatter",
    mode: "lines+markers",
    marker: { color: "blue" },
    name: "Min Temperature"
  };

  const maxTemperature: Partial<PlotData> = {
    x: cityWeather.map(day => new Date(day.dt * 1000).toISOString()),
    y: cityWeather.map((day: any) => day.main.temp_max),
    type: "scatter",
    mode: "lines+markers",
    marker: { color: "red" },
    name: "Max Temperature"
  };

  if (secondWeather) {
    const secondTemperature: Partial<PlotData> = {
      x: secondWeather.map(day => new Date(day.dt * 1000).toISOString()),
      y: secondWeather.map((day: any) => day.main.temp),
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "blue" },
      name: "Temperature Second City"
    };
    dataToShow = [temperature, secondTemperature];
  } else {
    dataToShow = [minTemperature, maxTemperature, temperature];
  }

  return (
    <Plot
      data={dataToShow}
      layout={{
        width: 1020,
        height: 540,
        title: "Temperature Graphic",
        xaxis: {
          title: "Days",
          titlefont: {
            family: "Courier New, monospace",
            size: 18,
            color: "#7f7f7f"
          }
        },
        yaxis: {
          title: "Temperature in Celsius",
          titlefont: {
            family: "Courier New, monospace",
            size: 18,
            color: "#7f7f7f"
          }
        }
      }}
    />
  );
}
