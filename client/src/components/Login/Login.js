import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router-dom";
import Mutations from "../../graphql/mutations";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import GoogleLogin from "react-google-login";
import { Mixpanel } from "../../analytics/Mixpanel";
// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const { LOGIN_USER } = Mutations;

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
    color: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
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
  google: {
    padding: theme.spacing(2, 2, 2),
    marginTop: theme.spacing(4),
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const isGoogle = false;
  Mixpanel.track("Login Page");
  const responseGoogle = (response) => {
    // console.log(response);
    // console.log(response.profileObj.givenName);

    const email = response.profileObj.email;
    const password = "google";
    const isGoogle = true;
    login({ variables: { email, password, isGoogle } }).then(
      (result) => {
        // success callback
        // //debugger
        const token = result.data.login.token;
        Mixpanel.identify(result.data._id);
        // console.log("Mixpanel");
        // console.log(Mixpanel);
        Mixpanel.people.set(result.data._id, {
          $email: email,
        });
        localStorage.setItem("auth-token", token);
        if (props.location.state) {
          props.history.push(props.location.state.location);
        } else {
          Mixpanel.track("Login", {
            google: isGoogle,
          });
          props.history.push("/browse");
        }
      },
      (error) => {
        // //debugger
        // error callback
        Mixpanel.track("Unsuccesful Login", {
          google: isGoogle,
        });
        setError(error.message);
        handleOpen();
      }
    );
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState("");

  const [login] = useMutation(LOGIN_USER, {
    update(client, { data }) {
      // //debugger
      client.writeData({
        data: {
          isLoggedIn: data.login.loggedIn,
          currentUserId: data.login._id,
        },
      });
    },
  });

  function handleLogin(email, password, isGoogle) {
    login({ variables: { email, password, isGoogle } }).then(
      (result) => {
        // success callback
        // //debugger
        Mixpanel.identify(result.data._id);
        Mixpanel.people.set(result.data._id, {
          $email: email,
        });
        const token = result.data.login.token;
        localStorage.setItem("auth-token", token);
        // //debugger;
        if (props.location.state) {
          props.history.push(props.location.state.location);
        } else {
          props.history.push("/browse");
        }
      },
      (error) => {
        // //debugger
        // error callback
        Mixpanel.track("Unsuccesful Login", {
          google: isGoogle,
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

  return (
    <div className={classes.root}>
      <Container className={classes.paper} component="main" maxWidth="xs">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
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
        <GoogleLogin
          className={classes.Google}
          clientId="512500627007-s43t7ebj5ra6ltuc0laqhsagln30b8dl.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        <Typography
          justify="center"
          alignItems="center"
          component="h1"
          variant="h5"
        >
          Or
        </Typography>
        <Grid container justify="center" alignItems="center" spacing={2}>
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
              className="field-password"
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
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={(e) => {
            e.preventDefault();
            handleLogin(email, password, false);
          }}
        >
          Log In
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link onClick={() => props.history.push("/signup")} variant="body2">
              Don't have an account? Sign up
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default withRouter(Login);
