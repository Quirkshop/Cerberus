import React from "react";
import { withRouter } from "react-router";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { CardActions } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#eaeaea",
    cursor: "pointer"
  },
  image: {
    objectFit: "cover"
  },
  courseTitle: {
    fontWeight: 600,
    fontSize: 15,
    textAlign: "center"
  },
  courseDetails: {
    paddingTop: 5,
    paddingBottom: 0,
    textAlign: "center"
  },
  bottomDetails:{
    display: 'flex',
    flexDirection: "column",
    position: 'absolute',
    bottom: 0,
    width: '-webkit-fill-available',
    textAlign: 'center'
  }
});


const TopCourseItem = (props) => {
  const itemClasses = useStyles();

  return (
    <Card
      raised
      className={itemClasses.root}
      onClick={() => props.history.push(`/browse/${props.id}`)}
    >
      <CardMedia
        component="img"
        alt="class Image"
        image={props.img}
        height="150"
        width="100%"
        className={itemClasses.image}
      />
      <CardContent className={itemClasses.courseDetails}>
        <Typography
          gutterBottom
          variant="h6"
          component="h6"
          className={itemClasses.courseTitle}
        >
          {props.title}
        </Typography>
      </CardContent>
      <CardActions className={itemClasses.bottomDetails}>
        <Typography gutterBottom variant="subtitle2">
          {props.courselocation}
        </Typography>
        <Button
          size="small"
          color="primary"
          onClick={() => props.history.push(`/browse/${props.id}`)}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

export default withRouter(TopCourseItem);