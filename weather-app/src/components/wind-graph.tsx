import React from "react";

import Plot from "react-plotly.js";
import { PlotData } from "plotly.js";
import { ICurrentWeather } from "../utils/current-weather.model";

export default function WindGraph({
  dayWeather
}: {
  dayWeather: Array<ICurrentWeather>;
}) {
  var wind: Partial<PlotData> = {
    x: dayWeather.map(day => new Date(day.dt * 1000).toISOString()),
    y: dayWeather.map((day: any) => day.wind.speed),
    type: "scatter",
    mode: "lines+markers",
    marker: { color: "green" },
    name: "Wind"
  };

  return (
    <Plot
      data={[wind]}
      layout={{
        width: 1020,
        height: 540,
        title: "Wind Graphic",
        xaxis: {
          title: "Days",
          titlefont: {
            family: "Courier New, monospace",
            size: 18,
            color: "#7f7f7f"
          }
        },
        yaxis: {
          title: "Wind Speed in meter/sec",
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
