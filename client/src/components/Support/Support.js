import React from "react";
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Divider, Link } from "@material-ui/core";
import Image from "material-ui-image";
import { Mixpanel } from "../../analytics/Mixpanel";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	divider: {
		marginBottom: theme.spacing(5),
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	avatar: {
		margin: theme.spacing(1),
	},
	avatarText: {
		marginTop: theme.spacing(2),
	},
	image: {
		height: "auto",
		width: "100%",
		marginTop: 10,
	},
	button: {
		justifyContent: "center",
		margin: "0 auto",
		marginTop: theme.spacing(2),
		marginBottom: 10,
		display: "flex",
	},
	divider: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		width: "100%",
	},
}));

const Support = (props) => {
	Mixpanel.track("Support");
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Container
				className={classes.paper}
				component="main"
				maxWidth="sm"
			>
				<Typography
					className={classes.avatarText}
					variant="h4"
					color="Primary"
					align="center"
				>
					Get in touch with us
				</Typography>
				<Typography
					className={classes.avatarText}
					variant="h6"
					color="textPrimary"
					align="center"
				>
					We are here to help with any questions or concerns.
					Email the Quirkshop team at contact@quirkshop.org.
				</Typography>
				<Divider className={classes.divider} />
				<Link
					color="inherit"
					onClick={() => props.history.push("/terms")}
					target="_blank"
				>
					<Typography
						variant="subtitle1"
						color="Primary"
						align="center"
					>
						Terms of Use, Community Policy & Standards,
						Privacy Policy, Service Fees, and Cookie Policy
					</Typography>
				</Link>
			</Container>
		</div>
	);
};

export default withRouter(Support);
