import React from "react";
import HostBroadcast from "./HostBroadcast";
import { VIPBroadcastProvider } from "./VIPBroadcastContext";

const HostWrapper = (props) => {
  // //debugger;
  // const courseId = props.match.params.courseId;
  return (
    <VIPBroadcastProvider>
      <div>
        <HostBroadcast
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

export default HostWrapper;
