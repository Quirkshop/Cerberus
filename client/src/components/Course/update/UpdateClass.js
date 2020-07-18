import React from "react";
import UpdateForm from "./Update";
import { UpdateProvider } from "./UpdateContext";

const UpdateClass = ({ course }) => {
  // //debugger;
  return (
    <UpdateProvider course={course}>
      <div>
        <UpdateForm course={course} />
      </div>
    </UpdateProvider>
  );
};

export default UpdateClass;
