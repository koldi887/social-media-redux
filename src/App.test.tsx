import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { setupStore } from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";

const store = setupStore();

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
