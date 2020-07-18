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
    display: "flex",
    flexFlow: "column ",
    minHeight: 300,
    // justifyContent: "space - between,
    alignItems: "center",
    top: "150%",
    // minHeight: 50vh,
    // marginTop: 10,
    // marginBottom: 10,
    // maxWidth: 1500,
  },
  bakery: {
    position: "absolute",
    alignItems: "center",
    top: "55%",
    right: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  baker: {
    position: "absolute",
    // alignItems: "center",
    top: "65%",
    right: "20%",
    left: "0%",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  bakerImage: {
    // position: "absolute",
    // alignItems: "center",
    // top: 50,
    // right: 300,
    // left: -25,
    width: "40%",
    height: "40%",
    zIndex: 1,
  },
  text: {
    position: "absolute",

    top: "5%",
    right: "0%",
    left: "20%",
    width: "70%",
    height: "30%",
    zIndex: 1,
  },
  text2: {
    position: "absolute",

    top: 50,
    right: "0%",
    left: 10,
    width: "90%",
    height: "30%",
    zIndex: 1,
    marginTop: 10,
  },
  buttonPosition: {
    position: "relative",

    top: -300,
    right: "0%",
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  button1: {
    marginTop: "25%",
    // marginRight: 10,
    marginLeft: "30%",
    width: "50%",
  },
  button2: {
    marginTop: "5%",
    // marginRight: 10,
    marginLeft: "30%",
    width: "50%",
  },
}));

const BakeryMobile = ({ props }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Parallax y={[-15, -25]} className={classes.bakery}>
        <Image
          src="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/Mobile/Image+2+background+mobile+414x240.png"
          aspectRatio={414 / 240}
          disableSpinner
        />
      </Parallax>
      <Parallax x={[-50, 0]} className={classes.baker}>
        <img
          className={classes.bakerImage}
          src="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/Mobile/Image+2+foreground.svg"
        />
      </Parallax>
      <Parallax y={[-15, 0]} className={classes.text}>
        <Typography variant="h6">Reimagine hosting online workshops</Typography>
        <Typography className={classes.text2} variant="body2" align="left">
          1) Create
          <br />
          2) Host
          <br />
          It's that easy.
        </Typography>
      </Parallax>
      <Parallax className={classes.text}>
        <Button
          onClick={() => {
            Mixpanel.track("Landing Page Mobile Host Section -> Start Hosting");
            props.history.push("/create");
          }}
          color="primary"
          className={classes.button1}
          variant="contained"
          size="small"
        >
          Start Hosting
        </Button>
        <Button
          onClick={() => {
            Mixpanel.track("Landing Page Host Section -> Learn More");
            props.history.push("/host");
          }}
          color="primary"
          className={classes.button2}
          variant="outlined"
          size="small"
        >
          Learn More
        </Button>
      </Parallax>
    </Container>
  );
};

export default BakeryMobile;
