import React from "react";
import { Route, Redirect } from "react-router-dom";
import "./StripeRoute";
import { useQuery } from "@apollo/react-hooks";
import { graphql } from "@apollo/react-hoc";
import { GET_USER } from "../graphql/queries";
import { Mixpanel } from "../analytics/Mixpanel";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const CreateRoute = ({
  component: Component,
  isLoggedIn,
  uid,
  route,
  ...rest
}) => {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { uid },
  });

  if (loading) return null;
  var link = "";
  // var link =
  // 	"https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://www.quirkshop.org/stripe&client_id=ca_GjCT2mYqAkWgs8TwoZqoPUEG6wutsD1P&state=create_course&suggested_capabilities[]=card_payments";

  if (process.env.NODE_ENV === "production") {
    link =
      "https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://www.quirkshop.org/stripe&client_id=ca_GjCT2mYqAkWgs8TwoZqoPUEG6wutsD1P&state=create_course&suggested_capabilities[]=card_payments";
  } else {
    link =
      "https://connect.stripe.com/express/oauth/authorize?redirect_uri=http://localhost:3000/stripe&client_id=ca_GjCTzo0lMxCnEE09StxX56Z5oyAz3Ven&state=create_course&suggested_capabilities[]=card_payments";
  }

  // if (process.env.NODE_ENV === 'prod') {

  var isStripe = false;

  if (rest.location.state && rest.location.state.stripe_connected !== null) {
    isStripe = rest.location.state.stripe_connected;
  } else {
    isStripe = !data
      ? false
      : data && data.user
      ? data.user.stripe_account !== ""
      : false;
  }
  Mixpanel.track("Create", {
    stripe_redirect: !isStripe,
  });

  // //debugger;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
          return (
            <Component
              {...props}
              uid={uid}
              user={data.user}
              isStripe={isStripe}
            />
          );
        }

        // else if (isLoggedIn) {
        // 	return (
        // 		<Route
        // 			component={() => {
        // 				window.location.href = link;
        // 			}}
        // 		/>
        // 	);
        // }
        else {
          return <Redirect to={{ pathname: `${route}` }} />;
        }
        // if (isLoggedIn) {
        // 	return (
        // 		<Component
        // 			{...props}
        // uid={uid}
        // user={data.user}
        // 		/>
        // 	);
        // } else {
        // 	return <Redirect to={{ pathname: `${route}` }} />;
        // }
      }}
    />
  );
};

export default graphql(GET_USER, { options: { fetchPolicy: "network-only" } })(
  CreateRoute
);
