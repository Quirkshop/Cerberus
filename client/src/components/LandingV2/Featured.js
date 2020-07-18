import React, { useState, useContext } from "react";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  Grid,
  Typography,
  Container,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Chip,
  CssBaseline,
} from "@material-ui/core";
import Image from "material-ui-image";
import { Mixpanel } from "../../analytics/Mixpanel";
// import MyTheme from "../../Theme/MyTheme";
import { grey } from "@material-ui/core/colors";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");
const text_color = grey[600];
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    // display: 'flex',
    marginTop: theme.spacing(6),
    justify: "center",
    padding: theme.spacing(0, 0, 0),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 0, 0),
      marginTop: theme.spacing(1),
      // justify:"center",
      width: "100%",
      height: "80%",
    },
    height: "200%",
    width: "100%",
    // backgroundImage:
    //   "url('https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/V2/Curvy+background+desktop+1440x460.png')",
    // backgroundSize: "contain",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.background.paper,
    maxWidth: 345,
    height: 315,
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    flexGrow: 1,
  },
  liveButton: {
    zIndex: 0,
    shadows: "none",
  },
  subtitle: {
    color: text_color,
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 18,
    },
  },
  chipGrid: {
    // marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    // marginLeft: theme.spacing(1)
  },
  chip: {
    // marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
    // // marginLeft: theme.spacing(1)
    marginLeft: theme.spacing(1),
  },
  rootContainer: {
    // height: "150%",
    marginTop: theme.spacing(3),
    backgroundImage:
      "url('https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/V2/Curvy+background+desktop+1440x460.png')",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    height: "1000px",
  },
  card2: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.background.paper,
    maxWidth: 345,
    height: 315,
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    flexGrow: 1,
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  //   "@global": {
  //     body: {
  //       backgroundImage:
  //         "url('https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/V2/Curvy+background+desktop+1440x460.png')",
  //       backgroundRepeat: "no-repeat",
  //       backgroundPosition: "center center",
  //       backgroundSize: "contain",
  //       backgroundAttachment: "fixed",
  //       height: "20%",
  //     },
  //     html: {
  //       height: "20%",
  //     },
  //     "#componentWithId": {
  //       height: "20%",
  //     },
  //   },
}));

const Featured = ({ props }) => {
  const classes = useStyles();

  return (
    // <Image src="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/V2/Curvy+background+desktop+1440x460.png" aspectRatio={1440/460}/>
    // <Container className={classes.rootContainer}>
    <Grid
      container
      spacing={1}
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.gridContainer}
    >
      {/* <CssBaseline /> */}
      <Grid item xs={12} sm={6} md={4} lg={4} wrap="nowrap">
        <Card
          className={classes.paper}
          elevation={3}
          onClick={() => {
            //   Mixpanel.track("CourseList -> Click Course Card", {
            //     courseName: course.courseName,
            //     courseTag: course.tag,
            //     courseID: course.uid,
            //   });
            Mixpanel.track("Home -> Featured 1");
            props.history.push("/browse/f81fc620-9d5e-11ea-9060-690ef53af825");
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/V2/Featured+images/Dinner_V2.png"
              height="140"
              title="Temporary Course"
            />
            <CardContent align="left">
              <Grid
                container
                // justify="space-between"
                // alignItems="center"
                direction="row"
                spacing={1}
              >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography
                    variant={
                      // course.courseName.length > 25
                      //   ? "subtitle1"
                      "h5"
                    }
                    color="primary"
                    className={classes.title}
                  >
                    Week Night Cooking
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    className={classes.subtitle}
                    variant="subtitle2"
                    justify="left"
                  >
                    City: Palo Alto, CA
                  </Typography>
                  <Typography
                    className={classes.subtitle}
                    variant="subtitle2"
                    justify="left"
                  >
                    Price: Free
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className={classes.chipGrid}
                >
                  <Chip color="secondary" label="Livestream" />
                  <Chip
                    className={classes.chip}
                    color="primary"
                    variant="outlined"
                    label="Cooking"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} wrap="nowrap">
        <Card
          className={classes.card2}
          elevation={3}
          onClick={() => {
            //   Mixpanel.track("CourseList -> Click Course Card", {
            //     courseName: course.courseName,
            //     courseTag: course.tag,
            //     courseID: course.uid,
            //   });
            Mixpanel.track("Home -> Featured 2");
            props.history.push("/browse/8daa0440-9d22-11ea-bd8b-01ef439f0fdb");
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/V2/Featured+images/Bicycle.png
			  "
              height="140"
              title="Temporary Course"
            />
            <CardContent align="left">
              <Grid
                container
                // justify="space-between"
                // alignItems="center"
                direction="row"
                spacing={1}
              >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography
                    variant={
                      // course.courseName.length > 25
                      //   ? "subtitle1"
                      "h5"
                    }
                    color="primary"
                    className={classes.title}
                  >
                    Bicycle care and modification
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    className={classes.subtitle}
                    variant="subtitle2"
                    justify="left"
                  >
                    City: Palo Alto, CA
                  </Typography>
                  <Typography
                    className={classes.subtitle}
                    variant="subtitle2"
                    justify="left"
                  >
                    Price: Free
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className={classes.chipGrid}
                >
                  <Chip color="secondary" label="Livestream" />
                  <Chip
                    className={classes.chip}
                    color="primary"
                    variant="outlined"
                    label="Bicycle"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} wrap="nowrap">
        <Card
          className={classes.card2}
          elevation={3}
          onClick={() => {
            //   Mixpanel.track("CourseList -> Click Course Card", {
            //     courseName: course.courseName,
            //     courseTag: course.tag,
            //     courseID: course.uid,
            //   });
            Mixpanel.track("Home -> Featured 3");
            props.history.push("/browse/eba583c0-9ac1-11ea-ae29-bd10af9ec910");
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/V2/Featured+images/Kettlebells.png
			  "
              height="140"
              title="Temporary Course"
            />
            <CardContent align="left">
              <Grid
                container
                // justify="space-between"
                // alignItems="center"
                direction="row"
                spacing={1}
              >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography
                    variant={
                      // course.courseName.length > 25
                      //   ? "subtitle1"
                      "h5"
                    }
                    color="primary"
                    className={classes.title}
                  >
                    Kettlebell Workout w/Chris
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    className={classes.subtitle}
                    variant="subtitle2"
                    justify="left"
                  >
                    City: Palo Alto, CA
                  </Typography>
                  <Typography
                    className={classes.subtitle}
                    variant="subtitle2"
                    justify="left"
                  >
                    Price: Free
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className={classes.chipGrid}
                >
                  <Chip color="secondary" label="Livestream" />
                  <Chip
                    className={classes.chip}
                    color="primary"
                    variant="outlined"
                    label="Fitness"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
    // </Container>
  );
};

export default Featured;
