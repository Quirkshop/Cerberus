import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CssBaseline,
  Container,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import LogisticsForm from "./Logistics/LogisiticsForm";
import ContentForm from "./Content/ContentForm";
import ReviewForm from "./Review/ReviewForm";
import StripeForm from "./Stripe/StripeForm";
import { ClassFormContext } from "./ClassFormContext";
import Mutations from "../../graphql/mutations";
import { useMutation } from "@apollo/react-hooks";
var mixpanel = require("mixpanel-browser");
mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const { CREATE_COURSE } = Mutations;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepButtons: {
    display: "flex",
    flexDirection: "row",
    justify: "right",
    align: "right",
    alignContent: "right",
    justifyContent: "right",
    alignItems: "right",
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

const CreateClass = ({ user, uid, isStripe, ...rest }) => {
  const classes = useStyles();
  const ctx = useContext(ClassFormContext);
  const [create_course] = useMutation(CREATE_COURSE);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  // console.log(ctx);
  // //debugger;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getSteps = () => {
    if (!isStripe) {
      return ["Payout Setup", "Overview", "Logistics", "Review & Submit"];
    }
    return ["Overview", "Logistics", "Review & Submit"];
  };

  const getStepContent = (stepIndex) => {
    if (!isStripe) {
      switch (stepIndex) {
        case 0:
          return <StripeForm />;
        case 1:
          return <ContentForm />;
        case 2:
          return <LogisticsForm />;
        case 3:
          return <ReviewForm />;
        default:
          return "Unknown step";
      }
    }
    switch (stepIndex) {
      case 0:
        return <ContentForm />;
      case 1:
        return <LogisticsForm />;
      case 2:
        return <ReviewForm />;
      default:
        return "Unknown step";
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleCreateCourse = () => {
    // //debugger;
    var teacher = uid;
    var stripe_account = user.stripe_account;
    var courseName = ctx.name;
    var Price = ctx.price * 100;
    var Address = ctx.addr;
    var City = ctx.city;
    var state = ctx.state;
    var Capacity = ctx.cap;
    // var Duration = ctx.duration;
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
    var payment = ctx.payment;
    var isVIP = ctx.vip;
    var vipNum = ctx.frontRowCapacity;
    var vipPrice = ctx.frontRowPrice;

    var schedule = ctx.appointments.map((appoint) => {
      var title = ctx.name;
      var startDate = appoint.startDate;
      var endDate = appoint.endDate;
      var id = appoint.id;
      var schedule = {
        title,
        startDate,
        endDate,
        id,
        isVIP,
      };
      return schedule;
    });

    if (uid === "") {
      setError("No User ID Provided");
      return handleOpen();
    }
    if (stripe_account === "") {
      setError("No Stripe Account Created!");
      return handleOpen();
    }
    if (courseName === "") {
      setError("No Name Provided!");
      return handleOpen();
    }
    if (payment === "fixed") {
      if (Price === null) {
        setError("No Price Provided!");
        return handleOpen();
      }
      if (Price === 0) {
        setError(
          "Cant set Price of 0 on a fixed payment course! Please select free."
        );
        return handleOpen();
      }
    }
    if (!isLive) {
      if (Address === "") {
        setError("No Address Provided!");
        return handleOpen();
      } else if (Capacity === null) {
        setError("No Capacity Provided!");
        return handleOpen();
      }
    }
    if (City === "") {
      setError("No City Provided!");
      return handleOpen();
    }
    if (state === "") {
      setError("No State Provided!");
      return handleOpen();
    }
    // if (Duration === null) {
    // 	setError("No Duration Provided!");
    // 	return handleOpen();
    // }
    if (overview === "") {
      setError("No Description Provided!");
      return handleOpen();
    }
    if (learning_objectives[0] === "") {
      setError("No Objectives Provided!");
      return handleOpen();
    }
    if (teacher_qual === "") {
      setError("No Background Provided!");
      return handleOpen();
    }
    if (SkillLevel === -1) {
      setError("No Skill Level Provided!");
      return handleOpen();
    }
    if (bannerURL === "") {
      setError("No Banner Image Provided!");
      return handleOpen();
    }
    if (cardImageURL === "") {
      setError("No Card Image Provided!");
      return handleOpen();
    }
    if (tag === "") {
      setError("No Tag Provided!");
      return handleOpen();
    }
    if (schedule.length === 0) {
      setError("No Date(s) Provided!");
      return handleOpen();
    }
    if (isVIP) {
      if (vipNum === 0) {
        setError("Number of Front Seats not provided!");
        return handleOpen();
      }
    }
    mixpanel.track("Submit Create");
    create_course({
      variables: {
        teacher,
        stripe_account,
        tag,
        courseName,
        Price,
        Address,
        City,
        state,
        Capacity,
        // Duration,
        overview,
        learning_objectives,
        teacher_qual,
        dates,
        startTime,
        SkillLevel,
        Materials,
        preRequisites,
        bannerURL,
        cardImageURL,
        isLive,
        schedule,
        payment,
        isVIP,
        vipNum,
        vipPrice,
      },
    }).then(
      (result) => {
        // //debugger;

        mixpanel.track("Create Quirkshop Success", {
          data: result.data.createCourse,
        });
        rest.history.push({
          pathname: `/createSuccess/${result.data.createCourse.uid}`,
          state: {
            name: courseName,
            overview: overview,
          },
        });
      },
      (error) => {
        mixpanel.track("Create Quirkshop UnSuccessful", {
          error: error,
        });
        setError(error);
        handleOpen();
      }
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paperModal}>
            <h2 id="transition-modal-title">Error:</h2>
            <p id="transition-modal-description">{error}</p>
          </div>
        </Fade>
      </Modal>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography color="primary" className={classes.instructions}>
              Form Submitted
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <Container className={classes.stepButtons}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              {activeStep < steps.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={!isStripe}
                >
                  {/* {activeStep === steps.length - 1
									? "Finish"
									: "Next"} */}
                  Next
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleCreateCourse()}
                  disabled={!ctx.review}
                >
                  {/* {activeStep === steps.length - 1
									? "Finish"
									: "Next"} */}
                  Finish
                </Button>
              )}
            </Container>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(CreateClass);
