require("dotenv").config({ path: "../.env" });
import { User } from "./models/User";

import mongoose from "mongoose";
import aws from "aws-sdk";
import "moment/min/locales";
import { UniqueDirectivesPerLocationRule } from "graphql";
// import moment from "moment/moment";
var moment = require("moment-timezone");

const mongooseAlgolia = require("mongoose-algolia");
const users = mongoose.model("users");

const AuthService = require("./services/auth");
const CourseService = require("./services/course");
const Course = require("./models/Course");

const multer = require("multer");
const uuidv1 = require("uuid/v1");

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const stripe = require("stripe")(STRIPE_SECRET_KEY);
const sgMail = require("@sendgrid/mail");
const sgClient = require("@sendgrid/client");
var Mixpanel = require("mixpanel");
var mixpanel;
if (process.env.NODE_ENV === "production") {
  mixpanel = Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");
} else {
  mixpanel = Mixpanel.init("b0821b4a2b08f3955b591e67f0fbc128");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgClient.setApiKey(process.env.SENDGRID_API_KEY);

var unirest = require("unirest");
const mult_storage = multer.memoryStorage();
var upload = multer({ storage: mult_storage });

export const resolvers = {
  Query: {
    users: () => users.find({}),
    courses: () => Course.find({ isActive: true }),
    user: async (_, { uid }) => users.findOne({ uid: uid }),
    username: async (_, { username }) => users.findOne({ username: username }),
    course: async (_, { courseId }) => Course.findOne({ uid: courseId }),
    login: async (_, data) => {
      const token = AuthService.login(data);
      return token;
      if (token) {
        return true;
      } else {
        return false;
      }
    },
    myCourses: async (_, { username }) => {
      const user = await users.findOne({ username: username });
      const course_array = user.courses_enrolled;
      if (course_array) {
        console.log("found courses!");
        return course_array;
      } else {
        console.log("did not find courses :(");
        return course_array;
      }
    },
    myQuirks: async (_, { username }) => {
      const user = await users.findOne({ username: username });
      const course_array = user.courses_curr;
      if (course_array) {
        console.log("found courses!");
        return course_array;
      } else {
        console.log("did not find courses :(");
        return course_array;
      }
    },

    stripePayment: async (_, { courseId, Price, appointments, user_id }) => {
      var failure;
      var success;
      const user = await users.findOne({ uid: user_id });
      const course = await Course.findOne({ uid: courseId });
      // console.log(user.email);
      if (process.env.NODE_ENV === "development") {
        failure = `http://localhost:3000/browse/${courseId}`;
        success = `http://localhost:3000/success/${courseId}`;
      } else {
        failure = `https://www.quirkshop.org/browse/${courseId}`;
        success = `https://www.quirkshop.org/success/${courseId}`;
      }

      const session = await stripe.checkout.sessions.create(
        {
          payment_method_types: ["card"],
          customer_email: user.email,
          line_items: [
            {
              name: "Quirkshp",
              amount: Price,
              currency: "usd",
              quantity: 1,
            },
          ],
          payment_intent_data: {
            application_fee_amount: Price * 0.2,
            receipt_email: user.email,
          },
          metadata: {
            courseId: courseId,
            uid: user_id,
            appointments: appointments,
          },
          success_url: success,
          cancel_url: failure,
        },
        {
          stripeAccount: course.stripe_account,
        }
      );
      console.log(session);
      return session.id;
    },
    enrolled_users: async (_, data) => {
      const { courseId } = data;

      const course1 = await Course.findOne({ uid: courseId });

      const user_list = await users.find({
        uid: { $in: course1.user_list },
      });
      return user_list;
    },
    stripeConnect: async (_, { access_code, uid }) => {
      var connected_account_id = "";
      const connect = await stripe.oauth
        .token({
          grant_type: "authorization_code",
          code: access_code,
        })
        .then(function (response) {
          // asynchronously called
          connected_account_id = response.stripe_user_id;
        });

      const user = await users.findOneAndUpdate(
        { uid: uid },
        { stripe_account: connected_account_id },
        { new: true }
      );
      if (user) {
        return true;
      } else {
        return false;
      }
    },
    loginLink: async (_, { uid }) => {
      const user = await users.findOne({ uid: uid });
      if (user.stripe_account === "") {
        return "";
      }
      var new_link;
      const stripe_link = await stripe.accounts
        .createLoginLink(
          user.stripe_account
          // function(err, link){
          // 	console.log(link.url)
          // 	return link
          // }
        )
        .then((link) => {
          //console.log('link: ', JSON.stringify(link));
          return link.url;
        })
        .catch((e) => {
          console.log(e);
        });
      //console.log(stripe_link)
      return stripe_link;
    },
    liveInfo: async (_, { courseId, appointmentId }) => {
      const course = await Course.findOne({ uid: courseId });
      const appointment = course.appointments.find(
        (e) => e.uid === appointmentId
      );
      const roomID = appointment.roomID;
      const feedID = appointment.feedID;
      return { roomID, feedID };
    },
    avatarInfo: async (_, { user_list }) => {
      const avatars = await users.find().where("uid").in(user_list).exec();
      return avatars;
    },
  },

  Mutation: {
    register: async (_, data) => {
      const token = AuthService.register(data);
      // return token
      if (token) {
        return token;
      } else {
        return "did not register";
      }
    },
    login: async (_, data) => {
      return AuthService.login(data);
    },
    admin: async (_, data) => {
      return AuthService.admin(data);
    },
    logOut: async (_, args, ctx) => {
      return AuthService.logout({ uid: args.uid });
    },
    verifyUser: async (_, args, ctx) => {
      // console.log("args",args);
      // console.log("toke",token)
      const validUser = await AuthService.verifyUser({
        token: args.token,
      });

      // console.log("validUser:", validUser);
      if (validUser.loggedIn) {
        return AuthService.verifyUser(args);
      } else {
        // console.log('Please login or create an account');
        throw new Error("Please login or create an account");
      }
    },

    addtoClass: async (_, data) => {
      //const message = CourseService.addUsertoCourse(data)
      const { courseId, user_id, appointments } = data;
      const course_info = await Course.find({ uid: courseId });
      const purchase = await users.find({ uid: user_id });
      mixpanel.people.track_charge(user_id, 0);
      var times = [];
      var course_link = `www.quirkshop.org/browse/${courseId}`;
      appointments.map((appointment) => {
        var time = moment(appointment.startDate)
          .tz("America/Los_Angeles")
          .format("dddd MMMM Do YYYY h:mm a z");

        if (appointment.isVip) {
          var link = `www.quirkshop.org/live/vip/${courseId}&${appointment.uid}`;
          times.push({ time: time, link: link });
          const course = Course.update(
            {
              uid: courseId,
              "appointments.id": appointment.uid,
            },
            { $push: { "appointments.$.vip": user_id } }
            // {arrayFilters : [{ "outer.uid": appointment.uid}],  multi: true}
          )
            .then((result) => {
              // console.log("success result", result);
            })
            .catch((error) => {
              console.log("error results", error);
            });
        } else {
          var link = `www.quirkshop.org/live/${courseId}&${appointment.uid}`;
          times.push({ time: time, link: link });
          const course = Course.update(
            {
              uid: courseId,
              "appointments.id": appointment.uid,
            },
            { $push: { "appointments.$.user_list": user_id } }
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
          // user_list: appointment.user_list,
          // vip: appointment.vip,
          // roomID: appointment.roomID,
          // feedID: appointment.feedID,
          isHost: false,
          courseId: courseId,
          isVIP: course_info[0].isVIP,
        };

        const load_u = users
          .update({ uid: user_id }, { $push: { appointments: time } })
          .then((result) => {
            // console.log(result[0])
          });
      });
      const load_c = Course.update(
        { uid: courseId },
        { $push: { user_list: user_id } }
      ).then((result) => {
        console.log("added to course");
      });

      users.find({ uid: course_info[0].teacher }).then((result) => {
        const msg = {
          to: purchase[0].email,
          from: {
            name: "Quirkshop",
            email: "receipt@quirkshop.org",
          },
          templateId: "d-d828e0551baa409b84b8de70ba64185f",
          dynamic_template_data: {
            courseName: course_info[0].courseName,
            appointments: appointments,
            number: appointments.length,
            image: course_info[0].bannerURL,
            teacher_name: result[0].first + " " + result[0].last,
            total: 0,
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

      console.log("done");

      Course.SyncToAlgolia();
      // Course.SetAlgoliaSettings({
      // 	searchableAttributes: ["tag", "search", "courseName"], //Sets the settings for this schema, see [Algolia's Index settings parameters](https://www.algolia.com/doc/api-client/javascript/settings#set-settings) for more info.
      // });

      return "updated";
    },
    createCourse: async (_, data) => {
      const {
        teacher,
        stripe_account,
        tag,
        courseName,
        Price,
        Address,
        City,
        state,
        Capacity,
        Duration,
        overview,
        learning_objectives,
        teacher_qual,
        dates,
        startTime,
        SkillLevel,
        Materials,
        preRequisites,
        bannerURL,
        cardImageURL,
        isLive,
        schedule,
        payment,
        isVIP,
        vipNum,
        vipPrice,
      } = data;

      const weeks = [];

      const Days = [];

      const logistics = {
        Address,
        City,
        state,
        Capacity,
        Duration,
        Days,
        startTime,
      };

      const course_content = {
        overview,
        learning_objectives,
        teacher_qual,
        weeks,
      };

      const prereqs = {
        SkillLevel,
        Materials,
        preRequisites,
      };

      const search = {
        courseName,
        tag,
        course_content,
        prereqs,
        logistics,
      };

      const user_list = [teacher];

      const vip = [];
      let uid = uuidv1();
      let courseId = uid;

      // var appointments = []
      // console.log(dates)
      const appointments = schedule.map((appoint, i) => {
        // var startDate = CourseService.combineDateWithTime(date, startTime)
        // let endDate = new Date (startDate)

        // endDate.setHours(startDate.getHours() + 1)

        let title = courseName;
        let uid = uuidv1();
        // uid = uid.substr(0,10)
        let roomID = "";
        let feedID = "";
        let isHost = true;
        var startDate = appoint.startDate;
        var endDate = appoint.endDate;
        var id = appoint.id;
        var isVIP = appoint.isVIP;
        console.log(isVIP);

        var time = {
          title,
          startDate,
          endDate,
          uid,
          user_list,
          vip,
          roomID,
          feedID,
          isHost,
          courseId,
          id,
          isVIP,
        };

        return time;
      });

      let objectID = uid;

      let course = new Course({
        uid,
        objectID,
        stripe_account,
        Price,
        tag,
        search,
        courseName,
        bannerURL,
        cardImageURL,
        teacher,
        logistics,
        course_content,
        dates,
        prereqs,
        bannerURL,
        cardImageURL,
        user_list,
        vip,
        isLive,
        appointments,
        payment,
        isVIP,
        vipNum,
        vipPrice,
      });
      course
        .save()
        .then((newCourse) => {
          // console.log("newCourse", newCourse); // can be deleted
        })
        .catch((err) => {
          console.log("createCourseError", err);
          // return err
        });

      let test = await users.findOneAndUpdate(
        { uid: teacher },
        { $push: { appointments: appointments } }
      );

      Course.SyncToAlgolia();
      // Course.SetAlgoliaSettings({
      // 	searchableAttributes: ["tag", "search", "courseName"], //Sets the settings for this schema, see [Algolia's Index settings parameters](https://www.algolia.com/doc/api-client/javascript/settings#set-settings) for more info.
      // });
      return course;
    },

    s3upload: async (_, data) => {
      const { filename, filetype } = data;

      // await upload.single('file'), function(req, res) {

      //   file = req.file
      console.log(filename);
      const s3 = new aws.S3({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        region: AWS_REGION,
        signatureVersion: "v4",
      });

      const s3Params = {
        Bucket: AWS_BUCKET_NAME,
        Key: filename,
        Expires: 60,
        ContentType: filetype,
        ACL: "public-read",
      };

      const signedRequest = await s3.getSignedUrl("putObject", s3Params);
      const url = `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${filename}`;

      return { signedRequest, url };
    },

    updateURL: async (_, data) => {
      const { url, username } = data;
      const user = await users.findOneAndUpdate(
        { username: username },
        {
          profile_pic: url,
        }
      );

      return url;
    },

    updateUserInfo: async (_, data) => {
      const {
        email,
        phone,
        bio,
        job_title,
        company,
        linkedin,
        github,
        bach_school,
        bach_major,
        masters_school,
        masters_major,
        phd_school,
        phd_major,
      } = data;

      const user = await users.findOneAndUpdate(
        { email: email },
        {
          bio: bio,
          job_title: job_title,
          company: company,
          linkedin: linkedin,
          github: github,
          bach_school: bach_school,
          bach_major: bach_major,
          masters_school: masters_school,
          masters_major: masters_major,
          phd_school: phd_school,
          phd_major: phd_major,
        },
        { new: true }
      );

      return user;
    },
    updateCourse: async (_, data) => {
      const {
        uid,
        courseName,
        tag,
        Price,
        Address,
        City,
        state,
        Capacity,
        Duration,
        overview,
        learning_objectives,
        teacher_qual,
        // dates,
        startTime,
        SkillLevel,
        Materials,
        preRequisites,
        bannerURL,
        cardImageURL,
        isLive,
        schedule,
      } = data;

      const weeks = [];

      const Days = [];

      const logistics = {
        Address,
        City,
        state,
        Capacity,
        Duration,
        Days,
        startTime,
      };

      const course_content = {
        overview,
        learning_objectives,
        teacher_qual,
        weeks,
      };

      const prereqs = {
        SkillLevel,
        Materials,
        preRequisites,
      };

      const search = {
        courseName,
        tag,
        course_content,
        prereqs,
        logistics,
      };

      const appointments = schedule;
      // const appointments= schedule.map(
      // 	(
      // 		appoint,
      // 		i
      // 	) => {
      // 		// var startDate = CourseService.combineDateWithTime(date, startTime)
      // 		// let endDate = new Date (startDate)

      // 		// endDate.setHours(startDate.getHours() + 1)

      // 		let title = courseName
      // 		let uid = uuidv1();
      // 		uid = uid.substr(0,10)
      // 		let roomID = ""
      // 		let feedID = ""
      // 		let isHost = true
      // 		var startDate = appoint.startDate
      // 		var endDate = appoint.endDate

      // 		var time = {
      // 			title,
      // 			startDate,
      // 			endDate,
      // 			uid,
      // 			user_list,
      // 			vip,
      // 			roomID,
      // 			feedID,
      // 			isHost,
      // 			courseId
      // 		}

      // 	return time

      // 	})

      const course = await Course.findOneAndUpdate(
        { uid: uid },
        {
          tag,
          search,
          Price,
          courseName,
          bannerURL,
          cardImageURL,
          logistics,
          course_content,
          // dates,
          prereqs,
          bannerURL,
          cardImageURL,
          isLive,
          appointments,
        },
        { new: true }
      );

      Course.find({ uid: uid }).then((course_result) => {
        course_result[0].interested_users.map((user) => {
          users.find({ uid: user }).then((user_result) => {
            let url = `https://quirkshop.org/browse/${uid}`;
            // console.log(courseName);
            const msg = {
              to: user_result[0].email,
              from: {
                name: "Quirkshop",
                email: "notify@quirkshop.org",
              },
              templateId: "d-2bd00ac6c30347d08b41d1907f9c52fb",
              dynamic_template_data: {
                url: url,
                courseName: courseName,
              },
            };
            // console.log(msg);
            sgMail
              .send(msg)
              .then((result) => {
                // console.log("success");
                Course.update(
                  { uid: uid },
                  { $pull: { interested_users: user } }
                ).then((result) => {
                  console.log("user removed from interested user list");
                });
              })
              .catch((error) => {
                console.log("error results", error);
              });
          });
        });
      });

      Course.SyncToAlgolia();
      // Course.SetAlgoliaSettings({
      // 	searchableAttributes: ["tag", "search", "courseName"], //Sets the settings for this schema, see [Algolia's Index settings parameters](https://www.algolia.com/doc/api-client/javascript/settings#set-settings) for more info.
      // });

      return course;
    },

    deleteCourse: async (_, { uid }) => {
      const course = await Course.findOneAndUpdate(
        { uid: uid },
        {
          isActive: false,
        },
        { new: true }
      );

      Course.SyncToAlgolia();
      // Course.SetAlgoliaSettings({
      // 	searchableAttributes: ["tag", "search", "courseName"], //Sets the settings for this schema, see [Algolia's Index settings parameters](https://www.algolia.com/doc/api-client/javascript/settings#set-settings) for more info.
      // });

      if (course.isActive == false) {
        return true;
      } else {
        false;
      }
    },
    publishCourse: async (_, { uid }) => {
      const course = await Course.findOneAndUpdate(
        { uid: uid },
        {
          isActive: true,
        },
        { new: true }
      );

      Course.SyncToAlgolia();
      Course.SetAlgoliaSettings({
        searchableAttributes: ["tag", "search", "courseName"], //Sets the settings for this schema, see [Algolia's Index settings parameters](https://www.algolia.com/doc/api-client/javascript/settings#set-settings) for more info.
      });

      if (course.isActive == true) {
        return true;
      } else {
        false;
      }
    },

    updateLiveInfo: async (_, data) => {
      const { courseId, appointmentId, roomID, feedID } = data;

      const course = await Course.update(
        { uid: courseId, "appointments.id": appointmentId },
        {
          "appointments.$.roomID": roomID,
          "appointments.$.feedID": feedID,
        }
      );

      // Course.SyncToAlgolia();
      // Course.SetAlgoliaSettings({
      // 	searchableAttributes: ["tag", "search", "courseName"], //Sets the settings for this schema, see [Algolia's Index settings parameters](https://www.algolia.com/doc/api-client/javascript/settings#set-settings) for more info.
      // });
      return { roomID, feedID };
    },

    saveStreamReview: async (_, data) => {
      const { stars, text, courseId, uid, first, last } = data;
      const review = {
        uid,
        stars,
        text,
        first,
        last,
      };

      Course.findOneAndUpdate(
        { uid: courseId },
        { $push: { reviews: review, stars: stars } }
      ).catch((err) => {
        console.log("error!", err);
        throw new Error("oops! Please try again later");
      });

      Course.SyncToAlgolia();
      // Course.SetAlgoliaSettings({
      // 	searchableAttributes: ["tag", "search", "courseName"], //Sets the settings for this schema, see [Algolia's Index settings parameters](https://www.algolia.com/doc/api-client/javascript/settings#set-settings) for more info.
      // });

      return review;
    },
    saveHostReview: async (_, data) => {
      const { stars, text, courseId, uid, first, last } = data;
      const review = {
        uid,
        stars,
        text,
        first,
        last,
      };

      Course.findOneAndUpdate(
        { uid: courseId },
        { $push: { host_feedback: review } }
      ).catch((err) => {
        console.log("error!", err);
        throw new Error("oops! Please try again later");
      });

      Course.SyncToAlgolia();
      // Course.SetAlgoliaSettings({
      // 	searchableAttributes: ["tag", "search", "courseName"], //Sets the settings for this schema, see [Algolia's Index settings parameters](https://www.algolia.com/doc/api-client/javascript/settings#set-settings) for more info.
      // });

      return review;
    },
    stripePay: async (_, data) => {
      const { courseId, total, appointments, user_id } = data;
      // console.log(courseId)
      var appoint = JSON.stringify(appointments);
      var appoint1 = "";
      var appoint2 = "";

      var appoint1 = appoint.substr(0, 250);
      var appoint2 = appoint.substr(0, appoint.length - 1);

      // console.log(appoint1)
      // console.log(appoint2)

      // console.log(appoint)
      // total = total * 100
      // console.log(total)
      // const  = data
      // console.log(appointments)
      // console.log(tota)
      var failure;
      var success;
      const user = await users.findOne({ uid: user_id });
      const course = await Course.findOne({ uid: courseId });
      // console.log(user.email);
      if (process.env.NODE_ENV === "development") {
        failure = `http://localhost:3000/browse/${courseId}`;
        success = `http://localhost:3000/success/${courseId}`;
      } else {
        failure = `https://www.quirkshop.org/browse/${courseId}`;
        success = `https://www.quirkshop.org/success/${courseId}`;
      }

      const session = await stripe.checkout.sessions.create(
        {
          payment_method_types: ["card"],
          customer_email: user.email,
          line_items: [
            {
              name: "Quirkshp",
              amount: total * 100,
              currency: "usd",
              quantity: 1,
            },
          ],
          payment_intent_data: {
            // application_fee_amount: total * 100 * 0.2,
            receipt_email: user.email,
          },
          metadata: {
            courseId: courseId,
            uid: user_id,
            appointments: appoint,
            email: user.email,
            total: total,
            // appointments1: appoint1, appointments2: appoint2
          },
          success_url: success,
          cancel_url: failure,
        },
        {
          stripeAccount: course.stripe_account,
        }
      );
      // console.log(session)
      return session.id;
    },

    addEmail: async (_, { email }) => {
      var success;

      var req = unirest(
        "PUT",
        "https://api.sendgrid.com/v3/marketing/contacts"
      );

      req.headers({
        "content-type": "application/json",
        authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      });

      req.type("json");
      await req
        .send({
          contacts: [
            {
              email: email,
            },
          ],
        })
        .then((result) => {
          console.log(result.code);
          if (result.code == 202) {
            success = true;
            // console.log(success);
          } else {
            // console.log("fail");
            success = false;
            return true;
          }
        })
        .catch((error) => {
          success = false;
          console.log("error results", error);
        });

      return success;

      // var response = req.end(
      // 	function (res) {
      // 	if (res.error){
      // 		console.log(res.error);
      // 		return false
      // 	}
      //   }
      //   );
      // console.log(response)
      // if (response.error){return false}
      // if (response.body){return true}
    },
    notifyHost: async (_, { user, host, courseId }) => {
      let url = `https://quirkshop.org/browse/${courseId}`;
      Course.find({ uid: courseId }).then((result) => {
        users
          .update({ uid: user }, { $push: { courses_interested: result[0] } })
          .then((result) => {
            console.log("added to user success");
          })
          .catch((error) => {
            console.log("error results", error);
          });
      });

      Course.update({ uid: courseId }, { $push: { interested_users: user } })
        .then((result) => {
          console.log("added to course success");
        })
        .catch((error) => {
          console.log("error results", error);
        });
      Course.find({ uid: courseId }).then((course_result) => {
        users.find({ uid: host }).then((result) => {
          const msg = {
            to: result[0].email,
            from: {
              name: "Quirkshop",
              email: "notify@quirkshop.org",
            },
            // from: "notify@quirkshop.org",
            // fromname: "Quirkshop",
            templateId: "d-e517906a3d1a4a659103b5b3afe6e518",
            dynamic_template_data: {
              url: url,
              courseName: course_result[0].courseName,
              // courseName: courseName,
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
    },
  },
};
