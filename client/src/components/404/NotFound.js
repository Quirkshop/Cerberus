import React from "react";
import { withRouter, useLocation } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Button } from "@material-ui/core";
import ShareBar from "../Social/ShareBar";
import Image from "material-ui-image";
import { Mixpanel } from "../../analytics/Mixpanel";
// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");
// Mixpanel.track("404", {
//   //   path: location.pathname,
// });
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  avatarText: {
    marginTop: theme.spacing(2),
  },
  image: {
    height: "auto",
    width: "100%",
  },
  button: {
    justifyContent: "center",
    margin: "0 auto",
    marginTop: theme.spacing(2),
    marginBottom: 10,
    display: "flex",
  },
}));

const NotFound = (props) => {
  const classes = useStyles();
  let location = useLocation();
  Mixpanel.track("404", {
    path: location.pathname,
  });
  return (
    <div className={classes.root}>
      <Container className={classes.paper} component="main" maxWidth="xs">
        {/* <Typography className={classes.avatar}  variant="h4" color="primary">
                    <CheckCircleOutlineIcon fontSize="large" />
                </Typography> */}
				<Typography
					className={classes.avatarText}
					variant="h4"
					color="Primary"
					align="center"
				>
					Oops, the page you were looking for was not found
				</Typography>
			</Container>
			<Container maxWidth="xs">
				<Image
					className={classes.image}
					src="https://d1543jb95t9z4g.cloudfront.net/static/404+detective+mouse+600x386.png"
					aspectRatio={600 / 386}
					disableSpinner
				/>
			</Container>
			<Button
				variant="contained"
				color="primary"
				className={classes.button}
				onClick={() => props.history.push("/")}
			>
				Go Home
			</Button>
		</div>
	);
};

export default withRouter(NotFound);
