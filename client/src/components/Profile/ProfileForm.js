import React, { useState, useCallback, useContext } from "react";
import {
  Grid,
  Container,
  Card,
  TextField,
  Divider,
  Typography,
  CssBaseline,
  Paper,
  Button,
  Avatar,
  Modal,
  Backdrop,
  Fade,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { ImagePicker, FilePicker } from "react-file-picker";
import { makeStyles } from "@material-ui/core/styles";
import Mutations from "../../graphql/mutations";
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";

import axios from "axios";
import "moment/min/locales";
import * as moment from "moment/moment";

import { ProfileContext } from "./ProfileContext";
import { Mixpanel } from "../../analytics/Mixpanel";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const { S3_SIGN, UPDATE_USER, UPDATE_URL } = Mutations;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    display: "flex",
    flexDirection: "row",
  },
  field: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
  },
  bioField: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    width: "77%",
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
  imgSelectBtn: {
    margin: theme.spacing(2),
    maxHeight: "48px",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    justifyItems: "center",
  },
  formUpdateBtn: {
    margin: theme.spacing(2),
    maxHeight: "48px",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    justifyItems: "center",
  },
  avatar: {
    width: "150px",
    height: "150px",
    margin: theme.spacing(2),
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

const ProfileForm = ({ user }) => {
  Mixpanel.track("Editing Profile");
  const classes = useStyles();
  const [img, setImg] = useState(user.profile_pic);
  const ctx = useContext(ProfileContext);
  const [file, setFile] = useState(null);
  const [filename, setFileName] = useState("");
  const [filetype, setFileType] = useState("");

  const [jobTitle, setJobTitle] = useState(user.job_title);
  const [company, setCompany] = useState(user.company);
  const [linkedin, setLinkedin] = useState(user.linkedin);
  const [github, setGithub] = useState(user.github);
  const [bachMajor, setBachMajor] = useState(user.bach_major);
  const [bachSchool, setBachSchool] = useState(user.bach_school);
  const [masterMajor, setMasterMajor] = useState(user.masters_major);
  const [masterSchool, setMasterSchool] = useState(user.masters_school);
  const [phdSchool, setPHDSchool] = useState(user.phd_school);
  const [phdMajor, setPHDMajor] = useState(user.phd_major);
  const [bio, setBio] = useState(user.bio);
  const [isSelected, setIsSelected] = useState(false);
  const [result, setResult] = useState(null);

  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);

  const cancelClick = () => {
    ctx.setMode("PROFILE");
    Mixpanel.track("Cancel Profile Update");
  };

  const [s3sign] = useMutation(S3_SIGN);
  const [updateUser] = useMutation(UPDATE_USER, {
    update(client, { data }) {
      // //debugger;
      client.writeData({
        data: {
          user: data.updateUserInfo,
        },
      });
    },
  });

  const [updateURL] = useMutation(UPDATE_URL);

  const handleImageUpload = async (file) => {
    // //debugger;

    setFile(file);
    var name = formatFilename(file.name);
    setFileName(name);
    setFileType(file.type);

    s3sign({
      variables: { filename: name, filetype: file.type },
    }).then(
      (result) => {
        console.log("Signed banner image");
        uploadToS3(file, result.data.s3upload.signedRequest).then(
          (outcome) => {
            // //debugger;
            setIsSelected(true);
            setImg(result.data.s3upload.url);
            Mixpanel.track("Profile image update success");
          },
          (error) => {
            console.log("Error in uploadToS3", error);
            Mixpanel.track("Profile image update error");
            setError("Seems something has gone wrong, please try again.");
            handleOpen();
          }
        );
        setResult(result.data.s3upload.url);
        // //debugger;
      },
      (error) => {
        console.log("Error is in s3sign", error);
        Mixpanel.track("Profile image s3sign error");
        setError("Seems something has gone wrong, please try again.");
        handleOpen();
      }
    );
    // handleUrlUpdate(result);
  };

  const handleUrlUpdate = (url) => {
    updateURL({ variables: { url, username: user.username } }).then(
      (result) => {
        // props.history.push("/");
        Mixpanel.track("Profile url update success");
        window.location.reload();
      },
      (error) => {
        // console.log(error);
        Mixpanel.track("Profile url update error");
        setError("Error is in urlUpdate: " + error);
        handleOpen();
        // //debugger;
      }
    );
  };

  const uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type,
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Origin": "https://localhost:3000",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Origin": "https://" + window.location.hostname,
        "Access-Control-Allow-Origin": "http://" + window.location.hostname,
        "Access-Control-Allow-Origin": "https://www.quirkshop.org",
        "Access-Control-Allow-Origin": "http://www.quirkshop.org",
        "Access-Control-Allow-Origin": "https://quirkshop.org",
        "Access-Control-Allow-Origin": "http://quirkshop.org",
        "Access-Control-Allow-Credentials": "true",
      },
    };
    try {
      await axios.put(signedRequest, file, options);
    } catch (e) {
      console.log(e.response);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // //debugger;
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const formatFilename = (filename) => {
    const date = moment().format();
    // const randomString = Math.random()
    //     .toString(36)
    //     .substring(2, 7);
    // const cleanFileName = filename
    // 	.toLowerCase()
    // 	.replace(/[^a-z0-9]/g, "-");
    const newFilename = `users/${user.username}/profile_pic-${date}`;
    return newFilename;
  };

  const onDrop = (file) => {
    setFile(file);
    var name = formatFilename(file.name);
    setFileName(name);
    setFileType(file.type);
    setIsSelected(true);
    // var b64 = await toBase64(file);
    // setImg(b64);
    return filename, filetype;
    // //debugger;
  };
  // //debugger;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    updateUser({
      variables: {
        email: user.email,
        bio: bio,
        job_title: jobTitle,
        company: company,
        linkedin: linkedin,
        github: github,
        bach_school: bachSchool,
        bach_major: bachMajor,
        masters_school: masterSchool,
        masters_major: masterMajor,
        phd_school: phdSchool,
        phd_major: phdMajor,
      },
    }).then(
      (result) => {
        // console.log(result);
        Mixpanel.track("Profile Update Submitted");
        window.location.reload();
        // //debugger;
      },
      (error) => {
        // console.log(error);
        Mixpanel.track("Profile Update Error");
        setError(error);
        handleOpen();
      }
    );
  };

  return (
    <div className={classes.root}>
      <Container className={classes.paper} component="main" maxWidth="sm">
        <Grid container spacing={2}>
          <Avatar
            alt={user.first + " " + user.last}
            src={img}
            className={classes.avatar}
          />
          <Grid item xs={12} className={classes.form}>
            <FilePicker
              extensions={["jpg", "jpeg", "png"]}
              dims={{
                minWidth: 100,
                maxWidth: 360,
                minHeight: 100,
                maxHeight: 360,
              }}
              onChange={(FileObject) => {
                // var { name, type } = onDrop(FileObject);
                handleImageUpload(FileObject);
              }}
              onError={(errMsg) => {
                setError("Error is in filePicker: " + errMsg);
                handleOpen();
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.imgSelectBtn}
              >
                Select Image
              </Button>
            </FilePicker>

            <Button
              variant="outlined"
              color="primary"
              size="large"
              disabled={!isSelected}
              className={classes.imgSelectBtn}
              onClick={(e) => {
                e.preventDefault();
                handleUrlUpdate(result);
              }}
            >
              Upload Image
            </Button>
          </Grid>

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

          <Grid item xs={12} className={classes.form}>
            <TextField
              className={classes.field}
              id="outlined-textarea"
              label="Job Title"
              placeholder="Job Title"
              multiline
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              variant="outlined"
            />
            <TextField
              className={classes.field}
              id="outlined-textarea"
              label="Company"
              placeholder="Company"
              multiline
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} className={classes.form}>
            <TextField
              className={classes.field}
              id="outlined-textarea"
              label="Linkedin Url"
              placeholder="Linkedin"
              multiline
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              variant="outlined"
            />
            <TextField
              className={classes.field}
              id="outlined-textarea"
              label="GitHub Url"
              placeholder="GitHub"
              multiline
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} className={classes.form}>
            <TextField
              className={classes.field}
              id="outlined-textarea"
              label="Bachelors School"
              placeholder="Bachelors School"
              multiline
              value={bachSchool}
              onChange={(e) => setBachSchool(e.target.value)}
              variant="outlined"
            />
            <TextField
              className={classes.field}
              id="outlined-textarea"
              label="Bachelors Major"
              placeholder="Bachelors Major"
              multiline
              value={bachMajor}
              onChange={(e) => setBachMajor(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} className={classes.form}>
            <TextField
              className={classes.field}
              id="outlined-textarea"
              label="Masters School"
              placeholder="Masters School"
              multiline
              value={masterSchool}
              onChange={(e) => setMasterSchool(e.target.value)}
              variant="outlined"
            />
            <TextField
              className={classes.field}
              id="outlined-textarea"
              label="Masters Major"
              placeholder="Masters Major"
              multiline
              value={masterMajor}
              onChange={(e) => setMasterMajor(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} className={classes.form}>
            <TextField
              className={classes.field}
              id="outlined-textarea"
              label="PhD School"
              placeholder="PhD School"
              multiline
              value={phdSchool}
              onChange={(e) => setPHDSchool(e.target.value)}
              variant="outlined"
            />
            <TextField
              className={classes.field}
              id="outlined-textarea"
              label="PhD Major"
              placeholder="PhD Major"
              multiline
              value={phdMajor}
              onChange={(e) => setPHDMajor(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} className={classes.form}>
            <TextField
              className={classes.bioField}
              // fullWidth
              // id="outlined-textarea"
              label="Bio"
              placeholder="Bio"
              multiline
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              variant="outlined"
              rows="4"
            />
          </Grid>

          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.formUpdateBtn}
            onClick={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.formUpdateBtn}
            onClick={() => cancelClick()}
          >
            Cancel
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default withRouter(ProfileForm);
