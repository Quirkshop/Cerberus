import React, { useState, useCallback, useContext } from "react";
import { UpdateFormContext } from "./UpdateContext";
import { CourseContext } from "../CourseContext";
import {
  Grid,
  Container,
  Modal,
  Backdrop,
  Fade,
  Fab,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { ImagePicker, FilePicker } from "react-file-picker";
import { makeStyles } from "@material-ui/core/styles";
import Mutations from "../../../graphql/mutations";
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";
import LogisticsSection from "./LogisticsSections";
import ClassSection from "./ClassSection";
import ReviewSection from "./ReviewSection";
import { UpdateProvider } from "./UpdateContext";
import { v1 as uuidv1 } from "uuid";
const { UPDATE_COURSE } = Mutations;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  field: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
  },
  fabSubmit: {
    position: "fixed",
    display: "flex",
    bottom: theme.spacing(12),
    right: theme.spacing(2),
  },
  fabCancel: {
    position: "fixed",
    display: "flex",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
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
}));

const UpdateForm = ({ course }) => {
  const classes = useStyles();
  const [update_course] = useMutation(UPDATE_COURSE);
  const ctx = useContext(UpdateFormContext);
  const ctx2 = useContext(CourseContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  console.log(ctx.date);

  const cancelClick = () => {
    ctx2.setMode("Course");
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleUpdateCourse() {
    var uid = course.uid;
    var courseName = ctx.name;
    var Price = ctx.price * 100;
    var Address = ctx.addr;
    var City = ctx.city;
    var state = ctx.state;
    var Capacity = ctx.cap;
    var Duration = ctx.duration;
    var overview = ctx.des;
    var learning_objectives = ctx.obj;
    var teacher_qual = ctx.bg;
    var dates = ctx.date;
    var startTime = ctx.time;
    var SkillLevel = ctx.skillLevel;
    var Materials = ctx.materials;
    var preRequisites = ctx.skills;
    var bannerURL = ctx.banner;
    var cardImageURL = ctx.card;
    var isLive = ctx.live;
    var tag = ctx.tag;
    var schedule = ctx.appointments.map((appoint) => {
      let temp = uuidv1();
      temp = uid.substr(0, 10);
      var updateAppointment = {
        title: courseName,
        startDate: appoint.startDate,
        endDate: appoint.endDate,
        uid: appoint.uid ? appoint.uid : temp,
        user_list: appoint.user_list ? appoint.user_list : [course.teacher],
        vip: appoint.vip ? appoint.vip : [],
        feedID: "",
        roomID: "",
        isHost: true,
        courseId: uid,
        id: appoint.id,
      };
      return updateAppointment;
    });
    // console.log(isLive)
    if (uid === "") {
      setError("No User ID Provided");
      return handleOpen();
    } else if (courseName === "") {
      setError("No Name Provided!");
      return handleOpen();
    } else if (Price === null) {
      setError("No Price Provided!");
      return handleOpen();
    } else if (!isLive) {
      if (Address === "") {
        setError("No Address Provided!");
        return handleOpen();
      } else if (Capacity === null) {
        setError("No Capacity Provided!");
        return handleOpen();
      }
    } else if (City === "") {
      setError("No City Provided!");
      return handleOpen();
    } else if (state === "") {
      setError("No State Provided!");
      return handleOpen();
    } else if (Duration === null) {
      setError("No Duration Provided!");
      return handleOpen();
    } else if (overview === "") {
      setError("No Description Provided!");
      return handleOpen();
    } else if (learning_objectives[0] === "") {
      setError("No Objectives Provided!");
      return handleOpen();
    } else if (teacher_qual === "") {
      setError("No Background Provided!");
      return handleOpen();
    } else if (SkillLevel === -1) {
      setError("No Skill Level Provided!");
      return handleOpen();
    } else if (bannerURL === "") {
      setError("No Banner Image Provided!");
      return handleOpen();
    } else if (cardImageURL === "") {
      setError("No Card Image Provided!");
      return handleOpen();
    } else if (tag === "") {
      setError("No Tag Provided!");
      return handleOpen();
    } else if (schedule.length === 0) {
      setError("No Dates Provided!");
      return handleOpen();
    }
    update_course({
      variables: {
        uid,
        tag,
        courseName,
        Price,
        Address,
        City,
        state,
        Capacity,
        Duration,
        overview,
        learning_objectives,
        teacher_qual,
        startTime,
        SkillLevel,
        Materials,
        preRequisites,
        bannerURL,
        cardImageURL,
        isLive,
        schedule,
      },
    }).then(
      (result) => {
        window.location.reload();
      },
      (error) => {
        console.log("Error in updating course: ", error);
        setError("Seems something has gone wrong, please try again.");
        handleOpen();
      }
    );
  }

  return (
    <div className={classes.root}>
      <Container className={classes.paper} component="main" maxWidth="lg">
        <Dialog
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
        >
          <DialogContent>
            <DialogContentText color="textPrimary">
              <h2 id="transition-modal-title">Error:</h2>
              <p id="transition-modal-description">{error}</p>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        {/* <Grid container spacing={2}>
					
				</Grid> */}
        <ClassSection />
        <LogisticsSection />

        <ReviewSection />
      </Container>
      {course.uid && (
        <Fab
          className={classes.fabSubmit}
          variant="extended"
          color="primary"
          onClick={() => handleUpdateCourse()}
          // disabled={!ctx.review}
        >
          Update
        </Fab>
      )}
      <Fab
        className={classes.fabCancel}
        variant="extended"
        color="primary"
        onClick={() => cancelClick()}
        // disabled={!ctx.review}
      >
        Cancel
      </Fab>
    </div>
  );
};

export default withRouter(UpdateForm);
