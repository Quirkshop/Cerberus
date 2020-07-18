import React from "react";
import AudienceStream from "./AudienceStream";
import { VIPBroadcastProvider } from "./VIPBroadcastContext";

const AudienceWrapper = (props) => {
  // //debugger;
  // const courseId = props.match.params.courseId;
  return (
    <VIPBroadcastProvider>
      <div>
        <AudienceStream
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

export default AudienceWrapper;
