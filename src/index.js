import "./index.css";

import React from "react";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import FormContextProvider from "./reducer/FormContext";
import { stoted } from "./reducer/Stored";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FormContextProvider>
      <Provider store={stoted}>
        <App />
      </Provider>
    </FormContextProvider>
  </React.StrictMode>
);
