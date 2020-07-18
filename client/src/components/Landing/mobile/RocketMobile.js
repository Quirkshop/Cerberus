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

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    // display: "flex",
    // flexFlow: "column",
    minHeight: 500,
    top: "0%",
    // justifyContent: "space - between,
    alignItems: "center",
    align: "center",
    justifyContent: "center",
    // minHeight: 50vh,
    // marginTop: 10,
    margin: "auto",

    // maxWidth: 1250,
  },
  rocket: {
    position: "relative",
    alignItems: "center",
    top: "40%",
    right: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  rocketShip: {
    position: "absolute",
    top: "60%",
    right: "0%",
    left: "60%",
    width: "20%",
    height: "20%",
    zIndex: 1,
  },
  rocketShipImage: {
    // position: "absolute",
    // top: "60%",
    // right: "0%",
    // left: "60%",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  text: {
    position: "absolute",
    alignItems: "left",
    top: "25%",
    right: "0%",
    left: 15,
    width: "50%",
    height: "30%",
    zIndex: 1,
  },
  button: {
    marginTop: 10,
    // marginRight: 10,
  },
  //   rocketImage: {
  //     position: "absolute",
  //     top: "100%",
  //     right: "0%",
  //     left: "70%",
  //     width: "20%",
  //     height: "20%",
  //     zIndex: 1,
  //   },
}));

const RocketMobile = ({ props }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Parallax
        y={[0, 25]}
        className={classes.rocket}
        // tagOuter="figure"
      >
        <Image
          src="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/Mobile/Image+1+background+mobile+414x442.png"
          aspectRatio={414 / 442}
          disableSpinner
        />
      </Parallax>
      <Parallax
        y={[100, -150]}
        // offsetXMax={-100}
        // offsetXMin={100}
        // tagOuter="figure"
        className={classes.rocketShip}
      >
        <img
          className={classes.rocketShipImage}
          //   src="https://quirkshop-prod.s3-us-west-1.amazonaws.com/static/Landing+Page/Desktop/Image+1+foreground+desktop+1087%E2%80%8A%C3%97%E2%80%8A2316.png"
          src="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/Mobile/Image+1+foreground.svg"
          //   aspectRatio={858 / 1285}
        />
      </Parallax>
      <Parallax
        y={[0, 0]}
        // offsetXMax={-100}
        // offsetXMin={100}
        // tagOuter="figure"
        className={classes.text}
      >
        <Typography variant="h6">Leave the Noise Behind</Typography>
        <Typography variant="subtitle1">
          Online experiences made simple.
        </Typography>
        <Button
          onClick={() => {
            Mixpanel.track("Landing Page Quirkshop Section -> Browse");
            props.history.push("/browse");
          }}
          color="primary"
          className={classes.button}
          variant="contained"
          size="small"
        >
          Find an experience
        </Button>
        <Button
          onClick={() => {
            Mixpanel.track("Landing Page Quirkshop Section -> Learn More");
            props.history.push("/about");
          }}
          color="primary"
          className={classes.button}
          variant="outlined"
          size="small"
        >
          Learn More
        </Button>
      </Parallax>
    </Container>
  );
};

export default RocketMobile;
