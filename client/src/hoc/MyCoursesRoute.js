import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../graphql/queries";
import MyCourses from "../components/Profile/MyCourses";

const MyCoursesRoute = ({ isLoggedIn, uid, ...rest }) => {
  // console.log("Private rest is: " + rest);
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { uid },
  });

  if (loading) return null;

  const username = !data ? false : data && data.user ? data.user.username : "";

  // //debugger;
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <MyCourses user={data.user} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { location: rest.location },
            }}
          />
        )
      }
    />
  );
};

export default MyCoursesRoute;
