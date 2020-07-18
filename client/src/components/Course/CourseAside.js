import React, { useState, useContext } from "react";
import { CourseContext } from "./CourseContext";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  Button,
  Avatar,
  ButtonGroup,
  Grid,
  Paper,
  Divider,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";
import "moment/min/locales";
import * as moment from "moment/moment";
import gql from "graphql-tag";
import { STRIPE_PAYMENT } from "../../graphql/queries";

import { IS_LOGGED_IN } from "../../graphql/queries";
import { Mixpanel } from "../../analytics/Mixpanel";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const useStyles = makeStyles((theme) => ({
  button: {
    justifyContent: "center",
    margin: "0 auto",
    marginBottom: 10,
    marginTop: theme.spacing(2),
    display: "flex",
    color: "white",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  prereq: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: theme.spacing(3),
  },
  teacherName: {
    display: "flex",
    flexDirection: "row",
  },
  teacherText: {
    fontSize: 12,
  },
  skill: {
    marginBottom: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  sectionBody: {
    textIndent: 0,
    // marginTop: 10,
    marginLeft: 0,
    paddingLeft: theme.spacing(0),
    // lineHeight: 2,
    // [theme.breakpoints.only("xs")]: {
    // 	fontSize: 15,
    // },
  },
  buttonGroup: {
    // [theme.breakpoints.up("md")]: {
    // 	orientation:"horizonal",
    // },
    // [theme.breakpoints.only("sm")]: {
    // 	orientation:"vertical",
    // },
    orientation: "vertical",
  },
}));

// const { loading: authLoading, error: authError, data: authData } = useQuery(IS_LOGGED_IN);
// const loggedIN = !authData ? false : authData && authData.isLoggedIn ? authData.isLoggedIn : false;

// const uid = !authData
//         ? null
//         : authData && authData.currentUserId
//         ? authData.currentUserId
//         : null;

// //debugger;

const TEACHER_NAME = gql`
  query($uid: String!) {
    user(uid: $uid) {
      first
      last
      username
      stripe_account
      profile_pic
    }
  }
`;

const CourseAside = ({
  course,
  uid,
  courseId,
  loggedIN,
  isPurchased,
  ...rest
}) => {
  const ctx = useContext(CourseContext);

  const aside = useStyles();

  const editClick = () => {
    Mixpanel.track("Edit Quirkshop");
    ctx.setMode("Edit");
  };
  const deleteClick = () => {
    ctx.setOpen(!ctx.open);
  };

  const publishClick = () => {
    ctx.setPublish(!ctx.publish);
  };

  const duplicateClick = () => {
    ctx.setDuplicate(!ctx.duplicate);
  };
  const isFuture = (value) => {
    const temp = new Date(value.startDate);
    const now = new Date(Date.now());
    return temp > now;
  };
  const availableClick = () => {
    Mixpanel.track("See Available Dates");
    // ctx.setAppointments(course.appointments);
    appointmentFilter();
    ctx.setAvailable(!ctx.available);
  };
  const future_appointment = course.appointments.filter((value) => {
    return isFuture(value);
  });
  const appointmentFilter = () => {
    ctx.setAppointments(future_appointment);
  };
  const [sessionID, setSessionID] = useState("");
  // console.log(courseId);
  // //debugger;
  const attendHandler = (sessionID) => {
    // //debugger
    var stripe;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      stripe = window.Stripe("pk_test_BBmtAQLh1ws4UUQyuOixR94g00u49TD6gt", {
        stripeAccount: course.stripe_account,
      });
    } else {
      stripe = window.Stripe("pk_live_2jr7VV6tUIlQxT9oBaS0gATn00tkamBcEY", {
        stripeAccount: course.stripe_account,
      });
    }

    stripe
      .redirectToCheckout({
        // successUrl: 'https://localhost/home',
        // cancelUrl: 'https://localhost/host',
        sessionId: sessionID.stripePayment,
      })
      .then((result) => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        console.log(result.error.message);
      });
  };

  const {
    loading: teacher_loading,
    error: teacher_error,
    data: teacher_data,
  } = useQuery(TEACHER_NAME, {
    variables: { uid: course.teacher },
  });
  // console.log(uid);
  // const {
  // 	loading: stripe_loading,
  // 	error: stripe_error,
  // 	data: stripe_data,
  // } = useQuery(STRIPE_PAYMENT, {
  // 	variables: {
  // 		courseName: course.courseName,
  // 		Price: course.Price,
  // 		courseId: courseId,
  // 		user_id: uid,
  // 		stripe_account: course.stripe_account,
  // 	},
  // });

  const skill = ["Beginner", "Intermediate", "Advanced", "Expert"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const dateOnly = (datetime) => {
    // var month = datetime.getUTCMonth() + 1; //months from 1-12
    // var day = datetime.getUTCDate();
    // var year = datetime.getUTCFullYear();

    // var newdate =  month + "/" + day + "/" + year ;
    // var year = datetime.toString().substring(0, 4);
    // var rest = datetime.toString().substring(5, 10)
    // var newdate = rest + "-" + year

    var newdate = moment(datetime).format("dddd MMMM Do YYYY");
    return newdate;
  };

  const classTime = (timeString) => {
    // let hour;
    // let min;
    // if(timeString > 1000){
    //   // //debugger
    //   hour = parseInt(timeString.toString().slice(0, 2));
    //   min = parseInt(timeString.toString().slice(2));
    //   min = min < 10 ? min + "0" : min;
    //   return hour >= 12 ? hour % 12 + ":" + min + "PM" : hour + ":" + min + "AM";
    // } else {
    //   // //debugger
    //   hour = parseInt(timeString.toString().slice(0, 1));
    //   min = parseInt(timeString.toString().slice(1));
    //   min = min < 10 ? min + "0" : min;
    //   return hour + ":" + min + "AM";
    // }

    var newtime = moment(timeString).format("h:mm a");
    return newtime;
  };

  const location = (city, state) => {
    const newaddress = city + ", " + state;
    return newaddress;
  };

  const streamRouteHandler = (event) => {
    if (course.isVIP) {
      // VIP class
      Mixpanel.track("Go to Livestream", {
        vip: true,
      });
      rest.history.push({
        pathname: `/live/vip/${courseId}`,
        state: {
          isPurchased: isPurchased,
          teacher: course.teacher,
          vip: course.vip,
          courseId: courseId,
          course: course,
        },
      });
    } else {
      // Broadcast class
      Mixpanel.track("Go to Livestream", {
        vip: false,
      });
      rest.history.push({
        pathname: `/live/${courseId}`,
        state: {
          isPurchased: isPurchased,
          teacher: course.teacher,
          courseId: courseId,
          course: course,
        },
      });
    }
  };

  // //debugger;

  return (
    <div>
      {course && (
        <Paper elevation={3}>
          <Card variant="outlined">
            <CardContent className={aside.prereq}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={1}
                //   justify="flex-start"
                // alignItems="flex-start"
                // xs={12}
              >
                <Grid item xs={12}>
                  {/* {loggedIN && !isPurchased && (
						<Button
							variant="contained"
							color="primary"
							className={aside.button}
							onClick={() => attendHandler(stripe_data)}
						>
							Attend
						</Button>
					)} */}
                  {!loggedIN && !isPurchased && (
                    <Button
                      variant="contained"
                      color="primary"
                      className={aside.button}
                      onClick={
                        () => {
                          Mixpanel.track("Sign Up to Attend");
                          rest.history.push({
                            pathname: "/signup",
                            state: {
                              location: rest.location,
                            },
                          });
                        }
                        // console.log("LOLOLOLOLOL")
                      }
                    >
                      Sign Up to Attend
                    </Button>
                  )}
                  {/* {loggedIN && isPurchased && course.isLive && (
						<Button
							className={aside.button}
							size="medium"
							variant="contained"
							color="secondary"
							disableElevation
							onClick={() =>
								rest.history.push({
									pathname: `/live/${courseId}`,
									state: {
										isPurchased: isPurchased,
										teacher: course.teacher,
										courseId: courseId,
										course: course,
									},
								})
							}
						>
							Go to Livestream
						</Button>
					)} */}
                  {loggedIN && future_appointment.length !== 0 && (
                    <Button
                      className={aside.button}
                      size="medium"
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={availableClick}
                    >
                      See All Dates
                    </Button>
                  )}

                  <Divider className={aside.divider} />
                </Grid>

                <Grid item xs={2}>
                  {teacher_data && (
                    <Avatar
                      alt={teacher_data.user.username}
                      src={teacher_data.user.profile_pic}
                      onClick={() => {
                        Mixpanel.track("View Teacher Profile", {
                          teacher: teacher_data.user,
                        });
                        rest.history.push({
                          pathname: `/profile/${teacher_data.user.username}`,
                          state: {
                            user: teacher_data.user,
                          },
                        });
                      }}
                    />
                  )}
                </Grid>
                <Grid item md={12} sm={11} xs={6}>
                  {teacher_data && (
                    <Typography gutterBottom variant="subtitle1">
                      {teacher_data.user.first + " " + teacher_data.user.last}
                    </Typography>
                  )}
                </Grid>

                <Grid item md={12} sm={12} xs={7}>
                  {course.teacher === uid && (
                    <ButtonGroup
                      color="secondary"
                      orientation="vertical"
                      aria-label="course actions"
                    >
                      <Button
                        onClick={() => {
                          Mixpanel.track("Edit & Add Dates");
                          editClick();
                        }}
                      >
                        Edit & Add Dates
                      </Button>
                      {/* <Button
												onClick={() =>
													duplicateClick()
												}
											>
												Duplicate
											</Button> */}
                      {course.isActive && (
                        <Button
                          onClick={() => {
                            Mixpanel.track("Archive Course");
                            deleteClick();
                          }}
                        >
                          Archive
                        </Button>
                      )}
                      {!course.isActive && (
                        <Button
                          onClick={() => {
                            Mixpanel.track("Publish Course");
                            publishClick();
                          }}
                        >
                          Publish
                        </Button>
                      )}
                    </ButtonGroup>
                  )}
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  {course.teacher === uid && (
                    <Typography
                      className={aside.teacherText}
                      variant="subtitle1"
                    >
                      (Edit, Duplicate & Archive only visible to host)
                    </Typography>
                  )}
                </Grid>
              </Grid>
              {/* </CardContent> */}
              {/* <CardContent className={aside.card}>
          <Rating name="read-only" value={3.5} readOnly precision={0.5} />
        </CardContent> */}
              {/* </Card>

					<Card variant="outlined">
						<CardContent className={aside.prereq}> */}
              {/* <Grid item md={12} sm={12} xs={12}> */}
              <Divider className={aside.divider} />
              <Typography
                gutterBottom
                variant="h6"
                color="primary"
                align="left"
              >
                Logistics:
              </Typography>

              {loggedIN && isPurchased && !course.isLive && (
                <Typography gutterBottom variant="body2">
                  {course.logistics.Address}
                </Typography>
              )}
              <Typography gutterBottom variant="body2">
                Price: ${course.Price / 100}
              </Typography>
              <Typography gutterBottom variant="body2">
                {location(course.logistics.City, course.logistics.state)}
              </Typography>
              {/* <Typography gutterBottom variant="body2">
								{dateOnly(course.date)}
							</Typography> */}
              {/* <Typography gutterBottom variant="body2">
								{classTime(course.logistics.startTime)}
							</Typography> */}
              {course.isLive == false && (
                <Typography gutterBottom variant="body2">
                  {course.logistics.Capacity} seat capacity
                </Typography>
              )}
              {course.isLive == false && (
                <Typography gutterBottom variant="body2">
                  {course.logistics.Capacity - course.user_list.length + 1}{" "}
                  seats left
                </Typography>
              )}
              {/* </Grid> */}
              {/* </CardContent>
					</Card>

					<Card variant="outlined">
						<CardContent className={aside.prereq}> */}
              <Divider className={aside.divider} />
              <Typography
                gutterBottom
                variant="h6"
                color="primary"
                align="left"
              >
                Pre-Requisites:
              </Typography>
              <Typography className={aside.skill} gutterBottom variant="body2">
                Skill Level: {skill[course.prereqs.SkillLevel]}
              </Typography>
              <Typography gutterBottom variant="body2">
                Materials:
              </Typography>
              <List>
                {course.prereqs.Materials.map((material, i) => (
                  <ListItem key={i}>
                    <ListItemText
                      className={aside.sectionBody}
                      secondary={material}
                    />
                  </ListItem>
                ))}
              </List>
              <Typography gutterBottom variant="body2">
                Suggested Experience
              </Typography>
              <List>
                {course.prereqs.preRequisites.map((prereq, i) => (
                  <ListItem key={i}>
                    <ListItemText secondary={prereq} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Paper>
      )}
    </div>
  );
};

export default withRouter(CourseAside);
