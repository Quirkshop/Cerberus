import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Button } from "@material-ui/core";
import Image from "material-ui-image";
import Divider from "@material-ui/core/Divider";
import { Helmet } from "react-helmet";
import { Mixpanel } from "../../analytics/Mixpanel";
// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 1500,
    height: "100%",
    justifyContent: "center",
    margin: "auto",
  },
  infographicTop: {
    //padding: theme.spacing(2),
    //margin: theme.spacing(4),
    marginBottom: theme.spacing(3),
    justifyContent: "center",
    // padding: 0,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    height: "100%",
    width: "100%",
  },
  infographic: {
    //padding: theme.spacing(2),
    //margin: theme.spacing(4),
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    justifyContent: "center",
    // padding: 0,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    height: "100%",
    width: "100%",
  },
  infographic2: {
    justifyContent: "center",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  image: {
    justifyContent: "center",
    height: "100%",
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

const About = (props) => {
  const classes = useStyles();
  Mixpanel.track("About");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.root}>
      <Helmet title="About" />
      <Container className={classes.infographicTop} maxWidth="md">
        <Image
          className={classes.image}
          src="https://d1543jb95t9z4g.cloudfront.net/static/About+Page/V2/How+Quirkshop+Works+V2+Desktop+3600x2560.png"
          aspectRatio={45 / 32}
          disableSpinner
        />
      </Container>
      <Container className={classes.infographic2} maxWidth="md">
        <Image
          className={classes.image}
          src="https://d1543jb95t9z4g.cloudfront.net/static/About+Page/V2/How+Quirkshop+Works+V2+Mobile+913x2941.png"
          aspectRatio={31 / 100}
          disableSpinner
        />
      </Container>

      <Container maxWidth="md">
        <Divider variant="middle" />
      </Container>

      <Container className={classes.infographic} maxWidth="md">
        <Image
          className={classes.image}
          src="https://d1543jb95t9z4g.cloudfront.net/static/About+Page/V2/Our+Values+Desktop+3600x2139.png"
          aspectRatio={337 / 200}
          disableSpinner
        />
      </Container>

      <Container className={classes.infographic2} maxWidth="md">
        <Image
          className={classes.image}
          src="https://d1543jb95t9z4g.cloudfront.net/static/About+Page/V2/Our+Values+Mobile+913x2868.png"
          aspectRatio={159 / 500}
          disableSpinner
        />
      </Container>

      <Container maxWidth="md">
        <Divider variant="middle" />
      </Container>

      <Container className={classes.infographic} maxWidth="md">
        <Image
          className={classes.image}
          src="https://d1543jb95t9z4g.cloudfront.net/static/About+Page/V2/Leadership+Desktop+3600x1772.png"
          aspectRatio={203 / 100}
          disableSpinner
        />
      </Container>

      <Container className={classes.infographic2} maxWidth="md">
        <Image
          className={classes.image}
          src="https://d1543jb95t9z4g.cloudfront.net/static/About+Page/V2/Leadership+Jack+913x1317.png"
          aspectRatio={7 / 10}
          disableSpinner
        />
      </Container>
      <Container className={classes.infographic2} maxWidth="md">
        <Image
          className={classes.image}
          src="https://d1543jb95t9z4g.cloudfront.net/static/About+Page/V2/Leadership+Blaze+913x1151.png"
          aspectRatio={793 / 1000}
          disableSpinner
        />
      </Container>
      <Container className={classes.infographic2} maxWidth="md">
        <Image
          className={classes.image}
          src="https://d1543jb95t9z4g.cloudfront.net/static/About+Page/V2/Leadership+Chris+913x1097.png"
          aspectRatio={83 / 100}
          disableSpinner
        />
      </Container>
    </div>
  );
};

export default withRouter(About);
