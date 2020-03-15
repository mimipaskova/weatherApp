export interface ICurrentWeather {
  dt: number; //Data receiving time
  main: {
    temp: number;
    feels_like?: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf?: number;
  };
  weather: [{ id: number; main: string; description: string; icon: string }];
  clouds: { all: number };
  wind: { speed: number; deg: number };
  snow: any;
  dt_txt: string;
}
