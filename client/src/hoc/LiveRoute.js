import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER, LIVE_INFO, COURSE } from "../graphql/queries";
import gql from "graphql-tag";
import { graphql } from "@apollo/react-hoc";

const LiveRoute = ({
  BroadcastComponent: BroadcastComponent,
  StreamComponent: StreamComponent,
  uid,
  isLoggedIn,
  ...rest
}) => {
  // console.log("Private rest is: " + rest)

  //const [isPurchased, setIsPurchased] = React.useState(false);
  var courseId;
  courseId = rest.computedMatch.params.courseId;
  var appointmentId;
  appointmentId = parseInt(rest.computedMatch.params.appointmentId);
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
  // console.log(appointments)

  // var appointment = course.appointments.map((appoint) =>{
  // 	console.log(appoint.id)
  // 	if(appoint.id === appointmentId)
  // 	{
  // 		// console.log(appoint)
  // 		return appoint
  // 	}
  // })
  // console.log(appointment)
  // console.log(appointment)
  // console.log(course.appointments.find(appoint => appoint.id === appointmentId))
  var appointment = course.appointments.find((e) => e.id === appointmentId);
  console.log(appointment);
  // console.log(appointment)
  // console.log(roomID)

  var roomID = appointment.roomID;
  var feedID = appointment.feedID;

  if (appointment && appointment.user_list.includes(uid)) {
    isPurchased = true;
  }

  // const {roomID, feedID} = data

  // const [liveModal, setLiveModal] = useState(false);

  // const liveReady = roomID && feedID ? true : false

  // if(liveReady){
  //     setLiveModal(true)
  // }

  // //debugger;

  const isHost =
    data.course !== null && data.course.teacher == uid ? true : false;

  const user_list = data.course != null ? data.course.user_list : null;

  // const purchased = rest.location.state == null ? false: rest.location.state.isPurchased ? rest.location.state.isPurchased : false

  // const username = !data ? false : data && data.user ? data.user.username : "";

  // const isMe = rest.computedMatch.params.username === username;

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isHost && isLoggedIn && courseId && user_list ? (
          <BroadcastComponent
            users={user_list}
            courseId={courseId}
            appointmentId={appointmentId}
            course={course}
            uid={uid}
          />
        ) : isLoggedIn &&
          isPurchased &&
          courseId &&
          course &&
          uid &&
          user_list &&
          appointment ? (
          <StreamComponent
            course={course}
            uid={uid}
            courseId={courseId}
            appointmentId={appointmentId}
            roomID={roomID}
            feedID={feedID}
            appointment={appointment}
            users={user_list}
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
  LiveRoute
);
