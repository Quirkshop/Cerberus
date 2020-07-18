require("dotenv").config({ path: "../.env" });
import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
// import mongoolia from "mongoolia";
// const User = require ("./models/User");
const Course = require("./models/Course");
const users = mongoose.model("users");
// const mongooseAlgolia = require("mongoose-algolia");
// const _courses = mongoose.model("courses");
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema/typedefs";
const CourseService = require("./services/course");
// const fileUploadRoutes = require("./routes");
const bodyParser = require("body-parser");
const db = process.env.MONGO_URI;
import "moment/min/locales";
// import moment from "moment/moment";
var moment = require("moment-timezone");
// const db = require("../config/keys.js").MONGO_URI;
const app = express();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var Mixpanel = require("mixpanel");
var mixpanel;
if (process.env.NODE_ENV === "production") {
  mixpanel = Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");
} else {
  mixpanel = Mixpanel.init("b0821b4a2b08f3955b591e67f0fbc128");
}

//const path = require("path");

const startServer = async () => {
  console.log(process.env.NODE_ENV);
  console.log("db", db);
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("../client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
    });
  }

  // const endpoint = await stripe.webhookEndpoints.create({
  //   url: 'https://localhost:5000//webhook/endpoint',
  //   enabled_events: ['charge.failed', 'charge.succeeded', 'checkout.session.completed'],
  // });
  var server;
  if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "staging"
  ) {
    server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: false,
    });
  } else {
    server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: true,
    });
  }

  server.applyMiddleware({ app });

  // const algoliasearch = require("algoliasearch");
  // const client = algoliasearch(
  // 	"EYQWVYYAJN",
  // 	"d0de67fe662165d5840fd2edf1ee6889"
  // );

  // const index = client.initIndex("contacts");
  // const contactsJSON = require("./contacts.json");

  // index.saveObjects(contactsJSON, {
  // 	autoGenerateObjectIDIfNotExist: true,
  // }).then(({ objectIDs }) => {
  // 	console.log(objectIDs);
  // });

  // index.setSettings({
  // 	customRanking: ["desc(followers)"],
  // 	searchableAttributes: [
  // 		"lastname",
  // 		"firstname",
  // 		"company",
  // 		"email",
  // 		"city",
  // 		"address",
  // 	],
  // }).then(() => {
  // 	// done
  // });

  // Course.plugin(mongoolia, {
  // 	appId: "EYQWVYYAJN",
  // 	apiKey: "d0de67fe662165d5840fd2edf1ee6889",
  // 	indexName: "dev_course",
  // });

  // Course.syncWithAlgolia();
  // .then((props) => {
  // console.log(props);
  // });

  if (!db) {
    throw new Error("You must provide a string to connect to MongoDB Atlas");
  }

  await mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch((err) => console.log(err));

  // const users = mongoose.model("users");
  // const course = mongoose.model("courses");

  const PORT = process.env.PORT || 5000;

  app.post(
    "/webhook",
    bodyParser.raw({ type: "application/json" }),
    async (request, response) => {
      let event;

      try {
        event = JSON.parse(request.body);
      } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
      }

      // Handle the event
      switch (event.type) {
        case "checkout.session.completed":
          const session = event.data.object;
          const user_id = session.metadata.uid;
          const course_id = session.metadata.courseId;
          const appointments = session.metadata.appointments;
          const user_email = session.metadata.email;
          const total = session.metadata.total;
          mixpanel.people.track_charge(user_id, total);

          const course_info = await Course.find({
            uid: course_id,
          });

          // console.log(course_id)
          // const appointments1 = session.metadata.appointments1
          // const appointments2 = session.metadata.appointments2

          // const appointments = appointments1 + appointments2
          // console.log(session.metadata.appointments)
          // const course = await Course.findOne({
          // 	uid: course_id,
          // });
          var course_link = `wwww.quirkshop.org/browse/${course_id}`;

          // console.log(appointments)
          const parsed = JSON.parse(appointments);
          // console.log(parsed)
          // console.log(parsed[0].title)
          // console.log(parsed)
          mixpanel.track("Stripe Checkout Succesful", {
            appointments: parsed,
            total: total,
            uid: course_id,
          });
          var times = [];

          parsed.map((appointment) => {
            console.log(appointment);
            var time = moment(appointment.startDate)
              .tz("America/Los_Angeles")
              .format("dddd MMMM Do YYYY h:mm a z");

            // var uid = appointment.uid
            // var key = `appointments.${uid}.user_list`
            // console.log(key)
            // console.log('appointment uid', appointment.uid)
            // console.log('user id', user_id)
            // console.log('course id', course_id)
            if (appointment.isVip) {
              var link = `www.quirkshop.org/live/vip/${course_id}&${appointment.uid}`;
              times.push({ time: time, link: link });
              const course = Course.update(
                {
                  uid: course_id,
                  "appointments.id": appointment.uid,
                },
                {
                  $push: {
                    "appointments.$.vip": user_id,
                  },
                }
                // {arrayFilters : [{ "outer.uid": appointment.uid}],  multi: true}
              )
                .then((result) => {
                  var time = {
                    title: appointment.title,
                    startDate: appointment.startDate,
                    endDate: appointment.endDate,
                    id: appointment.uid,
                    isHost: false,
                    courseId: course_id,
                    isVIP: result[0].isVIP,
                  };
                  const load_u = users
                    .update(
                      { uid: user_id },
                      {
                        $push: {
                          appointments: time,
                        },
                      }
                    )
                    .then((result) => {
                      // console.log("success");
                    })
                    .catch((error) => {
                      console.log("error results", error);
                    });
                  // console.log("success result", result);
                })
                .catch((error) => {
                  console.log("error results", error);
                });
            } else {
              var link = `www.quirkshop.org/live/${course_id}&${appointment.uid}`;
              times.push({ time: time, link: link });
              const course = Course.update(
                {
                  uid: course_id,
                  "appointments.id": appointment.uid,
                },
                {
                  $push: {
                    "appointments.$.user_list": user_id,
                  },
                }
                // {arrayFilters : [{ "outer.uid": appointment.uid}],  multi: true}
              )
                .then((result) => {
                  // console.log("success result", result);
                })
                .catch((error) => {
                  console.log("error results", error);
                });
            }

            var time = {
              title: appointment.title,
              startDate: appointment.startDate,
              endDate: appointment.endDate,
              id: appointment.uid,
              isHost: false,
              courseId: course_id,
              isVIP: course_info[0].isVIP,
            };
            const load_u = users
              .update({ uid: user_id }, { $push: { appointments: time } })
              .then((result) => {
                // console.log("success");
              })
              .catch((error) => {
                console.log("error results", error);
              });
            console.log("done");
          });

          const load_c = await Course.update(
            { uid: course_id },
            { $push: { user_list: user_id } }
          ).then((result) => {
            users.find({ uid: course_info[0].teacher }).then((teacher) => {
              // console.log(result[0])

              const msg = {
                to: user_email,
                from: {
                  name: "Quirkshop",
                  email: "receipt@quirkshop.org",
                },
                templateId: "d-d828e0551baa409b84b8de70ba64185f",
                dynamic_template_data: {
                  courseName: course_info[0].courseName,
                  appointments: parsed,
                  number: parsed.length,
                  image: course_info[0].bannerURL,
                  teacher_name: teacher[0].first + " " + teacher[0].last,
                  total: total,
                  times: times,
                  course_link: course_link,
                },
              };
              sgMail
                .send(msg)
                .then((result) => {
                  console.log("success");
                })
                .catch((error) => {
                  console.log("error results", error);
                });
            });
          });

          break;
        case "payment_method.attached":
          const paymentMethod = event.data.object;
          // Then define and call a method to handle the successful attachment of a PaymentMethod.
          // handlePaymentMethodAttached(paymentMethod);
          break;
        // ... handle other event types
        default:
          // Unexpected event type
          return response.status(400).end();
      }

      // Return a response to acknowledge receipt of the event
      response.json({ received: true });
    }
  );

  app.listen(PORT, () => {
    console.log(`🚀 Our app is running on port ${PORT}`);
  });
};

startServer();
