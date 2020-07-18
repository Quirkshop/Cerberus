import React, { useState, useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { useQuery } from "@apollo/react-hooks";
import { GET_USER, LIVE_INFO, COURSE } from "../graphql/queries";
import gql from "graphql-tag";
import { graphql } from "@apollo/react-hoc";
import { RoutesContext } from "../RoutesContext";

const VIPRoute = ({
  HostComponent: HostComponent,
  VIPComponent: VIPComponent,
  AudienceComponent: AudienceComponent,
  uid,
  isLoggedIn,
  ...rest
}) => {
  // console.log("Private rest is: " + rest)
  const ctx = useContext(RoutesContext);

  // var courseId;
  const courseId = rest.computedMatch.params.courseId;
  // var appointmentId;
  const appointmentId = parseInt(rest.computedMatch.params.appointmentId);
  console.log(appointmentId);

  var isPurchased = false;
  const { loading, error, data } = useQuery(COURSE, {
    variables: { courseId },
  });

  // const { loading: LiveLoading, error:LiveError, data: LiveData } = useQuery(LIVE_INFO, {
  // 	variables: { courseId }
  //   });

  if (loading) return null;

  const { course } = data;

  var appointment = course.appointments.find((e) => e.id === appointmentId);
  console.log(appointment);

  if (
    appointment &&
    (appointment.user_list.includes(uid) || appointment.vip.includes(uid))
  ) {
    isPurchased = true;
  }

  //debugger;

  const isHost =
    data.course !== null && data.course.teacher == uid ? true : false;

  if (appointment.roomID === "" && appointment.feedID === "" && !isHost) {
    ctx.setOpen(true);
  }

  const user_list = appointment != null ? appointment.user_list : null;

  const vip = appointment != null ? appointment.vip : null;

  const isVip = vip ? appointment.vip.includes(uid) : false;

  const isRoom =
    appointment != null &&
    appointment.roomID !== "" &&
    appointment.roomID !== null;

  const users = [...user_list, ...vip];

  // const purchased = rest.location.state == null ? false: rest.location.state.isPurchased ? rest.location.state.isPurchased : false

  // const username = !data ? false : data && data.user ? data.user.username : "";

  // const isMe = rest.computedMatch.params.username === username;

  //debugger;

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    // <div>

    <Route
      {...rest}
      render={(props) =>
        isHost && isLoggedIn && courseId && user_list && vip ? (
          <HostComponent
            users={users}
            courseId={courseId}
            appointmentId={appointmentId}
            course={course}
            uid={uid}
            vip={vip}
          />
        ) : isLoggedIn &&
          isPurchased &&
          courseId &&
          course &&
          uid &&
          user_list &&
          vip &&
          isRoom &&
          !isVip ? (
          <AudienceComponent
            course={course}
            uid={uid}
            courseId={courseId}
            appointmentId={appointmentId}
            users={users}
            vip={vip}
          />
        ) : isLoggedIn &&
          isPurchased &&
          courseId &&
          course &&
          uid &&
          user_list &&
          vip &&
          isRoom &&
          isVip ? (
          <VIPComponent
            course={course}
            uid={uid}
            courseId={courseId}
            appointmentId={appointmentId}
            users={users}
            vip={vip}
          />
        ) : data.course !== null && courseId ? (
          <Redirect
            to={{
              pathname: `/browse/${courseId}`,
              state: { location: rest.location },
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: `/home`,
              state: { location: rest.location },
            }}
          />
        )
      }
    />
  );
};

export default graphql(COURSE, { options: { fetchPolicy: "network-only" } })(
  VIPRoute
);
