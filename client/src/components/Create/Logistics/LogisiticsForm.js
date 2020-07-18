import React, {useEffect} from "react";
import { Container, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LogisticsSection from "./LogisticsSections";
import Mutations from "../../../graphql/mutations";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center"
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	paperModal: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	}
}));

const LogisticsForm = props => {
	const classes = useStyles();
	useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])

	return (
		<div className={classes.root}>
			<Container className={classes.paper}>
				<LogisticsSection />
			</Container>
		</div>
	);
};

export default LogisticsForm;
