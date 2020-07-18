import React, { useState } from "react";
import { Container, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StripeSection from "./StripeSection";
import { Mixpanel } from "../../../analytics/Mixpanel";
// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");
// import Mutations from "../../../graphql/mutations";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paperModal: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const StripeForm = (props) => {
	const classes = useStyles();
	Mixpanel.track("Stripe Express Step");
	return (
		<div className={classes.root}>
			<Container className={classes.paper}>
				<StripeSection />
			</Container>
		</div>
	);
};

export default StripeForm;
