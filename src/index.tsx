import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";
import configureStore from "./configureStore";
const history = createBrowserHistory();

const initialState: any = {};
const store = configureStore(history, initialState);
ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById("root")
);

serviceWorker.unregister();
