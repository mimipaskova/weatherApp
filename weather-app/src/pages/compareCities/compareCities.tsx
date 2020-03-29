import React from "react";
import { ICity, initialStateCity } from "../../utils/city.model";
import City from "../../components/city-details";
import _ from "lodash";
import ForecastService from "../../utils/api.service";
import TemperatureGraph from "../../components/temperature-graph";

type MyState = {
  error: { message: string } | null;
  isLoaded: boolean;
  firstCity: ICity;
  secondCity: ICity;
  firstList: [];
  secondList: [];
  selectedCities: Array<string>;
};

let cities = ["Sofia", "Plovdiv", "Pleven", "Varna", "Burgas"];

export default class CompareCities extends React.Component<{}, MyState> {
  forecastService: ForecastService;
  constructor(props: any) {
    super(props);
    this.forecastService = new ForecastService();
    this.state = {
      error: null,
      isLoaded: false,
      selectedCities: ["", ""],
      firstCity: initialStateCity,
      secondCity: initialStateCity,
      firstList: [],
      secondList: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate = _.debounce((prevProps: any, prevState: any) => {
    if (prevState.selectedCities !== this.state.selectedCities) {
      this.fetchData();
    }
  }, 200);

  async fetchData() {
    try {
      const firstForecast = await this.forecastService.getForecast(
        this.state.selectedCities[0]
      );
      const secondForecast = await this.forecastService.getForecast(
        this.state.selectedCities[1]
      );
      this.setState({
        isLoaded: true,
        firstCity: firstForecast.city,
        firstList: firstForecast.list,
        secondCity: secondForecast.city,
        secondList: secondForecast.list
      });
    } catch (error) {
      this.setState({
        isLoaded: false,
        error
      });
    }
  }

  selectCity = (id: number, e: any) => {
    const city = e.target.value;
    console.log(id, city);

    if (city) {
      this.setState(({ selectedCities, ...prevState }) => {
        return {
          ...prevState,
          selectedCities: selectedCities.map((old, i) =>
            i === id ? city : old
          )
        };
      });
    }
  };

  render() {
    let {
      error,
      isLoaded,
      selectedCities,
      firstList,
      secondList,
      firstCity,
      secondCity
    } = this.state;
    return (
      <div>
        {isLoaded && firstList.length > 0 && secondList.length > 0 && (
          <div>
            {[0, 1].map(i => (
              <div className="city-controls" key={i}>
                Select city or write a city:
                <select
                  name="select"
                  className="form-control"
                  onChange={e => {
                    this.selectCity(i, e);
                  }}
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
                    value={selectedCities[i]}
                    onChange={e => {
                      this.selectCity(i, e);
                    }}
                  />
                </div>
              </div>
            ))}
            {error && <div>Error: {error.message}</div>}
            {!isLoaded && <div>Loading...</div>}
            <City city={firstCity}></City>
            <City city={secondCity}></City>
            <TemperatureGraph
              cityWeather={firstList}
              secondWeather={secondList}
            ></TemperatureGraph>
          </div>
        )}
      </div>
    );
  }
}
