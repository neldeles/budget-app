import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";

// Components
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";

// Services

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log("auth status", isAuthenticated);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await axios.get("http://localhost:5000/auth/is-verify", {
        headers: { token: localStorage.token },
      });

      console.log("parseRes", response);
      response === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            render={(props) =>
              isAuthenticated ? (
                <Dashboard {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route exact path="/register">
            <Register />
          </Route>
          <Route
            exact
            path="/"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
