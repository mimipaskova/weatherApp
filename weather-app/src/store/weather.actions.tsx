export const ACTION_FETCH = "weather/FETCH";

// TODO add type
export function fetchWeather(forecast: any) {
  return {
    type: ACTION_FETCH,
    payload: forecast
  };
}
