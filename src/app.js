import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// Routes container
import App from "containers/App";

const appContainer = document.getElementById("root");

if (appContainer) {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    appContainer
  );
}
