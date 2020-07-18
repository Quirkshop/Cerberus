import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import Mutations from "../../graphql/mutations";
import Image from "material-ui-image";
import { Mixpanel } from "../../analytics/Mixpanel";
// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const { ADD_USER_TO_CLASS } = Mutations;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  avatarText: {
    marginTop: theme.spacing(2),
  },
  image: {
    height: "auto",
    width: "100%",
    marginBottom: 10,
  },
  button: {
    justifyContent: "center",
    margin: "0 auto",
    marginTop: theme.spacing(2),
    marginBottom: 10,
    display: "flex",
  },
}));
// Mixpanel.track("Checkout Success");
const Success = (props) => {
  const classes = useStyles();
  // //debugger
  const courseId = props.match.params.courseId;
  const uid = props.uid;

  const [addtoClass] = useMutation(ADD_USER_TO_CLASS);
  // console.log("CourseID: ", courseId);
  // console.log("Success uid: " + props.uid)

  // function handleAddClass(uid, courseId){
  //     addtoClass({variables: { uid, courseId}})
  //         .then(result => {

  //         },
  //         error => {
  //             console.log(error)
  //         },
  //     )

  // }

  return (
    <div className={classes.root}>
      <Container className={classes.paper} component="main" maxWidth="xs">
        <Typography className={classes.avatar} variant="h4" color="primary">
          <CheckCircleOutlineIcon fontSize="large" />
        </Typography>
        <Typography
          className={classes.avatarText}
          variant="h4"
          color="textPrimary"
        >
          Your order is complete!
        </Typography>
        <Typography
          className={classes.avatarText}
          variant="body1"
          color="textPrimary"
        >
          Access your quirkshop from "See Available Dates" on the quirkshop page
          or from "My Calendar" in your profile."
        </Typography>
      </Container>
      <Container maxWidth="xs">
        <Image
          className={classes.image}
          src="https://d1543jb95t9z4g.cloudfront.net/static/Party+hedgehog+800x600.png"
          aspectRatio={8 / 6}
          disableSpinner
        />
      </Container>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => props.history.push(`/browse/${courseId}`)}
      >
        Go to quirkshop
      </Button>
    </div>
  );
};

export default withRouter(Success);
