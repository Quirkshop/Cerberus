import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER, GET_USER_BY_USERNAME } from "../graphql/queries";
import { SignalCellularNullSharp } from "@material-ui/icons";
import { ProfileProvider } from "../components/Profile/ProfileContext";

const ProfileRoute = ({
  publicComponent: PublicComponent,
  privateComponent: PrivateComponent,
  isLoggedIn,
  uid,
  ...rest
}) => {
  // console.log("Private rest is: " + rest);
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { uid },
  });
  const url_username = rest.computedMatch.params.username;
  const {
    loading: usernameLoading,
    error: usernameError,
    data: usernameData,
  } = useQuery(GET_USER_BY_USERNAME, {
    variables: { username: url_username },
  });

  if (loading) return null;
  if (usernameLoading) return null;
  const user_exists = !usernameData.username ? false : true;
  const username = !data ? false : data && data.user ? data.user.username : "";

  const isMe = rest.computedMatch.params.username === username;
  // //debugger;
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <ProfileProvider>
      <Route
        {...rest}
        render={(props) =>
          isLoggedIn && isMe ? (
            <PrivateComponent isMe={isMe} {...props} />
          ) : !isMe && isLoggedIn && user_exists ? (
            <PublicComponent isMe={isMe} {...props} />
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
    </ProfileProvider>
  );
};

export default ProfileRoute;
