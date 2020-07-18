import React from "react";
import {
  Container,
  Paper,
  Card,
  Avatar,
  Typography,
  CardContent,
  CssBaseline,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";

import ProfileHead from "./ProfileHead";
import ProfileStats from "./ProfileStats";
import ProfileDescription from "./ProfileDescription";
import { GET_USER_BY_USERNAME } from "../../graphql/queries";
import { Helmet } from "react-helmet";
import { Mixpanel } from "../../analytics/Mixpanel";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(2),
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
    padding: theme.spacing(2),
  },
  profileDataContainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  // avatar: {
  // 	width: "150px",
  // 	height: "150px",
  // 	justifyContent: "center",
  // },
  // avatarText: {
  // 	padding: theme.spacing(2),
  // },
  contentText: {
    padding: theme.spacing(2),
  },
}));

const PublicProfile = ({ isMe, ...props }) => {
  const classes = useStyles();
  const username = props.match.params.username;

  const { loading, error, data } = useQuery(GET_USER_BY_USERNAME, {
    variables: { username },
  });
  Mixpanel.track("Profile", {
    username: username,
  });
  // //debugger;

  if (loading) return null;

  const user = !data ? null : data && data.username ? data.username : null;
  const name = user.first + " " + user.last;

  return (
    <>
      <Helmet title={name} />
      <CssBaseline />
      {data && (
        <div className={classes.root}>
          <Container maxWidth="md" className={classes.profile}>
            <Grid container direction="row" justify="space-between" spacing={1}>
              <Grid item xs={12} sm={12} md={2} lg={2}>
                <Container className={classes.profileContainer} maxWidth="md">
                  <ProfileHead isMe={isMe} user={user} />
                  {/* <ProfileStats user={user}/> */}
                </Container>
              </Grid>
              <Grid item xs={12} sm={12} md={9} lg={9}>
                <Container
                  className={classes.profileDataContainer}
                  maxWidth="md"
                >
                  <ProfileDescription user={user} />
                </Container>
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </>
  );
};

export default withRouter(PublicProfile);
