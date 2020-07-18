import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  uid: {
    type: String,
    required:true
  },
  first: {
    type: String
  },
  last: {
    type: String
  },
  profile_pic: {
    type:String,
    default:""
  },
  phone: {
    type: String,
    default: '',
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username:{
    type: String,
    unique: true
  },
  job_title: {
    type: String,
    default:""
  },
  company: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 20
  },
  bio: {
    type: String,
    default: ""
  },
  linkedin: {
    type: String,
    default: ""
  },
  github: {
    type: String,
    default: ""
  },
  bach_school: {
    type: String,
    default: ""
  },
  bach_major: {
    type: String,
    default: ""
  },
  masters_school: {
    type: String,
    default: ""
  },
  masters_major: {
    type: String,
    default: ""
  },
  phd_school: {
    type: String,
    default: ""
  },
  phd_major: {
    type: String,
    default: ""
  },
  appointments: {
    type: [Object],
    default: [],
    required: true
  },
  courses_taken: {
    type: [Number],
    default: [],
    required: true
  },
  courses_enrolled: {
    type: [Object],
    default: [],
    required: true
  },
  courses_interested: {
    type: [Object],
    default: [],
    required: true
  },
  isTeacher: {
    type: Boolean,
    default: true,
    required:true
  },
  courses_curr: {
    type: [Object],
    default:[],
    required: false
  },
  courses_past: {
    type: [Object],
    default:[],
    required: false
  },
  courses_upcoming: {
    type: [Object],
    default:[],
    required: false
  },
  stripe_account: {
    type: String,
    required: false,
    default:""
  }

},
{
  timestamps: true
});

module.exports = mongoose.model("users", UserSchema);