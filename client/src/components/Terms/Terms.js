import React from "react";
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  Button,
  Link,
  Divider,
} from "@material-ui/core";
import Image from "material-ui-image";
import { Mixpanel } from "../../analytics/Mixpanel";

// var Mixpanel = require("Mixpanel-browser");
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      //   display: "flex",

      maxWidth: 1250,
      // justifyContent: "center",
      //   alignItems:"center",
      //   textAlign: "center",
      justify: "center",
      margin: "auto",
    },
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
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    width: "60%",
    justify: "center",
    alignItems: "center",
  },
}));

const Terms = (props) => {
  Mixpanel.track("Terms and Conditions");
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md" align="center">
        <Typography variant="h5" color="Primary" align="center">
          {
            "Below are the Terms of Service, Community Policy and Standards, Privacy Policy, Service Fees, and Cookie Policy."
          }
        </Typography>
        <Divider className={classes.divider} />
      </Container>

			<Link
				color="inherit"
				href={
					"https://d1543jb95t9z4g.cloudfront.net/Terms/Quirkshop+Terms+of+Use.pdf"
				}
				target="_blank"
			>
				<Typography
					variant="subtitle1"
					color="Primary"
					align="center"
				>
					Terms of Use
				</Typography>
			</Link>

			<Link
				color="inherit"
				href={
					"https://d1543jb95t9z4g.cloudfront.net/Terms/Quirkshop+Policy+%26+Standards.pdf"
				}
				target="_blank"
			>
				<Typography
					variant="subtitle1"
					color="Primary"
					align="center"
				>
					Community Policy & Standards
				</Typography>
			</Link>
			<Link
				color="inherit"
				href={
					"https://d1543jb95t9z4g.cloudfront.net/Terms/Quirkshop+Privacy+Policy.pdf"
				}
				target="_blank"
			>
				<Typography
					variant="subtitle1"
					color="Primary"
					align="center"
				>
					Privacy Policy
				</Typography>
			</Link>
			<Link
				color="inherit"
				href={
					"https://d1543jb95t9z4g.cloudfront.net/Terms/Service+Fees.pdf"
				}
				target="_blank"
			>
				<Typography
					variant="subtitle1"
					color="Primary"
					align="center"
				>
					Service Fees
				</Typography>
			</Link>
			<Link
				color="inherit"
				href={
					"https://d1543jb95t9z4g.cloudfront.net/Terms/Quirkshop+Cookie+Policy.pdf"
				}
				target="_blank"
			>
				<Typography
					variant="subtitle1"
					color="Primary"
					align="center"
				>
					Cookie Policy
				</Typography>
			</Link>
		</div>
	);
};

export default withRouter(Terms);
