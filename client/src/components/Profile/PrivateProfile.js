import React, { useState, useContext } from "react";
import PublicProfile from "./PublicProfile";
import ProfileForm from "./ProfileForm";
import { ProfileContext } from "./ProfileContext";
import MyCourses from "./MyCourses";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { GET_USER_BY_USERNAME, STRIPE_LINK } from "../../graphql/queries";
import { graphql } from "@apollo/react-hoc";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  CircularProgress,
  Grid,
  FormControlLabel,
  Switch,
  Container,
  Fab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StripeRoute from "../../hoc/StripeRoute";
import Mutations from "../../graphql/mutations";
import { Mixpanel } from "../../analytics/Mixpanel";

// var Mixpanel = require("Mixpanel-browser");
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");
const { LOGOUT_USER } = Mutations;

const useStyles = makeStyles((theme) => ({
  // menuHead: {
  // 	display: "flex",
  // 	flexDirection: "row",
  // 	justifyContent: "space-between",
  // },
  // nav: {
  // 	top: 0,
  // },
  fabLogout: {
    position: "fixed",
    display: "flex",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabForm: {
    position: "fixed",
    // display: "flex",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabExpress: {
    position: "fixed",
    // display: "flex",
    bottom: theme.spacing(22),
    right: theme.spacing(2),
  },
  fabCourse: {
    position: "fixed",
    // display: "flex",
    bottom: theme.spacing(32),
    right: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const PrivateProfile = ({ isMe, ...props }) => {
  const classes = useStyles();
  const ctx = useContext(ProfileContext);
  // const [mode, setMode] = useState(null);
  const [logout] = useMutation(LOGOUT_USER, {
    update(client, { data }) {
      // //debugger
      client.writeData({
        data: { isLoggedIn: false, currentUserId: null },
      });
    },
  });
  function handleLogOut(uid) {
    logout({ variables: { uid } }).then(
      (result) => {
        // success callback
        // //debugger
        localStorage.removeItem("auth-token");
        localStorage.removeItem("isLoggedIn");
        props.history.push("/");
        window.location.reload();
      },
      (error) => {
        // //debugger
        // error callback
        console.log(error);
      }
    );
  }

  const PROFILE = "PROFILE";
  const EDIT = "EDIT";
  const MY_COURSE = "MY_COURSES";

  var link = "";

  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    link =
      "https://connect.stripe.com/express/oauth/authorize?redirect_uri=http://localhost:3000/stripe&client_id=ca_GjCTzo0lMxCnEE09StxX56Z5oyAz3Ven&suggested_capabilities[]=card_payments&stripe_user";
  } else {
    link =
      "https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://www.quirkshop.org/stripe&client_id=ca_GjCT2mYqAkWgs8TwoZqoPUEG6wutsD1P&suggested_capabilities[]=card_payments&stripe_user";
  }

  const editClick = () => {
    if (ctx.mode === EDIT) {
      ctx.setMode(PROFILE);
    } else {
      ctx.setMode(EDIT);
    }
  };
  const courseClick = () => {
    if (ctx.mode === PROFILE) {
      ctx.setMode(MY_COURSE);
    }
    if (ctx.mode === null) {
      ctx.setMode(MY_COURSE);
    }
    if (ctx.mode === MY_COURSE) {
      ctx.setMode(PROFILE);
    }
    if (ctx.mode === EDIT) {
      ctx.setMode(MY_COURSE);
    }
  };

  const username = props.match.params.username;

  const { loading, error, data } = useQuery(GET_USER_BY_USERNAME, {
    variables: { username },
  });

  const {
    loading: StripeLoading,
    error: Stripe_Error,
    data: Stripe_Data,
  } = useQuery(STRIPE_LINK, {
    variables: { username },
  });
  // //debugger;

  if (loading) return null;

  const user = !data ? null : data && data.username ? data.username : null;
  if (user) {
    // console.log("Mixpanel");
    Mixpanel.people.set(user.uid, {
      $first_name: user.first,
      $last_name: user.last,
      $email: user.email,
      $username: user.username,
    });
  }

  return (
    <>
      {data && (
        <div>
          {ctx.mode === null && <PublicProfile isMe={isMe} />}
          {ctx.mode === PROFILE && <PublicProfile isMe={isMe} />}
          {ctx.mode === EDIT && <ProfileForm user={user} />}
          {/* <Fab
						className={classes.fabForm}
						color="primary"
						aria-label="edit profile"
						onClick={() => editClick()}
					>
						{ctx.mode === null && <EditIcon />}
						{ctx.mode === PROFILE && <EditIcon />}
						{ctx.mode === MY_COURSE && <EditIcon />}
						{ctx.mode === EDIT && <CloseIcon />}
					</Fab> */}

          {/* {user.isTeacher && (
						<Fab
							className={classes.fabExpress}
							color="primary"
							aria-label="express checkout"
							variant="extended"
							href={
								user.stripe_account === ""
									? "https://connect.stripe.com/express/oauth/authorize?redirect_uri=http://localhost:3000/stripe&client_id=ca_GjCTzo0lMxCnEE09StxX56Z5oyAz3Ven&suggested_capabilities[]=card_payments"
									: Stripe_Data
									? Stripe_Data.loginLink
									: ""
							}
							
						>
							<AccountBalanceIcon
								className={classes.icon}
							/>
							Connect to Stripe{" "}
						</Fab>
					)} */}
        </div>
      )}
    </>
  );
};

export default graphql(GET_USER_BY_USERNAME, {
  options: { fetchPolicy: "network-only" },
})(PrivateProfile);
