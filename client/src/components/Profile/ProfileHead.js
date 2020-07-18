import React, { useContext } from "react";
import {
  Container,
  Paper,
  Card,
  Avatar,
  Typography,
  CardContent,
  Grid,
  Button,
} from "@material-ui/core";
import WorkIcon from "@material-ui/icons/Work";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import { makeStyles } from "@material-ui/core/styles";
import { Palette } from "@material-ui/icons";
import { ProfileContext } from "./ProfileContext";
import { Mixpanel } from "../../analytics/Mixpanel";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

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
    padding: theme.spacing(2),
  },
  profileDataContainer: {
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    width: "150px",
    height: "150px",
    // justifyContent: "center"
  },
  avatarText: {
    padding: theme.spacing(2),
  },
  contentText: {
    padding: theme.spacing(2),
  },
  workIcon: {
    marginBottom: "-4px",
    color: theme.palette.primary,
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
  },
  externalLinks: {
    display: "flex",
    flexDirection: "row",
  },
  gridItem: {
    padding: theme.spacing(1),
  },
}));

const ProfileHead = ({ isMe, ...props }) => {
  // //debugger;
  // console.log(props);
  const classes = useStyles();
  const ctx = useContext(ProfileContext);
  // const firstName = props.user.first.toUpperCase();
  const firstName =
    props.user.first.charAt(0).toUpperCase() + props.user.first.substring(1);
  const lastName =
    props.user.last.charAt(0).toUpperCase() + props.user.last.substring(1);

  const editClick = () => {
    Mixpanel.track("Edit Profile");
    ctx.setMode("EDIT");
  };

  return (
    <Card variant="outlined" className={classes.headContainer}>
      <CardContent className={classes.headContent}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid className={classes.gridItem} item xs={12}>
            <Avatar
              alt={props.user.first}
              src={props.user.profile_pic}
              className={classes.avatar}
            />
          </Grid>
          <Grid className={classes.gridItem} item xs={12}>
            {isMe && (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => editClick()}
              >
                Edit Profile
              </Button>
            )}
          </Grid>
          <Grid className={classes.gridItem} item xs={12}>
            <Typography
              variant="h4"
              className={classes.avatarText}
              align="center"
            >
              {firstName + " " + lastName}
            </Typography>
          </Grid>
          <Grid className={classes.gridItem} item xs={12}>
            {(props.user.job_title !== "" || props.user.company !== "") && (
              <Typography className={classes.avatarText} align="center">
                <WorkIcon fontSize="small" className={classes.workIcon} />:
                {props.user.job_title} @ {props.user.company}
              </Typography>
            )}
          </Grid>
          <Grid className={classes.gridItem} item xs={12}>
            <Container className={classes.externalLinks}>
              {props.user.linkedin !== "" && (
                <Typography className={classes.avatarText}>
                  <a
                    href={props.user.linkedin}
                    target="_blank"
                    className={classes.workIcon}
                  >
                    <LinkedInIcon />
                  </a>
                </Typography>
              )}
              {props.user.github !== "" && (
                <Typography className={classes.avatarText} color="primary">
                  <a href={props.user.github} target="_blank">
                    <GitHubIcon className={classes.workIcon} />
                  </a>
                </Typography>
              )}
            </Container>
          </Grid>
        </Grid>
        {/* <Typography className={classes.avatarText} align="center">
                    Rating
                </Typography> */}
      </CardContent>
    </Card>
  );
};

export default ProfileHead;
