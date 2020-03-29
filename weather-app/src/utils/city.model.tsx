export interface ICity {
  id: string;
  name: string;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
  coord: { lat: number; lon: number };
}

export const initialStateCity = {
  id: "",
  name: "",
  country: "",
  population: 0,
  timezone: 0,
  sunrise: 0,
  sunset: 0,
  coord: { lat: 0, lon: 0 }
};
