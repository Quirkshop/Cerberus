import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { withRouter } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Modal,
  Typography,
  Container,
  Backdrop,
  Fade,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import Mutations from "../../graphql/mutations";
import GoogleLogin from "react-google-login";
import { Mixpanel } from "../../analytics/Mixpanel";
// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

//import {google} from 'googleapis';

const { REGISTER_USER } = Mutations;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      // display: "flex",

      maxWidth: 1500,
      justifyContent: "center",
      alignItems: "center",
      // textAlign: "center",
      margin: "auto",
      height: "100%",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  footer: {
    // position: "absolute",
    // bottom: 0,
    width: "100%",
    position: "fixed",
    display: "flex",
    bottom: theme.spacing(0),
    justifyContent: "center",
    maxWidth: 1500,
    // alignItems: "center",
    // textAlign: "center",
    // justifyContent: 'flex-end'
  },
  overrides: {
    MuiFormControlLabel: {
      label: {
        variant: "body2",
      },
    },
  },
}));

const SignUp = (props) => {
  Mixpanel.track("Signup");
  //   const googleConfig = {
  //     clientId: "512500627007-s43t7ebj5ra6ltuc0laqhsagln30b8dl.apps.googleusercontent.com", // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  //     clientSecret: "6wE3SAilN__EIXXjGRvn3Cqh", // e.g. _ASDFA%DFASDFASDFASD#FAD-
  //     redirect: "http://localhost:3000" // this must match your google api settings
  //   };

  //  function createConnection() {
  //     return new google.auth.OAuth2(
  //       googleConfig.clientId,
  //       googleConfig.clientSecret,
  //       googleConfig.redirect
  //     );
  //  }
  //  const defaultScope = [
  //   'https://www.googleapis.com/auth/plus.me',
  //   'https://www.googleapis.com/auth/userinfo.email',
  // ];
  const responseGoogle = (response) => {
    // console.log(response);
    // console.log(response.profileObj.givenName)
    setFirst(response.profileObj.givenName);
    setLast(response.profileObj.familyName);
    setEmail(response.profileObj.email);
    setUsername(response.profileObj.givenName + response.profileObj.familyName);
  };

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordClone, setPasswordClone] = useState("");
  const [open, setOpen] = React.useState(false);
  const [isMatch, setIsMatch] = React.useState(false);
  const [error, setError] = React.useState("");
  const [check, setCheck] = React.useState(true);
  // const [signup, setSignUp] = React.useState(false);

  const [register] = useMutation(REGISTER_USER, {
    update(client, { data }) {
      client.writeData({
        data: {
          isLoggedIn: data.register.loggedIn,
          currentUserId: data.register._id,
        },
      });
    },
  });

  const classes = useStyles();

  function handleSignUp(first, last, username, email, password) {
    register({
      variables: {
        first,
        last,
        email,
        username,
        password,
        isTeacher: false,
      },
    }).then(
      (result) => {
        // success callback
        const token = result.data.register.token;
        localStorage.setItem("auth-token", token);
        Mixpanel.track("Signup successful", {
          user: result.data.register,
        });
        Mixpanel.people.set(result.data.register._id, {
          $first_name: first,
          $last_name: last,
          $created: new Date(Date.now()).toISOString(),
          $email: email,
        });
        //debugger;
        if (props.location.state) {
          props.history.push(props.location.state.location.pathname);
        } else {
          Mixpanel.identify(result.data.register._id);
          props.history.push("/browse");
        }
      },
      (error) => {
        // //debugger
        // error callback
        Mixpanel.track("Signup error", {
          error: error,
        });
        setError(error.message);
        handleOpen();
      }
    );
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const disable = () => {
  //   if (check && isMatch) {
  //     setSignUp(true);
  //   } else {
  //     setSignUp(false);
  //   }
  // };
  const handlepassword = () => {
    setIsMatch(true);
    // if (check && isMatch) {
    //   setSignUp(true);
    // }
  };
  // //debugger;

  return (
    <Container className={classes.root} maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Dialog
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
        >
          <DialogContent>
            <DialogContentText color="textPrimary">
              <h2 id="transition-modal-title">SignUp Error</h2>
              <p id="transition-modal-description">{error}</p>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        {/* <form 
              className={classes.form} 
              noValidate
              > */}
        <GoogleLogin
          clientId="512500627007-s43t7ebj5ra6ltuc0laqhsagln30b8dl.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
          buttonText="SIGNUP WITH GOOGLE"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* <Button 
                    // className="loginBtn loginBtn--google" 
                    // ref="googleLoginBtn"
                    >
                        Login with Google
                    </Button> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="passwordClone"
              label="Re-enter Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={passwordClone}
              onChange={(e) => {
                const value = e.target.value;
                if (value === password) setIsMatch(true);

                setPasswordClone(value);
                // disable();
              }}
            />
            {!isMatch && (
              <Typography variant="caption" color="primary">
                Passwords must match!
              </Typography>
            )}
          </Grid>
          {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to "
                  />
                </Grid> */}
        </Grid>
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={!check}
              onChange={
                () => {
                  setCheck(!check);

                  disable();
                }
                // setCheck(true)
              }
              value="approved"
              color="primary"
            />
          }
          // color="textSecondary"
          label={ */}
        <Typography variant="body2" color="textSecondary">
          By submitting you confirm you are 18 years of age and you agree to
          Quirkshop's{" "}
          <Link
            color="textSecondary"
            href={
              "https://d1543jb95t9z4g.cloudfront.net/Terms/Quirkshop+Terms+of+Use.pdf"
            }
            target="_blank"
          >
            Terms of Use
          </Link>
          {" and "}
          <Link
            color="textSecondary"
            href={
              "https://d1543jb95t9z4g.cloudfront.net/Terms/Quirkshop+Policy+%26+Standards.pdf"
            }
            target="_blank"
          >
            Community Policy & Standards
          </Link>
          {"."}
        </Typography>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={!isMatch}
          onClick={(e) => {
            e.preventDefault();
            handleSignUp(first, last, username, email, password);
          }}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item xs={12}>
            <Link
              onClick={() => {
                Mixpanel.track("Signup -> Login Click");
                if (props.location.state) {
                  props.history.push({
                    pathname: "/login",
                    state: {
                      location: props.location.state.location.pathname,
                    },
                  });
                } else {
                  props.history.push("/login");
                }
              }}
              variant="body2"
            >
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
        {/* {loading && <CircularProgress color="primary" /> } */}
        {/* </form> */}
      </div>
      {/* <Footer className={classes.footer}/> */}
    </Container>
  );
};

export default withRouter(SignUp);
