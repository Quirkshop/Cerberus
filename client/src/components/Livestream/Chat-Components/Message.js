import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import grey from "@material-ui/core/colors/grey";

const messageColor = grey[250];

const useStyles = makeStyles((theme) => ({
  list: {
    paddingTop: theme.spacing(1),
  },
  paper: {
    maxWidth: 1000,
    // width: "100%",
    // margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(1),
    backgroundColor: messageColor,
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  child: {
    flexDirection: "column",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(2),
    alignItems: "left",
  },
  name: {
    // padding: theme.spacing(1),
    marginLeft: theme.spacing(1),
    alignItems: "left",
  },
}));

const formatTimestamp = (timestamp) => {
  let date = new Date(timestamp);
  return date.toLocaleTimeString();
};

const Message = (message) => {
  const classes = useStyles();
  let pic = message.user.pic !== "" ? message.user.pic : message.user.name;
  // //debugger;
  return (
    <ListItem key={message.key}>
      <Grid container>
        <Grid item xs={1}>
          <Avatar
            className={classes.small}
            sizes="small"
            alt={message.user.name}
            src={pic}
          />
        </Grid>
        <Grid item xs={5}>
          <Typography className={classes.name} variant="caption">
            {message.user.name}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography align="left" variant="caption">
            {formatTimestamp(message.timestamp)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid
              container
              // wrap="nowrap"
              className={classes.messageContainer}
            >
              <div className={classes.row}>
                <Grid item className={classes.child}></Grid>
                <Grid item className={classes.child}>
                  <Typography>{message.body}</Typography>
                </Grid>
              </div>
              {/* <Grid item>
						<ListItemText
							align="left"
							secondary={formatTimestamp(
								message.timestamp
							)}
						/>
					</Grid> */}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </ListItem>
  );
  // <p>
  // 	<i>{author}</i>: {message}
  // </p>
};

export default Message;
