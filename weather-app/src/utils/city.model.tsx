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
