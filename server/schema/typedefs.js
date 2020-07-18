//const userSchema = require('./user');
//const teacherSchema = require( './teacher')

import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    uid: String
    profile_pic: String
    first: String!
    last: String!
    email: String!
    username: String
    phone: String
    password: String!
    bio: String
    job_title: String
    company: String
    linkedin: String
    github: String
    bach_school: String
    bach_major: String
    masters_school: String
    masters_major: String
    phd_school: String
    phd_major: String
    appointments: [myAppointment]
    courses_taken: [Course]
    courses_enrolled: [Course]
    courses_interested: [Course]
    isTeacher: Boolean!
    courses_curr: [Course]
    courses_past: [Course]
    courses_upcoming: [Course]
    loggedIn: [Boolean!]
    stripe_account: String
    _id: ID!
    token: String!
    #date: Date
  }

  scalar Date

  type Logistics {
    Address: String
    City: String
    state: String
    Days: [Boolean]
    Weeks: Int
    Capacity: Int
    startTime: Date
    Duration: Int
  }

  type PQ {
    SkillLevel: Int
    Materials: [String]
    preRequisites: [String]
  }

  type time {
    title: String
    startDate: Date
    endDate: Date
    uid: String
    user_list: [String]
    vip: [String]
    roomID: String
    feedID: String
    isHost: Boolean
    courseId: String
    id: Int
    isVIP: Boolean
  }

  type myAppointment {
    title: String
    startDate: Date
    endDate: Date
    uid: String
    isHost: Boolean
    courseId: String
    id: Int
    isVIP: Boolean
  }

  input updateAppointment {
    title: String
    startDate: Date
    endDate: Date
    uid: String
    user_list: [String]
    vip: [String]
    roomID: String
    feedID: String
    isHost: Boolean
    courseId: String
    id: Int
  }

  input Appointment {
    title: String
    startDate: Date
    endDate: Date
    uid: Int
    price: Int
    isVip: Boolean
  }

  input schedule {
    title: String
    startDate: Date
    endDate: Date
    id: Int
    isVIP: Boolean
  }

  type Week {
    topics: [String]
    learning_objectives: [String]
    videoURL: String
    additionalResources: [String]
    attendance: [String]
  }

  type Course_Content {
    overview: String
    learning_objectives: [String]
    teacher_qual: String
    weeks: [Week]
  }

  type Search {
    courseName: String
    tag: String
    course_content: Course_Content
    prereqs: PQ
    logistics: Logistics
  }

  type Course {
    uid: String!
    objectID: String!
    search: Search
    tag: String
    courseName: String!
    bannerURL: String
    stripe_account: String
    cardImageURL: String
    logistics: Logistics
    user_list: [String]
    vip: [String]
    prereqs: PQ
    course_content: Course_Content
    teacher: String
    ratings: [Int]
    Price: Int
    dates: [Date]
    isActive: Boolean
    isLive: Boolean
    roomID: String
    feedID: String
    stars: [Int]
    reviews: [review]
    host_feedback: [review]
    appointments: [time]
    payment: String
    isVIP: Boolean
    vipNum: Int
    vipPrice: Int
    interested_users: [String]
  }

  type LoggedIn {
    user: User
    loggedIn: Boolean
    token: String
    _id: String
  }
  type S3Payload {
    signedRequest: String!
    url: String
  }

  type liveConfig {
    roomID: String
    feedID: String
  }

  type review {
    uid: String
    first: String
    last: String
    stars: Int
    text: String
  }

  type Query {
    users: [User]
    user(uid: String): User
    username(username: String): User
    courses: [Course]
    course(courseId: String): Course
    login(email: String!, password: String!, isGoogle: Boolean): LoggedIn
    myCourses(username: String): [Course]
    myQuirks(username: String): [Course]
    enrolled_users(courseId: String): [User]
    appointment(courseId: String, appointmentId: String): Course
    stripePayment(
      courseId: String

      Price: Float
      appointments: [String]
      user_id: String
    ): String
    stripeConnect(access_code: String, uid: String): Boolean
    loginLink(uid: String): String

    liveInfo(courseId: String, appointmentId: String): liveConfig

    avatarInfo(user_list: [String]): [User]
  }

  type Mutation {
    register(
      first: String!
      last: String!
      username: String!
      email: String!
      password: String!
      isTeacher: Boolean!
    ): LoggedIn

    addEmail(email: String): Boolean

    stripePay(
      courseId: String!
      total: Float
      appointments: [Appointment]
      user_id: String
    ): String

    logOut(uid: String!): LoggedIn

    verifyUser(token: String!): LoggedIn

    saveStreamReview(
      stars: Int
      text: String
      courseId: String
      uid: String
      first: String
      last: String
    ): review

    saveHostReview(
      stars: Int
      text: String
      courseId: String
      uid: String
      first: String
      last: String
    ): review

    createCourse(
      teacher: String
      stripe_account: String
      tag: String
      courseName: String
      Price: Int
      Address: String
      City: String
      state: String
      Capacity: Int
      Duration: Int
      overview: String
      learning_objectives: [String]
      teacher_qual: String
      dates: [Date]
      startTime: Date
      SkillLevel: Int
      Materials: [String]
      preRequisites: [String]
      bannerURL: String
      cardImageURL: String
      isLive: Boolean
      schedule: [schedule]
      payment: String
      isVIP: Boolean
      vipNum: Int
      vipPrice: Int
    ): Course

    updateCourse(
      uid: String
      tag: String
      courseName: String
      Price: Int
      Address: String
      City: String
      state: String
      Capacity: Int
      Duration: Int
      overview: String
      learning_objectives: [String]
      teacher_qual: String
      date: Date
      startTime: Date
      SkillLevel: Int
      Materials: [String]
      preRequisites: [String]
      bannerURL: String
      cardImageURL: String
      isLive: Boolean
      schedule: [updateAppointment]
    ): Course

    addtoClass(
      user_id: String
      courseId: String
      appointments: [Appointment]
    ): String

    login(email: String!, password: String!, isGoogle: Boolean): LoggedIn

    admin(email: String!, password: String!): Boolean

    s3upload(filename: String, filetype: String): S3Payload

    updateURL(url: String, username: String): String

    updateUserInfo(
      email: String!
      bio: String
      job_title: String
      company: String
      linkedin: String
      github: String
      bach_school: String
      bach_major: String
      masters_school: String
      masters_major: String
      phd_school: String
      phd_major: String
    ): User

    deleteCourse(uid: String): Boolean

    publishCourse(uid: String): Boolean

    updateLiveInfo(
      courseId: String
      appointmentId: Int
      roomID: String
      feedID: String
    ): liveConfig

    notifyHost(user: String, host: String, courseId: String): Boolean
  }
`;
