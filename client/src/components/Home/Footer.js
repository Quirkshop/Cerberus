import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(2),
	},
}));

const Copyright = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://quirkshop.org">
				quirkshop.org
			</Link>{" "}
			{new Date().getFullYear()}
			{"  |  "}
			<Link
				color="inherit"
				href={
					"https://d1543jb95t9z4g.cloudfront.net/Terms/Quirkshop+Terms+of+Use.pdf"
				}
				target="_blank"
			>
				Terms of Use
			</Link>
			{" | "}
			<Link
				color="inherit"
				href={
					"https://d1543jb95t9z4g.cloudfront.net/Terms/Quirkshop+Policy+%26+Standards.pdf"
				}
				target="_blank"
			>
				Community Policy & Standards
			</Link>
		</Typography>
	);
};

const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.footer}>
			<Typography
				variant="subtitle1"
				align="center"
				color="primary"
				component="p"
			>
				Discover something new.
			</Typography>
			<Copyright />
		</footer>
	);
};

export default Footer;
