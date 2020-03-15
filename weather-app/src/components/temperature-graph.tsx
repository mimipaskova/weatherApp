import React from "react";

// const Plotly = require("plotly.js-dist");

import Plot from "react-plotly.js";
import { PlotData } from "plotly.js";

export default function TemperatureGraph({
  temperatures
}: {
  temperatures: Array<any>;
}) {
  var temperature: Partial<PlotData> = {
    x: temperatures.map(day => new Date(day.dt * 1000).toISOString()),
    y: temperatures.map((day: any) => day.main.temp),
    type: "scatter",
    mode: "lines+markers",
    marker: { color: "green" }
  };

  var minTemperature: Partial<PlotData> = {
    x: temperatures.map(day => new Date(day.dt * 1000).toISOString()),
    y: temperatures.map((day: any) => day.main.temp_min),
    type: "scatter",
    mode: "lines+markers",
    marker: { color: "blue" }
  };

  var maxTemperature: Partial<PlotData> = {
    x: temperatures.map(day => new Date(day.dt * 1000).toISOString()),
    y: temperatures.map((day: any) => day.main.temp_max),
    type: "scatter",
    mode: "lines+markers",
    marker: { color: "red" }
  };
  console.log(temperature);

  return (
    <Plot
      data={[minTemperature, maxTemperature, temperature]}
      layout={{ width: 1020, height: 540, title: "Temperature Plot" }}
    />
  );
}
