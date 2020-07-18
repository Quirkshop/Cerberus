import gql from "graphql-tag";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
    currentUserId @client
  }
`;

export const IS_STRIPE = gql`
  query {
    stripe @client
  }
`;

export const CURRENT_USER_ID = gql`
  query fetchCurrentUserId {
    currentUserId @client
  }
`;

export const USERS = gql`
  query {
    users {
      first
      last
    }
  }
`;

export const COURSES = gql`
  query {
    courses {
      uid
      courseName
      Price
      teacher
      logistics {
        City
        state
      }
      cardImageURL
      isLive
    }
  }
`;

export const LOGIN = gql`
  query($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      loggedIn
      token
    }
  }
`;

export const GET_USER = gql`
  query($uid: String!) {
    user(uid: $uid) {
      first
      last
      username
      email
      phone
      stripe_account
      linkedin
      profile_pic
      bio
      job_title
      company
      github
      bach_school
      bach_major
      masters_school
      masters_major
      phd_school
      phd_major
      appointments {
        title
        startDate
        endDate
        uid
        isHost
        courseId
        id
        isVIP
      }
      courses_taken {
        uid
      }
      courses_enrolled {
        uid
      }
      courses_interested {
        uid
      }
      isTeacher
      courses_curr {
        uid
      }
      courses_past {
        uid
      }
      courses_upcoming {
        uid
      }
    }
  }
`;

export const GET_USER_BY_USERNAME = gql`
  query($username: String!) {
    username(username: $username) {
      uid
      first
      last
      username
      email
      stripe_account
      phone
      linkedin
      profile_pic
      bio
      job_title
      company
      github
      bach_school
      bach_major
      masters_school
      masters_major
      phd_school
      phd_major
      appointments {
        title
        startDate
        endDate
        uid
        isHost
        courseId
        id
        isVIP
      }
      courses_taken {
        uid
      }
      courses_enrolled {
        uid
      }
      courses_interested {
        uid
      }
      isTeacher
      courses_curr {
        uid
      }
      courses_past {
        uid
      }
      courses_upcoming {
        uid
      }
    }
  }
`;

export const STRIPE_CONNECT = gql`
  query stripeConnect($access_code: String, $uid: String) {
    stripeConnect(access_code: $access_code, uid: $uid)
  }
`;

export const STRIPE_LINK = gql`
  query loginLink($uid: String) {
    loginLink(uid: $uid)
  }
`;

export const MY_COURSES = gql`
  query myCourses($username: String) {
    myCourses(username: $username) {
      uid
      courseName
      bannerURL
      cardImageURL
      stripe_account
      logistics {
        Address
        City
        state
        Days
        Weeks
        Capacity
        startTime
        Duration
      }
      user_list
      prereqs {
        SkillLevel
        Materials
        preRequisites
      }
      course_content {
        overview
        teacher_qual
        learning_objectives
        weeks {
          videoURL
          topics
          additionalResources
          learning_objectives
        }
      }
      teacher
      ratings
      Price
      date
      isLive
    }
  }
`;

export const MY_QUIRKS = gql`
  query myQuirks($username: String) {
    myQuirks(username: $username) {
      uid
      courseName
      bannerURL
      cardImageURL
      stripe_account
      logistics {
        Address
        City
        state
        Days
        Weeks
        Capacity
        startTime
        Duration
      }
      user_list
      prereqs {
        SkillLevel
        Materials
        preRequisites
      }
      course_content {
        overview
        teacher_qual
        learning_objectives
        weeks {
          videoURL
          topics
          additionalResources
          learning_objectives
        }
      }
      teacher
      ratings
      Price
      date
      isLive
    }
  }
`;

export const LIVE_INFO = gql`
  query liveInfo($courseId: String, $appointmentId: String) {
    liveInfo(courseId: $courseId) {
      roomID
      feedID
    }
  }
`;

export const AVATAR_INFO = gql`
  query avatarInfo($user_list: [String]) {
    avatarInfo(user_list: $user_list) {
      first
      last
      profile_pic
    }
  }
`;

export const STRIPE_PAYMENT = gql`
  query stripePayment(
    $courseId: String!
    $Price: Float!
    $appointments: [Json]
    $user_id: String!
  ) {
    stripePayment(
      courseId: $courseId
      Price: $Price
      appointments: $appointments
      user_id: $user_id
    )
  }
`;

export const COURSE = gql`
  query course($courseId: String!) {
    course(courseId: $courseId) {
      uid
      tag
      courseName
      bannerURL
      cardImageURL
      stripe_account
      logistics {
        Address
        City
        state
        Days
        Weeks
        Capacity
        startTime
        Duration
      }
      user_list
      vip
      prereqs {
        SkillLevel
        Materials
        preRequisites
      }
      course_content {
        overview
        teacher_qual
        learning_objectives
        weeks {
          videoURL
          topics
          additionalResources
          learning_objectives
        }
      }
      teacher
      Price
      dates
      isActive
      isLive
      reviews {
        uid
        stars
        text
        first
        last
      }
      stars
      appointments {
        title
        startDate
        endDate
        uid
        user_list
        vip
        roomID
        feedID
        isHost
        courseId
        id
        isVIP
      }
      payment
      isVIP
      vipNum
      vipPrice
      interested_users
    }
  }
`;

export const ENROLLED_USERS = gql`
  query enrolled_users($courseId: String) {
    enrolled_users(courseId: $courseId) {
      uid
      first
      last
      username
      email
      phone
      linkedin
      profile_pic
      bio
      job_title
      company
      github
      bach_school
      bach_major
      masters_school
      masters_major
      phd_school
      phd_major
      courses_taken {
        uid
      }
      courses_enrolled {
        uid
      }
      courses_interested {
        uid
      }
      isTeacher
      courses_curr {
        uid
      }
      courses_past {
        uid
      }
      courses_upcoming {
        uid
      }
    }
  }
`;
