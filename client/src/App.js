import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Components
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./components/Register";

// Services
import verifyService from "./services/verify";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const config = {
        headers: { token: localStorage.token },
      };
      const response = await verifyService(config);

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
          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
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
