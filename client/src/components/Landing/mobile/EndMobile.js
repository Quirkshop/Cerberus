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
    position: "absolute",
    display: "flex",
    flexFlow: "column ",
    // minHeight: 500,
    // justifyContent: "space - between,
    alignItems: "center",
    top: "175%",
    // minHeight: 50vh,
    // marginTop: 10,
    // marginBottom: 10,
    // maxWidth: 1250,
  },
  end: {
    position: "relative",
    alignItems: "center",
    top: "100%",
    // right: "0%",
    // left: "0%",
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  endText: {
    position: "relative",
    alignItems: "center",
    top: -225,
    right: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  endButton: {
    position: "relative",
    alignItems: "center",
    top: -25,
    right: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },

  text: {
    position: "absolute",

    top: 600,
    right: "0%",
    left: 300,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  button: {
    marginTop: 30,
  },
}));

const EndMobile = ({ course, val, user_id, isPurchased, props }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Parallax y={[-10, -25]} className={classes.end}>
        <Image
          src="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/Mobile/Image+3+mobile+414x307.png"
          aspectRatio={414 / 307}
          disableSpinner
        />
      </Parallax>
      <Parallax y={[0, -100]} className={classes.endText}>
        <Typography variant="h6">Start your journey today</Typography>
      </Parallax>
      <Parallax y={[0, -100]} className={classes.endText}>
        <Button
          onClick={() => {
            Mixpanel.track("Landing Page Mobile -> Signup");
            props.history.push("/signup");
          }}
          size="small"
          variant="contained"
          color="primary"
        >
          {" "}
          Sign Up
        </Button>
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

export default EndMobile;
