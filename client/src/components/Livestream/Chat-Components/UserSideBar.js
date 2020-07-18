import React from "react";
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
} from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { AVATAR_INFO, GET_USER } from "../../../graphql/queries";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Mixpanel } from "../../../analytics/Mixpanel";

const useStyles = makeStyles((theme) => ({
  list: {
    paddingTop: theme.spacing(2),
  },
}));

const UserSideBar = ({ users, presences }) => {
  const classes = useStyles();

  // const { loading, error, data } = useQuery(AVATAR_INFO, {
  // 	variables: { user_list: users },
  // });

  // if (loading) return null;
  // const streamUsers = data.avatarInfo;
  var activeUsers;
  if (presences) {
    activeUsers = presences.filter((i) => users.includes(i.id));
  }
  // //debugger;
  return (
    <List className={classes.list}>
      {activeUsers.map((user, i) => (
        <ListItem button key={i}>
          <ListItemIcon>
            <Avatar
              edge="end"
              alt={user.name}
              src={user.pic !== "" ? user.pic : user.name}
              onClick={() => {
                Mixpanel.track("Click on avatar in livestream", { user: user });
              }}
            />
          </ListItemIcon>
          <ListItemText primary={user.name} secondary={user.onlineAt} />
          {/* <ListItemText  /> */}
        </ListItem>
      ))}
    </List>
  );
};

export default UserSideBar;
