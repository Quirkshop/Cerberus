require('dotenv').config({path: '../.env'})
import mongoose from "mongoose";

const Course = require("../models/Course");
const User = require("../models/User");
//const keys = require("../../config/keys");
const secretOrKey = process.env.secretOrKey
const users = mongoose.model("users");
const courses = mongoose.model("courses");



const combineDateWithTime = (d, t) =>
{
    const date_temp = new Date(d)
    const time_temp = new Date(t)

    const date = date_temp.toDateString()
    const time = time_temp.toTimeString()
    const datetime = date +  ' ' + time
    const date_time = new Date(
        datetime
     );
    //  console.log(date_time)
   return date_time
}

const addUsertoCourse = async data => {
        //const course = session.metadata.course
    try{
        var {user_id, course_id} = data
        const course = await Course.findOne({uid: course_id})

        console.log(course.courseName)
        console.log(user_id)
        await Course.findOneAndUpdate(
          {uid:course_id},
          {$push: {user_list: user_id}})
  
        await User.findOneAndUpdate(
          {uid:user_id},
          {$push: {courses_enrolled: course}})

        return "Course Uploaded Succesfully";
        }catch(error){
            console.log(error);
            throw error;
        }
};


const createCourse = async data => {
    try{

        var { 
            title,
            description,
            // teacherID,
            // students,
            capacity,
            syllabus,
            startDate,
            endDate,
            // days,
            startTime,
            endTime,
            locations
         } = data;

         startDate = new Date(startDate).toISOString();
         endDate = new Date(endDate).toISOString();
         startTime = new Date(startTime).toISOString();
         endTime = new Date(endTime).toISOString();


         const course = new Course(
             {
                title,
                description,
                // teacherID,
                // students,
                capacity,
                syllabus,
                startDate,
                endDate,
                // days,
                startTime,
                endTime,
                locations
             },
             error => {
                if(error) throw error;
            }
         );

         course.save().catch(error => {
             console.log(error);
             throw new Error("Sorry unable to create a course. Try again later!");
         })
         return {course};
         
    } catch(error){
        console.log(error);
        throw error;
    }
};

module.exports = {createCourse, addUsertoCourse, combineDateWithTime}
