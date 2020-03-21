import React from "react";
import "./App.scss";
import Forecast from "./pages/forecast/forecast";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/forecast">Forecast</Link>
      </nav>
      <Switch>
        <Route exact path="/">
          <div>Homeeee</div>
        </Route>
        <Route path="/forecast">
          <Forecast />
        </Route>
      </Switch>
    </Router>

    // <div className="App">
    //   <header>
    //     <h1>Weather App</h1>
    //   </header>
    //   <main>
    //     <Forecast></Forecast>
    //   </main>
    //   <footer>Page created by mimipaskova</footer>
    // </div>
  );
}

export default App;
