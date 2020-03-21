import React from "react";
import { ICity } from "../../utils/city.model";
import City from "../../components/city-details";
import WeatherList from "../../components/weather-list";
import _ from "lodash";
import "./forecast.scss";

type MyState = {
  error: { message: string } | null;
  isLoaded: boolean;
  selectedCity: string;
  city: ICity;
  list: [];
};

let cities = ["Sofia", "Plovdiv", "Pleven", "Varna", "Burgas"];

export default class Forecast extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      selectedCity: "",
      city: {
        id: "",
        name: "",
        country: "",
        population: 0,
        timezone: 0,
        sunrise: 0,
        sunset: 0,
        coord: { lat: 0, lon: 0 }
      },
      list: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate = _.debounce((prevProps: any, prevState: any) => {
    console.log(prevState.selectedCity, this.state.selectedCity);
    if (prevState.selectedCity !== this.state.selectedCity) {
      this.fetchData();
    }
  }, 200);

  async fetchData() {
    const res = await fetch(`/api/forecast?city=${this.state.selectedCity}`);
    try {
      const result = await res.json();
      this.setState({
        isLoaded: true,
        city: result.city,
        list: result.list
      });
    } catch (error) {
      window.location.replace(`/api/auth/google?returnTo=/forecast`);
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
        <a href="/api/logout">Sign out</a>
        {isLoaded && list.length > 0 && (
          <div>
            <div className="navigation">
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
