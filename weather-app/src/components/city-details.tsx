import React from "react";
import "./city-details.scss";
import { ICity } from "../utils/city.model";

export default function City({ city }: { city: ICity }) {
  return (
    <div>
      <div className="first-row">
        <h1>
          City: {city.name} In {city.country}
        </h1>
        <div>Population {city.population} people</div>
      </div>
    </div>
  );
}
