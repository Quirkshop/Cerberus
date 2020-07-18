import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER, STRIPE_CONNECT, IS_STRIPE } from "../graphql/queries";
import { useMutation } from "@apollo/react-hooks";
import Mutations from "../graphql/mutations";
import qs from "qs";
import CreateRoute from "./CreateRoute";
import Create from "../components/Create/Create";

import gql from "graphql-tag";

//const { STRIPE_CONNECT} = Mutations;

const StripeRoute = ({ isLoggedIn, uid, ...rest }) => {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { uid },
  });

  // if(loading) return null;

  // const username = !data ? false : data && data.user ? data.user.username : "";

  // //debugger;

  //const acc_id = rest.computedMatch.params.AUTHORIZATION_CODE;

  const acc_id = qs.parse(rest.location.search, { ignoreQueryPrefix: true })
    .code;

  const state = qs.parse(rest.location.search, { ignoreQueryPrefix: true })
    .state;

  const state_bool = state === "create_course";

  // console.log(acc_id);

  const {
    loading: StripeLoading,
    error: StripeError,
    data: StripeData,
    client,
  } = useQuery(STRIPE_CONNECT, { variables: { access_code: acc_id, uid } });
  //          {update(client, { StripeData }) {
  //         client.writeQuery({
  //             data: {
  //                 stripe: (StripeData.stripeConnect !== null)
  //             }
  //         });
  //     }
  // }

  // )
  if (StripeLoading) return null;

  //     client.writeQuery({
  //         STRIPE_CONNECT,
  //         data: {
  //             stripe: (StripeData.stripeConnect !== null)
  //         }
  //     });

  const stripe_connected = !StripeData
    ? false
    : StripeData && StripeData.stripeConnect
    ? StripeData.stripeConnect
    : false;

  // console.log("Stripe Data:", StripeData)

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn && stripe_connected && data && !state_bool ? (
          <Redirect
            to={{
              pathname: `/profile/${data.user.username}`,
              state: { user: data.user },
            }}
          />
        ) : isLoggedIn && stripe_connected && data && state_bool ? (
          <Redirect
            to={{
              pathname: `/create`,
              state: { stripe_connected },
            }}
          />
        ) : (
          // <CreateRoute
          // path="/create"
          // component={Create}
          // isLoggedIn={isLoggedIn}
          // uid={data.user.uid}
          // route="/signup" />
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

export default StripeRoute;
