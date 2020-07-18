import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Link,
  TextField,
} from "@material-ui/core";
import { withRouter, useLocation } from "react-router";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Mutations from "../../graphql/mutations";
import { Mixpanel } from "../../analytics/Mixpanel";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");
const { ADD_EMAIL } = Mutations;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 1000,
    margin: "auto",
  },
  title: {
    flexGrow: 1,
    // cursor: "pointer",
    display: "block",
  },
  toolbar: {
    // flexWrap: "wrap",
    // padding: theme.spacing(1),
    // display: "flex",
  },

  link: {
    margin: theme.spacing(0.5),
  },
  paper: {
    marginRight: theme.spacing(2),
    // position: "relative",
    zIndex: 10000,
  },
  popper: {
    zIndex: 10000,
  },
  button: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginBottom: 0,
    alignItems: "flex-end",
    // width: '175px',
    // justifyContent: 'center',
    // align: 'center',
    // margin: 'auto'
  },
  appBar: {
    top: "auto",
    bottom: 0,
    width: "100%",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  content: {
    width: "100%",
    align: "center",
    justifyContent: "center",
    margin: "auto",
  },
  signup: {
    width: "100%",
    padding: 0,
    bottom: 0,
    // position: "absolute",
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    // align: 'center',
    // justifyContent: 'center',
    // margin: 'auto'
  },
  email: {
    width: "25%",
    [theme.breakpoints.only("xs")]: {
      width: "50%",
    },
  },
}));

const FootBar = ({ isLoggedIn, ...props }) => {
  // console.log(isLoggedIn);
  const classes = useStyles();
  let location = useLocation();
  // console.log(location);
  const home =
    // location.pathname === "/home"
    //   ? true
    //   : location.pathname === "/"
    //   ? true
    location.pathname === "/landing" ? true : false;
  const profile =
    location.pathname === "/login"
      ? true
      : location.pathname === "/signup"
      ? true
      : location.pathname.substr(0, 8) === "/success"
      ? true
      : location.pathname.substr(0, 5) === "/live"
      ? true
      : location.pathname.substr(0, 8) === "/profile"
      ? true
      : location.pathname === "/mycalendar"
      ? true
      : location.pathname === "/create"
      ? true
      : location.pathname === "/landing"
      ? true
      : // : location.pathname === "/home"
        // ? true
        // : location.pathname === "/"
        // ? true
        false;
  // const myquirks = location.pathname === '/mycalendar' ? true: false

  const [email, setEmail] = React.useState("");
  const [addEmail] = useMutation(ADD_EMAIL);
  const [success, setSuccess] = React.useState(false);
  const [fail, setFail] = React.useState(false);

  const handleClose = () => {
    setSuccess(false);
    setFail(false);
  };

  const emailHandler = () => {
    Mixpanel.track("Signup for mailing list");
    if (email === "") {
      setFail(true);
      return;
    }
    addEmail({ variables: { email } }).then((result) => {
      console.log(result);
      if (result.data.addEmail) {
        Mixpanel.track("Mailing list signup success");
        setSuccess(true);
        setEmail("");
      } else {
        Mixpanel.track("Mailing list signup failure");
        setFail(true);
      }
    });
  };

  return (
    <div className={classes.root}>
      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // className={classes.modal}
        open={success}
        onClose={handleClose}
      >
        {/* <DialogTitle color="textPrimary"></DialogTitle> */}
        <DialogContent>
          <DialogContentText color="textPrimary">
            <Typography variant="h3">Congrats!</Typography>
            <br />
            You've subscribed to our email list! Check your inbox for all the
            latest Quirkshop news.
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // className={classes.modal}
        open={fail}
        onClose={handleClose}
      >
        {/* <DialogTitle color="textPrimary"></DialogTitle> */}
        <DialogContent>
          <DialogContentText color="textPrimary">
            <Typography variant="h3">Uh oh!</Typography>
            <br />
            Looks like something went wrong :o Please try again.
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* {!profile && !home  && ( */}
      {!profile && (
        <AppBar
          position={home ? "absolute" : "static"}
          style={{ background: "white", boxShadow: "none" }}
          className={classes.appBar}
          // color="primary"
        >
          {!isLoggedIn && (
            <div align="center" className={classes.signup}>
              <TextField
                className={classes.email}
                label="Enter your email."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // id="class_duration"
              />
              )}
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                align="right"
                onClick={() => emailHandler()}
              >
                Signup
              </Button>
            </div>
          )}

          <div className={classes.content} align="center">
            <Typography variant="body2" color="textSecondary" align="center">
              {"Copyright © "}
              <Link color="inherit" href="https://quirkshop.org">
                quirkshop.org
              </Link>{" "}
              {new Date().getFullYear()}
              {"  |  "}
              <Link
                color="inherit"
                href={
                  "https://d1543jb95t9z4g.cloudfront.net/Terms/Quirkshop+Terms+of+Use.pdf"
                }
                target="_blank"
              >
                Terms of Use
              </Link>
              {" | "}
              <Link
                color="inherit"
                href={
                  "https://d1543jb95t9z4g.cloudfront.net/Terms/Quirkshop+Policy+%26+Standards.pdf"
                }
                target="_blank"
              >
                Community Policy & Standards
              </Link>
            </Typography>
          </div>
        </AppBar>
      )}
    </div>
  );
};

export default withRouter(FootBar);
