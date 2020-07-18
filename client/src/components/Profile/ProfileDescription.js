import React, { useState } from "react";
import {
  Container,
  Paper,
  Card,
  Avatar,
  Typography,
  CardContent,
  Divider,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  profile: {
    display: "flex",
    flexDirection: "row",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
  },
  contentText: {
    padding: theme.spacing(2),
  },
  headContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: theme.spacing(2),
  },
  headContainer: {
    margin: theme.spacing(2),
    borderColor: theme.palette.background.default,
    padding: theme.spacing(2),
    // backgroundColor: theme.palette.background.default,
  },
  hr: {
    border: "1px",
    borderColor: theme.palette.background.default,
  },
}));

const ProfileDescription = (props) => {
  const [isBach] = useState(
    props.user.bach_major !== "" &&
      props.user.bach_school !== "" &&
      props.user.bach_major != null &&
      props.user.bach_school != null
  );
  const [isMaster] = useState(
    props.user.masters_major !== "" &&
      props.user.masters_school !== "" &&
      props.user.masters_major != null &&
      props.user.masters_school != null
  );
  const [isDoctor, setDoctor] = useState(
    props.user.phd_major !== "" &&
      props.user.phd_school !== "" &&
      props.user.phd_major != null &&
      props.user.phd_school != null
  );

  // //debugger;

  const classes = useStyles();
  // const [is]

  return (
    <Card variant="outlined" className={classes.headContainer} elevation={4}>
      <CardContent className={classes.headContent}>
        <Typography variant="h5" className={classes.contentText}>
          A Little Bit About Me
        </Typography>

        <Divider />

        <Typography variant="body" className={classes.contentText}>
          {props.user.bio}
        </Typography>

        <Typography variant="h5" className={classes.contentText}>
          Education
        </Typography>

        <Divider />

        {isBach && (
          <Typography variant="body" className={classes.contentText}>
            Bachelors: {props.user.bach_major} @ {props.user.bach_school}
          </Typography>
        )}

        {isMaster && (
          <Typography variant="body" className={classes.contentText}>
            Masters: {props.user.masters_major} @ {props.user.masters_school}
          </Typography>
        )}

        {isDoctor && (
          <Typography variant="body" className={classes.contentText}>
            Doctoral: {props.user.phd_major} @ {props.user.phd_school}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileDescription;
