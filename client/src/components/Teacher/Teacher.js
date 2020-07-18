import React, { useEffect } from "react";
import {
  Typography,
  Fab,
  Container,
  Grid,
  Paper,
  Backdrop,
  Fade,
  Link,
  Button,
  Avatar,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Image from "material-ui-image";
import Modal from "@material-ui/core/Modal";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { IS_STRIPE } from "../../graphql/queries";
import { Helmet } from "react-helmet";
import { Mixpanel } from "../../analytics/Mixpanel";
import mixpanel from "mixpanel-browser";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      //   display: "flex",

      maxWidth: 1250,
      // justifyContent: "center",
      //   alignItems:"center",
      //   textAlign: "center",
      justify: "center",
      margin: "auto",
    },
  },

  fab: {
    position: "fixed",
    marginTop: theme.spacing(4),
    bottom: theme.spacing(4),
    right: theme.spacing(2),
    zIndex: 1000,
  },
  extendedIcon: {
    // marginRight: theme.spacing(1),
  },

  whyContainerImage: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: "85%",
    [theme.breakpoints.down("xs")]: {
      width: "65%",
    },
  },

  whyContainerText: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },

  whyContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      justifyContent: "center",
    },
  },
  faqContainer: {
    // flexGrow: 2,
    // display: "flex",
    // flexDirection: "row",
    // flexWrap: "wrap",
    width: "60%",
    justify: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  whyDescription: {
    // display: "flex",
    // flexDirection: "column",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    // backgroundColor: theme.palette.secondary.main,
    // marginLeft: theme.spacing(0),
    // marginRight: theme.spacing(0)
  },
  newLine: {
    marginBottom: theme.spacing(4),
  },

  whyPaper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    // flexDirection: "row",
    // flexWrap: "wrap",
    width: "auto",
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
  sectionTitle: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  titleContainer: {
    align: "left",
  },
  divider: {
    marginBottom: theme.spacing(3),
  },
  ctaBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(1),
  },
}));

const Teacher = (props) => {
  //const [modalStyle] = React.useState(getModalStyle);
  // const { loading, error, data } = useQuery(IS_STRIPE);
  Mixpanel.track("Host");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const stripe_connected = !data ? false : data && data.isStripe ? data.isStripe: false;

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    Mixpanel.track("Open Create Course Dialog");
    setOpen(true);
  };

  const handleClose = () => {
    Mixpanel.track("Close Create Course Dialog");
    setOpen(false);
  };
  const [faq1, setOpen1] = React.useState(false);
  const handleOpen1 = () => {
    Mixpanel.track("Open faq1");
    setOpen1(!faq1);
  };

  const [faq2, setOpen2] = React.useState(false);
  const handleOpen2 = () => {
    Mixpanel.track("Open faq2");
    setOpen2(!faq2);
  };

  const [faq3, setOpen3] = React.useState(false);
  const handleOpen3 = () => {
    Mixpanel.track("Open faq3");
    setOpen3(!faq3);
  };

  const [faq4, setOpen4] = React.useState(false);
  const handleOpen4 = () => {
    Mixpanel.track("Open faq4");
    setOpen4(!faq4);
  };

  const [faq5, setOpen5] = React.useState(false);
  const handleOpen5 = () => {
    Mixpanel.track("Open faq5");
    setOpen5(!faq5);
  };

  const [faq6, setOpen6] = React.useState(false);
  const handleOpen6 = () => {
    Mixpanel.track("Open faq6");
    setOpen6(!faq6);
  };

  const [faq7, setOpen7] = React.useState(false);
  const handleOpen7 = () => {
    Mixpanel.track("Open faq7");
    setOpen7(!faq7);
  };

  const [faq8, setOpen8] = React.useState(false);
  const handleOpen8 = () => {
    Mixpanel.track("Open faq8");
    setOpen8(!faq8);
  };

  const [faq9, setOpen9] = React.useState(false);
  const handleOpen9 = () => {
    Mixpanel.track("Open faq9");
    setOpen9(!faq9);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet title="Host" />
      <Container justify="center">
        <Grid alignItems="center">
          <Container maxWidth="sm">
            <Image
              src="https://d1543jb95t9z4g.cloudfront.net/static/Why+Host+Page/V2/Canoe+animals+desktop+3600x1000.png"
              aspectRatio={18 / 5}
              disableSpinner
            />
            <div className={classes.ctaBtn}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.ctaBtn}
                align="center"
                justify="center"
                onClick={() => {
                  mixpanel.track("Host-> get started under signup");
                  props.history.push("/create");
                }}
              >
                Get Started
              </Button>
            </div>
          </Container>
        </Grid>

        {/* <Paper className={classes.whyPaper} variant="elevation" elevation={4} > */}
        <Container maxWidth="md" className={classes.titleContainer}>
          <Typography
            variant="h4"
            color="primary"
            align="center"
            className={classes.sectionTitle}
          >
            Why Host a Quirkshop
          </Typography>
          {/* <Divider className={classes.divider} /> */}
        </Container>

        <Container maxWidth="md">
          <Grid
            container
            direction="row"
            spacing={0}
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid
              className={classes.whyDescription}
              item
              xs={12}
              sm={4}
              md={4}
              zeroMinWidth
            >
              {/* <Container maxWidth="xs"> */}
              <Container className={classes.whyContainer}>
                <Typography variant="h5" color="textPrimary" align="center">
                  Build your network
                </Typography>
              </Container>
              <Container className={classes.whyContainerImage}>
                <Image
                  src="https://d1543jb95t9z4g.cloudfront.net/static/Why+Host+Page/V2/Quirksphere+550x363.png"
                  aspectRatio={50 / 33}
                  disableSpinner
                />
              </Container>
              <Container className={classes.whyContainerText}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  align="center"
                >
                  Grow your community and brand
                </Typography>
              </Container>
              {/* </Container> */}
            </Grid>

            <Grid
              className={classes.whyDescription}
              item
              xs={12}
              sm={4}
              md={4}
              zeroMinWidth
            >
              {/* <Container maxWidth="xs"> */}
              <Container className={classes.whyContainer}>
                <Typography variant="h5" color="textPrimary" align="center">
                  Earn money
                </Typography>
              </Container>

              <Container className={classes.whyContainerImage}>
                <Image
                  src="https://d1543jb95t9z4g.cloudfront.net/static/Why+Host+Page/V2/Earn+Money+550x363.png"
                  aspectRatio={50 / 33}
                  disableSpinner
                />
              </Container>

              <Container className={classes.whyContainerText}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  align="center"
                >
                  Monetize your experience in a fulfilling and fun way{" "}
                </Typography>
              </Container>
              {/* </Container> */}
            </Grid>
            <Grid
              className={classes.whyDescription}
              item
              xs={12}
              sm={4}
              md={4}
              zeroMinWidth
            >
              <Container className={classes.whyContainer}>
                <Typography variant="h5" color="textPrimary" align="center">
                  Share your passion
                </Typography>
              </Container>
              <Container className={classes.whyContainerImage}>
                <Image
                  src="https://d1543jb95t9z4g.cloudfront.net/static/Why+Host+Page/V2/Share+Passion+550x363.png"
                  aspectRatio={50 / 33}
                  disableSpinner
                />
              </Container>
              <Container className={classes.whyContainerText}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  align="center"
                >
                  Help others learn and grow{" "}
                </Typography>
              </Container>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="md" align="center">
          <Divider className={classes.divider} />
          <Typography
            variant="h4"
            color="primary"
            align="center"
            className={classes.sectionTitle}
          >
            Host in 2 Steps
          </Typography>
        </Container>

        <Container maxWidth="md">
          <Grid
            container
            direction="row"
            spacing={0}
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid
              className={classes.whyDescription}
              item
              xs={12}
              sm={6}
              md={6}
              zeroMinWidth
            >
              <Container className={classes.whyContainer}>
                <Typography variant="h5" color="textPrimary" align="center">
                  1. Sign up
                </Typography>
              </Container>
              <Container className={classes.whyContainerImage}>
                <Image
                  src="https://d1543jb95t9z4g.cloudfront.net/static/Why+Host+Page/V2/Sign+up+550x363.png"
                  aspectRatio={50 / 33}
                  disableSpinner
                />
              </Container>
              <Container className={classes.whyContainerText}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  align="center"
                >
                  Answer questions about your quirkshop and publish
                  {/* Answer questions about your quirkshop. We use this information to create a syllabus for you. Your quirkshop will then be listed for people to find you!	 */}
                </Typography>
                <div className={classes.ctaBtn}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.ctaBtn}
                    align="center"
                    justify="center"
                    onClick={() => {
                      mixpanel.track("Host-> get started under signup");
                      props.history.push("/create");
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </Container>
            </Grid>
            {/* <Grid
							className={classes.whyDescription}
							item
							xs={12}
							sm={4}
							md={4}
							zeroMinWidth
						>
							<Container className={classes.whyContainer}>
								<Typography
									variant="h5"
									color="textPrimary"
									align="center"
								>
									2. Find workspace
								</Typography>
							</Container>
							<Container
								className={classes.whyContainerImage}
							>
								<Image
									src="https://d1543jb95t9z4g.cloudfront.net/static/Why+Host+Page/Find+a+workspace.png"
									aspectRatio={50 / 33}
									disableSpinner
								/>
							</Container>
							<Container
								className={classes.whyContainerText}
							>
								<Typography
									variant="subtitle1"
									color="textSecondary"
									align="center"
								>
									Decide if you want to stream or
									find a workspace
								</Typography>
								<Container align="center">
									<Button
										variant="outlined"
										color="primary"
										align="center"
										href="https://www.facilitron.com/"
									>
										Find a workspace!
									</Button>
								</Container>
							</Container>
						</Grid> */}
            <Grid
              className={classes.whyDescription}
              item
              xs={12}
              sm={6}
              md={6}
              zeroMinWidth
            >
              <Container className={classes.whyContainer}>
                <Typography variant="h5" color="textPrimary" align="center">
                  2. Host
                </Typography>
              </Container>
              <Container className={classes.whyContainerImage}>
                <Image
                  src="https://d1543jb95t9z4g.cloudfront.net/static/Why+Host+Page/V2/Group+164+550x363.png"
                  aspectRatio={50 / 33}
                  disableSpinner
                />
              </Container>
              <Container className={classes.whyContainerText}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  align="center"
                >
                  Host your quirkshop in person or via livestream
                  {/* Create a lesson plan and guide a quirkshop! Students pay class-by-class. You can also offer content online to reach a wider audience.{" "}*/}
                </Typography>
              </Container>
            </Grid>
          </Grid>
        </Container>

        {/* </Paper> */}
        <Container maxWidth="md">
          <Divider className={classes.divider} />
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Typography variant="h4" color="primary" align="left">
                FAQ's
              </Typography>
            </Grid>
          </Grid>
          <Dialog
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
          >
            <DialogTitle color="textPrimary">Create a Listing</DialogTitle>
            <DialogContent>
              <DialogContentText color="textPrimary">
                If you have not done so, you will be asked to create a stripe
                express account.
                <br />
                Click below to begin.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  Mixpanel.track("Continue to Create from Dialog");
                  // props.history.push({pathname: `/create`,
                  // state:{stripe_connected}})
                  props.history.push("/create");
                }}
              >
                Start Hosting
              </Button>
            </DialogActions>
          </Dialog>
          <List>
            <ListItem button onClick={handleOpen1}>
              <ListItemText primary="How can I grow my brand?" />
              {faq1 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={faq1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  {/* Build a brand around your Quirks - what makes you, you.   */}
                  <ListItemText secondary="We make it easy to create a profile, share links to social media, and build a community. Your guests can leave reviews about your quirkshops. Good reviews give potential guests confidence in your quirkshop." />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleOpen2}>
              <ListItemText primary="How do I make money?" />
              {faq2 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={faq2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText secondary="When you host a quirkshop, guests pay to attend. There is a 5% transaction fee. You keep the rest (95%)!" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleOpen3}>
              <ListItemText primary="How much do guests pay per quirkshop?" />
              {faq3 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={faq3} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText secondary="You set the price of attendance. Choose fixed price or sliding scale donations, whatever fits your quirkshop best. Guests can pay for individual or multiple quirkshops at once. Quirkshop offers pricing suggestions to help you out." />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleOpen4}>
              <ListItemText primary="How much money can I expect to make?" />
              {faq4 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={faq4} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText secondary="For a 15 guest quirkshop at $20/person, a host can expect to make ~$285." />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleOpen5}>
              <ListItemText primary="What are all my responsibilities as a host?" />
              {faq5 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={faq5} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText secondary="You are responsible for creating content. This includes developing an engaging lesson or experience, and then hosting it. We also recommend sharing the link to your quirkshop listing to your network. We handle the rest, from payment, course content pages, and all the stuff you don’t want to, allowing you to focus on making the best experience possible." />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleOpen6}>
              <ListItemText primary="How do I get guests to sign up? How do I market my quirkshop?" />
              {faq6 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={faq6} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText secondary="Guests can find your quirkshop in multiple ways. We ask you a few questions about your quirkshop during the sign-up process and generate a beautiful listing. Your quirkshop will be listed on our website and marketed to our users. We highly recommend sharing your quirkshop to your regular media channels to reach your network. " />
                </ListItem>
              </List>
            </Collapse>
            {/* <ListItem button onClick={handleOpen7}>
					<ListItemText primary="What if no one signs up for my class or attendees drop out?" />
					{faq7 ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={faq7} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem button className={classes.nested}>
							<ListItemText secondary="Your time is valuable. You can set a minimum enrollment for your quirkshop. If enrollment does not reach this threshold, the quirkshop can be postponed until enough people join." />
						</ListItem>
					</List>
				</Collapse> */}
            <ListItem button onClick={handleOpen8}>
              <ListItemText primary="How is my quirkshop rated? How does the rating system work? " />
              {faq8 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={faq8} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText secondary="Guests rate their experience of your quirkshop. Good ratings increase your visibility on our website, and also increase the likelihood of people choosing YOU as their host." />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleOpen9}>
              <ListItemText primary="How can I get access to a workspace to host?" />
              {faq9 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={faq9} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText secondary="If you do not have access to a space for your quickshop, we can help point you in the right direction! For example, local schools list their classrooms for rent on an hourly basis, often ranging between $10-$40/hour. Find a location and available time that works for you. We recommend using Facilitron to find a space." />

                  {/* <Button
								variant="outlined"
								color="primary"
								align="left"
								href="https://www.facilitron.com/"
							>
								Find a classroom!
							</Button> */}
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Container>
      </Container>

      <Fab
        className={classes.fab}
        color="secondary"
        variant="extended"
        justify="right"
        onClick={() => {
          Mixpanel.track("Continue to Create from fab");
          // props.history.push({pathname: `/create`,
          // state:{stripe_connected}})
          props.history.push("/create");
        }}
      >
        {/* <AddIcon className={classes.extendedIcon} /> */}
        Get Started
      </Fab>
    </div>
  );
};

export default withRouter(Teacher);
