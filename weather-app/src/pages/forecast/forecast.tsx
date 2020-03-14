import React from "react";

type MyState = {
  error: { message: string } | null;
  isLoaded: boolean;
  forecast: {};
};

export default class Forecast extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      forecast: {}
    };
  }

  async componentDidMount() {
    const res = await fetch("/forecast");
    try {
      const result = await res.json();
      this.setState({
        isLoaded: true,
        forecast: JSON.stringify(result)
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        error
      });
    }
  }

  render() {
    let { error, isLoaded, forecast } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return <div>{forecast}</div>;
    }
  }
}
