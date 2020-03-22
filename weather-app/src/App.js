import React, { Suspense } from "react";
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

const isAdminUser = async () => {
  const userService = new UserService();
  const isAdmin = await userService.isAdmin();
  debugger;
  return isAdmin;
};

// const AdminRoute = ({ component: Component, ...rest }) => {
//   debugger;
//   const isAdmin = isAdminUser.then(isAdmin => isAdmin);
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isAdmin ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/api/auth/google",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//   );
// };

function App() {
  return (
    <Router className="App">
      <header>
        <h1>Weather App</h1>
      </header>
      <nav className="navigation">
        <Link to="/">Home</Link>
        <Link to="/forecast">Forecast</Link>
        <Link to="/users">Users</Link>
        <Link to="/logout">Logout</Link>
      </nav>
      <main>
        <Switch>
          <Route exact path="/">
            <div>Homeeee</div>
          </Route>
          <Route path="/forecast">
            <Forecast />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>

          {/* Try to have isAdmin user Route */}
          {/* <Suspense fallback={<isAdminUser />}>
          <Route path="/users">
            <UsersList />
          </Route>
        </Suspense> */}
          <Route path="/users" component={UsersList} />
        </Switch>
      </main>
      <footer>Page created by mimipaskova</footer>
    </Router>
  );
}

export default App;
