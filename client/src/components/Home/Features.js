import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Grid } from '@material-ui/core';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';


const useStyles = makeStyles(theme => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    featuresContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1, 0, 3),
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
    },
    featuresText:{
        marginTop: theme.spacing(1),
    },
    featuresContainer:{
        display: 'flex',
        padding: theme.spacing(1),

    },
    featuresSection:{

        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));


const Features = () => {

    const classes = useStyles();

  return (
      <div className={classes.featuresContent}>
        <Container maxWidth="xl">
            <div className={classes.featuresText}>
                <Container maxWidth="lg">
                    <Typography component="h1" variant="h3" align="center" color="primary">
                        Who We Are
                    </Typography>
                    <Typography component="h1" variant="h5" align="center" color="textSecondary" >
                    Have you always wanted to do something new but don't know where to start? You never know until you try. 
                    We get you jump started with in-person Quirkshops led by experienced hosts. 
                    Some things need to be done in person.

                    </Typography>
                </Container>
            </div>
            <div className={classes.featuresContainer}>
                <Grid container spacing={1} justify="center">
                    <Grid item className={classes.featuresSection} xs={10} sm={4}>
                        <FilterHdrIcon fontSize="large" color="primary"/>
                        <Typography variant="h5">
                           Adventure
                        </Typography>
                        <Typography  fontSize="large">
                        Explore your interests. Expand your skills. Find inspiration while meeting new people. Never stop exploring.
                        </Typography>
                    </Grid>
                    <Grid item className={classes.featuresSection} xs={10} sm={4}>
                        <FavoriteIcon fontSize="large" color="primary"/>
                        <Typography variant="h5">
                            Community
                        </Typography>
                        <Typography fontSize="large">
                        We think that new experiences pair best with camaraderie. Find your Quirksphere with in-person adventures. 
                        </Typography>
                    </Grid>
                    <Grid item className={classes.featuresSection} xs={10} sm={4}>
                        <EventAvailableIcon fontSize="large" color="primary"/>
                        <Typography variant="h5">
                            Schedule
                        </Typography>
                        <Typography fontSize="large">
                        Book quirkshops with same-day scheduling. Adventure awaits.
                        </Typography>
                    </Grid>
                    <Grid item className={classes.featuresSection} xs={10} sm={4}>
                        <HowToRegIcon fontSize="large" color="primary"/>
                        <Typography variant="h5">
                        Master Teachers
                        </Typography>
                        <Typography fontSize="large" >
                        Learn from experts who are ready to share their excitement and experience. Quirkshops that fit your vibe.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </Container>
      </div>
  );
};

export default Features;