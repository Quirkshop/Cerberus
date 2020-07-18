import React, { useState, useContext } from "react";
import UpdateClass from "./update/UpdateClass";
import { CourseContext } from "./CourseContext";
// import gql from "graphql-tag";
import CourseAside from "./CourseAside";
import Dropdown from "./Dropdown";
import SummaryListItem from "./ListItem";
import Container from "@material-ui/core/Container";
import ShareBar from "../Social/ShareBar";
import MyTheme from "../Theme/MyTheme";
// import { graphql } from "@apollo/react-hoc";
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Link,
  Avatar,
  Grid,
  Menu,
  MenuItem,
  Divider,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  AppBar,
  Paper,
  IconButton,
  Slider,
  Input,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import * as DateFnsUtils from "@date-io/date-fns";
import Rating from "@material-ui/lab/Rating";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { withRouter, useLocation } from "react-router-dom";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  AppointmentTooltip,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
// import   from '@devexpress/dx-react-scheduler-material-ui';
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import Image from "material-ui-image";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import { IS_LOGGED_IN } from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
import { COURSE, STRIPE_PAYMENT, ENROLLED_USERS } from "../../graphql/queries";
import { useMutation } from "@apollo/react-hooks";
import { Helmet } from "react-helmet";
import "moment/min/locales";
import * as moment from "moment/moment";
import { Mixpanel } from "../../analytics/Mixpanel";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

// import classes from "*.module.css";

const {
  DELETE_COURSE,
  PUBLISH_COURSE,
  CREATE_COURSE,
  STRIPE_PAY,
  ADD_USER_TO_CLASS,
  NOTIFY_HOST,
} = Mutations;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      // display: "flex",

      maxWidth: 1250,
      justifyContent: "center",
      alignItems: "center",
      //   textAlign: "center",
      margin: "auto",
    },
  },
  input: {
    width: 42,
  },
  list: {
    width: 250,
    fontFamily: "Sans-Serif",
    maxWidth: 1500,
    justifyContent: "center",
    alignItems: "center",
    //   textAlign: "center",
    margin: "auto",
  },
  fullList: {
    width: "auto",
  },
  menuHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  kyronTitle: {},
  closeIcon: {},
  rootContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: "100%",
  },
  nav: {
    top: 0,
    zIndex: 10,
  },
  cardBanner: {
    maxWidth: 1280,
    margin: "0 auto",
    marginTop: 10,
    borderRadius: 10,
    width: "97vw",
  },
  courseTitle: {
    justifyContent: "center",
    align: "center",
    fontSize: 35,
  },
  sectionTitle: {
    // fontWeight: 600,
    // textTransform: "uppercase",
    padding: "15px 0px",
    fontSize: 25,
    [theme.breakpoints.only("xs")]: {
      fontSize: 22,
    },
  },
  sectionBody: {
    position: "relative",
    textIndent: 0,
    marginTop: 10,
    paddingLeft: theme.spacing(2),
    lineHeight: 2,
    [theme.breakpoints.only("xs")]: {
      fontSize: 15,
    },
  },
  banner: {},
  bannerCont: {
    maxHeight: 400,
    maxWidth: 1210,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: "-1",
    // margin: "auto",
    // marginLeft: 125,
    // marginRight: 125,
    marginLeft: "auto",
    marginRight: "auto",
    // align: "center",
    justify: "center",
    // alignItems: "center",
    // justifyContent: "center",
    [theme.breakpoints.only("xs")]: {
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
    },
  },
  secondRoot: {
    display: "flex",
    flexDirection: "row",

    [theme.breakpoints.only("xs")]: {
      flexWrap: "Wrap",
    },
  },
  courseAside: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "30%",
    marginTop: "-150px",
    position: "sticky",
    // position: "fixed",
    top: 150,
    zIndex: 100,
    padding: 10,
    // backgroundColor: "white",
    // borderRadius: 10,
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  courseAside2: {
    marginTop: 10,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  courseAsideGrid: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  courseMain: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "70%",
    width: "80%",
    // align: "left",
    justify: "flex-start",
    alignItems: "flex-start",
    margin: 0,
    // padding: 0
  },
  drawerButton: {
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  resources: {
    display: "flex",
    flexDirection: "column",
  },
  fabEdit: {
    position: "fixed",
    display: "flex",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabDelete: {
    position: "fixed",
    display: "flex",
    bottom: theme.spacing(12),
    right: theme.spacing(2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  reviewContainer: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 600,
    // maxWidth: 370,
    marginTop: theme.spacing(1),
  },
  receipt: {
    // width: "100%",
    // // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
    // position: "relative",
    overflow: "auto",
    maxHeight: 700,
    width: "100%",
    // maxWidth: 370,
    // marginTop: theme.spacing(1),
  },
  reviewName: {
    padding: theme.spacing(0),
    marginRight: theme.spacing(2),
    display: "block",
    flex: "none",
    // width: "30%"
    // marginTop: theme.spacing(0),
    // marginBottom: theme.spacing(1),
  },
  enrolled_students: {
    width: "100%",
    [theme.breakpoints.only("xs")]: {
      maxWidth: 375,
    },
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "125%",
  },
  Title: {
    marginTop: theme.spacing(3),
    width: "100%",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      fontSize: 40,
    },
    fontSize: 50,
  },
  chip: {
    // width: "20%",
    // maxWidth: '100px',
    marginBottom: theme.spacing(2),
    // [theme.breakpoints.only("xs")]: {
    // 	width: "25%",
    // },
  },
  pickers: {
    display: "flex",
    flexDirection: "row",
  },
  picker: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  available: {
    width: "80%",
    height: "80%",
  },
  appBar: {
    position: "fixed",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(0),
  },
  slider: {
    marginLeft: theme.spacing(2),
    width: "90%",
  },
  menuList: {
    paddingTop: 0,
  },
  listitem: {
    backgroundColor: "primary !important",
  },
  upcoming: {
    marginTop: theme.spacing(1),
    justify: "flex-start",
    alignItems: "flex-start",
  },
  upcomingChip: {
    margin: theme.spacing(1),
  },
  shareBar: {
    marginLeft: "-30px",
  },
  notifyButton: {
    marginTop: theme.spacing(1),
  },
}));

const options = ["Audience", "Front Row (Beta)"];

const CourseShow = ({ courseuid, user_id, isLoggedIn, ...props }) => {
  const courseShowClasses = useStyles();
  let location = useLocation();
  console.log(location);
  // console.log(props.history)
  const ctx = useContext(CourseContext);
  const [delete_course] = useMutation(DELETE_COURSE);
  const [publish_course] = useMutation(PUBLISH_COURSE);
  const [create_course] = useMutation(CREATE_COURSE);
  const [stripe_pay] = useMutation(STRIPE_PAY);
  const [add_user] = useMutation(ADD_USER_TO_CLASS);
  const [notify_host] = useMutation(NOTIFY_HOST);
  const [publish_error, setError] = useState("");
  const [delete_error, setPublishError] = useState("");
  const [classDate, setClassDate] = useState(new Date(Date.now()));
  const [classTime, setClassTime] = useState(new Date(Date.now()));
  const [notified, setNotified] = useState(false);

  const [tooltip, setTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);

  const [value, setValue] = React.useState(0);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    ctx.setPrice(newValue);
    Mixpanel.track("Donation Price Slider", {
      price: newValue,
    });
    ctx.selected.map((select) => {
      select.price = newValue;
    });
    updateTotal(ctx.selected);
  };

  const handleInputChange = (event) => {
    Mixpanel.track("Donation Price Input", {
      price: event.target.value === "" ? "" : Number(event.target.value),
    });
    setValue(event.target.value === "" ? "" : Number(event.target.value));
    ctx.selected.map((select) => {
      select.price =
        event.target.value === "" ? "" : Number(event.target.value);
    });
    ctx.setPrice = event.target.value === "" ? "" : Number(event.target.value);
    updateTotal(ctx.selected);
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
      ctx.selected.map((select) => {
        select.price = 0;
      });
      ctx.setPrice(0);
      updateTotal(ctx.selected);
    } else if (value > 100) {
      setValue(100);
      // ctx.setPrice(100);
      ctx.selected.map((select) => {
        select.price = 100;
      });
      ctx.setPrice(100);
      updateTotal(ctx.selected);
    }
  };
  // const selected = []

  // const [duplicate, setDuplicate] = React.useState(false);

  const handleDateChange = (date) => {
    setClassDate(date);
  };
  const handleTimeChange = (date) => {
    setClassTime(date);
  };

  const notifyClick = (host) => {
    let courseId = courseuid;
    console.log(courseId);
    let user = user_id;

    notify_host({ variables: { user, host, courseId } }).then(
      (result) => {
        // //debugger;
        // rest.history.push(
        // 	`/createSuccess/${result.data.createCourse.uid}`
        // );
        Mixpanel.track("Notify Host", {
          user: user,
          host: host,
          courseId: courseId,
        });
        setNotified(true);
      },
      (error) => {
        Mixpanel.track("Notify Host UnSuccesful");
        // handleOpen();
      }
    );
  };

  const deleteClick = (uid) => {
    delete_course({ variables: { uid } }).then(
      (result) => {
        // //debugger;
        // rest.history.push(
        // 	`/createSuccess/${result.data.createCourse.uid}`
        // );
        Mixpanel.track("Archive Quirkshop Succesful");
        window.location.reload();
      },
      (error) => {
        setError(delete_error);
        Mixpanel.track("Archive Quirkshop UnSuccesful");
        // handleOpen();
      }
    );
  };

  const PublishClick = (uid) => {
    publish_course({ variables: { uid } }).then(
      (result) => {
        // //debugger;
        // rest.history.push(
        // 	`/createSuccess/${result.data.createCourse.uid}`
        // );
        Mixpanel.track("Publish Quirkshop Succesful");
        window.location.reload();
      },
      (error) => {
        Mixpanel.track("Publish Quirkshop UnSuccesful");
        setPublishError(publish_error);
        // handleOpen();
      }
    );
  };

  const handleSelectClick = (data) => {
    // setPrice(course.Price/100)
    var temp = [...ctx.selected];
    // console.log(data)
    // console.log(course.appointments)
    // var ele = course.appointments.find(e => e.startDate === data.startDate)
    // console.log(ele)
    // console.log(course.appointments[index])

    var Appointment = {
      title: data.title,
      startDate: data.startDate,
      endDate: data.endDate,
      uid: data.id,
      price: course.Price === 0 ? ctx.price : course.Price / 100,
      vip: data.vip,
      isVip: false,
      isSelected: true,
    };

    const found = temp.some((e) => e.uid === data.id);
    const index = ctx.schedule.indexOf(data);
    ctx.schedule[index].isSelected = true;
    if (!found) {
      Mixpanel.track("Add Appointment", {
        appointment: Appointment,
      });
      temp.push(Appointment);
      ctx.setSelected(temp);
      updateTotal(temp);
    }
    // if(index === -1)
    // {

    // 	// console.log(Appointment)

    // }

    console.log(temp);

    // updateTotal()
  };

  const handleTrashClick = (data) => {
    var temp = [...ctx.selected];
    var before = [...ctx.selected];
    const index = temp.indexOf(data);
    const index2 = ctx.schedule.findIndex((e) => e.id === data.uid);
    // console.log(data);
    // console.log(ctx.schedule);
    // console.log(index2);
    // ctx.schedule[index2].isSelected = false;
    if (index > -1) {
      temp.splice(index, 1);
      ctx.schedule[index2].isSelected = false;
    }
    updateTotal(temp);
    ctx.setSelected(temp);
    Mixpanel.track("Remove Appointment", {
      appointment: data,
      before: before,
      after: temp,
    });
  };
  const handleToolTip = (data) => {
    Mixpanel.track("Open Tooltip", {
      appointment: data,
    });
    setTooltipData(data);
    setTooltip(true);
  };
  const handleCloseButton = () => {
    Mixpanel.track("Close Tooltip");
    setTooltip(false);
  };

  const updateTotal = (data) => {
    var temp_total = sum(data, "price");
    Mixpanel.track("Total Updated", {
      total: temp_total,
    });
    ctx.setTotal(temp_total);
  };

  const sum = (items, prop) => {
    if (items == null) {
      return 0;
    }
    return items.reduce(function(a, b) {
      return b[prop] == null ? a : a + b[prop];
    }, 0);
  };

  const setDonation = (data) => {
    ctx.setPrice(data);
    updateTotal(ctx.selected);
  };

  function handleDuplicateCourse() {
    // var uid = course.uid;

    var courseName = course.courseName;
    var stripe_account = course.stripe_account;
    var Price = course.Price;
    var Address = course.logistics.Address;
    var City = course.logistics.City;
    var state = course.logistics.state;
    var Capacity = 0;
    var Duration = course.logistics.Duration;
    var overview = course.course_content.overview;
    var learning_objectives = course.course_content.learning_objectives;
    var teacher_qual = course.course_content.teacher_qual;
    var date = classDate;
    var startTime = classTime;
    var SkillLevel = course.prereqs.skillLevel;
    var Materials = course.prereqs.Materials;
    var preRequisites = course.prereqs.preRequisites;
    var bannerURL = course.bannerURL;
    var cardImageURL = course.cardImageURL;
    var isLive = course.isLive;
    var tag = course.tag;
    // console.log(isLive)

    create_course({
      variables: {
        teacher,
        stripe_account,
        tag,
        courseName,
        Price,
        Address,
        City,
        state,
        Capacity,
        Duration,
        overview,
        learning_objectives,
        teacher_qual,
        date,
        startTime,
        SkillLevel,
        Materials,
        preRequisites,
        bannerURL,
        cardImageURL,
        isLive,
      },
    }).then(
      (result) => {
        Mixpanel.track("Duplicate Create Course Success", {
          data: result.data.createCourse,
        });
        props.history.push(`/createSuccess/${result.data.createCourse.uid}`);
      },
      (error) => {
        // console.log("Error in updating course: ", error);
        Mixpanel.track("Duplicate Create Course Error", {
          error: error,
        });
        setError("Seems something has gone wrong, please try again.");
        // handleOpen();
      }
    );
  }

  // const handleModal = () => {
  // 	setOpen(!open);
  // };

  const handlePublishClose = () => {
    Mixpanel.track("Publish Dialog Closed");
    ctx.setPublish(!ctx.publish);
  };

  const handleDuplicateClose = () => {
    ctx.setDuplicate(!ctx.duplicate);
  };

  const handleAvailableClose = () => {
    Mixpanel.track("Close Available Dates");
    ctx.setAvailable(!ctx.available);
  };
  // const handleOpen = () => {
  // 		setOpen(true);
  // 	};

  const handleClose = () => {
    Mixpanel.track("Close Archive Dialog");
    ctx.setOpen(!ctx.open);
  };

  const [menuShow, toggleMenu] = React.useState({
    leftMenu: false,
  });

  const [isPurchased, setIsPurchased] = React.useState(false);
  const [weekNum, setWeekNum] = React.useState(0);
  const [isCourse, setIsCourse] = useState(true);

  // console.log("mounted");

  const courseId = courseuid;

  const [sessionID, setSessionID] = useState("");
  // console.log(courseId);
  // //debugger;

  const attendHandler = () => {
    Mixpanel.track("Checkout Started");
    const appointments = ctx.selected.map((appoint) => {
      console.log(appoint);
      var Appointment = {
        title: appoint.title,
        startDate: appoint.startDate,
        endDate: appoint.endDate,
        uid: appoint.uid,
        price: appoint.price,
        isVip: appoint.isVip,
      };
      return Appointment;
    });
    // console.log(appointments)
    // // const course
    // cibs=
    // var total = total * 100
    var total = ctx.total;
    if (total === 0) {
      add_user({
        variables: { user_id, courseId, appointments },
      }).then((result) => {
        Mixpanel.track("Free Checkout Successful", {
          appointments: appointments,
          uid: courseId,
        });
        props.history.push(`/success/${courseId}`);
        window.location.reload();
      });
    } else {
      // console.log("in stripe pay", total);
      stripe_pay({
        variables: {
          courseId,
          total,
          appointments,
          user_id,
        },
      }).then((result) => {
        Mixpanel.track("Stripe Checkout Session Started");
        // console.log(result);
        var stripe;
        if (process.env.NODE_ENV === "production") {
          stripe = window.Stripe("pk_live_2jr7VV6tUIlQxT9oBaS0gATn00tkamBcEY", {
            stripeAccount: course.stripe_account,
          });
        } else {
          stripe = window.Stripe("pk_test_BBmtAQLh1ws4UUQyuOixR94g00u49TD6gt", {
            stripeAccount: course.stripe_account,
          });
        }
        // if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        // 	stripe = window.Stripe(
        // 		"pk_test_BBmtAQLh1ws4UUQyuOixR94g00u49TD6gt",
        // 		{
        // 			stripeAccount: course.stripe_account,
        // 		}
        // 	);
        // } else {
        // 	stripe = window.Stripe(
        // 		"pk_live_2jr7VV6tUIlQxT9oBaS0gATn00tkamBcEY",
        // 		{
        // 			stripeAccount: course.stripe_account,
        // 		}
        // 	);
        // }
        // console.log(result.data.stripePay);
        stripe
          .redirectToCheckout({
            // successUrl: 'https://localhost/home',
            // cancelUrl: 'https://localhost/host',
            sessionId: result.data.stripePay,
          })
          .then((result) => {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
            console.log(result.error.message);
          });
      });
    }
    // //debugger
  };
  // console.log("CourseID: ", courseId);

  const { loading: authLoading, error: authError, data: authData } = useQuery(
    IS_LOGGED_IN
  );

  const { loading, error, data } = useQuery(COURSE, {
    variables: { courseId },
  });

  const {
    loading: user_list_loading,
    error: user_list_error,
    data: data2,
  } = useQuery(ENROLLED_USERS, {
    variables: { courseId },
  });

  // const {
  // 	loading: stripe_loading,
  // 	error: stripe_error,
  // 	data: stripe_data,
  // } = useQuery(STRIPE_PAYMENT, {
  // 	variables: {
  // 		courseId: courseId,
  // 		Price: (total === 0 ? 1: total),
  // 		appointments: selected,
  // 		user_id: user_id,
  // 	},
  // 	pollInterval: 500,
  // });

  if (authLoading) return null;
  // if(stripe_loading) return null;
  // console.log("data", data);
  // console.log("error", error);
  // //debugger
  // if(data){
  const loggedIN = !authData
    ? false
    : authData && authData.isLoggedIn
    ? authData.isLoggedIn
    : false;
  const uid = !authData
    ? null
    : authData && authData.currentUserId
    ? authData.currentUserId
    : null;

  // //debugger
  if (loading) {
    return (
      <Container maxWidth="sm" className={courseShowClasses.spinner}>
        <CircularProgress color="primary" />
      </Container>
    );
  }
  if (error) return `Error! ${error}`;

  const { course } = data;

  const teacher = course.teacher;

  const isTeacher = (value) => {
    // console.log(value)
    // console.log(teacher)
    return value.uid !== teacher;
  };

  const isFuture = (value) => {
    const temp = new Date(value.startDate);
    return temp > classDate;
  };
  const isPast = (value) => {
    const temp = new Date(value.endDate);
    return temp > classDate;
  };
  // const {enrolled_users } = data2;

  if (isCourse) {
    setIsPurchased(
      course.user_list.includes(uid) ||
        course.teacher === uid ||
        course.vip.includes(uid)
    );
    setIsCourse(false);
  }

  // if(course && uid){
  //   setIsPurchased(course.user_list.includes(uid))
  // }

  // setIsPurchased(true) =

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    toggleMenu({ leftMenu: open });
  };
  const arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const weeks = course.course_content.weeks;

  const user_courses = course.appointments.filter((appointment) => {
    if (appointment.user_list.includes(uid)) {
      return appointment;
    }
    if (appointment.vip.includes(uid)) {
      return appointment;
    }
  });
  var url = "https://quirkshop.org/browse/" + location.pathname;

  const dateOnly = (datetime) => {
    var newdate = moment(datetime).format("dddd MMMM Do");
    return newdate;
  };

  const classTimeParse = (timeString) => {
    var newtime = moment(timeString).format("h:mm a");
    return newtime;
  };

  const future_appointment = course.appointments.filter((value) => {
    return isFuture(value);
  });
  const appointmentFilter = () => {
    ctx.setAppointments(future_appointment);
  };

  const Header = ({ children, appointmentData, classes, ...restProps }) => (
    <AppointmentTooltip.Header
      {...restProps}

      //   appointmentData={appointmentData}
    >
      <IconButton
        /* eslint-disable-next-line no-alert */
        onClick={() => handleCloseButton()}
        // className={classes.commandButton}
      >
        <CloseIcon />
      </IconButton>
    </AppointmentTooltip.Header>
  );

  const streamRouteHandler = (data) => {
    if (course.isVIP) {
      Mixpanel.track("Go to Livestream", {
        vip: true,
        isHost: course.teacher === user_id,
      });
      props.history.push({
        pathname: `/live/vip/${courseId}&${data.id}`,
        state: {
          isPurchased: isPurchased,
          teacher: course.teacher,
          vip: data.vip,
          courseId: courseId,
          course: course,
        },
      });
    } else {
      Mixpanel.track("Go to Livestream", {
        vip: false,
        isHost: course.teacher === user_id,
      });
      console.log(data);
      props.history.push({
        pathname: `/live/${courseId}&${data.id}`,
        state: {
          isPurchased: isPurchased,
          teacher: course.teacher,
          courseId: courseId,
          course: course,
        },
      });
    }
  };

  const availableClick = () => {
    Mixpanel.track("Chip Date Click");
    // ctx.setAppointments(course.appointments);
    appointmentFilter();
    ctx.setAvailable(!ctx.available);
  };

  const Content = ({ children, appointmentData, classes, ...restProps }) => (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={tooltipData}
      onCloseButtonClick={() => handleCloseButton()}
      justifyContent="center"
    >
      <div align="center">
        <Button
          // className={aside.button}
          size="medium"
          variant="contained"
          color="secondary"
          disableElevation
          onClick={streamRouteHandler(tooltipData)}
        >
          Go to Livestream
        </Button>
      </div>
      {/* <Grid container alignItems="center">
			<Grid item xs={2}>
			<Typography>
				Test
			</Typography>
			</Grid>
		
		  </Grid> */}
    </AppointmentTooltip.Content>
  );

  const Appointment = ({ children, style, ...restProps }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,

        backgroundColor: restProps.data.isSelected ? "#004d40" : "#26A69A",
        borderRadius: "8px",
      }}
      onClick={(restProps) => {
        if (
          !restProps.data.user_list.includes(user_id) &&
          !restProps.data.vip.includes(user_id)
        ) {
          Mixpanel.track("Calendar select");
          handleSelectClick(restProps.data);
        } else {
          handleToolTip(restProps.data);
        }
      }}
      // onClick={(restProps)=>console.log(restProps)}
    >
      {children}
    </Appointments.Appointment>
  );

  // const enrolled_users = data2.enrolled_users.filter(function(user) {
  // 	return data2.enrolled_users.user.uid !== data.teacher
  // })
  // when the actual data comes, render two different lists;
  // one is the current one,
  // the second will be a dummy one to prevent users from clicking around
  // const courseOutline = () => {
  // 	return (
  // 		<div
  // 			className={courseShowClasses.list}
  // 			onClick={toggleDrawer(false)}
  // 		>

  // 			<List>
  // 				<ListItem button onClick={() => setWeekNum(0)}>
  // 					Overview
  // 				</ListItem>
  // 				{weeks.map((day, i) => (
  // 					<ListItem
  // 						button
  // 						key={i}
  // 						disabled={isPurchased ? false : true}
  // 						onClick={() => setWeekNum(i + 1)}
  // 					>
  // 						Class {i + 1}
  // 					</ListItem>
  // 				))}
  // 			</List>
  // 		</div>
  // 	);
  // };
  Mixpanel.track("Quirkshop View", {
    uid: course.uid,
    name: course.courseName,
  });

  return (
    <div className={courseShowClasses.root}>
      <Helmet
        title={course.courseName}
        meta={[
          {
            name: "description",
            content: `${course.course_content.overview}`,
          },
          // {property: "og:type", content: "article"},
          // {property: "og:title", content: "Example title"},
          {
            property: "og:image",
            content: `${course.bannerURL}`,
          },
          {
            property: "og:url",
            content: `${window.location.href}`,
          },
        ]}
      />

      <Container maxWidth="md">
        {/* {uid == course.teacher &&
	<Fab className={courseShowClasses.fabEdit} variant="contained" color="secondary" onClick={() => editClick()}>
	{ctx.mode === 'Course' &&	
		<Typography>Edit </Typography>
	}
	{ctx.mode === 'Edit' &&	
		<Typography>Course </Typography>
	}
	</Fab>
	}
	{uid == course.teacher && course.isActive === true &&
	<Fab className={courseShowClasses.fabDelete} variant="contained" color="secondary" onClick={() => handleModal()}>
		
		<Typography>Delete </Typography>

	</Fab>
	}
	{uid == course.teacher && course.isActive  === false &&
	<Fab className={courseShowClasses.fabDelete} variant="contained" color="secondary" onClick={() => handlePublish()}>
	
			<Typography>Publish </Typography>
	
	</Fab>
	} */}
        <Dialog
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          // fullWidth={true}
          // maxWidth={'xl'}
          fullScreen={true}
          open={ctx.available}
          onClose={handleAvailableClose}
        >
          <AppBar color="white" className={courseShowClasses.appBar}>
            {/* <Toolbar> */}
            <div align="right" maginRight={10}>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleAvailableClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </div>
          </AppBar>
          <DialogTitle color="textPrimary"> Quirkshop Dates </DialogTitle>
          <DialogContent>
            <Grid container direction="row" spacing={1}>
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <Paper>
                  <Scheduler data={ctx.appointments} height="100%" width="70%">
                    <ViewState
                      defaultCurrentDate={classDate}
                      defaultCurrentViewName="Month"
                    />

                    <DayView startDayHour={7} endDayHour={22} />
                    <WeekView startDayHour={7} endDayHour={22} />
                    <MonthView />

                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <ViewSwitcher />
                    <Appointments appointmentComponent={Appointment} />
                    <AppointmentTooltip
                      data={tooltipData}
                      // headerComponent={Header}
                      visible={tooltip}
                      contentComponent={Content}
                      headerComponent={Header}
                      // commandButtonComponent={CommandButton}
                      // showOpenButton={true}
                      // showCloseButton
                      // showDeleteButton
                    />
                  </Scheduler>
                </Paper>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Grid
                  item
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                  width="100%"
                >
                  <Grid item xs={12}>
                    <Typography variant="h6">Selected Dates:</Typography>
                    <Container
                      maxWidth="xl"
                      className={courseShowClasses.receipt}
                    >
                      <List width="100%">
                        {ctx.selected &&
                          ctx.selected.map((val, i) => (
                            // <Grid item xs={8}>

                            <ListItem width="100%">
                              <Grid
                                container
                                spacing={0}
                                width="100%"
                                direction="row"
                                justify="flex-start"
                                alignItems="flex-start"
                              >
                                <Grid item xs={6}>
                                  <Typography variant="h6">
                                    {val.title}
                                  </Typography>
                                  <Typography variant="subtitle2">
                                    {dateOnly(val.startDate)}{" "}
                                    {classTimeParse(val.startDate)}
                                  </Typography>
                                </Grid>
                                {course.isVIP && (
                                  <Grid item xs={3}>
                                    <Dropdown
                                      course={course}
                                      val={val}
                                      i={i}
                                      className={courseShowClasses.menuList}
                                    />
                                  </Grid>
                                )}

                                <Grid item xs={1}>
                                  <Typography>${val.price}</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                  <IconButton
                                    onClick={() => handleTrashClick(val)}
                                    color="inherit"
                                    aria-label="close"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            </ListItem>
                          ))}
                      </List>
                    </Container>
                  </Grid>
                </Grid>
                <Grid item xs={12} justifyContent="center">
                  {course.payment === "donation" && (
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item xs={12}>
                        <Divider className={courseShowClasses.divider} />
                        <Typography>
                          Please choose how much you would like to donate per
                          class:
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Slider
                          value={typeof value === "number" ? value : 0}
                          onChange={handleSliderChange}
                          className={courseShowClasses.slider}
                          aria-labelledby="input-slider"
                        />
                      </Grid>
                      <Grid item xs>
                        <Input
                          className={courseShowClasses.input}
                          value={value}
                          margin="dense"
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          inputProps={{
                            step: 10,
                            min: 0,
                            max: 100,
                            type: "number",
                            "aria-labelledby": "input-slider",
                          }}
                        />
                      </Grid>
                      <Divider className={courseShowClasses.divider} />
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={12} justifyContent="flex-end">
                  {/* <Typography>
								Total: ${(course.Price/100)*selected.length}
							</Typography> */}
                  <Typography>Total: ${ctx.total}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider className={courseShowClasses.divider} />
                  <Typography variant="h6">All Available Dates:</Typography>
                  <Container
                    maxWidth="xl"
                    className={courseShowClasses.receipt}
                  >
                    <List width="100%">
                      {ctx.schedule &&
                        ctx.schedule.filter(isFuture).map((val, i) => (
                          // <Grid item xs={8}>
                          <SummaryListItem
                            course={course}
                            val={val}
                            user_id={user_id}
                            isPurchased={isPurchased}
                            props={props}
                            // isSelected={ctx.selected.includes(val)}
                            // isSelected={ctx.selected.some(
                            //   (e) => e.id === val.id
                            // )}
                          />
                          //   <ListItem
                          //     button
                          //     width="100%"
                          //     backgroundColor="primary"
                          //     selected={true}
                          //     classes={{ selected: courseShowClasses.listitem }}
                          //     onClick={() => {
                          //       //   console.log(val);
                          //       if (
                          //         !val.user_list.includes(user_id) &&
                          //         !val.vip.includes(user_id)
                          //       ) {
                          //         handleSelectClick(val);
                          //       } else {
                          //         handleToolTip(val);
                          //       }
                          //     }}
                          //   >

                          //   </ListItem>
                        ))}
                    </List>
                  </Container>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              disabled={
                course.payment === "fixed" && ctx.total === 0
                  ? true
                  : ctx.selected.length === 0
                  ? true
                  : false
              }
              onClick={() => attendHandler()}
              // onClick={() => handleDuplicateCourse()}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={ctx.duplicate}
          onClose={handleDuplicateClose}
        >
          <DialogTitle color="textPrimary"> Duplicate Class </DialogTitle>
          <DialogContent>
            <DialogContentText color="textPrimary">
              Please select the date and time for the new quirkshop.
            </DialogContentText>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={courseShowClasses.picker}
                format="MM/dd/yyyy"
                margin="normal"
                id="class_date"
                label="Class Date"
                value={classDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />

              <KeyboardTimePicker
                className={courseShowClasses.picker}
                margin="normal"
                id="class_time"
                label="Class Start Time"
                value={classTime}
                onChange={handleTimeChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </MuiPickersUtilsProvider>
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDuplicateCourse()}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        {/* <Button
							variant="contained"
							color="secondary"
							onClick={() => handleDuplicateCourse()}
						>
							Confirm
						</Button> */}
        {/* </div>
				</Fade>
			</Modal> */}

        {course.isActive === true && (
          <Dialog
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={courseShowClasses.modal}
            open={ctx.open}
            onClose={handleClose}
          >
            <DialogTitle> Archive Class </DialogTitle>
            <DialogContent>
              <DialogContentText color="primarytext">
                <h2 id="transition-modal-title">
                  Are you sure you want to remove this quirkshop?
                </h2>
                <p id="transition-modal-description">
                  (You can always republish later from "My Courses" on your
                  profile page)
                </p>
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteClick(courseId)}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {course.isActive === false && (
          <Dialog
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={courseShowClasses.modal}
            open={ctx.publish}
            onClose={handlePublishClose}
          >
            <DialogTitle> Archive Class </DialogTitle>
            <DialogContent>
              <DialogContentText color="primarytext">
                <h2 id="transition-modal-title">
                  Are you sure you want to publish this quirkshop?
                </h2>
                <p id="transition-modal-description">
                  (You can always remove it later!)
                </p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => PublishClick(courseId)}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        )}
        {ctx.mode === "Edit" && <UpdateClass course={course} />}
        {ctx.mode === "Course" && (
          <Container maxWidth="md" className={courseShowClasses.rootContainer}>
            <div className={courseShowClasses.bannerCont}>
              <Image
                aspectRatio={16 / 9}
                alt="background"
                src={course.bannerURL}
                title="Contemplative Reptile"
                // className={courseShowClasses.banner}
              />
            </div>

            <Grid>
              <Container className={courseShowClasses.secondRoot}>
                <Grid
                  item
                  xs={12}
                  className={courseShowClasses.courseAsideGrid}
                >
                  <Container className={courseShowClasses.courseAside2}>
                    <CourseAside
                      course={course}
                      courseId={courseId}
                      loggedIN={loggedIN}
                      uid={uid}
                      isPurchased={isPurchased}
                    />
                  </Container>
                </Grid>

                <Grid item sm={12} xs={12}>
                  <Container className={courseShowClasses.courseMain}>
                    <Typography
                      variant="h2"
                      className={courseShowClasses.Title}
                    >
                      {course.courseName}
                    </Typography>
                    {/* <Chip color="primary" className={courseShowClasses.chip} label={course.tag} /> */}
                    <Container className={courseShowClasses.upcoming}>
                      {course.appointments.filter(isFuture).length === 0 &&
                        !course.interested_users.includes(user_id) &&
                        !notified && (
                          <Typography variant="subtitle1">
                            No Dates Currently Available
                          </Typography>
                        )}
                      {isLoggedIn &&
                        teacher !== user_id &&
                        course.appointments.filter(isFuture).length === 0 &&
                        !course.interested_users.includes(user_id) && (
                          // !notified && (
                          <Button
                            onClick={() => {
                              notifyClick(teacher);
                              window.location.reload();
                            }}
                            className={courseShowClasses.notifyButton}
                            style={MyTheme.palette.companyOrange}
                          >
                            Notify Host You're Interested
                          </Button>
                        )}
                      {!loggedIN && location && (
                        <Button
                          variant="contained"
                          color="primary"
                          // className={aside.button}
                          onClick={
                            () => {
                              Mixpanel.track("Sign Up to Notify");
                              props.history.push({
                                pathname: "/signup",
                                state: {
                                  location,
                                },
                              });
                            }
                            // console.log("LOLOLOLOLOL")
                          }
                        >
                          Sign Up to Notify Host
                        </Button>
                      )}
                      {((course.appointments.filter(isFuture).length === 0 &&
                        course.interested_users.includes(user_id)) ||
                        notified) && (
                        <Typography variant="subtitle1">
                          The host has been notified of your interest and we
                          will let you know as soon as they add dates!
                        </Typography>
                      )}

                      {course.appointments.filter(isFuture).length !== 0 && (
                        <Typography variant="subtitle1">
                          Available Dates:
                        </Typography>
                      )}
                      {course.appointments &&
                        course.appointments.filter(isFuture).map((val, i) => (
                          <Chip
                            className={courseShowClasses.upcomingChip}
                            label={dateOnly(val.startDate)}
                            onClick={() => {
                              //   console.log(val);
                              if (
                                !val.user_list.includes(user_id) &&
                                !val.vip.includes(user_id)
                              ) {
                                handleSelectClick(val);
                                availableClick();
                              } else {
                                streamRouteHandler(val);
                              }
                            }}
                            //   color="primary"
                            variant="outlined"
                          />
                        ))}
                    </Container>

                    <Container className={courseShowClasses.upcoming}>
                      {user_courses.filter(isPast).length !== 0 && (
                        <Typography variant="subtitle1">
                          Your upcoming streams:
                        </Typography>
                      )}
                      {user_courses.filter(isPast).map((val, i) => (
                        <Chip
                          className={courseShowClasses.upcomingChip}
                          label={dateOnly(val.startDate)}
                          onClick={() => {
                            //   console.log(val);
                            if (
                              !val.user_list.includes(user_id) &&
                              !val.vip.includes(user_id)
                            ) {
                              handleSelectClick(val);
                              availableClick();
                            } else {
                              streamRouteHandler(val);
                            }
                          }}
                          color="secondary"
                          // variant="outlined"
                        />
                      ))}
                    </Container>

                    <Divider className={courseShowClasses.divider} />
                    <div className={courseShowClasses.shareBar}>
                      <ShareBar
                        url={window.location.href}
                        isVertical={false}
                        title={`Check out this livestream on Quirkshop! Sign up now & join me for the ${course.courseName} livestream.`}
                        body={`This livestream is about ${course.course_content.overview}`}
                      />
                    </div>
                    <Typography
                      variant="h4"
                      className={courseShowClasses.sectionTitle}
                    >
                      {weekNum === 0 ? "Overview" : "Topics"}
                    </Typography>
                    <Typography
                      variant="body1"
                      className={courseShowClasses.sectionBody}
                      gutterBottom
                    >
                      {course.course_content.overview}
                    </Typography>
                    <Typography
                      variant="h4"
                      className={courseShowClasses.sectionTitle}
                    >
                      Topics
                    </Typography>
                    {data && (
                      <List>
                        {weekNum === 0
                          ? data.course.course_content.learning_objectives.map(
                              (objective, i) => (
                                <ListItemText>
                                  <Typography
                                    variant="body1"
                                    className={courseShowClasses.sectionBody}
                                    gutterBottom
                                  >
                                    {"-	"}
                                    {objective}{" "}
                                  </Typography>
                                </ListItemText>
                              )
                            )
                          : data.course.course_content.weeks[
                              weekNum - 1
                            ].learning_objectives.map((objective, i) => (
                              <ListItemText>
                                <Typography
                                  variant="body1"
                                  className={courseShowClasses.sectionBody}
                                  gutterBottom
                                >
                                  {objective}
                                </Typography>
                              </ListItemText>
                            ))}
                      </List>
                    )}
                    <Typography
                      variant="h4"
                      className={courseShowClasses.sectionTitle}
                    >
                      {weekNum === 0
                        ? "Host Qualifications"
                        : "Additional Resources"}
                    </Typography>
                    <Typography
                      variant="body1"
                      className={courseShowClasses.sectionBody}
                      gutterBottom
                    >
                      {weekNum === 0
                        ? course.course_content.teacher_qual
                        : course.course_content.weeks[weekNum - 1]
                            .additionalResources[0]}
                    </Typography>
                    <Typography
                      variant="body1"
                      className={courseShowClasses.resources}
                      gutterBottom
                    >
                      {weekNum !== 0
                        ? course.course_content.weeks[
                            weekNum - 1
                          ].additionalResources.map((resource) => {
                            return <Link>{resource}</Link>;
                          })
                        : null}
                    </Typography>
                    <Typography
                      variant="h4"
                      className={courseShowClasses.sectionTitle}
                    >
                      Enrolled students
                    </Typography>
                    {data2 && teacher && (
                      <AvatarGroup
                        className={courseShowClasses.enrolled_students}
                      >
                        {data2.enrolled_users
                          .filter(isTeacher)
                          .map((user, i) => (
                            <Avatar
                              alt={user.username || user.first || ""}
                              src={
                                user.profile_pic ||
                                user.username ||
                                user.first ||
                                ""
                              }
                              onClick={() => {
                                Mixpanel.track(
                                  "View Profile From Quirkshop Page",
                                  {
                                    profile: user,
                                  }
                                );
                                props.history.push({
                                  pathname: `/profile/${user.username}`,
                                  state: {
                                    user: user,
                                  },
                                });
                              }}
                            />
                          ))}
                      </AvatarGroup>
                    )}
                    <Typography
                      variant="h4"
                      className={courseShowClasses.sectionTitle}
                    >
                      Reviews{" "}
                      <Rating
                        className={courseShowClasses.rating}
                        name="simple-controlled"
                        value={arrAvg(course.stars)}
                        readOnly
                      />{" "}
                      {/* {arrAvg(course.stars)} out of 5 */}
                    </Typography>
                    <Typography
                      variant="body1"
                      className={courseShowClasses.resources}
                      // variant="subtitle2"
                      // className={
                      // 	courseShowClasses.sectionTitle
                      // }
                    >
                      {course.stars.length === 0
                        ? "No Reviews"
                        : `${arrAvg(course.stars)} out of 5`}
                      {/* {arrAvg(course.stars)} out of 5  */} (
                      {course.stars.length} total attendee reviews)
                    </Typography>
                    {data && (
                      <Container className={courseShowClasses.reviewContainer}>
                        <List
                          // className={classes.root}
                          subheader={<li />}
                        >
                          {data.course.reviews.map((review) => (
                            <li
                              key={`section-${review.first}`}
                              className={courseShowClasses.listSection}
                            >
                              <ul className={courseShowClasses.ul}>
                                {/* <ListSubheader> */}
                                <ListItem>
                                  {/* {`${review.first} ${review.last}`} */}
                                  <ListItemText
                                    className={courseShowClasses.reviewName}
                                    primary={`${review.first} ${review.last}`}
                                  />
                                  <Rating
                                    className={courseShowClasses.rating}
                                    name="simple-controlled"
                                    value={review.stars}
                                    readOnly
                                  />
                                  {/* </ListSubheader> */}
                                </ListItem>
                                <ListItem key={`${review.first}`}>
                                  <ListItemText secondary={`${review.text}`} />
                                </ListItem>
                              </ul>
                            </li>
                          ))}
                        </List>
                      </Container>
                    )}

                    <Divider className={courseShowClasses.divider} />
                    <Typography
                      variant="h4"
                      className={courseShowClasses.sectionTitle}
                    >
                      Tags
                    </Typography>
                    <Chip
                      color="primary"
                      className={courseShowClasses.chip}
                      label={course.tag}
                    />
                  </Container>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Container className={courseShowClasses.courseAside}>
                    <CourseAside
                      course={course}
                      courseId={courseId}
                      loggedIN={loggedIN}
                      uid={uid}
                      isPurchased={isPurchased}
                    />
                  </Container>
                </Grid>
              </Container>
            </Grid>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default withRouter(CourseShow);
