import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import { RoutesContext } from "../../RoutesContext";
import { Button, IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";
import { MY_COURSES, MY_QUIRKS } from "../../graphql/queries";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { grey } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { Dialog, DialogContent, DialogContentText } from "@material-ui/core";
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
import { Mixpanel } from "../../analytics/Mixpanel";
// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");
const text_color = grey[600];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 1500,
    //   justifyContent: "center",
    //   alignItems:"center",
    //   textAlign: "center",

    margin: "auto",
  },

  gridContainer: {
    // display: "flex",

    width: "auto",
    padding: theme.spacing(1, 6, 1),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(1),
      justify: "center",
    },
  },
  gridItem: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.background.paper,
    maxWidth: 345,
    height: 275,
    flexDirection: "row",
    flexWrap: "wrap",
    flexGrow: 1,
  },
  sectionTitle: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(1),
  },
  liveButton: {
    zIndex: 0,
    shadows: "none",
  },
  subtitle: {
    color: text_color,
  },
  button: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  container: {
    padding: theme.spacing(1),
  },
}));

const MyCourses = ({ user, ...rest }) => {
  const calendarStyles = useStyles();
  const ctx = useContext(RoutesContext);
  const [tooltip, setTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);
  // const selected = []

  Mixpanel.track("Calendar");
  const handleClose = () => {
    ctx.setOpen(false);
  };

  const handleToolTip = (data) => {
    Mixpanel.track("Calendar Appointment Open", {
      appointment: data,
    });
    setTooltipData(data);
    setTooltip(true);
  };
  const handleCloseButton = () => {
    Mixpanel.track("Calendar Close Tooltip");
    setTooltip(false);
  };

  const streamRouteHandler = (event) => {
    // //debugger;
    if (tooltipData.isVIP) {
      Mixpanel.track("Calendar Go To VIP Livestream");
      rest.history.push({
        pathname: `/live/vip/${tooltipData.courseId}&${tooltipData.id}`,
        // state: {
        // 	isPurchased: isPurchased,
        // 	teacher: course.teacher,
        // 	vip: tooltipData.vip,
        // 	courseId: courseId,
        // 	course: course,
        // },
      });
    } else {
      Mixpanel.track("Go to Livestream");
      rest.history.push({
        pathname: `/live/${tooltipData.courseId}&${tooltipData.id}`,
        // state: {
        // 	isPurchased: isPurchased,
        // 	teacher: course.teacher,
        // 	courseId: courseId,
        // 	course: course,
        // },
      });
    }
  };

  const [classDate, setClassDate] = useState(new Date(Date.now()));
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

  const Content = ({ children, appointmentData, classes, ...restProps }) => (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={tooltipData}
      onCloseButtonClick={() => handleCloseButton()}
      justifyContent="center"
    >
      <div align="center">
        <Button
          // className={calendarStyles.button}
          size="medium"
          variant="contained"
          color="secondary"
          disableElevation
          onClick={() => {
            console.log(tooltipData);
            streamRouteHandler();
            // rest.history.push({
            // 	pathname: `/live/${tooltipData.courseId}&${tooltipData.id}`,
            // })
          }}
        >
          Go to Livestream
        </Button>
        <Button
          className={calendarStyles.button}
          size="medium"
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => {
            Mixpanel.track("Calendar Go to Course", {
              course: tooltipData,
            });
            rest.history.push({
              pathname: `/browse/${tooltipData.courseId}`,
            });
          }}
        >
          Go to Course
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
        backgroundColor: restProps.data.isHost ? "#E74141" : "#26A69A",
        borderRadius: "8px",
      }}
      onClick={(restProps) => {
        handleToolTip(restProps.data);
      }}
      // onClick={(restProps)=>console.log(restProps)}
    >
      {children}
    </Appointments.Appointment>
  );

  return (
    <div className={calendarStyles.root}>
      <Container maxWidth="md" className={calendarStyles.container}>
        <Scheduler data={user.appointments} height="100%" width="70%">
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
      </Container>
    </div>
  );
};

export default withRouter(MyCourses);
