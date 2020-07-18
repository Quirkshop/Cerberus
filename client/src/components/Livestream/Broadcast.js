import React, { useState, useEffect, userRef, useContext } from "react";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { SocketProvider } from "use-phoenix-channel";
import {
  Typography,
  Container,
  Button,
  Box,
  Modal,
  Fade,
  Backdrop,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import ReactPlayer from "react-player";
import SendIcon from "@material-ui/icons/Send";
import yellow from "@material-ui/core/colors/yellow";
import UserSideBar from "./Chat-Components/UserSideBar";
import MessageList from "./Chat-Components/MessageList";
import { BroadcastContext } from "./BroadcastContext";
import { Socket, Presence } from "phoenix";
import Mutations from "../../graphql/mutations";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../../graphql/queries";
import { Mixpanel } from "../../analytics/Mixpanel";
// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const { DELETE_COURSE } = Mutations;

const DefaultRTCPeerConnection = require("wrtc").RTCPeerConnection;
const { RTCSessionDescription } = require("wrtc");
const { UPDATE_LIVE } = Mutations;
const userDrawerWidth = 250;
const messageDrawerWidth = 275;
const preColor = yellow[500];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    // dsiplay: "flex",
    zIndex: theme.zIndex.drawer + 1,
    // paddingBottom: theme.spacing(1),
    // justifyContent: "center",,
    // color: theme.palette.background,
    color: "white",
    justifyContent: "space-between",
    // alignItems: 'center',
    // marginLeft: theme.spacing(4)
  },
  userDrawer: {
    width: "17%",
    marginTop: theme.spacing(4),
    flexShrink: 0,
  },
  messageDrawer: {
    // width: "17%",
    dsiplay: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(4),
    flexShrink: 0,
  },
  userDrawerPaper: {
    width: "17%",
  },
  messageDrawerPaper: {
    // width: messageDrawerWidth,
    width: "22%",
  },
  drawerContainer: {
    overflow: "scroll",
    marginTop: theme.spacing(10),
    height: "100%",
  },
  content: {
    flexGrow: 1,
    // justifyContent: "center",
    //   alignItems: "center",
    //   justifyContent: "flex-end",
    // alignItems: "flex-end",
    // alignSelf: "flex-end",
    height: "100%",
    width: "100%",
    //   display: "flex",
    //   position: "relative",
    //   height: "100%",
    // padding: theme.spacing(),
  },
  chatInput: {
    padding: "20px",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
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
  videoPlayer: {
    display: "flex",
    // position: "static",
    top: 0,
    left: -100,
    alignSelf: "center",
    height: "100%",
    width: "100%",
  },
  player_wrapper: {
    width: "auto", // Reset width
    height: "auto", // Reset height
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
  },
  react_player: {
    alignSelf: "center",
    // marginTop: "56.25%", // Percentage ratio for 16:9
    position: "absolute",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start", // Set to relative
  },

  //   react_player > div: {
  // 	position: absolute; // Scaling will occur since parent is relative now
  //   },
  startButton: {
    // backgroundColor: preColor,
    // margin: 'auto',
    // align: "center"
  },
  toolBar: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: 'center',
    // width:"100%"
  },
  sendFab: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    alignItems: "center",
  },
  grid: {
    // width:"100%",
    // height: "100%",
    // align: "center"
  },
  title: {
    marginLeft: theme.spacing(5),
    // marginLeft: "auto",
    textOverflow: "normal",
    width: "75%",
    // align: "center"
  },
  headerSectionOne: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    width: "33%",
  },
  headerSectionTwo: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "33%",
  },
  headerSectionThree: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    width: "33%",
  },
}));

const Broadcast = (props) => {
  // Mixpanel.track("Host Broadcast");
  const classes = useStyles();
  const history = useHistory();
  //var appointmentId;
  var appointmentId = parseInt(props.match.params.appointmentId);
  var appointment = props.course.appointments.find(
    (e) => e.id === appointmentId
  );

  const ctx = useContext(BroadcastContext);
  const [update_live] = useMutation(UPDATE_LIVE);
  const [delete_course] = useMutation(DELETE_COURSE);
  const [open, setOpen] = useState(true);
  const [live, setLive] = useState(false);
  const [mediaStream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  // need to move these to context api but due to time constraint this will have to suffifce
  var socket;
  var receiver;
  var broadcastChannel;
  var chatChannel;
  var peerConnection;
  var localVideo;
  var localStream;
  var remoteVideo;
  var sessionId;
  var handleId;
  var publisherId;
  var roomInput;
  var feedInput;
  var isPublisher = false;
  var roomId;
  var feedId;
  var receiver;
  var msg;
  var answer;

  const wsUrl =
    process.env.NODE_ENV !== "production"
      ? "//" + window.location.hostname + ":4000/socket"
      : "//" + window.location.hostname + "/socket";
  const constraints = { audio: true, video: { width: 1280, height: 720 } };
  const messageBtn = document.getElementById("NewMessageBtn");
  const messageInput = document.getElementById("NewMessageField");
  const endButton = document.getElementById("EndBroadcast");
  const CONFIG = {
    audio: true,
    video: true,
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  // const RECEIVERS = {
  // 	createSession,
  // 	createHandle,
  // 	createRoom,
  // 	joinPublisher,
  // 	publish,
  // 	joinSubscriber,
  // };

  useEffect(() => {
    history.listen((location) => {
      window.location.reload();
      let roomID = "";
      let feedID = "";
      let courseId = props.courseId;
      let appointmentId = appointment.uid;
      // delete_course({ variables: { courseId } })
      // update_live({
      // 	variables: {
      // 		courseId,
      // 		appointmentId,
      // 		roomID,
      // 		feedID,
      // 	},
      // })
    });
    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }

    // Some browsers partially implement mediaDevices. We can't just assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Here, we will just add the getUserMedia property if it's missing.
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function(constraints) {
        // First get ahold of the legacy getUserMedia, if present
        var getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
          return Promise.reject(
            new Error("getUserMedia is not implemented in this browser")
          );
        }

        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function(resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(stream) {
        setStream(stream);
        //setLive(true)
      })
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      });
  }, [history]);

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { uid: props.uid },
  });

  if (loading) return null;

  const host = data.user;
  const hostName = host.first + " " + host.last;
  const hostPic = host.profile_pic !== "" ? host.profile_pic : host.first;
  const hostId = props.uid;

  const sockHost = { name: hostName, pic: hostPic, id: hostId };

  const handleClose = () => {
    setOpen(false);
  };

  const connectToSocket = () => {
    let socket = new Socket(wsUrl, { params: { user: sockHost } });
    socket.connect();
    let broadcastChannel = socket.channel(`broadcast:${props.courseId}`, {});
    let chatChannel = socket.channel(`broadcast_chat:${props.courseId}`, {});

    // //debugger;
    return [broadcastChannel, chatChannel];
  };

  const initSequence = () => {
    Mixpanel.track("Broadcast Sequence Initiated");
    [broadcastChannel, chatChannel] = connectToSocket();
    broadcastChannel.join().receive("ok", (response) => {
      console.log("Joined successfully", response);
    });

    broadcastChannel.onMessage = (event, payload) => {
      // console.log(`the event "${event}" just happened`);
      receiver = parsePayloadReceiver(payload);
      if (receiver) {
        receiver(payload);
      }
      return payload;
    };

    let presences = {};
    chatChannel.join().receive("ok", (response) => {
      console.log("Joined successfully", response);
    });

    chatChannel.on("presence_state", (state) => {
      presences = Presence.syncState(presences, state);
      render(presences);
    });

    chatChannel.on("presence_diff", (diff) => {
      presences = Presence.syncDiff(presences, diff);
      render(presences);
    });

    chatChannel.on("message:new", (message) => renderMessage(message));

    messageBtn.addEventListener("click", (e) => {
      if (messageInput.value != "") {
        chatChannel.push("message:new", messageInput.value);
        messageInput.value = "";
      }
    });

    messageInput.addEventListener("keypress", (e) => {
      if (e.keyCode == 13 && messageInput.value != "") {
        chatChannel.push("message:new", messageInput.value);
        messageInput.value = "";
      }
    });

    endButton.addEventListener("click", (e) => {
      mediaStream.getTracks().forEach((track) => track.stop());
      // if (live) {
      Mixpanel.track("Broadcast End");
      chatChannel.leave();
      broadcastChannel
        .leave()
        .receive("ok", () => alert("You have ended the broascast"));
      let roomID = "";
      let feedID = "";
      let courseId = props.courseId;
      let appointmentId = appointment.id;
      // delete_course({ variables: { courseId } })
      update_live({
        variables: {
          courseId,
          appointmentId,
          roomID,
          feedID,
        },
      }).then(
        (result) => {
          // console.log(result);
          props.history.push(`/live/feedback/${props.courseId}`);
        },
        (error) => {
          console.log(error);
        }
      );

      setLive(false);
    });

    startSession();
  };

  const startSession = () => {
    broadcastChannel.push("new_msg", { request: "create_session" });
  };

  const startHandle = () => {
    // //debugger;

    broadcastChannel.push("new_msg", {
      request: "create_handle",
      session_id: sessionId,
    });
  };

  const makeRoom = () => {
    broadcastChannel.push("new_msg", {
      request: "create_room",
      session_id: sessionId,
      handle_id: handleId,
    });
  };

  const joinRoomPublisher = () => {
    broadcastChannel.push("new_msg", {
      request: "join_publisher",
      room_id: roomId,
      session_id: sessionId,
      handle_id: handleId,
    });
  };

  const handleUpdateLive = () => {
    let roomID = roomId.toString();
    let feedID = feedId.toString();
    let courseId = props.courseId;
    let appointmentId = appointment.id;
    update_live({
      variables: {
        courseId,
        appointmentId,
        roomID,
        feedID,
      },
    }).then(
      (result) => {
        // console.log(result);
        startBroadcast();
        Mixpanel.track("Broadcast Info Updated");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const startBroadcast = () => {
    peerConnection = new DefaultRTCPeerConnection(CONFIG);
    peerConnection.onicecandidate = onIceCandidate;
    peerConnection.ontrack = onTrack;
    peerConnection.addStream(mediaStream);
    peerConnection.createOffer().then(function(offer) {
      peerConnection.setLocalDescription(offer);
      broadcastChannel.push("new_msg", {
        request: "publish",
        jsep: offer,
        session_id: sessionId,
        handle_id: handleId,
      });
    });
    Mixpanel.track("Broadcast Connection Started");
  };

  const onTrack = (event) => {
    setRemoteStream(event.streams[0]);
  };

  const parsePayloadReceiver = (payload) => {
    // //debugger;
    if (payload) {
      if (payload.session_id) {
        return createSession;
      } else if (payload.handle_id) {
        return createHandle;
      } else if (payload.room_id) {
        return createRoom;
      } else if (payload.publisher_id) {
        return joinPublisher;
      } else if (payload.jsep && isPublisher) {
        return publish;
      } else if (payload.jsep) {
        return joinSubscriber;
      } else {
        return console.log;
      }
    } else {
      console.log("No Payload");
    }
  };

  const createSession = (payload) => {
    sessionId = payload.session_id;
    setInterval(keepalive, 3000);
    startHandle();
    Mixpanel.track("Broadcast Session Created");
  };

  const createHandle = (payload) => {
    handleId = payload.handle_id;
    makeRoom();
    Mixpanel.track("Broadcast Handle Created");
  };

  const createRoom = (payload) => {
    roomId = payload.room_id;
    joinRoomPublisher();
    Mixpanel.track("Broadcast Room Created");
  };

  const joinPublisher = (payload) => {
    isPublisher = true;
    feedId = payload.publisher_id;
    handleUpdateLive();
    Mixpanel.track("Broadcast Joined as Publisher");
  };

  const joinSubscriber = (payload) => {
    peerConnection.setRemoteDescription(
      new RTCSessionDescription(payload.jsep)
    );
    peerConnection.createAnswer().then(function(answer) {
      peerConnection.setLocalDescription(answer);
      broadcastChannel.push("new_msg", {
        request: "listen",
        jsep: answer,
        session_id: sessionId,
        handle_id: handleId,
      });
    });
  };

  const publish = (payload) => {
    answer = payload.jsep;
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    setLive(true);
    Mixpanel.track("Broadcast Successfully Started");
  };

  const keepalive = () => {
    broadcastChannel.push("new_msg", {
      request: "keepalive",
      session_id: sessionId,
    });
  };

  const onIceCandidate = (event) => {
    broadcastChannel.push("new_msg", {
      request: "trickle",
      candidate: event.candidate,
      session_id: sessionId,
      handle_id: handleId,
      room_id: roomId,
    });
  };

  const listBy = (id, { metas: metas }) => {
    return {
      id: id,
      onlineAt: formatTimestamp(metas[0].online_at),
      name: metas[0].name,
      pic: metas[0].pic,
    };
  };

  const renderMessage = (message) => {
    const oldArray = ctx.msgs;
    ctx.setMsgs((oldArray) => [...oldArray, message]);
  };

  const render = (presences) => {
    ctx.setActivity(Presence.list(presences, listBy));
  };

  const formatTimestamp = (timestamp) => {
    let date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  // //debugger;

  return (
    <>
      <div className={classes.root}>
        {/* <CssBaseline /> */}
        <Dialog
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
        >
          <DialogContent>
            <DialogContentText color="textPrimary">
              <h2 id="transition-modal-title">
                Here you can preview what your quirkstream will look like to
                your viewers
              </h2>
              <p id="transition-modal-description">
                Whenever you are ready to go live press the Start Broadcast
                button!
              </p>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {/* <Grid */}
            {/* className={classes.Grid}
					 container
					 direction="row"
					 justify="space-between"
					 alignItems="center"
					//  spacing={3}
					 >  */}
            {/* <Grid item xs> */}
            <div className={classes.headerSectionOne}>
              <Typography
                className={classes.title}
                variant="h6"
                edge="start"
                noWrap
              >
                {props.course.courseName}
              </Typography>
            </div>
            <div className={classes.headerSectionTwo}>
              {!live && (
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.startButton}
                  onClick={() => initSequence()}
                >
                  Start Broadcast
                </Button>
              )}

              {live && (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    disableRipple={true}
                    disableElevation
                  >
                    Live
                  </Button>
                </>
              )}
            </div>

            {/* </Grid>
						<Grid item xs>  */}

            {/* </Grid>
						<Grid item xs>  */}
            <div className={classes.headerSectionThree}>
              <Button
                id="EndBroadcast"
                variant="contained"
                edge="end"
                disabled={!live}
                className={classes.startButton}
              >
                End Broadcast
              </Button>
            </div>
            {/* </Grid>
						</Grid> */}
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.userDrawer}
          variant="permanent"
          classes={{
            paper: classes.userDrawerPaper,
          }}
        >
          <div className={classes.drawerContainer}>
            <UserSideBar users={props.users} presences={ctx.activity} />
          </div>
        </Drawer>
        <Drawer
          className={classes.messageDrawer}
          variant="permanent"
          classes={{
            paper: classes.messageDrawerPaper,
          }}
          anchor="right"
        >
          <div className={classes.drawerContainer}>
            <MessageList messages={ctx.msgs} />
          </div>
          <Divider />
          <Grid container alignItems="flex-end" className={classes.chatInput}>
            <Grid item xs={10}>
              <TextField
                id="NewMessageField"
                label="Type Something"
                disabled={!live}
                multiline
                rowsMax={4}
                fullWidth
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab
                className={classes.sendFab}
                id="NewMessageBtn"
                color="primary"
                aria-label="add"
                disabled={!live}
              >
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Drawer>
        {/* <main 
				className={classes.content}
				> */}
        {/* <Toolbar /> */}
        <Box className={classes.content} width="100%" height="100%">
          <div className={classes.player_wrapper}>
            <ReactPlayer
              //ref={video}
              volume={0.99}
              muted={true}
              playing
              className={classes.react_player}
              width="61%"
              height="90%"
              controls={true}
              // justify="left"

              // light={true}
              // url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
              url={mediaStream}
              file={{ forceVideo: true }}
            />
          </div>
        </Box>
        {/* </main> */}
      </div>
    </>
  );
};

export default withRouter(Broadcast);
