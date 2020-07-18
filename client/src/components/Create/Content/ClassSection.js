import React, { useContext } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  IconButton,
  Card,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { makeStyles } from "@material-ui/core/styles";
import { ClassFormContext } from "../ClassFormContext";
import { deepOrange, cyan, grey, blue } from "@material-ui/core/colors";
import { Mixpanel } from "../../../analytics/Mixpanel";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootCard: {
    zIndex: "8",
    backgroundColor: grey[100],
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
  formContainer: {
    display: "flex",
    flexDirection: "Column",
  },
  formItem: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(4),
  },
  formTitle: {
    margin: theme.spacing(4),
  },
  formItemTextTitle: {
    marginLeft: theme.spacing(1),
  },
  formItemTextBody: {
    margin: theme.spacing(1),
  },
  objField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  customFieldIcon: {
    display: "flex",
    flexDirection: "row",
  },
  customField: {
    display: "flex",
    flexDirection: "column",
  },
  formControl: {
    margin: theme.spacing(1),
  },
}));

const ClassSection = () => {
  const classes = useStyles();
  const ctx = useContext(ClassFormContext);

  const addObjField = () => {
    ctx.setObj([...ctx.obj, ""]);
  };
  const addSkillField = () => {
    ctx.setSkills([...ctx.skills, ""]);
  };

  const handleObjChange = (data) => {
    // //debugger;
    var myString = data.target.id;
    var lastChar = myString[myString.length - 1];
    var index = parseInt(lastChar);
    var updatedObj = [...ctx.obj];
    updatedObj[index] = data.target.value;
    ctx.setObj(updatedObj);
  };

  const handleSkillsChange = (data) => {
    // //debugger;
    var myString = data.target.id;
    var lastChar = myString[myString.length - 1];
    var index = parseInt(lastChar);
    var updatedSkills = [...ctx.skills];
    updatedSkills[index] = data.target.value;
    ctx.setSkills(updatedSkills);
  };

  const handleSkillChange = (event) => {
    ctx.setSkillLevel(parseInt(event.target.value));
  };

  return (
    <div className={classes.root}>
      {/* <Card className={classes.rootCard}> */}
      <Grid container spacing={2} xs={12} className={classes.formContainer}>
        <Typography
          variant="h3"
          color="primary"
          className={classes.formTitle}
          justify="center"
          align="center"
        >
          Livestream Information
        </Typography>
        <Grid item xs={12} sm={5} className={classes.formItem}>
          <Typography
            variant="h4"
            color="textPrimary"
            className={classes.formItemTextTitle}
          >
            Livestream Title
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.formItemTextBody}
          ></Typography>
          <TextField
            variant="outlined"
            fullWidth
            id="course_name"
            label="Livestream Name (40 character limit)"
            name="course_name"
            // maxLength="50"
            inputProps={{
              maxLength: 40,
            }}
            value={ctx.name}
            onChange={(e) => ctx.setName(e.target.value)}
            // autoComplete="email"
          />
        </Grid>
        <Grid item xs={12} sm={5} className={classes.formItem}>
          <Typography
            variant="h4"
            color="textPrimary"
            className={classes.formItemTextTitle}
          >
            Livestream Tag
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.formItemTextBody}
          >
            One word category for your livestream. Helps optimize search.
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            rows="1"
            id="course_description"
            label="Livestream Tag"
            name="course_tag"
            value={ctx.tag}
            onChange={(e) => ctx.setTag(e.target.value)}
            // autoComplete="email"
          />
        </Grid>
        <Grid item xs={12} sm={10} className={classes.formItem}>
          <Typography
            variant="h4"
            color="textPrimary"
            className={classes.formItemTextTitle}
          >
            Livestream Description
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.formItemTextBody}
          >
            Paragraph summarizing the Livestream
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows="3"
            id="course_description"
            label="Livestream Description"
            name="course_description"
            value={ctx.des}
            onChange={(e) => ctx.setDes(e.target.value)}
            // autoComplete="email"
          />
        </Grid>
        <Grid item xs={12} sm={5} className={classes.formItem}>
          <Typography
            variant="h4"
            color="textPrimary"
            className={classes.formItemTextTitle}
          >
            Livestream Skill Level
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.formItemTextBody}
          >
            This is for attendees to better understand the type of Livestream
          </Typography>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Skill Level</FormLabel>
            <RadioGroup
              aria-label="level"
              name="level"
              value={ctx.skillLevel}
              onChange={handleSkillChange}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="Beginner"
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Intermediate"
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="Advanced"
              />
              <FormControlLabel value={3} control={<Radio />} label="Expert" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} className={classes.formItem}>
          <Typography
            variant="h4"
            color="textPrimary"
            className={classes.formItemTextTitle}
          >
            Topics
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.formItemTextBody}
          >
            Provide attendees a list of topics you will cover so they have more
            context for what they're paying for!
            <br />
            This helps attendees understand what they can expect
            <br />
            By delivering on your listed topics you earn trust and improve your
            ratings as a host
          </Typography>
          <div className={classes.customFieldIcon}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => addObjField()}
            >
              <AddCircleIcon />
            </IconButton>
            <div className={classes.customField}>
              {ctx.obj &&
                ctx.obj.map((val, idx) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id={`objectives-${idx}`}
                    label="Topic Descriptions"
                    name="objectives"
                    arrayIndex={idx}
                    className={classes.objField}
                    value={ctx.obj[idx]}
                    onChange={handleObjChange}
                  />
                ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} className={classes.formItem}>
          <Typography
            variant="h4"
            color="textPrimary"
            className={classes.formItemTextTitle}
          >
            Pre-Requisite Skills
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.formItemTextBody}
          >
            What would you hope that an attendee has experience with before
            attending the Livestream so they can get the most out of the
            experience!
            <br />
            What ways could attendees learn the prerequisite material to have
            the best experience possible?
            <br />
            Providing potential attendees with resources expands your potential
            audience and ultimately leads to higher enrollment
          </Typography>
          <div className={classes.customFieldIcon}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => addSkillField()}
            >
              <AddCircleIcon />
            </IconButton>
            <div className={classes.customField}>
              {ctx.skills &&
                ctx.skills.map((val, idx) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id={`skills-${idx}`}
                    label="Pre-Requisite Skill"
                    name="skills"
                    arrayIndex={idx}
                    className={classes.objField}
                    value={ctx.skills[idx]}
                    onChange={handleSkillsChange}
                  />
                ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={8} className={classes.formItem}>
          <Typography
            variant="h4"
            color="textPrimary"
            className={classes.formItemTextTitle}
          >
            Your Background Info
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.formItemTextBody}
          >
            Please provide a brief description of your background and why you
            are uniquely qualified to host this Livestream!
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            id="teacher_background"
            label="Host Background"
            name="teacher_background"
            multiline
            rows="3"
            value={ctx.bg}
            onChange={(e) => ctx.setBg(e.target.value)}
            // autoComplete="email"
          />
        </Grid>
      </Grid>
      {/* </Card> */}
    </div>
  );
};

export default ClassSection;
