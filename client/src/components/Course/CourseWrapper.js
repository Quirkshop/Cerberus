import React from "react";
import CourseShow from "./CourseShow";
import { CourseProvider } from "./CourseContext";
import { Helmet } from "react-helmet";
import { useQuery } from "@apollo/react-hooks";
import { COURSE } from "../../graphql/queries";

const CourseWrapper = ({ uid, isLoggedIn, ...props }) => {
  // //debugger;
  // console.log(props);
  const courseId = props.match.params.courseId;
  const { loading, error, data } = useQuery(COURSE, {
    variables: { courseId },
  });
  if (loading) {
    return null;
  }
  const { course } = data;
  return (
    // <Helmet>
    // 	<title>Test 2</title>
    // 	{/* <meta name="description" content="Experience Together"/> */}
    // </Helmet>
    <div>
      <Helmet>
        <title>Test</title>
        <meta name="description" content="Experience Together" />
      </Helmet>
      <CourseProvider course={course}>
        <div>
          <CourseShow
            isLoggedIn={isLoggedIn}
            courseuid={courseId}
            user_id={uid}
          />
        </div>
      </CourseProvider>
    </div>
  );
};

export default CourseWrapper;
