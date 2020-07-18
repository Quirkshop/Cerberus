import gql from "graphql-tag";

const Mutations = {
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
        _id
      }
    }
  `,
  LOGIN_USER: gql`
    mutation login($email: String!, $password: String!, $isGoogle: Boolean) {
      login(email: $email, password: $password, isGoogle: $isGoogle) {
        token
        loggedIn
        _id
      }
    }
  `,
  ADMIN: gql`
    mutation admin($email: String!, $password: String!) {
      admin(email: $email, password: $password)
    }
  `,

  REGISTER_USER: gql`
    mutation register(
      $first: String!
      $last: String!
      $email: String!
      $username: String!
      $password: String!
      $isTeacher: Boolean!
    ) {
      register(
        first: $first
        last: $last
        email: $email
        username: $username
        password: $password
        isTeacher: $isTeacher
      ) {
        token
        loggedIn
        _id
      }
    }
  `,

  LOGOUT_USER: gql`
    mutation logOut($uid: String!) {
      logOut(uid: $uid) {
        _id
        loggedIn
        token
      }
    }
  `,

  ADD_USER_TO_CLASS: gql`
    mutation addtoClass(
      $user_id: String!
      $courseId: String!
      $appointments: [Appointment]
    ) {
      addtoClass(
        user_id: $user_id
        courseId: $courseId
        appointments: $appointments
      )
    }
  `,

  S3_SIGN: gql`
    mutation s3upload($filename: String!, $filetype: String!) {
      s3upload(filename: $filename, filetype: $filetype) {
        signedRequest
        url
      }
    }
  `,

  UPDATE_URL: gql`
    mutation updateURL($url: String!, $username: String!) {
      updateURL(url: $url, username: $username)
    }
  `,

  UPDATE_USER: gql`
    mutation updateUserInfo(
      $email: String!
      $bio: String
      $job_title: String
      $company: String
      $linkedin: String
      $github: String
      $bach_school: String
      $bach_major: String
      $masters_school: String
      $masters_major: String
      $phd_school: String
      $phd_major: String
    ) {
      updateUserInfo(
        email: $email
        bio: $bio
        job_title: $job_title
        company: $company
        linkedin: $linkedin
        github: $github
        bach_school: $bach_school
        bach_major: $bach_major
        masters_school: $masters_school
        masters_major: $masters_major
        phd_school: $phd_school
        phd_major: $phd_major
      ) {
        bio
        job_title
        company
        linkedin
        github
        bach_school
        bach_major
        masters_school
        masters_major
        phd_school
        phd_major
      }
    }
  `,

  CREATE_COURSE: gql`
    mutation createCourse(
      $teacher: String
      $stripe_account: String
      $tag: String
      $courseName: String
      $Price: Int
      $Address: String
      $City: String
      $state: String
      $Capacity: Int
      $overview: String
      $learning_objectives: [String]
      $teacher_qual: String
      $dates: [Date]
      $startTime: Date
      $SkillLevel: Int
      $Materials: [String]
      $preRequisites: [String]
      $bannerURL: String
      $cardImageURL: String
      $isLive: Boolean
      $schedule: [schedule]
      $payment: String
      $isVIP: Boolean
      $vipNum: Int
      $vipPrice: Int
    ) {
      createCourse(
        teacher: $teacher
        stripe_account: $stripe_account
        tag: $tag
        courseName: $courseName
        Price: $Price
        Address: $Address
        City: $City
        state: $state
        Capacity: $Capacity
        overview: $overview
        learning_objectives: $learning_objectives
        teacher_qual: $teacher_qual
        dates: $dates
        startTime: $startTime
        SkillLevel: $SkillLevel
        Materials: $Materials
        preRequisites: $preRequisites
        bannerURL: $bannerURL
        cardImageURL: $cardImageURL
        isLive: $isLive
        schedule: $schedule
        payment: $payment
        isVIP: $isVIP
        vipNum: $vipNum
        vipPrice: $vipPrice
      ) {
        uid
        courseName
        logistics {
          Address
        }
        prereqs {
          SkillLevel
        }
        course_content {
          overview
        }
      }
    }
  `,
  UPDATE_COURSE: gql`
    mutation updateCourse(
      $uid: String
      $tag: String
      $courseName: String
      $Price: Int
      $Address: String
      $City: String
      $state: String
      $Capacity: Int
      $Duration: Int
      $overview: String
      $learning_objectives: [String]
      $teacher_qual: String
      $startTime: Date
      $SkillLevel: Int
      $Materials: [String]
      $preRequisites: [String]
      $bannerURL: String
      $cardImageURL: String
      $isLive: Boolean
      $schedule: [updateAppointment]
    ) {
      updateCourse(
        uid: $uid
        tag: $tag
        courseName: $courseName
        Price: $Price
        Address: $Address
        City: $City
        state: $state
        Capacity: $Capacity
        Duration: $Duration
        overview: $overview
        learning_objectives: $learning_objectives
        teacher_qual: $teacher_qual
        startTime: $startTime
        SkillLevel: $SkillLevel
        Materials: $Materials
        preRequisites: $preRequisites
        bannerURL: $bannerURL
        cardImageURL: $cardImageURL
        isLive: $isLive
        schedule: $schedule
      ) {
        uid
        courseName
        logistics {
          Address
        }
        prereqs {
          SkillLevel
        }
        course_content {
          overview
        }
      }
    }
  `,
  DELETE_COURSE: gql`
    mutation deleteCourse($uid: String) {
      deleteCourse(uid: $uid)
    }
  `,
  PUBLISH_COURSE: gql`
    mutation publishCourse($uid: String) {
      publishCourse(uid: $uid)
    }
  `,

  UPDATE_LIVE: gql`
    mutation updateLiveInfo(
      $courseId: String
      $appointmentId: Int
      $roomID: String
      $feedID: String
    ) {
      updateLiveInfo(
        courseId: $courseId
        appointmentId: $appointmentId
        roomID: $roomID
        feedID: $feedID
      ) {
        roomID
        feedID
      }
    }
  `,
  SAVE_REVIEW: gql`
    mutation saveStreamReview(
      $stars: Int
      $text: String
      $courseId: String
      $uid: String
      $first: String
      $last: String
    ) {
      saveStreamReview(
        stars: $stars
        text: $text
        courseId: $courseId
        uid: $uid
        first: $first
        last: $last
      ) {
        uid
        stars
        text
        first
        last
      }
    }
  `,
  SAVE_FEEDBACK: gql`
    mutation saveHostReview(
      $stars: Int
      $text: String
      $courseId: String
      $uid: String
      $first: String
      $last: String
    ) {
      saveHostReview(
        stars: $stars
        text: $text
        courseId: $courseId
        uid: $uid
        first: $first
        last: $last
      ) {
        uid
        stars
        text
        first
        last
      }
    }
  `,
  STRIPE_PAY: gql`
    mutation stripePay(
      $courseId: String!
      $total: Float!
      $appointments: [Appointment]
      $user_id: String!
    ) {
      stripePay(
        courseId: $courseId
        total: $total
        appointments: $appointments
        user_id: $user_id
      )
    }
  `,
  ADD_EMAIL: gql`
    mutation addEmail($email: String!) {
      addEmail(email: $email)
    }
  `,
  NOTIFY_HOST: gql`
    mutation notifyHost($user: String, $host: String!, $courseId: String) {
      notifyHost(user: $user, host: $host, courseId: $courseId)
    }
  `,
};

export default Mutations;
