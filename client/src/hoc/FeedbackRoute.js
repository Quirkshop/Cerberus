import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { COURSE } from "../graphql/queries";
import { graphql } from "@apollo/react-hoc";

const FeedbackRoute = ({
  HostFeedback: HostFeedback,
  StreamerFeedback: StreamerFeedback,
  uid,
  isLoggedIn,
  ...rest
}) => {
  const courseID = rest.computedMatch.params.courseId;

  var isPurchased = false;
  const { loading, error, data } = useQuery(COURSE, {
    variables: { courseId: courseID },
  });

  if (loading) return null;

  const { course } = data;

  if (course && course.user_list.includes(uid)) {
    isPurchased = true;
  }

  const hostID = data.course.teacher;
  const isHost = data.course !== null && hostID == uid ? true : false;
  //debugger;

  return (
    <Route
      {...rest}
      render={(props) =>
        isHost && isLoggedIn ? (
          <HostFeedback uid={uid} courseID={courseID} />
        ) : isLoggedIn && courseID && isPurchased ? (
          <StreamerFeedback uid={uid} hostID={hostID} courseID={courseID} />
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
  FeedbackRoute
);
