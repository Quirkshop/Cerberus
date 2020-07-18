import React from "react";
// import GoogleFontLoader from "react-google-font-loader";
// import NoSsr from "@material-ui/core/NoSsr";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import { Column, Item } from "@mui-treasury/components/flex";
import {
  Info,
  InfoCaption,
  InfoSubtitle,
  InfoTitle,
} from "@mui-treasury/components/info";
import { useGalaxyInfoStyles } from "@mui-treasury/styles/info/galaxy";
import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";
import { Typography } from "@material-ui/core";
import { Mixpanel } from "../../analytics/Mixpanel";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
    borderRadius: "1rem",
    // boxShadow: "none",
    position: "relative",
    minWidth: 200,
    minHeight: 300,
    "&:after": {
      content: '""',
      display: "block",
      position: "absolute",
      width: "100%",
      height: "64%",
      bottom: 0,
      zIndex: 1,
      //   background: "linear-gradient(to top, #000, rgba(0,0,0,0))",
    },
  },
  content: {
    position: "absolute",
    zIndex: 2,
    top: 0,
    width: "100%",
    justify: "center",
    alignItems: "center",
  },
  learnMore: {
    backgroundColor: "#fff !important",
    color: "#fb703c",
    // boxShadow: "0 2px 6px #d0efef",
    borderRadius: 12,
    minWidth: 120,
    minHeight: 42,
    // fontFamily: family,
    textTransform: "initial",
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 0,
  },
  quirkTitle: {
    fontSize: 40,
    color: "#fff",
  },
  quirksubTitle: {
    fontSize: 20,
    color: "#fff",
    align: "left",
  },
  quirkbutton: {
    position: "absolute",
    bottom: 2,
    align: "center",
    justify: "center",
  },
}));

// export const QuirkCard = React.memo(function GalaxyCard() {
const HostCard = ({ props }) => {
  const mediaStyles = useCoverCardMediaStyles({ bgPosition: "top" });
  const styles = useStyles();
  return (
    <>
      {/* <NoSsr>
        <GoogleFontLoader
          fonts={[
            { font: "Spartan", weights: [300] },
            { font: "Montserrat", weights: [200, 400, 700] },
          ]}
        />
      </NoSsr> */}
      <Card
        className={styles.card}
        align="center"
        onClick={() => {
          Mixpanel.track("Home -> Host Learn More");
          props.history.push("/host");
        }}
        elevation={3}
      >
        <CardMedia
          classes={mediaStyles}
          image={
            "https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/V2/Hosts+desktop+479x226.png"
          }
        />
        <Box py={3} className={styles.content}>
          <Info
            align="center"
            position={"middle"}
            // useStyles={useGalaxyInfoStyles}
          >
            {/* <InfoSubtitle>Galaxy</InfoSubtitle> */}
            <InfoTitle align="center" className={styles.quirkTitle}>
              Host
            </InfoTitle>
            <InfoCaption align="center" className={styles.quirksubTitle}>
              Get Started in 2 steps.
              <br />
              1. Signup
              <br />
              2. Host
            </InfoCaption>
            {/* <InfoCaption className={styles.quirksubTitle}>
              
            </InfoCaption> */}
            {/* <Typography>Quirkers</Typography> */}
          </Info>
          <Item align="center" mt={2}>
            <Button
              onClick={() => {
                Mixpanel.track("Home -> Host Learn More");
                props.history.push("/host");
              }}
              align="center"
              className={styles.learnMore}
            >
              Learn More
            </Button>
          </Item>
        </Box>
      </Card>
    </>
  );
};
export default HostCard;
