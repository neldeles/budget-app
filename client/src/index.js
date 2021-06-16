import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyles } from "twin.macro";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>,
  document.getElementById("root")
);
