import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, isLoggedIn, route, ...rest }) => {
  // //debugger;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Redirect to={{ pathname: `${route}` }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AuthRoute;
