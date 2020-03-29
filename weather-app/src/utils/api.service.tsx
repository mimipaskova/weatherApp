import handleResponseError from "./handleError";

class ForecastService {
  async getForecast(selectedCity?: string) {
    const res = await fetch(`/api/forecast?city=${selectedCity}`);
    if (res.status < 200 || res.status > 300) {
      if (res.status === 401) {
        handleResponseError("/forecast");
      }
      throw new Error("API call failed");
    }
    const result = await res.json();
    return {
      isLoaded: true,
      city: result.city,
      list: result.list
    };
  }
}
export default ForecastService;
