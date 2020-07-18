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
import { UpdateFormContext } from "./UpdateContext";
import { deepOrange, cyan, grey, blue } from "@material-ui/core/colors";

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
  const ctx = useContext(UpdateFormContext);

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
          Class Information
        </Typography>
        <Grid item xs={12} sm={5} className={classes.formItem}>
          <Typography
            variant="h4"
            color="textPrimary"
            className={classes.formItemTextTitle}
          >
            Livestream Name
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
            value={ctx.name}
            inputProps={{
              maxLength: 40,
            }}
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
            What is one word that best describes your livestream? This helps us
            categorize and optimize search so attendees can find your listing
            easier!
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
            Class Description
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.formItemTextBody}
          >
            Paragraph summarizing the course
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows="3"
            id="course_description"
            label="Course Description"
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
            Course Skill Level
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.formItemTextBody}
          >
            This is for students to better understand the type of class
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
            Learning Objectives
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.formItemTextBody}
          >
            List tangible take-aways for students
            <br />
            This helps students understand what they can expect
            <br />
            By delivering on your learning objectives you earn trust and improve
            your ratings as a teacher
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
                    label="Learning Objective"
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
            What would you hope that a student had experience with before taking
            this course
            <br />
            What ways could students learn the prerequisite material to be
            successful in your course?
            <br />
            Providing potential students with resources expands your potential
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
        <Grid item xs={12} sm={5} className={classes.formItem}>
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
            are uniquely qualified to teach this course!
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            id="teacher_background"
            label="Teacher Background"
            name="teacher_background"
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
