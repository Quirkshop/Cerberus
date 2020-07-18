import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CardActionArea,
  Modal,
  Backdrop,
  Fade,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Image from "material-ui-image";
import { ImagePicker, FilePicker } from "react-file-picker";
import { makeStyles } from "@material-ui/core/styles";
import { UpdateFormContext } from "./UpdateContext";
import { deepOrange, cyan, grey, blue } from "@material-ui/core/colors";
import axios from "axios";
import "moment/min/locales";
import * as moment from "moment/moment";

import Mutations from "../../../graphql/mutations";
import { useMutation } from "@apollo/react-hooks";

const { S3_SIGN, CREATE_COURSE } = Mutations;

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
  formItemRow: {
    display: "flex",
    flexDirection: "row",
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
  pickers: {
    display: "flex",
    flexDirection: "row",
  },
  picker: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  rootCard: {
    minWidth: 300,
    backgroundColor: grey[100],
    margin: theme.spacing(1),
    zIndex: "9",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  cardTitle: {
    fontSize: 14,
  },
  cardPos: {
    marginBottom: 12,
  },
  locationButton: {
    margin: theme.spacing(2),
  },
  locationRow: {
    display: "flex",
    flexDirection: "row",
  },
  locationField: {
    margin: theme.spacing(1),
  },
  bannerCont: {
    maxHeight: 300,
    maxWidth: 1580,
    overflow: "hidden",
    zIndex: "-1",
  },
  rootContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: "100%",
  },
  paperCard: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.background.paper,
    maxWidth: 345,
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

const ReviewSection = () => {
  const classes = useStyles();
  const ctx = useContext(UpdateFormContext);
  const bull = <span className={classes.bullet}>•</span>;

  const [s3sign] = useMutation(S3_SIGN);
  const [create_course] = useMutation(CREATE_COURSE);
  const [isUpload, setIsUpload] = useState(false);
  const [isCardUpload, setIsCardUpload] = useState(false);
  const [fileBanner, setFileBanner] = useState(null);
  const [fileCard, setFileCard] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [approved, setApproved] = useState(false);

  const skills = ["Beginner", "Intermediate", "Advanced", "Expert"];

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

  const handleImageUploadBanner = async (file) => {
    setFileBanner(file);
    var name = formatFilenameBanner(file.name);

    s3sign({
      variables: { filename: name, filetype: file.type },
    }).then(
      (result) => {
        uploadToS3(file, result.data.s3upload.signedRequest).then(
          (outcome) => {
            setIsUpload(true);
            ctx.setBanner(result.data.s3upload.url);
          },
          (error) => {
            console.log("Error in uploadToS3: ", error);
            setError("Seems something has gone wrong, please try again.");
            handleOpen();
            // //debugger;
          }
        );
        setResult(result.data.s3upload.url);
        // //debugger;
      },
      (error) => {
        console.log("Error is in s3sign: ", error);
        setError("Seems something has gone wrong, please try again.");
        handleOpen();
      }
    );
  };

  const handleImageUploadCard = async (file) => {
    setFileCard(file);
    var name = formatFilenameCard(file.name);
    setIsCardUpload(true);

    s3sign({
      variables: { filename: name, filetype: file.type },
    }).then(
      (result) => {
        console.log("Signed card image");
        uploadToS3(file, result.data.s3upload.signedRequest).then(
          (outcome) => {
            ctx.setCard(result.data.s3upload.url);
          },
          (error) => {
            console.log("Error in uploadToS3", error);
            setError("Seems something has gone wrong, please try again.");
            handleOpen();
          }
        );
        setResult(result.data.s3upload.url);
      },
      (error) => {
        console.log("Error is in s3sign", error);
        setError("Seems something has gone wrong, please try again.");
        handleOpen();
      }
    );
    // handleUrlUpdate(result);
  };

  const formatFilenameBanner = (filename) => {
    const date = moment().format();
    const newFilename = `courses/${ctx.name}/banner-${date}`;
    return newFilename;
  };
  const formatFilenameCard = (filename) => {
    const date = moment().format();
    const newFilename = `courses/${ctx.name}/card-${date}`;
    return newFilename;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dateOnly = (datetime) => {
    var newdate = moment(datetime).format("dddd MMMM Do YYYY");
    return newdate;
  };

  return (
    <div className={classes.root}>
      <Typography
        variant="h3"
        color="primary"
        className={classes.formTitle}
        justify="center"
        align="center"
      >
        Review & Submit
      </Typography>
      <Typography variant="h4" className={classes.formItemTextTitle}>
        QuirkShop Banner Preview
      </Typography>

      <div className={classes.bannerCont}>
        <Image
          aspectRatio={21 / 8}
          alt="background"
          disableSpinner={true}
          src={ctx.banner}
          title={ctx.name}
        />
      </div>

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
      <Grid
        container
        spacing={2}
        xs={12}
        sm={12}
        className={classes.formContainer}
      >
        <Grid item xs={3}>
          <FilePicker
            extensions={["jpg", "jpeg", "png"]}
            onChange={(FileObject) => {
              // var { name, type } = onDrop(FileObject);
              handleImageUploadBanner(FileObject);
            }}
            onError={(errMsg) => {
              setError("Error is in filePicker: " + errMsg);
              handleOpen();
            }}
          >
            <Button
              color="primary"
              variant="contained"
              className={classes.locationButton}
            >
              Upload Banner Image
            </Button>
          </FilePicker>
        </Grid>
        <Typography variant="h4" className={classes.formItemTextTitle}>
          QuirkShop Card Preview
        </Typography>
        <Grid item xs={12} sm={12}>
          <Card className={classes.paperCard}>
            {/* <CardActionArea> */}
            <CardMedia
              component="img"
              image={ctx.card}
              height="140"
              width="500"
              title={ctx.name}
            />
            <CardContent align="left">
              <Typography variant="h5" color="primary">
                {ctx.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textPrimary"
                justify="left"
              >
                Price: ${ctx.price} per class
              </Typography>
              <Typography
                variant="subtitle1"
                color="textPrimary"
                justify="left"
              >
                City: {ctx.city}
              </Typography>
            </CardContent>
            {/* </CardActionArea> */}
            <CardActions>
              {/* <Button
								size="small"
								color="primary"
								disabled={true}
							>
								Go To Course
							</Button> */}
            </CardActions>
          </Card>

          <FilePicker
            extensions={["jpg", "jpeg", "png"]}
            onChange={(FileObject) => {
              // var { name, type } = onDrop(FileObject);
              handleImageUploadCard(FileObject);
            }}
            onError={(errMsg) => {
              setError("Error is in filePicker: " + errMsg);
              handleOpen();
            }}
          >
            <Button
              color="primary"
              variant="contained"
              className={classes.locationButton}
            >
              Upload Card Image
            </Button>
          </FilePicker>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReviewSection;
