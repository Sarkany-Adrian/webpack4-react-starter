// @flow
import React from "react";
import { Switch } from "react-router-dom";

// Layout Wrapper
import Layout from "containers/Layout";

// Page containers
import Home from "containers/Home";
// Not found
import NotFound from "containers/NotFound";

const App = () => (
  <Switch>
    <Layout exact path="/" component={Home} />
    <Layout path="*" component={NotFound} />
  </Switch>
);

export default App;
