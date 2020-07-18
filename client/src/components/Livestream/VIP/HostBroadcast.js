import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import adapter from "webrtc-adapter";
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
  Divider,
  Fab,
  Grid,
  TextField,
  Paper,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import ReactPlayer from "react-player";
import SendIcon from "@material-ui/icons/Send";
import yellow from "@material-ui/core/colors/yellow";
import UserSideBar from "../Chat-Components/UserSideBar";
import MessageList from "../Chat-Components/MessageList";
import { VIPBroadcastContext } from "./VIPBroadcastContext";
import { Socket, Presence } from "phoenix";
import Mutations from "../../../graphql/mutations";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../../../graphql/queries";
import { Mixpanel } from "../../../analytics/Mixpanel";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");
const { DELETE_COURSE, UPDATE_LIVE } = Mutations;
const DefaultRTCPeerConnection = require("wrtc").RTCPeerConnection;
const { RTCSessionDescription } = require("wrtc");
const JanusClient = require("janus-videoroom-client").Janus;
const List = require("collections/list");
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
    width: "10%",
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
    width: "10%",
  },
  messageDrawerPaper: {
    // width: messageDrawerWidth,
    width: "18%",
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
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
    // alignSelf: "flex-start",
  },
  react_player: {
    alignSelf: "center",
    // marginTop: "56.25%", // Percentage ratio for 16:9
    // position: "absolute",
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
  videoscreen: {
    margin: "5px",
    border: "1px",
    height: "100px",
    width: "300px",
    display: "flex",
  },
}));

var localStream;
var peers = new List();
var listeners = new List();
var pubs = [null, null, null, null, null];
var remoteStream1 = null;
var remoteStream2 = null;
var remoteStream3 = null;
var remoteStream4 = null;
var remoteStream5 = null;

const HostBroadcast = (props) => {
  // Mixpanel.track("VIP Host Broadcast");
  const classes = useStyles();
  const history = useHistory();
  const ctx = useContext(VIPBroadcastContext);
  const [update_live] = useMutation(UPDATE_LIVE);
  const [delete_course] = useMutation(DELETE_COURSE);
  const [open, setOpen] = useState(true);
  const [live, setLive] = useState(false);

  const [toggle, setToggle] = useState(false);

  var rs1 = false;
  var rs1Key = getRandomInt(0, 100);
  var rs2 = false;
  var rs2Key = getRandomInt(0, 100);
  var rs3 = false;
  var rs3Key = getRandomInt(0, 100);
  var rs4 = false;
  var rs4Key = getRandomInt(0, 100);
  var rs5 = false;
  var rs5Key = getRandomInt(0, 100);
  // //debugger;

  var courseId = props.courseId;
  var appointmentId = parseInt(props.appointmentId);
  var appointment = props.course.appointments.find(
    (e) => e.id === appointmentId
  );

  const constraints = {
    audio: true,
    video: {
      width: { min: 640, ideal: 1280 },
      height: { min: 480, ideal: 720 },
      advanced: [{ width: 1920, height: 1280 }, { aspectRatio: 16 / 9 }],
    },
  };
  const wsUrl =
    process.env.NODE_ENV !== "production"
      ? "//" + window.location.hostname + ":4000/socket"
      : "//" + window.location.hostname + "/socket";
  var server =
    process.env.NODE_ENV !== "production"
      ? "ws://" + window.location.hostname + ":8188"
      : "wss://" + window.location.hostname + "/janus";
  console.log(server);
  // //debugger;
  const client = new JanusClient({
    url: server,
  });
  const CONFIG = {
    audio: true,
    video: true,
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };
  const messageBtn = document.getElementById("NewMessageBtn");
  const messageInput = document.getElementById("NewMessageField");
  const endButton = document.getElementById("EndBroadcast");
  const seats = 5;

  var videoRoom;
  var roomID;
  var feedID;
  var joinResult;
  var sessionID;
  var handleID;
  var sessionHandle;
  var roomHandle;
  var pubHandle;
  var peerConnection;
  var publishResult;
  var chatChannel;

  useEffect(() => {
    history.listen((location) => {
      window.location.reload();
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
        localStream = stream;
        console.log("localstream", stream);
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
  const username = hostName;
  const sockHost = { name: hostName, pic: hostPic, id: hostId };

  const init = async () => {
    Mixpanel.track("VIP Broadcast Sequence Initiated");
    client.connect();
    client.onConnected(async (props) => {
      console.log("onConnected props is:", props);

      sessionHandle = await client.createSession();
      sessionID = sessionHandle.id;

      roomHandle = await sessionHandle.videoRoom().createVideoRoomHandle();
      handleID = roomHandle.id;
      videoRoom = await roomHandle.create({
        publishers: seats,
        is_private: false,
        // secret: '****',
        // pin: '****',
        audiocodec: "opus",
        videocodec: "vp8",
        record: false,
      });
      // //debugger;
      roomID = videoRoom.room;
      joinResult = await roomHandle.join({
        request: "join",
        ptype: "publisher",
        room: roomID,
      });
      feedID = joinResult.id;

      peerConnection = new DefaultRTCPeerConnection(CONFIG);
      peerConnection.onicecandidate = onIceCandidate;
      peerConnection.ontrack = onTrack;
      peerConnection.addStream(localStream);
      let offer = await peerConnection.createOffer();
      console.log(offer);
      peerConnection.setLocalDescription(offer);
      publishResult = await roomHandle.publish({
        request: "publish",
        jsep: offer,
      });
      console.log(publishResult);
      peerConnection.setRemoteDescription(
        new RTCSessionDescription(publishResult.response.response.jsep)
      );
      handleUpdateLive(feedID, roomID);
      setLive(true);

      chatChannel = connectToSocket();

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
        localStream.getTracks().forEach((track) => track.stop());
        chatChannel.leave();
        let roomID = "";
        let feedID = "";
        // let courseId = props.courseId;
        let appointmentId = appointment.uid;
        // delete_course({ variables: { uid } });
        // //debugger;
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
            Mixpanel.track("VIP Broadcast End");
            history.push(`/live/feedback/${courseId}`);
          },
          (error) => {
            console.log(error);
          }
        );
        setLive(false);
      });

      roomHandle.onEvent(async (e) => {
        console.log("roomHandle onEvent");
        console.log(e);
        // //debugger;

        if (e !== null && e !== undefined) {
          console.log("in event check");
          let msg = e.plugindata.data;
          let event = msg["videoroom"];
          if (event === "event") {
            console.log("is event");
            // //debugger;
            //event
            if (msg["publishers"] !== undefined && msg["publishers"] !== null) {
              console.log("is event & pubs");
              // //debugger;
              //loop through publishers and do stuff
              var list = msg["publishers"];
              for (var peer in list) {
                console.log("is event & pubs & looping");
                var id = list[peer]["id"];
                var audio = list[peer]["audio_codec"];
                var video = list[peer]["video_codec"];
                console.log(id);
                console.log(audio);
                console.log(video);
                // //debugger;
                if (id !== feedID && !pubs.includes(id)) {
                  newRemoteFeed(id, audio, video);
                }
              }
            } else if (
              msg["leaving"] !== undefined &&
              msg["leaving"] !== null
            ) {
              console.log("is leaving");
              // //debugger;
            } else if (
              msg["unpublished"] !== undefined &&
              msg["unpublished"] !== null
            ) {
              console.log("is unpublished");
              let unPub = e.plugindata.data.unpublished;
              let streamIndex = pubs.indexOf(unPub);
              pubs[streamIndex] = null;
              removeStream(streamIndex);
              // //debugger;
              //
            } else if (msg["error"] !== undefined && msg["error"] !== null) {
              console.log("is error");
              // //debugger;
              //some error happened
            }
          } else if (event === "joined") {
            console.log("is joined");
            // //debugger;
            //someone has joined
            if (msg["publishers"] !== undefined && msg["publishers"] !== null) {
              console.log("is joined & pubs");
              // //debugger;
              //loop through publishers and do stuff
              var list = msg["publishers"];
              for (var peer in list) {
                console.log("is joined & pubs & looping");
                // //debugger;
                var id = list[peer]["id"];
                var audio = list[peer]["audio_codec"];
                var video = list[peer]["video_codec"];
                console.log(id);
                console.log(audio);
                console.log(video);
                // //debugger;
                if (id !== feedID && !pubs.includes(id)) {
                  newRemoteFeed(id, audio, video);
                }
              }
            }
          } else if (event === "destroyed") {
            console.log("is destroyed");
            // //debugger;
            //something broke?
            alert("room has been destroyed");
            //cleanup
          }
        }
      });

      console.log(peerConnection);
      console.log(pubHandle);
      console.log("offer", offer);
      // sessionHandle.videoRoom().pub

      // //debugger;
      console.log("room", roomID);
      console.log(videoRoom);
      console.log("here");
      console.log(sessionHandle);
      console.log(roomHandle);
    });
  };

  const connectToSocket = () => {
    var socket = new Socket(wsUrl, { params: { user: sockHost } });
    socket.connect();
    let chatChannel = socket.channel(
      `broadcast_chat:${props.courseId}-${appointmentId}`,
      {}
    );

    return chatChannel;
  };

  const removeStream = (i) => {
    switch (i) {
      case 0:
        remoteStream1 = null;
        rs1 = false;
        setToggle(false);
        break;
      case 1:
        remoteStream2 = null;
        rs2 = false;
        setToggle(false);
        break;
      case 2:
        remoteStream3 = null;
        rs3 = false;
        setToggle(false);
        break;
      case 3:
        remoteStream4 = null;
        rs4 = false;
        setToggle(false);
        break;
      case 4:
        remoteStream5 = null;
        rs5 = false;
        setToggle(false);
        break;
    }
  };

  const onIceCandidate = async (event) => {
    if (event.candidate !== null) {
      let response = await roomHandle.trickle(event.candidate);
      console.log(response);
    }
    // //debugger;
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  const onTrack = (event) => {
    console.log(event);
    // if (remoteStream === null || remoteStream === undefined) {
    // //debugger;
    if (remoteStream1 === null && rs1 === false) {
      remoteStream1 = event.streams[0];
      rs1Key = getRandomInt(0, 100);
      setToggle(true);
      console.log(remoteStream1);
    } else if (remoteStream1 !== null && rs1 === false) {
      remoteStream1 = event.streams[0];
      rs1 = true;
      rs1Key = getRandomInt(0, 100);
      setToggle(false);
      console.log(remoteStream1);
    } else if (remoteStream2 === null && rs2 === false) {
      remoteStream2 = event.streams[0];
      rs2Key = getRandomInt(0, 100);
      setToggle(true);
      console.log(remoteStream2);
    } else if (remoteStream2 !== null && rs2 === false) {
      remoteStream2 = event.streams[0];
      rs2 = true;
      rs2Key = getRandomInt(0, 100);
      setToggle(false);
      console.log(remoteStream2);
    } else if (remoteStream3 === null && rs3 === false) {
      remoteStream3 = event.streams[0];
      rs3Key = getRandomInt(0, 100);
      setToggle(true);
      console.log(remoteStream3);
    } else if (remoteStream3 !== null && rs3 === false) {
      remoteStream3 = event.streams[0];
      rs3 = true;
      rs3Key = getRandomInt(0, 100);
      setToggle(false);
      console.log(remoteStream3);
    } else if (remoteStream4 === null && rs4 === false) {
      remoteStream4 = event.streams[0];
      rs4Key = getRandomInt(0, 100);
      setToggle(true);
      console.log(remoteStream4);
    } else if (remoteStream4 !== null && rs4 === false) {
      remoteStream4 = event.streams[0];
      rs4 = true;
      rs4Key = getRandomInt(0, 100);
      setToggle(false);
      console.log(remoteStream4);
    } else if (remoteStream5 === null && rs5 === false) {
      remoteStream5 = event.streams[0];
      rs5Key = getRandomInt(0, 100);
      setToggle(true);
      console.log(remoteStream5);
    } else if (remoteStream5 !== null && rs5 === false) {
      remoteStream5 = event.streams[0];
      rs5Key = getRandomInt(0, 100);
      rs5 = true;
      setToggle(false);
      console.log(remoteStream5);
    }
  };

  const newRemoteFeed = async (id, audio, video) => {
    var listener = await sessionHandle.videoRoom().listenFeed(roomID, id);
    listeners.add(listener);
    var offerSdp = listener.getOffer();

    console.log(listener);
    console.log(offerSdp);
    // //debugger;

    let pc = new DefaultRTCPeerConnection(CONFIG);
    peers.add(pc);

    pc.onicecandidate = async (event) => {
      if (event.candidate !== null) {
        let response = await listener.trickle(event.candidate);
        console.log(response);
      }
      // //debugger;
    };
    pc.ontrack = onTrack;
    let jsep = {
      type: "offer",
      sdp: offerSdp,
    };
    pc.setRemoteDescription(new RTCSessionDescription(jsep));
    let answer = await pc.createAnswer();
    pc.setLocalDescription(answer);
    let result = await listener.setRemoteAnswer(answer.sdp);

    // //debugger;
    let subResult = listener.start({
      request: "start",
      room: roomID,
      jsep: answer,
    });
    insertPub(id);
    // let subResult = await remotePluginHandle.start({
    // 	request: "start",
    // 	room: roomID,
    // 	jsep: answer,
    // });

    console.log(answer);
    // console.log(subResult);
    // //debugger;
  };

  const insertPub = (val) => {
    for (let i = 0; i < 5; i++) {
      if (pubs[i] === null) {
        pubs[i] = val;
        return;
      }
    }
  };

  const handleUpdateLive = (feed, room) => {
    let roomID = room.toString();
    let feedID = feed.toString();
    let courseId = props.courseId;
    let appointmentId = appointment.uid;
    update_live({
      variables: {
        courseId,
        appointmentId,
        roomID,
        feedID,
      },
    }).then(
      (result) => {
        console.log(result);
        Mixpanel.track("VIP Broadcast Info Updated");
        // startBroadcast();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
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
                  onClick={init}
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
        <Grid container spacing={1}>
          <div className={classes.player_wrapper} key={localStream}>
            <Grid item xs={3} key={localStream}>
              <ReactPlayer
                key={localStream}
                volume={0.99}
                muted={true}
                playing
                // className={classes.react_player}
                // width="61%"
                // height="90%"
                controls={false}
                url={localStream}
                file={{
                  forceVideo: true,
                }}
              />
            </Grid>
          </div>
          <div className={classes.player_wrapper} key={rs1Key}>
            <Grid item xs={3} key={rs1Key}>
              {remoteStream1 && remoteStream1.active && (
                <ReactPlayer
                  key={rs1Key}
                  volume={0.99}
                  muted={false}
                  playing
                  className={classes.react_player}
                  // width="61%"
                  // height="90%"
                  controls={false}
                  url={remoteStream1}
                />
              )}
            </Grid>
          </div>
          <div className={classes.player_wrapper} key={rs2Key}>
            <Grid item xs={3} key={rs2Key}>
              {remoteStream2 && remoteStream2.active && (
                <>
                  <ReactPlayer
                    key={rs2Key}
                    volume={0.99}
                    muted={false}
                    playing
                    className={classes.react_player}
                    // width="61%"
                    // height="90%"
                    controls={false}
                    url={remoteStream2}
                  />
                </>
              )}
            </Grid>
          </div>
          <div className={classes.player_wrapper} key={rs3Key}>
            <Grid item xs={3} key={rs3Key}>
              {remoteStream3 && remoteStream3.active && (
                <>
                  <ReactPlayer
                    key={rs3Key}
                    volume={0.99}
                    muted={false}
                    playing
                    className={classes.react_player}
                    // width="61%"
                    // height="90%"
                    controls={false}
                    url={remoteStream3}
                  />
                </>
              )}
            </Grid>
          </div>
          <div className={classes.player_wrapper} key={rs4Key}>
            <Grid item xs={3} key={rs4Key}>
              {remoteStream4 && remoteStream4.active && (
                <>
                  <ReactPlayer
                    key={rs4Key}
                    volume={0.99}
                    muted={false}
                    playing
                    className={classes.react_player}
                    // width="61%"
                    // height="90%"
                    controls={false}
                    url={remoteStream4}
                  />
                </>
              )}
            </Grid>
          </div>
          <div className={classes.player_wrapper} key={rs5Key}>
            <Grid item xs={3} key={rs5Key}>
              {remoteStream5 && remoteStream5.active && (
                <>
                  <ReactPlayer
                    key={rs5Key}
                    volume={0.99}
                    muted={false}
                    playing
                    className={classes.react_player}
                    // width="61%"
                    // height="90%"
                    controls={false}
                    url={remoteStream5}
                  />
                </>
              )}
            </Grid>
          </div>
        </Grid>
      </div>
    </>
  );
};

export default HostBroadcast;
