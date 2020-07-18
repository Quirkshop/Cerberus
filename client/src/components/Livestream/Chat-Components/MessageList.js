import React, { useEffect, useRef } from "react";
import Message from "./Message";
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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 1),
  },
  list: {
    alignItems: "flex-end",
    // paddingTop: theme.spacing(4),
    // maxHeight:
  },
}));

const MessagesList = ({ messages }) => {
  const classes = useStyles();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  // //debugger;
  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {messages.map((message, i) => (
          <Message key={i} {...message} />
        ))}
      </List>
      <div ref={messagesEndRef} />
    </div>

    // <section id="messages-list">
    // 	<ul>
    // 		{messages.map((message) => (
    // 			<Message key={message.id} {...message} />
    // 		))}
    // 	</ul>
    // </section>
  );
};

export default MessagesList;
