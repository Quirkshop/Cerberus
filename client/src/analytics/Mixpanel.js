var mixpanel = require("mixpanel-browser");
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");
if (process.env.NODE_ENV === "production") {
  mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");
} else {
  mixpanel.init("b0821b4a2b08f3955b591e67f0fbc128");
}

let actions = {
  identify: (id) => {
    mixpanel.identify(id);
  },
  alias: (id) => {
    mixpanel.alias(id);
  },
  track: (name, props) => {
    // console.log("tracking event");
    mixpanel.track(name, props);
  },
  track_links: (name, props) => {
    // console.log("tracking event");
    mixpanel.track_links(name, props);
  },
  people: {
    set: (id, props) => {
      mixpanel.people.set(id, props);
    },
  },
};

export let Mixpanel = actions;
