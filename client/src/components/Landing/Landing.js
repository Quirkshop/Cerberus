import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { ParallaxProvider } from "react-scroll-parallax";
import Rocket from "./desktop/Rocket";
import RocketMobile from "./mobile/RocketMobile";
import Top from "./desktop/Top";
import TopMobile from "./mobile/TopMobile";
import Bakery from "./desktop/Bakery";
import BakeryMobile from "./mobile/BakeryMobile";
import End from "./desktop/End";
import EndMobile from "./mobile/EndMobile";
import { Mixpanel } from "../../analytics/Mixpanel";
const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    display: "flex",
    flexFlow: "column",
    maxWidth: 1500,
    align: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "auto",
    [theme.breakpoints.down("xs")]: {
      display: "none",
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
}));

const Landing = ({ isLoggedIn, ...props }) => {
  Mixpanel.track("Home");
  const classes = useStyles();
  // const { loading, error, data } = useQuery(USERS);
  // console.log(data);

  return (
    <ParallaxProvider>
      <div className={classes.root}>
        <Top props={props} />
        <Rocket props={props} />
        <Bakery props={props} />
        <End props={props} isLoggedIn={isLoggedIn} />
      </div>
      {/* <div className={classes.root1}>
        <Top props={props} />
      </div> */}
      <div className={classes.root2}>
        <TopMobile props={props} />
        <RocketMobile props={props} />
        <BakeryMobile props={props} />
        <EndMobile props={props} />
      </div>
    </ParallaxProvider>
  );
};
export default Landing;
