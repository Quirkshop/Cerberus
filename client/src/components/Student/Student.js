import React from "react";
import { Typography, Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "material-ui-image";

const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			margin: theme.spacing(1)
		}
	},
	fab: {
		position: "absolute",
		bottom: theme.spacing(2),
		right: theme.spacing(2)
	},
	extendedIcon: {
		marginRight: theme.spacing(1)
	},
	whyContainer: {
		flexGrow: 1,
		display: "flex",
		flexDirection: "row"
	},
	whyDescription: {
		display: "flex",
		flexDirection: "column",
		// backgroundColor: theme.palette.secondary.main,
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	whyPaper: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(1)
	}
}));

const Teacher = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Container maxWidth="lg">
				<Image
					// src={student_pic}
					aspectRatio={16 / 9}
					disableSpinner
				/>
			</Container>
			<Container maxWidth="xs">
				<Typography variant="h4" color="primary" align="left">
					Learn with Kyron
				</Typography>
			</Container>
			<Grid
				className={classes.whyContainer}
				container
				spacing={2}
				alignItems="left"
			>
				<Grid
					className={classes.whyDescription}
					item
					xs={8 / 3}
					zeroMinWidth
				>
					<Container maxWidth="xs">
						<Typography
							variant="h5"
							color="textPrimary"
							align="center"
						>
							Build your Tribe
						</Typography>
						<Typography
							variant="subtitle1"
							color="textSecondary"
							align="left"
						>
							Make meaningful connections with in-person
							classes. Kyron offers a platform for you to
							grow, consolidating your ideas and giving you
							access to a broad audience.
						</Typography>
					</Container>
				</Grid>
				<Grid
					className={classes.whyDescription}
					item
					xs={8 / 3}
					zeroMinWidth
				>
					<Paper
						className={classes.whyPaper}
						variant="elevation"
						elevation={4}
					>
						<Container maxWidth="xs">
							<Typography
								variant="h5"
								color="textPrimary"
								align="center"
							>
								Earn Money
							</Typography>
							<Typography
								variant="subtitle1"
								color="textSecondary"
								align="left"
							>
								You have the expertise. Monetize it in a
								fulfilling and fun way, connecting with
								eager learners. Take the next steps in
								building your brand by teaching a class.{" "}
							</Typography>
						</Container>
					</Paper>
				</Grid>
				<Grid
					className={classes.whyDescription}
					item
					xs={8 / 3}
					zeroMinWidth
				>
					<Paper
						className={classes.whyPaper}
						variant="elevation"
						elevation={4}
					>
						<Container maxWidth="xs">
							<Typography
								variant="h5"
								color="textPrimary"
								align="center"
							>
								Filler Text
							</Typography>
							<Typography
								variant="subtitle1"
								color="textSecondary"
								align="left"
							>
								Lorem Ipsum is simply dummy text of the
								printing and typesetting industry. Lorem
								Ipsum has been the industry's standard
								dummy text ever since the 1500s, when an
								unknown printer took a galley of type
								and scrambled it to make a type specimen
								book. It has survived not only five
								centuries, but also the leap into
								electronic typesetting, remaining
								essentially unchanged.
							</Typography>
						</Container>
					</Paper>
				</Grid>
			</Grid>
			<Container>
				<Typography variant="h4" color="primary" align="left">
					Teach in 3 Steps
				</Typography>
			</Container>
			<Grid
				className={classes.whyContainer}
				container
				spacing={2}
				alignItems="left"
			>
				<Grid
					className={classes.whyDescription}
					item
					xs={8 / 3}
					zeroMinWidth
				>
					<Paper
						className={classes.whyPaper}
						variant="elevation"
						color=""
						elevation={4}
					>
						<Container maxWidth="xs">
							<Typography
								variant="h5"
								color="textPrimary"
								align="center"
							>
								Filler Text
							</Typography>
							<Typography
								variant="subtitle1"
								color="textSecondary"
								align="left"
							>
								Lorem Ipsum is simply dummy text of the
								printing and typesetting industry. Lorem
								Ipsum has been the industry's standard
								dummy text ever since the 1500s, when an
								unknown printer took a galley of type
								and scrambled it to make a type specimen
								book. It has survived not only five
								centuries, but also the leap into
								electronic typesetting, remaining
								essentially unchanged.
							</Typography>
						</Container>
					</Paper>
				</Grid>
				<Grid
					className={classes.whyDescription}
					item
					xs={8 / 3}
					zeroMinWidth
				>
					<Paper
						className={classes.whyPaper}
						variant="elevation"
						elevation={4}
					>
						<Container maxWidth="xs">
							<Typography
								variant="h5"
								color="textPrimary"
								align="center"
							>
								Filler Text
							</Typography>
							<Typography
								variant="subtitle1"
								color="textSecondary"
								align="left"
							>
								Lorem Ipsum is simply dummy text of the
								printing and typesetting industry. Lorem
								Ipsum has been the industry's standard
								dummy text ever since the 1500s, when an
								unknown printer took a galley of type
								and scrambled it to make a type specimen
								book. It has survived not only five
								centuries, but also the leap into
								electronic typesetting, remaining
								essentially unchanged.
							</Typography>
						</Container>
					</Paper>
				</Grid>
				<Grid
					className={classes.whyDescription}
					item
					xs={8 / 3}
					zeroMinWidth
				>
					<Paper
						className={classes.whyPaper}
						variant="elevation"
						elevation={4}
					>
						<Container maxWidth="xs">
							<Typography
								variant="h5"
								color="textPrimary"
								align="center"
							>
								Filler Text
							</Typography>
							<Typography
								variant="subtitle1"
								color="textSecondary"
								align="left"
							>
								Lorem Ipsum is simply dummy text of the
								printing and typesetting industry. Lorem
								Ipsum has been the industry's standard
								dummy text ever since the 1500s, when an
								unknown printer took a galley of type
								and scrambled it to make a type specimen
								book. It has survived not only five
								centuries, but also the leap into
								electronic typesetting, remaining
								essentially unchanged.
							</Typography>
						</Container>
					</Paper>
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={2}>
					<Typography variant="h4" color="primary" align="left">
						FAQ's
					</Typography>
				</Grid>
			</Grid>
			{/* <Payment/> */}
		</div>
	);
};

export default Teacher;
