import React from 'react';
import {
    Container,
    Paper,
    Card,
    Avatar,
    Typography, 
    CardContent
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
       flexGrow: 1,
    },
    statCard:{
        margin: theme.spacing(2),
    },
    statText:{
        padding: theme.spacing(2),
    }

}));

const ProfileStats = (props) => {


    const classes = useStyles();

    return(
        <Card variant="outlined" className={classes.statCard}>
            <CardContent>
                <Typography variant="h4" className={classes.statText} align="center">
                    Verified
                </Typography>
                <Typography className={classes.statText} align="center">
                    # Classes
                </Typography>
                <Typography className={classes.statText} align="center">
                    # Reviews
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ProfileStats;