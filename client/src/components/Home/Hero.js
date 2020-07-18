import React from "react";
import { Typography, Container, Grid, Button } from "@material-ui/core";
import { withRouter } from "react-router";
import Image from "material-ui-image";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(2, 0, 8),
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
	},
	heroText: {
		marginTop: theme.spacing(4),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	heroContainer: {
		// flexGrow: 1,
		display: "flex",
		flexDirection: "row",
		alignContent: "space-between",

		// width:"auto",
	},
	heroDescription: {
		// flexGrow: 2,
		// display: "flex",
		// flexDirection: "column",
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		// backgroundColor: theme.palette.secondary.main,
		// marginLeft: theme.spacing(1),
		// marginRight: theme.spacing(1)
	},
}));

const Hero = (state) => {
	const classes = useStyles();

	return (
		<div className={classes.heroContent}>
			<Grid container spacing={2} justify="left">
				<Grid item xs={12} sm={6} zeroMinWidth>
					<Container maxWidth="sm">
						<div className={classes.heroText}>
							<Typography
								component="h1"
								variant="h2"
								align="left"
								color="Primary"
								gutterBottom
							>
								Quirkshop
							</Typography>
							<Typography
								variant="h5"
								align="left"
								color="textSecondary"
								paragraph
							>
								Discover something new
							</Typography>
						</div>
						<div className={classes.heroButtons}>
							<Grid container spacing={2} justify="left">
								<Grid item xs="auto" zeroMinWidth>
									<Button
										variant="contained"
										color="primary"
										onClick={() =>
											state.history.push(
												"/browse"
											)
										}
									>
										Find a Quirk
									</Button>
								</Grid>
								<Grid item xs="auto" zeroMinWidth>
									<Button
										variant="outlined"
										color="primary"
										onClick={() =>
											state.history.push(
												"/host"
											)
										}
									>
										Host a Quirkshop
									</Button>
								</Grid>
							</Grid>
						</div>
					</Container>
				</Grid>
				<Grid item xs={12} sm={6} zeroMinWidth>
					<Container maxWidth="lg">
						<Image
							src="https://d1543jb95t9z4g.cloudfront.net/static/quirkshop.jpg"
							aspectRatio={16 / 9}
							disableSpinner
						/>
					</Container>
				</Grid>
			</Grid>

			{/* </Container> */}
		</div>
	);
};

export default withRouter(Hero);
