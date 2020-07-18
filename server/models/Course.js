import mongoose from "mongoose";
const Schema = mongoose.Schema;
const mongooseAlgolia = require("mongoose-algolia");

const indexName =
  process.env.NODE_ENV === "production" ? "prod_courses" : "dev_courses";

const debugFlag = process.env.NODE_ENV !== "production";

const CourseSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      default: "000001",
    },
    objectID: {
      type: String,
      required: true,
      default: "000001",
    },
    search: {
      type: Object,
      required: false,
    },
    tag: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    bannerURL: {
      type: String,
      required: false,
    },
    cardImageURL: {
      type: String,
      required: false,
    },
    logistics: {
      type: Object,
      required: false,
    },
    user_list: {
      type: [String],
      required: false,
      default: [],
    },
    vip: {
      type: [String],
      required: false,
      default: [],
    },

    prereqs: {
      type: Object,
      required: false,
    },
    course_content: {
      type: Object,
      required: false,
    },
    teacher: {
      type: String,
      required: false,
    },
    stripe_account: {
      type: String,
    },
    Price: {
      type: Number,
      default: 0,
    },
    dates: {
      type: [Date],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isLive: {
      type: Boolean,
      default: false,
    },
    isVIP: {
      type: Boolean,
      default: false,
    },
    roomID: {
      type: String,
      default: "",
    },
    feedID: {
      type: String,
      default: "",
    },
    reviews: {
      type: [Object],
      default: [],
    },
    host_feedback: {
      type: [Object],
      default: [],
    },
    stars: {
      type: [Number],
      default: [],
    },
    appointments: {
      type: [Object],
      default: [],
    },
    payment: {
      type: String,
      default: "fixed",
    },
    vipNum: {
      type: Number,
      default: 0,
    },
    vipPrice: {
      type: Number,
      default: 0,
    },
    interested_users: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

CourseSchema.plugin(mongooseAlgolia, {
  appId: process.env.ALGOLIA_ID,
  apiKey: process.env.ALGOLIA_KEY,
  indexName: indexName,
  filter: function (doc) {
    return doc.isActive;
  },
  debug: debugFlag,
});

let Course = mongoose.model("courses", CourseSchema);
Course.SyncToAlgolia();
Course.SetAlgoliaSettings({
  searchableAttributes: ["tag", "search", "courseName"], //Sets the settings for this schema, see [Algolia's Index settings parameters](https://www.algolia.com/doc/api-client/javascript/settings#set-settings) for more info.
});

module.exports = mongoose.model("courses", CourseSchema);
