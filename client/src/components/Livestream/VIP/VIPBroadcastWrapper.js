import React from "react";
import VIPBroadcast from "./VIPBroadcast";
import { VIPBroadcastProvider } from "./VIPBroadcastContext";

const VIPBroadcastWrapper = (props) => {
  // //debugger;
  // const courseId = props.match.params.courseId;
  return (
    <VIPBroadcastProvider>
      <div>
        <VIPBroadcast
          users={props.users}
          courseId={props.courseId}
          appointmentId={props.appointmentId}
          course={props.course}
          uid={props.uid}
          vip={props.vip}
        />
      </div>
    </VIPBroadcastProvider>
  );
};

export default VIPBroadcastWrapper;
