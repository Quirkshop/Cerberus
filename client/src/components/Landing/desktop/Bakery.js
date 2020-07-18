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
    minHeight: 500,
    // justifyContent: "space - between,
    alignItems: "center",
    top: -450,

    // minHeight: 50vh,
    // marginTop: 10,
    // marginBottom: 10,
    // maxWidth: 1500,
  },
  bakery: {
    position: "relative",
    alignItems: "center",
    top: 950,
    right: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    zIndex: 0,
    [theme.breakpoints.only("md")]: {
      position: "relative",
      alignItems: "center",
      top: 900,
      right: "0%",
      left: "0%",
      width: "100%",
      height: "100%",
      zIndex: 0,
    },
    [theme.breakpoints.only("sm")]: {
      position: "relative",
      alignItems: "center",
      top: 800,
      right: "0%",
      left: "0%",
      width: "100%",
      height: "100%",
      zIndex: 0,
    },
  },
  baker: {
    position: "absolute",
    // alignItems: "center",
    top: "170%",
    right: "50%",
    left: "0%",
    // width: "100%",
    height: "100%",
    zIndex: 1,
    [theme.breakpoints.only("md")]: {
      position: "absolute",
      // alignItems: "center",
      top: "155%",
      right: "50%",
      left: "0%",
      width: "30%",
      height: "80%",
      zIndex: 1,
    },
    [theme.breakpoints.only("sm")]: {
      position: "absolute",
      // alignItems: "center",
      top: "170%",
      right: "50%",
      left: "0%",
      width: "80%",
      height: "80%",
      zIndex: 1,
    },
  },
  bakerSize: {
    [theme.breakpoints.only("sm")]: {
      width: "30%",
      height: "30%",
    },
  },

  text: {
    position: "absolute",

    top: "130%",
    right: "0%",
    left: "20%",
    // width: "90%",
    // height: "100%",
    zIndex: 1,
    [theme.breakpoints.only("md")]: {
      position: "absolute",

      top: "115%",
      right: "0%",
      left: "25%",
      // width: "60%",
      height: "70%",
      zIndex: 1,
    },
    [theme.breakpoints.only("sm")]: {
      position: "absolute",

      top: "110%",
      right: "0%",
      left: "25%",
      // width: "60%",
      height: "70%",
      zIndex: 1,
    },
  },
  text2: {
    position: "absolute",

    // top: 800,
    right: "0%",
    left: "25%",
    // width: "100%",
    height: "100%",
    zIndex: 1,
    marginTop: 10,
    [theme.breakpoints.only("md")]: {
      right: "0%",
      left: "20%",
      // width: "100%",
      height: "100%",
      zIndex: 1,
      marginTop: 10,
    },
    [theme.breakpoints.only("sm")]: {
      right: "0%",
      left: "15%",
      // width: "100%",
      height: "100%",
      zIndex: 1,
      marginTop: 10,
      fontSize: 20,
    },
  },
  bakerFont: {
    [theme.breakpoints.only("sm")]: {
      fontSize: 30,
    },
  },

  buttonPosition: {
    position: "relative",

    top: 390,
    right: "0%",
    left: "10%",
    // width: "100%",
    // height: "100%",
    zIndex: 1,
    [theme.breakpoints.only("md")]: {
      top: 310,
      right: "0%",
      left: "5%",
      // width: "100%",
      // height: "100%",
      zIndex: 1,
    },
    [theme.breakpoints.only("sm")]: {
      top: 305,
      right: "0%",
      left: "10%",
      // width: "100%",
      // height: "100%",
      zIndex: 1,
    },
  },
  button: {
    // position: "relative",
    // top: "200%",
    marginTop: "25%",
    marginRight: 10,
    [theme.breakpoints.only("md")]: {
      marginTop: "40%",
    },
    [theme.breakpoints.only("sm")]: {
      marginTop: "35%",
    },
  },
}));

const Bakery = ({ props }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Parallax y={[-15, -25]} tagOuter="figure" className={classes.bakery}>
        <Image
          src="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/Desktop/Image+2+background+desktop+1440x595.png"
          aspectRatio={1440 / 595}
          disableSpinner
        />
      </Parallax>
      <Parallax x={[-50, -25]} tagOuter="figure" className={classes.baker}>
        <img
          className={classes.bakerSize}
          src="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/Desktop/Image+2+foreground.svg"
        />
      </Parallax>
      <Parallax
        y={[-15, 0]}
        // offsetXMax={-100}
        // offsetXMin={100}
        // tagOuter="figure"
        className={classes.text}
      >
        <Typography className={classes.bakerFont} variant="h4">
          Reimagine hosting online workshops
        </Typography>
        <Typography className={classes.text2} variant="h6" align="left">
          1) Create
          <br />
          2) Host
          <br />
          {/* <br /> */}
          It's that easy. We handle the rest.
        </Typography>

        {/* <Button
          onClick={() => {
            Mixpanel.track("Landing Page Host Section -> Start Hosting");
            props.history.push("/create");
          }}
          color="primary"
          className={classes.button}
          variant="contained"
        >
          Start Hosting
        </Button>
        <Button
          onClick={() => {
            Mixpanel.track("Landing Page Host Section -> Learn More");
            props.history.push("/host");
          }}
          color="primary"
          className={classes.button}
          variant="outlined"
        >
          Learn More
        </Button> */}
        {/* </Container> */}
        {/* <Typography variant="h4">2) Host</Typography>
        <Typography variant="h5">Its that easy.</Typography> */}
      </Parallax>
      <Parallax className={classes.buttonPosition}>
        <Button
          onClick={() => {
            Mixpanel.track("Landing Page Host Section -> Start Hosting");
            props.history.push("/create");
          }}
          color="primary"
          className={classes.button}
          variant="contained"
        >
          Start Hosting
        </Button>
        <Button
          onClick={() => {
            Mixpanel.track("Landing Page Host Section -> Learn More");
            props.history.push("/host");
          }}
          color="primary"
          className={classes.button}
          variant="outlined"
        >
          Learn More
        </Button>
      </Parallax>
    </Container>
  );
};

export default Bakery;
