import React, { useState, useContext } from "react";
import qs from "qs";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  connectSearchBox,
  connectHits,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch";
import "instantsearch.css/themes/algolia.css";
import { withRouter } from "react-router-dom";
import CourseList from "../Course/CourseList";
import { makeStyles } from "@material-ui/core/styles";
import { RoutesContext } from "../../RoutesContext";
import Image from "material-ui-image";
import { Container } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { Mixpanel } from "../../analytics/Mixpanel";
const searchClient = algoliasearch(
  "EYQWVYYAJN",
  "17547185802f3313facfe59832d0ab91"
);

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      // display: "flex",
      padding: theme.spacing(1, 1, 1),
      maxWidth: 1250,
      // [theme.breakpoints.only("xs")]: {
      // 	// padding: theme.spacing(1),
      // 	justify: "center",
      // },
      //   justifyContent: "center",
      //   alignItems:"center",
      //   textAlign: "center",
      margin: "auto",
      //   position: "fixed",
    },
    searchBar: {
      // display: 'flex',
      // padding: theme.spacing(1, 6, 1),
      [theme.breakpoints.only("xs")]: {
        padding: theme.spacing(1),
        justify: "center",
      },
      // position: "fixed",
      width: "auto",
    },
  },
  BannerDesktop: {
    //padding: theme.spacing(2),
    //margin: theme.spacing(4),
    // marginBottom: theme.spacing(3),
    // marginTop: theme.spacing(3),
    justifyContent: "center",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },

  BannerMobile: {
    justifyContent: "center",
    // padding: theme.spacing(2),
    // marginBottom: theme.spacing(3),
    padding: 0,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

const CourseSearch = (props) => {
  const classes = useStyles();
  const ctx = useContext(RoutesContext);
  const Hits = ({ hits }) => <CourseList data={hits} />;

  const CustomHits = connectHits(Hits);
  Mixpanel.track("Browse");
  var baseRefinement = null;

  if (props.history.location && props.history.location.state) {
    baseRefinement = props.history.location.state.searchState.query;
  }

  const indexName =
    process.env.NODE_ENV === "production" && !ctx.staging
      ? "prod_courses"
      : "dev_courses";

  //debugger;

  return (
    <div className={classes.root}>
      <Helmet title="Browse" />
      {/* <Container maxWidth='md'> */}
      <Container className={classes.BannerDesktop}>
        <Image
          src="https://d1543jb95t9z4g.cloudfront.net/static/In+The+Quirkshop+Desktop+(4).png"
          aspectRatio={44 / 10}
          disableSpinner
        />
      </Container>

      <Container className={classes.BannerMobile}>
        <Image
          src="https://d1543jb95t9z4g.cloudfront.net/static/In+The+Quirkshop+Mobil+(2).png"
          aspectRatio={265 / 100}
          disableSpinner
        />
      </Container>

      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <RefinementList attribute="search" />
        <SearchBox
          className={classes.searchBar}
          translations={{
            submitTitle: "Submit your search query.",
            resetTitle: "Clear your search query.",
            placeholder: "Search here...",
          }}
          defaultRefinement={baseRefinement}
        />
        <CustomHits />
      </InstantSearch>

      {/* </Container> */}
    </div>
  );
};

export default withRouter(CourseSearch);
