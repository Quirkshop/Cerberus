import React, { useState, useEffect, userRef, useContext } from "react";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import ReactPlayer from "react-player";
import SendIcon from "@material-ui/icons/Send";
import yellow from "@material-ui/core/colors/yellow";
import UserSideBar from "./Chat-Components/UserSideBar";
import Image from "material-ui-image";
import MessageList from "./Chat-Components/MessageList";
import { BroadcastContext } from "./BroadcastContext";
import { Socket, Presence } from "phoenix";
import Mutations from "../../graphql/mutations";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../../graphql/queries";
import { Mixpanel } from "../../analytics/Mixpanel";
// var Mixpanel = require("Mixpanel-browser");
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const DefaultRTCPeerConnection = require("wrtc").RTCPeerConnection;
const { RTCSessionDescription } = require("wrtc");
const { UPDATE_LIVE } = Mutations;
const preColor = yellow[500];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    // dsiplay: "flex",
    zIndex: theme.zIndex.drawer + 1,
    // paddingBottom: theme.spacing(2),
    justifyContent: "space-between",
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
  paper: {
    //marginTop: theme.spacing(8),
    //display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    //position: 'relative'
  },
  paperModal: {
    // backgroundColor: theme.palette.background.paper,
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
  },
  toolBar: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  sendFab: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    alignItems: "center",
  },
  formItemTextBody: {
    margin: theme.spacing(1),
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

const Stream = ({ roomID, feedID, ...props }) => {
  // var appointmentId;
  // Mixpanel.track("Stream");
  var appointmentId = parseInt(props.match.params.appointmentId);
  const classes = useStyles();
  const history = useHistory();
  const ctx = useContext(BroadcastContext);
  const [update_live] = useMutation(UPDATE_LIVE);
  const [open, setOpen] = useState(true);
  const [live, setLive] = useState(false);
  const [mediaStream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [BroadcastReady, setBroadcastReady] = useState(false);
  var appointment = props.course.appointments.find(
    (e) => e.id === appointmentId
  );

  // need to move these to context api but due to time constraint this will have to suffifce
  var socket;
  var receiver;
  var broadcastChannel;
  var chatChannel;
  var peerConnection;
  var janusConnection;
  var localVideo;
  var localStream;
  var remoteVideo;
  var sessionId;
  var handleId;
  var publisherId;
  var roomInput;
  var feedInput;
  var isPublisher = false;
  var roomId = parseInt(appointment.roomID, 10);
  var feedId = parseInt(appointment.feedID, 10);
  var receiver;
  var msg;
  var answer;
  var payload;
  var video = React.createRef();

  const wsUrl =
    process.env.NODE_ENV !== "production"
      ? "//" + window.location.hostname + ":4000/socket"
      : "//" + window.location.hostname + "/socket";
  const janusUrl =
    process.env.NODE_ENV !== "production"
      ? "ws://" + window.location.hostname + ":8188"
      : "wss://" + window.location.hostname + "/janus";
  console.log(janusUrl);
  const janusProtocol = "janus-protocol";
  const constraints = { audio: true, video: { width: 1280, height: 720 } };
  const messageBtn = document.getElementById("NewMessageBtn");
  const messageInput = document.getElementById("NewMessageField");
  const endButton = document.getElementById("EndBroadcast");
  const CONFIG = {
    audio: true,
    video: true,
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    history.listen((location) => {
      window.location.reload();
    });
    console.log("roomID", appointment.roomID);
    console.log("feedID", appointment.feedID);
    console.log(props);
    if (appointment.feedID !== "" && !appointment.roomID !== "") {
      setBroadcastReady(true);
      Mixpanel.track("Stream Ready");
    } else {
      Mixpanel.track("Stream Not Ready");
    }
  }, [history]);

  const send = function(message, callback) {
    waitForConnection(function() {
      janusConnection.send(message);
      if (typeof callback !== "undefined") {
        callback();
      }
    }, 1000);
  };

  const waitForConnection = function(callback, interval) {
    if (janusConnection.readyState === 1) {
      callback();
    } else {
      // var that = this;
      // optional: implement backoff for interval here
      setTimeout(function() {
        waitForConnection(callback, interval);
      }, interval);
    }
  };

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { uid: props.uid },
  });

  if (loading) return null;

  const streamer = data.user;
  const streamerName = streamer.first + " " + streamer.last;
  const streamerPic =
    streamer.profile_pic !== "" ? streamer.profile_pic : streamer.first;
  const streamerId = props.uid;

  const sockStreamer = {
    name: streamerName,
    pic: streamerPic,
    id: streamerId,
  };

  const handleClose = () => {
    setOpen(false);
  };

  const connectToSocket = () => {
    var socket = new Socket(wsUrl, { params: { user: sockStreamer } });
    var ws = new WebSocket(janusUrl, janusProtocol);
    socket.connect();
    let chatChannel = socket.channel(`broadcast_chat:${props.courseId}`, {});

    return [ws, chatChannel];
  };

  const initSequence = () => {
    [janusConnection, chatChannel] = connectToSocket();
    // broadcastChannel.join().receive("ok", (response) => {
    // 	console.log("Joined successfully", response);
    // });

    janusConnection.onmessage = function(message) {
      payload = JSON.parse(message.data);
      receiver =
        RECEIVERS[payload.janus] ||
        RECEIVERS[payload.transaction] ||
        console.log;
      receiver(payload);
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

    // //debugger;

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
      Mixpanel.track("Stream Exit");
      chatChannel
        .leave()
        .receive("ok", () => alert("You have left the stream"));
      setLive(false);
      props.history.push(`/live/feedback/${props.courseId}`);
      window.location.reload();
    });

    startSession();
  };

  const startSession = () => {
    msg = JSON.stringify({
      janus: "create",
      transaction: "create_session",
    });
    send(msg);
    console.log("In init session");
  };

  const startHandle = () => {
    msg = JSON.stringify({
      janus: "attach",
      transaction: "create_handle",
      plugin: "janus.plugin.videoroom",
      session_id: sessionId,
    });
    send(msg);
  };

  const makeRoom = () => {
    msg = JSON.stringify({
      janus: "message",
      transaction: "create_room",
      body: { request: "create" },
      session_id: sessionId,
      handle_id: handleId,
    });
    send(msg);
  };

  const joinRoomPublisher = () => {
    roomId = parseInt(roomInput.value);
    msg = JSON.stringify({
      janus: "message",
      transaction: "join_publisher",
      body: { request: "join", ptype: "publisher", room: roomId },
      session_id: sessionId,
      handle_id: handleId,
    });
    send(msg);
  };

  const joinBroadcast = () => {
    peerConnection = new DefaultRTCPeerConnection(CONFIG);
    peerConnection.onicecandidate = onIceCandidate;
    peerConnection.ontrack = onTrack;

    msg = JSON.stringify({
      janus: "message",
      transaction: "join_subscriber",
      body: {
        request: "join",
        ptype: "subscriber",
        room: roomId,
        feed: feedId,
      },
      session_id: sessionId,
      handle_id: handleId,
    });
    send(msg);
  };

  // const startBroadcast = () => {
  // 	peerConnection = new DefaultRTCPeerConnection(CONFIG);
  // 	peerConnection.onicecandidate = onIceCandidate;
  // 	peerConnection.ontrack = onTrack;
  // 	peerConnection.addStream(mediaStream);
  // 	peerConnection.createOffer().then(function(offer) {
  // 		peerConnection.setLocalDescription(offer);
  // 		broadcastChannel.push("new_msg", {
  // 			request: "publish",
  // 			jsep: offer,
  // 			session_id: sessionId,
  // 			handle_id: handleId,
  // 		});
  // 	});
  // };

  const onTrack = (event) => {
    setStream(event.streams[0]);
    setLive(true);
  };

  // const parsePayloadReceiver = (payload) => {
  // 	// //debugger;
  // 	if (payload) {
  // 		if (payload.session_id) {
  // 			return createSession;
  // 		} else if (payload.handle_id) {
  // 			return createHandle;
  // 		} else if (payload.room_id) {
  // 			return createRoom;
  // 		} else if (payload.publisher_id) {
  // 			return joinPublisher;
  // 		} else if (payload.jsep && isPublisher) {
  // 			return publish;
  // 		} else if (payload.jsep) {
  // 			return joinSubscriber;
  // 		} else {
  // 			return console.log;
  // 		}
  // 	} else {
  // 		console.log("No Payload");
  // 	}
  // };

  const create_session = (payload) => {
    sessionId = payload.data.id;
    setInterval(keepalive, 30);
    startHandle();
    Mixpanel.track("Stream Session Created");
  };

  const create_handle = (payload) => {
    // //debugger;
    handleId = payload.data.id;
    joinBroadcast();
    Mixpanel.track("Stream Handle");
  };

  const create_room = (payload) => {
    roomId = payload.plugindata.data.room;
  };

  const join_publisher = (payload) => {
    feedId = payload.plugindata.data.id;
    Mixpanel.track("Stream Publisher Joined");
  };

  const join_subscriber = (payload) => {
    // //debugger;
    // console.log(payload);
    // console.log("in join sub");
    peerConnection.setRemoteDescription(
      new RTCSessionDescription(payload.jsep)
    );
    peerConnection.createAnswer().then(function(answer) {
      peerConnection.setLocalDescription(answer);
      msg = JSON.stringify({
        janus: "message",
        transaction: "blah",
        body: { request: "start" },
        jsep: answer,
        session_id: sessionId,
        handle_id: handleId,
      });
      send(msg);
    });
    Mixpanel.track("Stream Subscriber Joined");
  };

  const publish = (payload) => {
    answer = payload.jsep;
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const keepalive = () => {
    msg = JSON.stringify({
      janus: "keepalive",
      transaction: "keepalive",
      session_id: sessionId,
    });
    send(msg);
  };

  function ack(payload) {}

  const onIceCandidate = (event) => {
    msg = JSON.stringify({
      janus: "trickle",
      transaction: "candidate",
      candidate: event.candidate,
      session_id: sessionId,
      handle_id: handleId,
    });
    send(msg);
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

  const RECEIVERS = {
    create_session,
    create_handle,
    // create_room,
    join_publisher,
    publish,
    join_subscriber,
    ack,
  };

  // //debugger;
  return (
    <>
      <div className={classes.root}>
        {/* <CssBaseline /> */}
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <div className={classes.headerSectionOne}>
              <Typography variant="h6" noWrap>
                {props.course.courseName}
              </Typography>
            </div>
            <div className={classes.headerSectionTwo}>
              {BroadcastReady && !live && (
                <Button
                  variant="contained"
                  color="secondary"
                  // color="preColor"
                  className={classes.startButton}
                  onClick={() => initSequence()}
                >
                  Join Broadcast
                </Button>
              )}
              {live && (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    disableElevation
                    disableRipple={true}
                  >
                    Live
                  </Button>
                </>
              )}
            </div>
            <div className={classes.headerSectionThree}>
              <Button
                edge="end"
                id="EndBroadcast"
                variant="contained"
                disabled={!live}
                className={classes.startButton}
              >
                Exit
              </Button>
            </div>
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
        {live && (
          <Box className={classes.content} width="100%" height="100%">
            <div className={classes.player_wrapper}>
              <ReactPlayer
                //ref={video}
                // volume={0.99}
                // muted={true}
                playing
                className={classes.react_player}
                width="61%"
                height="90%"
                controls={true}
                // justify="left"

                // light={true}
                // url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                url={mediaStream}
                // file={{ forceVideo: true }}
              />
            </div>
          </Box>
        )}
        <Box>
          <Container className={classes.paper} maxWidth="lg">
            {!BroadcastReady && (
              <Typography
                variant="body1"
                color="textSecondary"
                className={classes.formItemTextBody}
              >
                It appears your host has not started streaming yet!
                <br />
                Please refresh the page to check again or refresh at the
                designated start time of your quirkshop.
              </Typography>
            )}

            {!live && (
              <Image
                aspectRatio={16 / 9}
                alt="background"
                src={props.course.bannerURL}
                title={props.course.courseName}
                //   className={classes.banner}
              />
            )}
          </Container>
        </Box>
        {/* </main> */}
      </div>
    </>
  );
};

export default withRouter(Stream);
