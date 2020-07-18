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
import ShareBar from "../Social/ShareBar";

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
    marginBottom: theme.spacing(1),
  },
  button: {
    justifyContent: "center",
    margin: "0 auto",
    marginTop: theme.spacing(3),
    marginBottom: 10,
    display: "flex",
  },
  shareBar: {
    marginLeft: "50px",
  },
}));

const CreateSuccess = (props) => {
  Mixpanel.track("Create Quirkshop Success");
  const classes = useStyles();
  // //debugger;
  const courseId = props.match.params.courseId;
  const uid = props.uid;

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
      <Container className={classes.paper} component="main" maxWidth="sm">
        <Typography className={classes.avatar} variant="h4" color="primary">
          <CheckCircleOutlineIcon fontSize="large" />
        </Typography>
        <Typography
          className={classes.avatarText}
          variant="h4"
          color="textPrimary"
          justify="center"
          align="center"
        >
          You have successfully created a Quirkshop!
        </Typography>
        <Typography
          className={classes.avatarText}
          variant="body1"
          color="textPrimary"
          justify="center"
          align="center"
        >
          Access your quirkshop from "See available dates" on the quirkshop page
          or from "My Calendar" in your profile. Also make sure to share your
          class to your social media networks so you can make more money.
        </Typography>
      </Container>
      <Container maxWidth="xs">
        <Image
          className={classes.image}
          src="https://d1543jb95t9z4g.cloudfront.net/static/Publish+success+1500x800.png"
          aspectRatio={15 / 8}
          disableSpinner
        />
        <div className={classes.shareBar}>
          <ShareBar
            url={`https://quirkshop.org/browse/${courseId}`}
            isVertical={false}
            title={`Check out this livestream I am hosting on Quirkshop! Sign up now & join my ${props.history.location.state.name} livestream.`}
            body={`This livestream is about ${props.history.location.state.overview}`}
          />
        </div>
      </Container>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => {
          props.history.push(`/browse/${courseId}`);
          window.location.reload();
        }}
      >
        Go to quirkshop
      </Button>
    </div>
  );
};

export default withRouter(CreateSuccess);
