import React from "react";
import Stream from "./Stream";
import { BroadcastProvider } from "./BroadcastContext";

const StreamWrapper = (props) => {
  // //debugger;
  // const courseId = props.match.params.courseId;
  return (
    <BroadcastProvider>
      <div>
        <Stream
          users={props.users}
          courseId={props.courseId}
          course={props.course}
          uid={props.uid}
        />
      </div>
    </BroadcastProvider>
  );
};

export default StreamWrapper;
