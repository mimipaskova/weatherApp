import React from "react";
import { ICity, initialStateCity } from "../../utils/city.model";
import City from "../../components/city-details";
import WeatherList from "../../components/weather-list";
import _ from "lodash";
import "./forecast.scss";
import ForecastService from "../../utils/api.service";

type MyState = {
  error: { message: string } | null;
  isLoaded: boolean;
  selectedCity: string;
  city: ICity;
  list: [];
};

let cities = ["Sofia", "Plovdiv", "Pleven", "Varna", "Burgas"];

export default class Forecast extends React.Component<{}, MyState> {
  forecastService: ForecastService;
  constructor(props: any) {
    super(props);
    this.forecastService = new ForecastService();
    this.state = {
      error: null,
      isLoaded: false,
      selectedCity: "",
      city: initialStateCity,
      list: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate = _.debounce((prevProps: any, prevState: any) => {
    if (prevState.selectedCity !== this.state.selectedCity) {
      this.fetchData();
    }
  }, 200);

  async fetchData() {
    try {
      const result = await this.forecastService.getForecast(
        this.state.selectedCity
      );
      this.setState({
        isLoaded: true,
        city: result.city,
        list: result.list
      });
    } catch (error) {
      this.setState({
        isLoaded: false,
        error
      });
    }
  }

  selectCity = (e: any) => {
    this.setState({ selectedCity: e.target.value });
  };

  render() {
    let { error, isLoaded, city, list } = this.state;
    return (
      <div>
        {isLoaded && list.length > 0 && (
          <div>
            <div className="city-controls">
              Select city or write a city:
              <select
                name="select"
                className="form-control"
                onChange={this.selectCity}
              >
                {cities.map(city => (
                  <option value={city} key={city}>
                    {city}
                  </option>
                ))}
              </select>
              <div>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.selectedCity}
                  onChange={this.selectCity}
                />
              </div>
            </div>
            {error && <div>Error: {error.message}</div>}
            {!isLoaded && <div>Loading...</div>}
            <City city={city}></City>
            <WeatherList forecast={list}></WeatherList>
          </div>
        )}
      </div>
    );
  }
}
