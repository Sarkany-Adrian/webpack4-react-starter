import React from "react";
import { Route, withRouter } from "react-router-dom";

const Layout = ({ component: Component, ...props }) => (
  <Route {...props} render={matchProps => <Component {...matchProps} />} />
);

export default withRouter(Layout);
