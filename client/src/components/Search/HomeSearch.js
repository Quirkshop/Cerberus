import React, { useState } from "react";
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
} from "react-instantsearch-dom";
import { TextField } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import algoliasearch from "algoliasearch";
import "instantsearch.css/themes/algolia.css";
import { Mixpanel } from "../../analytics/Mixpanel";
// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const DEBOUNCE_TIME = 400;

const searchClient = algoliasearch(
  "EYQWVYYAJN",
  "17547185802f3313facfe59832d0ab91"
);

// Returns a slug from the category name.
// Spaces are replaced by "+" to make
// the URL easier to read and other
// characters are encoded.
function getCategorySlug(name) {
  return name
    .split(" ")
    .map(encodeURIComponent)
    .join("+");
}

// Returns a name from the category slug.
// The "+" are replaced by spaces and other
// characters are decoded.
function getCategoryName(slug) {
  return slug
    .split("+")
    .map(decodeURIComponent)
    .join(" ");
}

const createURL = (state) => {
  const isDefaultRoute =
    !state.query &&
    state.page === 1 &&
    state.refinementList &&
    state.refinementList.brand.length === 0 &&
    state.menu &&
    !state.menu.categories;

  if (isDefaultRoute) {
    return "";
  }

  const categoryPath = state.menu.categories
    ? `${getCategorySlug(state.menu.categories)}/`
    : "";
  const queryParameters = {};

  if (state.query) {
    queryParameters.query = encodeURIComponent(state.query);
  }
  if (state.page !== 1) {
    queryParameters.page = state.page;
  }
  if (state.refinementList.brand) {
    queryParameters.brands = state.refinementList.brand.map(encodeURIComponent);
  }

  const queryString = qs.stringify(queryParameters, {
    addQueryPrefix: true,
    arrayFormat: "repeat",
  });

  return `/search/${categoryPath}${queryString}`;
};

const searchStateToUrl = (searchState) =>
  searchState ? createURL(searchState) : "";

const urlToSearchState = (location) => {
  const pathnameMatches = location.pathname.match(/search\/(.*?)\/?$/);
  const category = getCategoryName(
    (pathnameMatches && pathnameMatches[1]) || ""
  );
  const { query = "", page = 1, brands = [] } = qs.parse(
    location.search.slice(1)
  );
  // `qs` does not return an array when there's a single value.
  const allBrands = Array.isArray(brands) ? brands : [brands].filter(Boolean);

  return {
    query: decodeURIComponent(query),
    page,
    menu: {
      categories: decodeURIComponent(category),
    },
    refinementList: {
      brand: allBrands.map(decodeURIComponent),
    },
  };
};

const HomeSearch = ({ location, history }) => {
  const [searchState, setSearchState] = useState(urlToSearchState(location));

  const onSearchStateChange = (updatedSearchState) => {
    setSearchState(updatedSearchState);
  };

  const keyPressHandler = (event) => {
    // console.log("here");

    if (event.key === "Enter") {
      console.log("ENTER\n");
      Mixpanel.track("home search", {
        searchstate: searchState,
      });
      history.push({
        pathname: "/browse",
        state: {
          searchState: searchState,
        },
      });
      // //debugger;
    }
  };
  const indexName =
    process.env.NODE_ENV === "production" ? "prod_courses" : "dev_courses";

  return (
    <div>
      <InstantSearch
        searchClient={searchClient}
        indexName={indexName}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
      >
        <RefinementList attribute="tag" />
        <SearchBox
          translations={{
            submitTitle: "Submit your search query.",
            resetTitle: "Clear your search query.",
            placeholder: "Search here...",
          }}
          onKeyPress={keyPressHandler}
        />
      </InstantSearch>
    </div>
  );
};

export default withRouter(HomeSearch);
