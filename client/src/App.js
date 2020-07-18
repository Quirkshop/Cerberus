import React from "react";
import { Router, Switch } from "react-router-dom";
import Routes from "./Routes";
import { RoutesProvider } from "./RoutesContext";
import { createBrowserHistory } from "history";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  deepOrange,
  cyan,
  grey,
  teal,
  deepPurple,
  red,
} from "@material-ui/core/colors";
import GA from "./analytics/GoogleAnalytics";
import "./App.scss";
import { Helmet } from "react-helmet";
import { RecoilRoot } from "recoil";

const history = createBrowserHistory();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#26A69A",
    },
    secondary: {
      main: "#E1391F",
    },
    background: {
      default: "#7BD2B8",
    },
    companyOrange: {
      backgroundColor: "#EC6B34",
    },
    companyYellow: {
      backgroundColor: "#F7DFB2",
    },
    companyBlue: {
      backgroundColor: "#237094",
    },
    companyNavy: {
      backgroundColor: "#0A2955",
    },
  },
  typography: {
    fontFamily: "B612",
  },
});

const App = (props) => {
  // console.log("app props",props)
  return (
    <ThemeProvider theme={theme}>
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
      <Router history={history}>
        {GA.init() && <GA.RouteTracker />}
        <RecoilRoot>
          <RoutesProvider>
            <Switch>
              <Routes {...props} />
            </Switch>
          </RoutesProvider>
        </RecoilRoot>
      </Router>
    </ThemeProvider>
  );
};

export default App;
