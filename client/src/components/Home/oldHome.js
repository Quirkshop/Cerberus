import React from 'react';
import Footer from './Footer';
import Hero from './Hero';
import Features from './Features';
import COVID from './COVID';
import { makeStyles } from "@material-ui/core/styles";
import {CssBaseline} from "@material-ui/core";
// import TopCourses from './TopCourses';
import './Home.scss'
import ClassSection from '../Create/Logistics/LogisticsSections';
// import {USERS}  from '../../graphql/queries';
// import { useQuery } from '@apollo/react-hooks';
const useStyles = makeStyles(theme => ({
  root: {
		"& > *": {
		
     // display: "flex",
     
      maxWidth:1500,
      justifyContent: "center",
      alignItems:"center",
      textAlign: "center",
      margin: "auto",
			
    },
  }
}))

const Home = () => {
  const classes = useStyles();
  // const { loading, error, data } = useQuery(USERS);
  // console.log(data);

  return (
    
    <div className={classes.root}>
      
        <COVID/>
        <Hero/>
        
        {/* <TopCourses /> */}
        <Features/>
        <Footer/>
    </div>
  )
}
export default Home;