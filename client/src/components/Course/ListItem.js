import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { CourseContext } from "./CourseContext";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, Grid, Typography } from "@material-ui/core";

import { Mixpanel } from "../../analytics/Mixpanel";
import "moment/min/locales";
import * as moment from "moment/moment";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const useStyles = makeStyles((theme) => ({
  menuList: {
    padding: 0,
    margin: 0,
  },
}));

const SummaryListItem = ({ course, val, user_id, isPurchased, props }) => {
  const classes = useStyles();
  const ctx = useContext(CourseContext);
  const [isSelected, setisSelected] = React.useState(false);
  //   const handleToolTip = (data) => {
  //     Mixpanel.track("Open Tooltip", {
  //       appointment: data,
  //     });
  //     setTooltipData(data);
  //     setTooltip(true);
  //   };

  const dateOnly = (datetime) => {
    var newdate = moment(datetime).format("dddd MMMM Do");
    return newdate;
  };

  const classTimeParse = (timeString) => {
    var newtime = moment(timeString).format("h:mm a");
    return newtime;
  };
  const handleSelectClick = (data) => {
    var temp = [...ctx.selected];

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
    Mixpanel.track("Add Appointment", {
      appointment: Appointment,
    });
    const found = temp.some((e) => e.uid === data.id);

    if (!found) {
      Appointment.isSelected = true;
      temp.push(Appointment);
      ctx.setSelected(temp);
      //   setisSelected(true);
      val.isSelected = true;

      updateTotal(temp);
    } else {
      val.isSelected = false;
      Appointment.isSelected = false;
    }
  };
  const streamRouteHandler = (data) => {
    if (course.isVIP) {
      Mixpanel.track("Go to Livestream", {
        vip: true,
      });
      props.history.push({
        pathname: `/live/vip/${course.uid}&${data.id}`,
        state: {
          isPurchased: isPurchased,
          teacher: course.teacher,
          vip: data.vip,
          courseId: course.uid,
          course: course,
        },
      });
    } else {
      Mixpanel.track("Go to Livestream", {
        vip: false,
      });

      props.history.push({
        pathname: `/live/${course.uid}&${data.id}`,
        state: {
          isPurchased: isPurchased,
          teacher: course.teacher,
          courseId: course.uid,
          course: course,
        },
      });
    }
  };

  const updateTotal = (data) => {
    var temp_total = sum(data, "price");
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
  // //debugger;
  return (
    <ListItem
      button
      width="100%"
      backgroundColor="primary"
      selected={val.isSelected}
      //   classes={{ selected: courseShowClasses.listitem }}
      onClick={() => {
        //   console.log(val);
        if (!val.user_list.includes(user_id) && !val.vip.includes(user_id)) {
          Mixpanel.track("Date List Select");
          handleSelectClick(val);
        } else {
          streamRouteHandler(val);
        }
      }}
    >
      <Grid
        container
        spacing={0}
        width="100%"
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12}>
          {/* <Typography variant="h6">
                                  {val.title}
                                </Typography> */}
          <Typography variant="subtitle1">
            {dateOnly(val.startDate)} {classTimeParse(val.startDate)}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default SummaryListItem;
