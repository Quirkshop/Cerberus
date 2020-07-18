import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Container,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";

import Image from "material-ui-image";
import Featured from "./Featured";
import { Mixpanel } from "../../analytics/Mixpanel";
import MyTheme from "../Theme/MyTheme";
import QuirkCard from "./QuirkCard";
import HostCard from "./HostCard";
import FootBar from "../Navigation/FootBar";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      // display: "flex",
      padding: theme.spacing(1, 1, 1),
      maxWidth: 1250,
      align: "center",

      // [theme.breakpoints.only("xs")]: {
      // 	// padding: theme.spacing(1),
      // 	justify: "center",
      // },
      //   justifyContent: "center",
      //   alignItems:"center",
      //   textAlign: "center",
      margin: "auto",
      //   position: "fixed",
    },
  },

  root1: {
    // display: "flex",

    maxWidth: 1500,
    height: "100%",
    align: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "auto",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  root2: {
    // display: "flex",

    maxWidth: 1500,
    height: "100%",
    align: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  logo: {
    height: "50%",
    width: "50%",
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  logo2: {
    // height: "50%",
    marginTop: theme.spacing(2),
    width: "90%",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  logosub: {
    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(2),
      fontSize: 20,
    },
  },
  title: {
    marginTop: theme.spacing(8),
    [theme.breakpoints.only("xs")]: {
      // marginTop: theme.spacing(2),
      fontSize: 20,
    },
  },
  subtitle: {
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(4),
    // width: "20%",
  },
  button2: {
    marginTop: theme.spacing(2),
    width: "20%",
    [theme.breakpoints.only("xs")]: {
      width: "60%",
    },
  },
  featured: {},
  rootContainer: {
    // height: "200%",
    marginTop: theme.spacing(3),

    // backgroundImage:
    //   "url('https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/V2/Curvy+background+desktop+1440x460.png')",
    // backgroundSize: "100% 150%",
  },
  quirksandhosts: {
    margin: theme.spacing(1),
  },
  card: {
    borderRadius: "1rem",
    boxShadow: "none",
    position: "relative",
    minWidth: 200,
    minHeight: 360,
    "&:after": {
      content: '""',
      display: "block",
      position: "absolute",
      width: "90%",
      height: "64%",
      bottom: 0,
      zIndex: 1,
      background: "linear-gradient(to top, #000, rgba(0,0,0,0))",
    },
  },
  content: {
    position: "absolute",
    zIndex: 2,
    bottom: 0,
    width: "100%",
  },
  bottom: {
    [theme.breakpoints.only("xs")]: {
      width: "80%",
      height: "100%",
    },
  },
  bottom2: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  signup: {
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  signup2: {
    marginTop: -10,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

const LandingV2 = ({ isLoggedIn, ...props }) => {
  Mixpanel.track("Home");
  const classes = useStyles();
  console.log(!isLoggedIn);

  // const { loading, error, data } = useQuery(USERS);
  // console.log(data);

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} align="center">
            <img
              className={classes.logo}
              src="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/V2/Quirkshop+name+desktop+580x186.png"
            />
            <img
              className={classes.logo2}
              src="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/V2/Quirkshop+name+mobile+340x80.png"
            />
            <Typography className={classes.logosub} variant="h5" align="center">
              Online classes, workshops, events & experiences. Hosted by
              experts.
            </Typography>
            {/* <Typography
              className={classes.subtitle}
              variant="h6"
              align="center"
            >
              Time well spent.
            </Typography> */}
          </Grid>
          <Grid
            className={classes.rootContainer}
            item
            xs={12}
            height={500}
            // width="120%"
            // alignItems="center"
            align="center"
          >
            {/* <Container className={classes.rootContainer}> */}
            <Featured
              align="center"
              className={classes.featured}
              props={props}
            />
            {/* <Button
              className={classes.button}
              align="right"
              onClick={() => {
                props.history.push("/browse");
              }}
              style={MyTheme.palette.companyBlue}
              size="large"
            >
              Browse All
            </Button> */}
            {/* </Container> */}
          </Grid>
          <Grid
            // className={classes.rootContainer}
            item
            xs={12}
            // height="200%"
            // width="120%"
            align="right"
          >
            <Button
              className={classes.button}
              align="right"
              onClick={() => {
                Mixpanel.track("Home -> Browse All");
                props.history.push("/browse");
              }}
              style={MyTheme.palette.companyBlue}
              size="large"
            >
              Browse All
            </Button>
            {/* </Container> */}
          </Grid>
          <Grid className={classes.signup} item xs={12} align="center">
            <Typography className={classes.title} variant="h4" align="center">
              Discover your adventure and community.
            </Typography>
            {!isLoggedIn && (
              <Button
                className={classes.button2}
                align="center"
                onClick={() => {
                  Mixpanel.track("Home -> Signup");
                  props.history.push("/signup");
                }}
                style={MyTheme.palette.companyBlue}
                size="large"
              >
                Signup and Get Started
              </Button>
            )}
          </Grid>
          <Grid className={classes.quirksandhosts} item sm={5} xs={12}>
            <QuirkCard props={props} />
          </Grid>
          <Grid className={classes.quirksandhosts} item sm={5} xs={12}>
            <HostCard props={props} />
          </Grid>
          <Grid className={classes.signup2} item xs={12} align="center">
            <Typography className={classes.title} variant="h4" align="center">
              Discover your adventure and community.
            </Typography>
            {!isLoggedIn && (
              <Button
                className={classes.button2}
                align="center"
                onClick={() => {
                  Mixpanel.track("Home -> Signup");
                  props.history.push("/signup");
                }}
                style={MyTheme.palette.companyBlue}
                size="large"
              >
                Signup and Get Started
              </Button>
            )}
          </Grid>
          <Grid className={classes.quirksandhosts} item xs={12}>
            <Image
              className={classes.bottom}
              src="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/V2/Animals+900x250.png"
              aspectRatio={900 / 250}
            />
          </Grid>
        </Grid>
        {/* <FootBar isLoggedIn={isLoggedIn} /> */}
      </Container>
    </div>

    // <div className={classes.root2}>

    // </div>
  );
};
export default LandingV2;
