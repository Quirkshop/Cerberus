import React, { useState, useContext } from "react";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  Grid,
  Typography,
  Container,
  Button,
} from "@material-ui/core";
import Image from "material-ui-image";
import { Mixpanel } from "../../../analytics/Mixpanel";
// import baker from "./baker.svg";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flexFlow: "column ",
    minHeight: 500,
    // justifyContent: "space - between,
    alignItems: "center",
    top: -150,
    [theme.breakpoints.only("md")]: {
      top: -150,
    },
    [theme.breakpoints.only("sm")]: {
      top: -350,
    },
    // overflowX: "hidden",
    // minHeight: 50vh,
    // marginTop: 10,
    // marginBottom: 10,
    // maxWidth: 1250,
  },
  end: {
    position: "relative",
    alignItems: "center",
    top: 600,
    // right: "0%",
    // left: "0%",
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  endText: {
    position: "relative",
    alignItems: "center",
    top: 50,
    right: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    zIndex: 1,
    [theme.breakpoints.only("md")]: {
      position: "relative",
      alignItems: "center",
      top: 100,
      right: "0%",
      left: "0%",
      width: "100%",
      height: "100%",
      zIndex: 1,
    },
    [theme.breakpoints.only("sm")]: {
      position: "relative",
      alignItems: "center",
      top: 300,
      right: "0%",
      left: "0%",
      width: "100%",
      height: "100%",
      zIndex: 1,
    },
  },
  endTextSize: {
    [theme.breakpoints.only("sm")]: {
      fontSize: 30,
    },
  },

  endButton: {
    position: "relative",
    alignItems: "center",
    top: "10%",
    right: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },

  text: {
    position: "absolute",

    top: "180%",
    right: "0%",
    left: "100%",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  button: {
    marginTop: "0%",
    [theme.breakpoints.down("md")]: {
      marginTop: "-5%",
    },
  },
  button2: {
    marginTop: "0%",
    marginRight: "2%",
    [theme.breakpoints.down("md")]: {
      marginTop: "-5%",
    },
  },
}));

const End = ({ isLoggedIn, props }) => {
  const classes = useStyles();
  console.log(isLoggedIn);
  return (
    <Container className={classes.root}>
      <Parallax y={[-10, -25]} tagOuter="figure" className={classes.end}>
        <Image
          src="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/Desktop/Image+3+desktop+1440x720.png"
          aspectRatio={1440 / 720}
          disableSpinner
        />
      </Parallax>
      <Parallax y={[0, -100]} tagOuter="figure" className={classes.endText}>
        <Typography className={classes.endTextSize} variant="h2">
          Start your journey today
        </Typography>
      </Parallax>
      <Parallax y={[0, -100]} tagOuter="figure" className={classes.endText}>
        {!isLoggedIn && (
          <Button
            onClick={() => {
              Mixpanel.track("Landing Page -> Signup");
              props.history.push("/signup");
            }}
            size="large"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {" "}
            Sign Up
          </Button>
        )}
        {isLoggedIn && (
          <Button
            onClick={() => {
              Mixpanel.track("Landing Page End -> Experience");
              props.history.push("/browse");
            }}
            size="large"
            variant="contained"
            color="primary"
            className={classes.button2}
          >
            {" "}
            Experience
          </Button>
        )}
        {isLoggedIn && (
          <Button
            onClick={() => {
              Mixpanel.track("Landing Page End -> Host");
              props.history.push("/create");
            }}
            size="large"
            variant="contained"
            color="primary"
            className={classes.button2}
          >
            {" "}
            Host
          </Button>
        )}
      </Parallax>
      {/* <Parallax x={[-50, -25]} tagOuter="figure" className={classes.baker}>
        <img src={baker} />
      </Parallax> */}
      {/* <Parallax
        y={[-25, 25]}
        // offsetXMax={-100}
        // offsetXMin={100}
        // tagOuter="figure"
        className={classes.text}
      >
        <Typography variant="h3">Reimagine hosting online workshops</Typography>
        <Typography variant="h4">1) Create a quirkshop listing</Typography>
        <Typography variant="h4">2) Host</Typography>
        <Typography variant="h5">Its that easy.</Typography>
        <Button color="primary" className={classes.button} variant="contained">
          Start Hosting
        </Button>
      </Parallax> */}
    </Container>
  );
};

export default End;
