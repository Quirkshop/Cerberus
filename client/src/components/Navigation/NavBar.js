import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Paper,
  Grow,
  ClickAwayListener,
  Popper,
  MenuList,
  Box,
} from "@material-ui/core";
import School from "@material-ui/icons/School";
import { withRouter, useLocation } from "react-router";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../../graphql/queries";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "../Logo/Logo";
import AddIcon from "@material-ui/icons/Add";
import { GET_USER_BY_USERNAME, STRIPE_LINK } from "../../graphql/queries";
import injectTapEventPlugin from "react-tap-event-plugin";
import "./index.scss";
import Mutations from "../../graphql/mutations";
import { Mixpanel } from "../../analytics/Mixpanel";
import MyTheme from "../Theme/MyTheme";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");
const { LOGOUT_USER } = Mutations;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    // cursor: "pointer",
    display: "block",
  },
  toolbar: {
    // flexWrap: "wrap",
    // padding: theme.spacing(1),
    // display: "flex",
  },

  link: {
    margin: theme.spacing(0.5),
  },
  paper: {
    marginRight: theme.spacing(2),
    // position: "relative",
    zIndex: 10000,
  },
  popper: {
    zIndex: 10000,
  },
  button: {
    padding: theme.spacing(0),
  },
}));

const NavBar = (props) => {
  const classes = useStyles();
  let location = useLocation();
  const home =
    location.pathname === "/home"
      ? true
      : location.pathname === "/"
      ? true
      : false;

  const uid = props.uid;
  const {
    loading: StripeLoading,
    error: Stripe_Error,
    data: Stripe_Data,
  } = useQuery(STRIPE_LINK, {
    variables: { uid },
  });
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { uid },
  });
  const [open, setOpen] = React.useState(false);
  const [isCompany, setIsCompany] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorComp, setAnchorComp] = React.useState(null);
  // const [isCompOpen, setCompOpen] = React.useState(false);
  const isCompOpen = Boolean(anchorComp);

  const handleCompMenuOpen = (event) => {
    setAnchorComp(event.currentTarget);
  };

  const isLoggedIn = props.isLoggedIn;

  const anchorRef = React.useRef(null);
  const companyId = "Company-Menu";

  const handleCompClose = () => {
    setAnchorComp(null);
  };

  const companyMenu = (
    <Popper
      className={classes.popper}
      open={isCompOpen}
      anchorEl={anchorComp}
      // role={undefined}
      transition
    >
      {({ TransitionProps, placement }) => (
        <Grow {...TransitionProps}>
          <Paper className={classes.paper} elevation={3}>
            <Menu
              anchorEl={anchorComp}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              id={companyId}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={isCompOpen}
              onClose={handleCompClose}
            >
              <MenuItem
                onClick={() => {
                  Mixpanel.track("Navbar -> Click About");
                  props.history.push("/about");
                }}
              >
                About Quirkshop
              </MenuItem>
              <MenuItem
                onClick={() => {
                  Mixpanel.track("Navbar -> Click Host");
                  props.history.push("/host");
                }}
              >
                How Hosting Works
              </MenuItem>
            </Menu>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  const handleToggle = (event) => {
    // setOpen((prevOpen) => !prevOpen);
    Mixpanel.track("Navbar -> Click Menu Toggle");
    setOpen(!open);
    // setAnchorEl(event.currentTarget);
  };

  const handleCompanyToggle = (event) => {
    // setOpen((prevOpen) => !prevOpen);
    Mixpanel.track("Navbar -> Click Company Toggle");
    setIsCompany(!isCompany);
    // setAnchorEl(event.currentTarget);
  };

  // console.log("UID" + uid)
  const [logout] = useMutation(LOGOUT_USER, {
    update(client, { data }) {
      // //debugger
      client.writeData({
        data: { isLoggedIn: false, currentUserId: null },
      });
    },
  });
  function handleLogOut(uid) {
    logout({ variables: { uid } }).then(
      (result) => {
        // success callback
        // //debugger
        Mixpanel.track("Logout Success");
        localStorage.removeItem("auth-token");
        localStorage.removeItem("isLoggedIn");
        props.history.push("/");
        window.location.reload();
        // setAnchorEl(null);
        handleClose();
      },
      (error) => {
        // //debugger
        // error callback
        Mixpanel.track("Logout Error", {
          error: error,
        });
        console.log(error);
      }
    );
  }
  var link =
    "https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://www.quirkshop.org/stripe&client_id=ca_GjCT2mYqAkWgs8TwoZqoPUEG6wutsD1P&suggested_capabilities[]=card_payments&stripe_user";

  // if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // 	link =
  // 		"https://connect.stripe.com/express/oauth/authorize?redirect_uri=http://localhost:3000/stripe&client_id=ca_GjCTzo0lMxCnEE09StxX56Z5oyAz3Ven&suggested_capabilities[]=card_payments&stripe_user";
  // } else {
  // 	link =
  // 		"https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://www.quirkshop.org/stripe&client_id=ca_GjCT2mYqAkWgs8TwoZqoPUEG6wutsD1P&suggested_capabilities[]=card_payments&stripe_user";
  // }

  const stripeClick = (stripe_account, loginLink) => {
    Mixpanel.track("Stripe Navbar");
    if (stripe_account == "") {
      window.open(link);
    } else {
      // stripe_query({variables:{username}}).then(window.open(data.loginLink))
      window.open(loginLink);
    }
    // setAnchorEl(null);
    handleClose();
  };

  // data.user.stripe_account === ""
  // ? "https://connect.stripe.com/express/oauth/authorize?redirect_uri=http://localhost:3000/stripe&client_id=ca_GjCTzo0lMxCnEE09StxX56Z5oyAz3Ven&suggested_capabilities[]=card_payments"
  // : Stripe_Data
  // ? Stripe_Data.loginLink
  // : ""

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const profileClick = () => {
    Mixpanel.track("Profile Navbar");
    props.history.push({
      pathname: `/profile/${data.user.username}`,
      state: { user: data.user },
    });
    handleClose();
  };
  const loginClick = () => {
    Mixpanel.track("Login Navbar");
    props.history.push("/login");
    handleClose();
  };

  const aboutClick = () => {
    Mixpanel.track("About Navbar");
    props.history.push("/about");
    handleClose();
  };

  const hostClick = () => {
    Mixpanel.track("Host Navbar");
    props.history.push("/host");
    handleClose();
  };

  const myquirksClick = () => {
    Mixpanel.track("Calendar Navbar");
    props.history.push({
      pathname: `/mycalendar`,
      state: { user: data.user },
    });
    handleClose();
  };

  const supportClick = () => {
    Mixpanel.track("Support Navbar");
    props.history.push("/support");
    handleClose();
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  if (loading) return null;
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ background: "white", boxShadow: "none" }}
        className={classes.toolbar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            className={classes.title}
            variant="h4"
            color="primary"
            onClick={() => {
              Mixpanel.track("Navbar -> Click Home");
              props.history.push("/home");
            }}
          >
            <Logo
              fontSize="large"
              color="primary"
              onClick={() => {
                Mixpanel.track("Navbar -> Click Home");
                props.history.push("/home");
              }}
            />
          </Typography>

          {/* <Button
							size="small"
							className={classes.button}
							onClick={() =>
								props.history.push("/about")
							}
							color="primary"
							align="right"
							className={classes.link}
						>
							Learn More
						</Button>
					 */}
          {/* <Button
						color="primary"
						ref={anchorRef}
						align="right"
						className={classes.button}
						edge="end"
						aria-controls={
							isCompany ? "menu-list-grow" : undefined
						}
						aria-haspopup="true"
						onClick={(e) => handleCompMenuOpen(e)}
					>
						Info
					</Button> */}

          {/* <Button
						size="small"
						className={classes.button}
						onClick={() => {
							Mixpanel.track("Navbar -> Click About");
							props.history.push("/about");
						}}
						color="primary"
						align="right"
						className={classes.link}
					>
						About
					</Button> */}

          <Button
            size="small"
            className={classes.button}
            color="primary"
            onClick={() => {
              Mixpanel.track("Navbar -> Click Create");
              props.history.push("/create");
            }}
            align="right"
            className={classes.link}
            startIcon={<AddIcon />}
          >
            Create
          </Button>

          <Button
            size="small"
            className={classes.button}
            onClick={() => {
              Mixpanel.track("Navbar -> Click Browse");
              props.history.push("/browse");
            }}
            color="primary"
            align="right"
            className={classes.link}
          >
            Browse
          </Button>

          {/* <Button
						size="small"
						className={classes.button}
						color="primary"
						onClick={() => {
							Mixpanel.track("Navbar -> Click Host");
							props.history.push("/host");
						}}
						align="right"
						className={classes.link}
					>
						Host
					</Button> */}

          {!isLoggedIn && (
            <>
              <Button
                size="small"
                className={classes.button}
                color="primary"
                onClick={() => {
                  Mixpanel.track("Navbar -> Click login");
                  props.history.push("/login");
                }}
                align="right"
                variant="outlined"
                className={classes.link}
              >
                Log in
              </Button>
              <Button
                size="small"
                className={classes.button}
                color="primary"
                variant="contained"
                onClick={() => {
                  Mixpanel.track("Navbar -> Click signup");
                  props.history.push("/signup");
                }}
                align="right"
                className={classes.link}
              >
                Sign up
              </Button>
            </>
          )}

          {!isLoggedIn && (
            <Button
              color="primary"
              // onClick={handleToggle}
              ref={anchorRef}
              align="right"
              className={classes.link}
              edge="end"
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={() => handleToggle()}
            >
              <MenuIcon />
            </Button>
          )}
          {isLoggedIn && data && (
            <>
              {/* <Box onClick={()=>handleToggle()}>  */}
              <Button
                // edge="end"
                size="small"
                className={classes.button}
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={() => handleToggle()}
              >
                <Avatar
                  // edge="end"

                  alt={data.user.first || ""}
                  src={
                    data.user.profile_pic
                    //  ||
                    // data.user.first ||
                    // ""
                  }
                  onClick={() => {
                    Mixpanel.track("Navbar Menu Click Avatar");
                    handleToggle();
                  }}
                />
              </Button>
              {/* </Box> */}
            </>
          )}
          <Popper
            className={classes.popper}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
          >
            {({ TransitionProps, placement }) => (
              <Grow {...TransitionProps}>
                <Paper className={classes.paper} elevation={3}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      {/* {!isLoggedIn && (
												<MenuItem
													onClick={() =>
														loginClick()
													}
												>
													Login
												</MenuItem>
											)} */}
                      {isLoggedIn && (
                        <MenuItem onClick={() => profileClick()}>
                          Profile
                        </MenuItem>
                      )}
                      {isLoggedIn && (
                        <MenuItem onClick={() => myquirksClick()}>
                          My Calendar
                        </MenuItem>
                      )}
                      {isLoggedIn && data && Stripe_Data && (
                        <MenuItem
                          onClick={() =>
                            stripeClick(
                              data.user.stripe_account,
                              Stripe_Data.loginLink
                            )
                          }
                        >
                          My Money
                        </MenuItem>
                      )}
                      <MenuItem onClick={supportClick}>Support</MenuItem>
                      <MenuItem onClick={aboutClick}>
                        How Quirkshop Works
                      </MenuItem>
                      <MenuItem onClick={hostClick}>How Hosting Works</MenuItem>
                      {isLoggedIn && (
                        <MenuItem onClick={() => handleLogOut(uid)}>
                          Logout
                        </MenuItem>
                      )}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </AppBar>
      {companyMenu}
    </div>
  );
};

export default withRouter(NavBar);
