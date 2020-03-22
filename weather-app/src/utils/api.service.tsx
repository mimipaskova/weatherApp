import handleResponseError from "./handleError";

class ForecastService {
  async getForecast(selectedCity?: string) {
    const res = await fetch(`/api/forecast?city=${selectedCity}`);
    try {
      const result = await res.json();
      return {
        isLoaded: true,
        city: result.city,
        list: result.list
      };
    } catch (error) {
      handleResponseError("/forecast");
      return {
        isLoaded: false,
        error
      };
    }
  }
}
export default ForecastService;
