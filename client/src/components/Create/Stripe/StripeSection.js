import React, { useContext, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Card,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Collapse,
  Divider,
  Link,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Image from "material-ui-image";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
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
    [theme.breakpoints.only("xs")]: {
      margin: 0,
      padding: 0,
    },
  },
  formItem: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(4),
    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(1),
      padding: 0,
    },
  },
  formItemCenter: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing(4),
    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(1),
      padding: 0,
    },
  },
  formItemCta: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
  },
  formTitle: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
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
  button: {
    margin: theme.spacing(1),
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
  image: {
    margin: theme.spacing(2),
  },
  image2: {
    // [theme.breakpoints.only("xs")]: {
    //   width: "120%",
    //   height: "150%",
    // },
  },
}));

const StripeSection = () => {
  const classes = useStyles();
  const ctx = useContext(ClassFormContext);

  const [faq1, setOpen1] = useState(false);
  const [faq2, setOpen2] = useState(false);
  const [faq3, setOpen3] = useState(false);
  const [faq4, setOpen4] = useState(false);
  const [faq5, setOpen5] = useState(false);
  const handleOpen1 = () => {
    Mixpanel.track("Open stripe faq1");
    setOpen1(!faq1);
  };
  const handleOpen2 = () => {
    Mixpanel.track("Open stripe faq2");
    setOpen2(!faq2);
  };
  const handleOpen3 = () => {
    Mixpanel.track("Open stripe faq3");
    setOpen3(!faq3);
  };
  const handleOpen4 = () => {
    Mixpanel.track("Open stripe faq4");
    setOpen4(!faq4);
  };
  const handleOpen5 = () => {
    Mixpanel.track("Open stripe faq5");
    setOpen5(!faq5);
  };

  var link = "";

  if (process.env.NODE_ENV === "production") {
    link =
      "https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://www.quirkshop.org/stripe&client_id=ca_GjCT2mYqAkWgs8TwoZqoPUEG6wutsD1P&state=create_course&suggested_capabilities[]=card_payments";
  } else {
    link =
      "https://connect.stripe.com/express/oauth/authorize?redirect_uri=http://localhost:3000/stripe&client_id=ca_GjCTzo0lMxCnEE09StxX56Z5oyAz3Ven&state=create_course&suggested_capabilities[]=card_payments";
  }

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

  const handleStripeRedirect = (event) => {
    window.location.replace(link);
  };

  return (
    <div className={classes.root}>
      {/* <Card className={classes.rootCard}> */}
      <Grid
        container
        justify="center"
        spacing={1}
        xs={12}
        className={classes.formContainer}
      >
        <Grid item xs={12} sm={10} className={classes.formItem}>
          <Typography
            variant="h3"
            color="primary"
            className={classes.formTitle}
            justify="center"
            align="center"
          >
            Payout Setup
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} className={classes.formItem}>
          <Typography variant="h6" align="justify" color="textPrimary">
            Stripe is a secure trusted payment processor used by over a
            1,000,000 businesses.
            <Link
              href="https://stripe.com/customers"
              target="_blank"
              rel="noopener"
            >
              {` `} Learn More
            </Link>
          </Typography>
          <Container className={classes.image}>
            <Image
              className={classes.image2}
              src="https://d1543jb95t9z4g.cloudfront.net/static/Create+quirkshop+form/Logos+desktop+1113x70.png"
              aspectRatio={16 / 1}
              disableSpinner
            />
          </Container>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12} sm={5} className={classes.formItemCenter}>
          <Typography variant="h6" align="left" color="subtitle1">
            What you will need:
          </Typography>
          <List>
            <ul>
              <ListItem>
                <ListItemText>
                  <li>SMS-Enabled Phone Number</li>
                  <li>Bank Account or Debit Card</li>
                </ListItemText>
              </ListItem>
            </ul>
          </List>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.formItemCta}>
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            onClick={handleStripeRedirect}
          >
            Set up payouts on Stripe
          </Button>
        </Grid>
        <Grid item xs={12} sm={10} className={classes.formItemCta}>
          <Divider className={classes.divider} />
          <List>
            <ListItem button onClick={handleOpen1}>
              <ListItemText primary="What is Stripe?" />
              {faq1 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={faq1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  {/* Build a brand around your Quirks - what makes you, you.   */}
                  <ListItemText secondary="Stripe is an online payment processing company for internet businesses.  We use stripe for their security and easy of use." />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleOpen2}>
              <ListItemText primary="Why do I need a Stripe Account?" />
              {faq2 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={faq2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText secondary="You need a stripe account so we can pay you seamlessly.  Think of it as a paypal or venmo account but for your earnings on Quirkshop." />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleOpen3}>
              <ListItemText primary="Is stripe secure? How is my personal information used?" />
              {faq3 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={faq3} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText secondary="Stripe is extremely secure. In fact, it's the most secure of all payment processors.  Don't worry your privacy is our top concern and it is for Stripe too, you're data will not be sold to third parties." />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleOpen4}>
              <ListItemText
                primary="What should I choose as my business name? I’m stuck!
"
              />
              {faq4 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={faq4} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText secondary="Your first name and last name should suffice" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleOpen5}>
              <ListItemText primary="What should I put for industry and website?" />
              {faq5 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={faq5} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText secondary="Select software for industry and quirkshop.org for website url" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Grid>
      </Grid>

      {/* </Card> */}
    </div>
  );
};

export default StripeSection;
