import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.scss";
import Forecast from "./pages/forecast/forecast";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import UsersList from "./pages/users/users";
import UserService from "./utils/user.service";
import Logout from "./pages/logout";
import CompareCities from "./pages/compareCities/compareCities";

class App extends Component {
  constructor(props) {
    super(props);
    this.userService = new UserService();
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  get isAdmin() {
    const user = this.state.currentUser;
    return user && user.role >= 10;
  }

  async getCurrentUser() {
    const currentUser = await this.userService.getCurrentUser();
    this.setState({
      currentUser: currentUser || {}
    });
  }

  render() {
    const { currentUser } = this.state;
    const { isAdmin } = this;
    return (
      <Router className="App">
        <header>
          <h1>Weather App</h1>
        </header>
        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/forecast">Forecast</Link>
          <Link to="/compareCities">Compare Cities</Link>
          {isAdmin ? <Link to="/users">Users</Link> : ""}
          {currentUser ? <Link to="/logout">Logout</Link> : ""}
        </nav>
        <main>
          <Switch>
            <Route exact path="/">
              <div>Homeeee</div>
            </Route>
            <Route path="/forecast">
              <Forecast />
            </Route>
            <Route path="/compareCities">
              <CompareCities />
            </Route>
            {isAdmin ? <Route path="/users" component={UsersList} /> : ""}
            {currentUser ? (
              <Route exact path="/logout">
                <Logout />
              </Route>
            ) : (
              ""
            )}
          </Switch>
        </main>
        <footer>Page created by mimipaskova</footer>
      </Router>
    );
  }
}

export default App;
