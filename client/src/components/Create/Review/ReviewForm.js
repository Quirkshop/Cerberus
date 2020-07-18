import React, {useEffect} from "react";
import { Container, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReviewSection from "./ReviewSection";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	avatar: {
		margin: theme.spacing(1),
		color: theme.palette.primary.main
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3)
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

const ReviewForm = props => {
	const classes = useStyles();
	useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])

	return (
		<div className={classes.root}>
			<Container className={classes.paper}>
				<Grid container spacing={2}>
					<ReviewSection />
				</Grid>
			</Container>
		</div>
	);
};

export default ReviewForm;
