import React from "react";
import Broadcast from "./Broadcast";
import { BroadcastProvider } from "./BroadcastContext";

const BroadcastWrapper = (props) => {
  // //debugger;
  // const courseId = props.match.params.courseId;
  return (
    <BroadcastProvider>
      <div>
        <Broadcast
          users={props.users}
          courseId={props.courseId}
          course={props.course}
          uid={props.uid}
        />
      </div>
    </BroadcastProvider>
  );
};

export default BroadcastWrapper;
