import React from "react";
import CreateClass from "./CreateClass";
import { ClassProvider } from "./ClassFormContext";
import Container from "@material-ui/core/Container";

const Create = (props) => {
  // //debugger;

  return (
    <ClassProvider>
      <Container maxWidth="md">
        <CreateClass
          user={props.user}
          uid={props.uid}
          isStripe={props.isStripe}
        />
      </Container>
    </ClassProvider>
  );
};

export default Create;
