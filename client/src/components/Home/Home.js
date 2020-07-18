import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid, Container } from "@material-ui/core";
import Logo from "../Logo/Logo";
import Footer from "./Footer";
import HomeSearch from "../Search/HomeSearch";
import Image from "material-ui-image";
import { Helmet } from "react-helmet";
import { Mixpanel } from "../../analytics/Mixpanel";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			// display: "flex",

			maxWidth: 1500,
			justifyContent: "center",
			alignItems: "center",
			textAlign: "center",
			margin: "auto",
			height: "100%",
		},
	},
	logoDiv: {
		// justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		margin: "auto",
		height: "100%",
		width: "100%",
	},
	logo: {
		height: "40%",
		width: "40%",
		justifyContent: "center",
		alignItems: "center",
		padding: theme.spacing(2),
		marginTop: theme.spacing(10),
		[theme.breakpoints.only("xs")]: {
			marginTop: theme.spacing(1),
			height: "85%",
			width: "85%",
		},
	},
	button: {
		// height: "15%",
		// width: "15%",
		// justifyContent: "flex-start",
		// padding: theme.spacing(2)
		marginRight: theme.spacing(2),
	},
	footer: {
		// position: "absolute",
		// bottom: 0,
		width: "100%",
		position: "fixed",
		display: "flex",
		bottom: theme.spacing(0),
		justifyContent: "center",
		maxWidth: 1500,
		// alignItems: "center",
		// textAlign: "center",
		// justifyContent: 'flex-end'
	},
	searchBar: {
		marginTop: theme.spacing(2),
		// width: "100%"
	},
}));

const Home = (props) => {
	const classes = useStyles();
	Mixpanel.track("Home");
	// var USER_ID = "12148";

	// const { loading, error, data } = useQuery(USERS);
	// console.log(data);

	return (
		<div className={classes.root}>
			<Helmet
				title="Quirkshop"
				meta={[
					{
						name: "description",
						content:
							"Experience together.  A single source for connecting novices to experts for live group workshops.",
					},
					// {property: "og:type", content: "article"},
					// {property: "og:title", content: "Example title"},
					// {property: "og:image", content: `${course.bannerURL}`},
					{
						property: "og:url",
						content: `${window.location.href}`,
					},
				]}
			/>
			<div className={classes.logoDiv}>
				{/* <Logo
			className={classes.logo}
			color="primary"
			// onClick={() => props.history.push("/home")}
		/> */}
				{/* <Grid container direction="column"
			justify="center"
			alignItems="center" >
			<Grid item xs={12}> */}
				<Container className={classes.logo} maxWidth="lg">
					<Image
						// src="https://d1543jb95t9z4g.cloudfront.net/static/Group+2.png"
						src="https://d1543jb95t9z4g.cloudfront.net/static/Group+2+(3).png"
						aspectRatio={27 / 7}
						disableSpinner
					/>
				</Container>
				<Typography color="primary" variant="h2" gutterBottom>
					Quirkshop
				</Typography>
				<Typography color="textSecondary" variant="h6">
					What have you always wanted to try?
				</Typography>
				{/* </Grid>	 */}
				{/* <Grid item xs={12}> */}
				{/* <Button
					className={classes.button}
					color="primary"
					variant="contained"
					onClick={()=> props.history.push('/browse')}
				>
					Browse All
				</Button>
			
        	
				<Button
					className={classes.button}
					color="primary"
					variant="contained"
					onClick={()=> props.history.push('/host')}
				>
					Become a Guide
				</Button> */}
				{/* </Grid>	
				<Grid item xs={12}>  */}
				<Container maxWidth="sm" className={classes.searchBar}>
					<HomeSearch />
				</Container>
				{/* </Grid>
        </Grid>  */}
				{/* <div className={classes.footer}>
					<Footer />
				</div> */}
			</div>
		</div>
	);
};
export default Home;
