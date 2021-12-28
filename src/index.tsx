import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import { BrowserRouter} from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { setupStore } from "./redux/redux-store";

const store = setupStore();
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>,
    document.getElementById("root")
);