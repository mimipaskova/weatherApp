import React from "react";

import Plot from "react-plotly.js";
import { PlotData } from "plotly.js";
import { ICurrentWeather } from "../utils/current-weather.model";

export default function TemperatureGraph({
  dayWeather
}: {
  dayWeather: Array<ICurrentWeather>;
}) {
  var temperature: Partial<PlotData> = {
    x: dayWeather.map(day => new Date(day.dt * 1000).toISOString()),
    y: dayWeather.map((day: any) => day.main.temp),
    type: "scatter",
    mode: "lines+markers",
    marker: { color: "green" },
    name: "Temperature"
  };

  var minTemperature: Partial<PlotData> = {
    x: dayWeather.map(day => new Date(day.dt * 1000).toISOString()),
    y: dayWeather.map((day: any) => day.main.temp_min),
    type: "scatter",
    mode: "lines+markers",
    marker: { color: "blue" },
    name: "Min Temperature"
  };

  var maxTemperature: Partial<PlotData> = {
    x: dayWeather.map(day => new Date(day.dt * 1000).toISOString()),
    y: dayWeather.map((day: any) => day.main.temp_max),
    type: "scatter",
    mode: "lines+markers",
    marker: { color: "red" },
    name: "Max Temperature"
  };

  return (
    <Plot
      data={[minTemperature, maxTemperature, temperature]}
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
