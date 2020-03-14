import React from "react";
import "./App.scss";
import Forecast from "./pages/forecast/forecast";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Weather App</h1>
      </header>
      <main>
        <Forecast></Forecast>
      </main>
      <footer>Page created by mimipaskova</footer>
    </div>
  );
}

export default App;
