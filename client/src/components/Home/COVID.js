import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Grid, Paper } from '@material-ui/core';
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
      padding: theme.spacing(0, 0, 1),
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      [theme.breakpoints.only('xs')]: {
        padding: theme.spacing(0, 0, 0),
      },
    },
    featuresTitle:{
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        padding: theme.spacing(1,1,1),
        [theme.breakpoints.only('xs')]: {
            fontSize:30,
          },
    },
    featuresText:{
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(1,1,1),
        [theme.breakpoints.only('xs')]: {
            fontSize:18,
          },
    },
    featuresContainer:{
        display: 'flex',
        padding: theme.spacing(1),

    },
    CovidContainer:{
        display: 'flex',
        padding: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)

    },
    featuresSection:{

        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        [theme.breakpoints.only('xs')]: {
            padding: theme.spacing(1, 1, 1),
          },
    }
}));


const COVID = () => {

    const classes = useStyles();

  return (
      <div className={classes.featuresContent}>
        <Container maxWidth="xl">
            <div className={classes.featuresContent}>
                <Paper className={classes.featuresSection}  maxWidth="lg" elevation={8}>
                    {/* <Container className={classes.CovidContainer}> */}
                    <Typography className={classes.featuresTitle} component="h1" variant="h3" align="center" color="primary">
                    COVID-19 Update:
                    </Typography>
                    <Typography className={classes.featuresText} component="h1" variant="h5" align="center" color="textSecondary" >
                    Due to the ongoing situation we have suspended all in person quirkshops.  In an effort to support local businesses
                    and our Quirk community we are excited to launch QuirkStream - the Quirkshop livestream experience. 
                     {/* Continue to
                    host the same way you always have but now reach an audience anywhere and everywhere.
                    Provide an escape in these ever changing times. */}

                    </Typography>
                    {/* <Typography className={classes.featuresText} component="h1" variant="h5" align="center" color="textSecondary" >
                    We are also lowering our fees for the duration of the lockdown to support our hosts.
                    The Quirkshop team looks forward to launching QuirkStream as soon as possible.  Stay healthy and safe!

                    </Typography> */}
                    {/* </Container> */}
                </Paper>
            </div>
        </Container>
            
      </div>
  );
};

export default COVID;
