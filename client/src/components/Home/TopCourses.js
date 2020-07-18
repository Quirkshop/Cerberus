import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TopCourseItem from './TopCourseItem';
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const TOP_COURSES = gql`
  query{
    courses{
      courseName,
      cardImageURL,
      logistics{
        city
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    maxWidth: 960,
    margin: "0 auto",
    "& > *": {
      margin: theme.spacing(1),
      width: "13vw",
      height: '280px',
      position: 'relative'
    }
  }
}));

const mockData = [
  {
    _id: "1",
    courseTitle: "Marketing 101",
    courseImg:
      "https://ctsbdc.com/wp-content/uploads/2017/10/Marketing-101-The-Fundamentals-Online-Course-at-CTSBDC.png",
    courselocation: "East Coast",
    price: "$100.00"
  },
  {
    _id: "2",
    courseTitle: "Digital Marketing 101",
    courseImg:
      "https://13p13n407tzq3x5jwg1daxox-wpengine.netdna-ssl.com/wp-content/uploads/2019/08/Color-Overlay-Dark-Blue.jpg",
    courselocation: "East Coast",
    price: "$100.00"
  },
  {
    _id: "3",
    courseTitle: "Twitter 101",
    courseImg:
      "https://bootcampdigital.com/nfs/c03/h02/mnt/52724/domains/bootcampdigital.com/html/wp-content/uploads/2014/08/Twitter-101.png",
    courselocation: "West Coast",
    price: "$200.00"
  },
  {
    _id: "4",
    courseTitle: "Learn Keynote",
    courseImg:
      "https://www.macprovideo.com/trainers/Vanacoro/tutorials/keynote-101-learn-keynote/161_512.jpg",
    courselocation: "East Coast",
    price: "$50.00"
  },
  {
    _id: "5",
    courseTitle: "Audio Editing in Adobe Audition",
    courseImg:
      "https://bagascrack.com/wp-content/uploads/2019/11/images-4-4.jpg",
    courselocation: "East Coast",
    price: "$150.00"
  }
];

const TopCourses = (props) => {
  const coursesContClasses = useStyles();
  
  const { loading, error, data } = useQuery(TOP_COURSES);
  
  return (
    <section>
      <Typography component="h1" variant="h3" align="center" color="primary">
        Top Courses
      </Typography>
      <div className={coursesContClasses.root}>
        {mockData.map(data => (
          <TopCourseItem
            key={data._id}
            id={data._id}
            title={data.courseTitle}
            img={data.courseImg}
            courselocation={data.courselocation}
            price={data.price}
          />
        ))}
      </div>
    </section>
  );
}

export default TopCourses;