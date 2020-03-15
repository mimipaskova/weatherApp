import React from "react";
import { ICity } from "../../utils/city.model";
import City from "../../components/city-details";
import WeatherList from "../../components/weather-list";

type MyState = {
  error: { message: string } | null;
  isLoaded: boolean;
  city: ICity;
  list: [];
};

export default class Forecast extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
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

  async componentDidMount() {
    const res = await fetch("/forecast");
    try {
      const result = await res.json();
      this.setState({
        isLoaded: true,
        city: result.city,
        list: result.list
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        error
      });
    }
  }

  render() {
    let { error, isLoaded, city, list } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <City city={city}></City>
          <WeatherList forecast={list}></WeatherList>
        </div>
      );
    }
  }
}
