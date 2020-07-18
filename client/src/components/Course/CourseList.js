import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import Image from "material-ui-image";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import { COURSES, GET_USER } from "../../graphql/queries";
import shadows from "@material-ui/core/styles/shadows";
import { grey } from "@material-ui/core/colors";
import { withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { Mixpanel } from "../../analytics/Mixpanel";

const text_color = grey[600];

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      // display: "flex",

      maxWidth: 1500,
      //   justifyContent: "center",
      //   alignItems:"center",
      //   textAlign: "center",
      margin: "auto",
    },

    // 	padding:0
  },

  //   flexGrow: 1,
  //   maxWidth:1500,
  // justify: "center",
  // alignItems:"center"

  // },
  gridContainer: {
    // display: 'flex',
    // justify:"center",
    padding: theme.spacing(0, 0, 0),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(0, 0, 0),
      // justify:"center",
      width: "100%",
      height: "80%",
    },
    width: "100%",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.background.paper,
    maxWidth: 345,
    height: 300,
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
  image: {
    height: "auto",
    width: "100%",
    marginBottom: theme.spacing(1),
  },
}));

const TEACHER_NAME = gql`
  query($uid: String!) {
    user(uid: $uid) {
      first
      last
    }
  }
`;

const CourseList = (props) => {
  const classes = useStyles();

  // const { loading, error, data } = useQuery(COURSES);

  // const { loading: teacher_loading, error: teacher_error, data: teacher_data } = useQuery(TEACHER_NAME, {
  //     variables:  {uid: course.teacher }
  //   })

  // console.log(data)
  ////debuggerr
  // if(props.history.location.state){
  //     const intial
  // }
  const data = props.data;

  //debuggergger;

  return (
    <div className={classes.root}>
      <Container align="center" maxWidth="md">
        {data && data.length > 0 && (
          <>
            <Grid container spacing={1} className={classes.gridContainer}>
              {data.map((course, i) => (
                <Grid item xs={12} sm={6} md={6} lg={4} wrap="nowrap">
                  <Card
                    className={classes.paper}
                    elevation={3}
                    onClick={() => {
                      Mixpanel.track("CourseList -> Click Course Card", {
                        courseName: course.courseName,
                        courseTag: course.tag,
                      });
                      props.history.push(`/browse/${course.uid}`);
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={course.cardImageURL}
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
                                course.courseName.length > 25
                                  ? "subtitle1"
                                  : "h5"
                              }
                              color="primary"
                              className={classes.title}
                            >
                              {course.courseName}
                            </Typography>
                          </Grid>
                          {/* {course.isLive ==
													true && (
													<Grid
														item
														xs={4}
														sm={2}
														md={2}
														lg={3}
													
													>
														<Button
															className={
																classes.liveButton
															}
															size="small"
															variant="contained"
															color="secondary"
															disableElevation
														>
															Livestream
														</Button>
														{/* </Chip>  */}

                          {/* )} */}

                          <Grid item xs={12}>
                            <Typography
                              className={classes.subtitle}
                              variant="subtitle2"
                              justify="left"
                            >
                              City: {course.logistics.City},{" "}
                              {course.logistics.state}
                            </Typography>
                            {course.Price > 0 && (
                              <Typography
                                className={classes.subtitle}
                                variant="subtitle2"
                                justify="left"
                              >
                                Price: ${course.Price / 100}
                              </Typography>
                            )}
                            {course.Price === 0 && (
                              <Typography
                                className={classes.subtitle}
                                variant="subtitle2"
                                justify="left"
                              >
                                Price: Free
                              </Typography>
                            )}
                          </Grid>
                          {course.isLive == true && (
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
                                label={course.tag}
                              />
                            </Grid>
                          )}
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {data && data.length === 0 && (
          <div>
            <Container
              // className={classes.paper}
              component="main"
              maxWidth="xs"
            >
              {/* <Typography className={classes.avatar}  variant="h4" color="primary">
							<CheckCircleOutlineIcon fontSize="large" />
						</Typography> */}
              <Typography
                className={classes.avatarText}
                variant="h4"
                color="Primary"
                align="center"
              >
                No Results Found
              </Typography>
              <Typography
                className={classes.avatarText}
                variant="subtitle"
                color="Primary"
                align="center"
              >
                Please update your search and try again
              </Typography>
            </Container>
            <Container maxWidth="xs">
              <Image
                className={classes.image}
                src="https://d1543jb95t9z4g.cloudfront.net/static/404+detective+mouse+600x386.png"
                aspectRatio={600 / 386}
                disableSpinner
              />
            </Container>
          </div>
        )}
      </Container>
    </div>
  );
};

export default withRouter(CourseList);
