import React from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Product from "./components/Product";
const Routes: React.FC = () => (
  <div>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Navbar>
            <HomePage />
          </Navbar>
        )}
      />
      <Route
        path="/product/:name"
        render={() => (
          <Navbar>
            <Product />
          </Navbar>
        )}
      />
    </Switch>
  </div>
);

export default Routes;
