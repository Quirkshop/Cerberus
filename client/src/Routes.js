import React, { useContext } from "react";
import { RoutesContext } from "./RoutesContext";
import { useRecoilState, useRecoilValue } from "recoil";
import { Route, Switch, withRouter } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";
import Landing from "./components/Landing/Landing";
import LandingV2 from "./components/LandingV2/LandingV2";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Support from "./components/Support/Support";
import Terms from "./components/Terms/Terms";
import NavBar from "./components/Navigation/NavBar";
import FootBar from "./components/Navigation/FootBar";
// import CourseShow from "./components/Course/CourseShow";
import Teacher from "./components/Teacher/Teacher";
import CourseSearch from "./components/Search/CourseSearch";
import CourseWrapper from "./components/Course/CourseWrapper";
import Student from "./components/Student/Student";
import PublicProfile from "./components/Profile/PublicProfile";
import ProfileWrapper from "./components/Profile/ProfileWrapper";
import ProfileRoute from "./hoc/ProfileRoute";
import MyCoursesRoute from "./hoc/MyCoursesRoute";
import AuthRoute from "./hoc/AuthRoute";
import StripeRoute from "./hoc/StripeRoute";
import CreateRoute from "./hoc/CreateRoute";
import FeedbackRoute from "./hoc/FeedbackRoute.js";
import NotFound from "./components/404/NotFound";
import Create from "./components/Create/Create";
import StreamerFeedback from "./components/Livestream/StreamerFeedback";
import HostFeedback from "./components/Livestream/HostFeedback";
import BroadcastWrapper from "./components/Livestream/BroadcastWrapper";
import StreamWrapper from "./components/Livestream/StreamWrapper";
import HostWrapper from "./components/Livestream/VIP/HostWrapper";
import VIPBroadcastWrapper from "./components/Livestream/VIP/VIPBroadcastWrapper";
import AudienceWrapper from "./components/Livestream/VIP/AudienceWrapper";
import { useQuery } from "@apollo/react-hooks";
import { IS_LOGGED_IN, GET_USER } from "./graphql/queries";
import { Dialog, DialogContent, DialogContentText } from "@material-ui/core";

import Success from "./components/Checkout/Success";
import CreateSuccess from "./components/Create/CreateSuccess";
import PrivateProfile from "./components/Profile/PrivateProfile";
import LiveRoute from "./hoc/LiveRoute";
import VIPRoute from "./hoc/VIPRoute";
import { Helmet } from "react-helmet";
import { Mixpanel } from "./analytics/Mixpanel";
// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const Routes = withRouter(({ location }) => {
  const ctx = useContext(RoutesContext);
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // const [isAdmin, setIsAdmin] = React.useState(false)
  // console.log(process.env.NODE_ENV )
  // const staging = process.env.staging === 'staging' ? true: false
  const handleClose = () => {
    ctx.setOpen(false);
  };

  if (!ctx.staging) {
    ctx.setAdmin(true);
  }
  if (loading) return null;
  ////debugger;

  const loggedIN = !data
    ? false
    : data && data.isLoggedIn
    ? data.isLoggedIn
    : false;
  const uid = !data
    ? null
    : data && data.currentUserId
    ? data.currentUserId
    : null;
  if (uid) {
    Mixpanel.identify(uid);
  }

  return (
    <div>
      <Helmet
        title="Quirkshop"
        meta={[
          {
            name: "description",
            content:
              "Experience together.  A single source for connecting novices to experts for live group workshops.",
          },
          // {property: "og:type", content: "article"},
          // {property: "og:title", content: "Example title"},
          // {property: "og:image", content: `${course.bannerURL}`},
          {
            property: "og:url",
            content: `${window.location.href}`,
          },
        ]}
      />
      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // className={classes.modal}
        open={ctx.open}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText color="textPrimary">
            <h2 id="transition-modal-title">
              It looks like the Broadcast room is not ready!
            </h2>
            <p id="transition-modal-description">
              Please refresh or wait until the start time of your quirkshop!
            </p>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {!ctx.isAdmin && <Admin />}
      {ctx.isAdmin && (
        <div>
          <NavBar isLoggedIn={loggedIN} uid={uid} />
        </div>
      )}
      {ctx.isAdmin && (
        <div>
          <Switch>
            {/* <Route exact path="/landing" component={Landing} /> */}
            <Route
              exact
              path="/"
              isLoggedIn={loggedIN}
              render={(props) => <LandingV2 isLoggedIn={loggedIN} {...props} />}
            />
            {/* <Route
              exact
              path="/landing2"
              isLoggedIn={loggedIN}
              render={(props) => <LandingV2 isLoggedIn={loggedIN} {...props} />}
            /> */}
            <Route
              exact
              path="/home"
              // component={Landing}
              isLoggedIn={loggedIN}
              render={(props) => <LandingV2 isLoggedIn={loggedIN} {...props} />}
            />
            <Route exact path="/about" component={About} />
            <Route path="/host" component={Teacher} />
            <Route path="/student" component={Student} />
            <Route path="/support" component={Support} />
            <Route path="/terms" component={Terms} />
            <AuthRoute
              path="/signup"
              component={SignUp}
              isLoggedIn={loggedIN}
              route="/"
            />
            <AuthRoute
              path="/login"
              component={Login}
              isLoggedIn={loggedIN}
              route="/"
            />
            <CreateRoute
              path="/create"
              component={Create}
              isLoggedIn={loggedIN}
              uid={uid}
              route="/signup"
            />
            {/* <Route exact path="/create" component={CreateClass} /> */}
            <Route exact path="/browse" component={CourseSearch} />
            <Route
              exact
              path="/browse/:courseId"
              uid={uid}
              // isLoggedIn={loggedIN}
              render={(props) => (
                <CourseWrapper isLoggedIn={loggedIN} uid={uid} {...props} />
              )}
            />
            <Route
              exact
              path="/success/:courseId"
              render={(props) => <Success {...props} user={data.user} />}
            />
            <Route
              exact
              path="/createSuccess/:courseId"
              render={(props) => <CreateSuccess {...props} />}
            />
            <LiveRoute
              exact
              path="/live/:courseId&:appointmentId"
              isLoggedIn={loggedIN}
              uid={uid}
              BroadcastComponent={BroadcastWrapper}
              StreamComponent={StreamWrapper}
            />
            <VIPRoute
              exact
              path="/live/vip/:courseId&:appointmentId"
              isLoggedIn={loggedIN}
              uid={uid}
              HostComponent={HostWrapper}
              VIPComponent={VIPBroadcastWrapper}
              AudienceComponent={AudienceWrapper}
            />
            <FeedbackRoute
              exact
              path="/live/feedback/:courseId"
              isLoggedIn={loggedIN}
              uid={uid}
              HostFeedback={HostFeedback}
              StreamerFeedback={StreamerFeedback}
            />
            <ProfileRoute
              exact
              path="/profile/:username" //wil contain the username of the profile you want to access
              isLoggedIn={loggedIN}
              uid={uid} //Accesing user's username
              publicComponent={PublicProfile}
              privateComponent={PrivateProfile}
              // render={(props) => <ProfileWrapper {...props} />}
            />
            <MyCoursesRoute
              exact
              path="/mycalendar" //wil contain the username of the profile you want to access
              isLoggedIn={loggedIN}
              uid={uid} //Accesing user's username
            />
            <StripeRoute
              exact
              path="/stripe" //wil contain the username of the profile you want to access
              isLoggedIn={loggedIN}
              uid={uid} //Accesing user's username
            />
            <Route exact path="/graphql" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </div>
      )}
      {ctx.isAdmin && (
        <div>
          <FootBar isLoggedIn={loggedIN} />
        </div>
      )}
    </div>
  );
});

export default Routes;
