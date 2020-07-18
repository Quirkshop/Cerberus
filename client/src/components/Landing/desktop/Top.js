import React, { useState, useContext } from "react";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { makeStyles } from "@material-ui/core/styles";
import {
	ListItem,
	Grid,
	Typography,
	Container,
	Button,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Chip,
} from "@material-ui/core";
import Image from "material-ui-image";
import { Mixpanel } from "../../../analytics/Mixpanel";
import MyTheme from "../../Theme/MyTheme";
import { grey } from "@material-ui/core/colors";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");
const text_color = grey[600];
const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		display: "flex",
		flexFlow: "column",
		// minHeight: 500,
		// justifyContent: "center",
		// alignItems: "center",
		// justify: "center",
		// // minHeight: 50vh,
		// // marginTop: 10,
		// // paddingBottom: 300,
		// maxWidth: 1500,
		// margin: "auto",
	},
	title: {
		position: "relative",
		justifyContent: "center",
	},
	dogPosition: {
		position: "relative",
		align: "center",
		left: -200,
		top: 50,

		// marginTop: 50,
		// width: 100,
	},
	dog: {
		// height: "20%",
		// width: "20%",
	},
	hostPosition: {
		position: "relative",
		align: "center",
		top: -275,
		left: 50,
		// marginTop: 50,
		// width: 0,
	},
	host: {
		height: "10%",
		width: "10%",
	},
	hostButton: {
		position: "relative",
		align: "center",
		top: 50,
		left: 135,
		// marginTop: 50,
		// width: 100,
	},
	experienceButton: {
		position: "relative",
		align: "center",
		top: 50,
		left: 0,
		// marginTop: 50,
		// width: 100,
	},
	featured: {
		position: "relative",
		align: "center",
		top: -100,
		display: "none",
		// width: "80%",
		// left: 450,
		// marginTop: 50,
		// width: 100,
	},
	gridContainer: {
		// display: 'flex',
		justify: "center",
		padding: theme.spacing(0, 0, 0),
		[theme.breakpoints.down("md")]: {
			padding: theme.spacing(0, 0, 0),
			// justify:"center",
			width: "100%",
			height: "80%",
		},
		width: "100%",
	},
	paper: {
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.background.paper,
		maxWidth: 345,
		height: 300,
		width: "90%",
		flexDirection: "row",
		flexWrap: "wrap",
		flexGrow: 1,
	},
	liveButton: {
		zIndex: 0,
		shadows: "none",
	},
	subtitle: {
		color: text_color,
	},
	title: {
		[theme.breakpoints.down("sm")]: {
			fontSize: 18,
		},
	},
	chipGrid: {
		// marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		// marginLeft: theme.spacing(1)
	},
	chip: {
		// marginTop: theme.spacing(1),
		// marginBottom: theme.spacing(1),
		// // marginLeft: theme.spacing(1)
		marginLeft: theme.spacing(1),
	},
}));

const Top = ({ props }) => {
	const classes = useStyles();

	return (
		<Container className={classes.root}>
			<Parallax className={classes.title}>
				<Typography color="primary" variant="h1" gutterBottom>
					Quirkshop
				</Typography>
				<Typography color="textSecondary" variant="h6">
					What have you always wanted to try?
				</Typography>
			</Parallax>
			<Parallax className={classes.dogPosition}>
				<Container className={classes.dog} maxWidth="sm">
					<img
						src="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/Desktop/Experience+dog+306x280.png"
						// aspectRatio={306 / 280}
						// disableSpinner
					/>
				</Container>
				<Button
					onClick={() => {
						Mixpanel.track(
							"Landing Top Section-> Experience"
						);
						props.history.push("/browse");
					}}
					size="large"
					// color="info"
					style={MyTheme.palette.companyBlue}
					variant="contained"
					align="center"
					className={classes.experienceButton}
				>
					Experience something new
				</Button>
				{/* <Button> Experience</Button> */}
			</Parallax>
			<Parallax className={classes.hostPosition}>
				<Container className={classes.host} maxWidth="sm">
					<img src="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/Desktop/Host+fox+306x280.svg" />
				</Container>
				<Button
					onClick={() => {
						Mixpanel.track(
							"Landing Page Top Section -> Host"
						);
						props.history.push("/create");
					}}
					size="large"
					color="primary"
					variant="contained"
					align="center"
					className={classes.hostButton}
				>
					Host an Experience
				</Button>
				{/* <Button variant="contained" align="center">
          Host
        </Button> */}
			</Parallax>
			{/* <Parallax className={classes.hostButton}>
        <Button
          onClick={() => props.history.push("/create")}
          size="large"
          color="primary"
          variant="contained"
          align="center"
        >
          Host
        </Button>
      </Parallax> */}
			{/* <Parallax className={classes.experienceButton}>
        <Button
          onClick={() => props.history.push("/browse")}
          size="large"
          color="info"
          variant="contained"
          align="center"
        >
          Experience
        </Button>
      </Parallax> */}
			<Parallax className={classes.featured}>
				<Typography color="textSecondary" variant="h3" gutterBottom>
					Featured:
				</Typography>
				<Grid
					container
					spacing={1}
					direction="row"
					justify="center"
					className={classes.gridContainer}
				>
					<Grid item xs={12} sm={6} md={4} lg={4} wrap="nowrap">
						<Card
							className={classes.paper}
							elevation={3}
							onClick={() => {
								//   Mixpanel.track("CourseList -> Click Course Card", {
								//     courseName: course.courseName,
								//     courseTag: course.tag,
								//     courseID: course.uid,
								//   });
								props.history.push(`/browse/`);
							}}
						>
							<CardActionArea>
								<CardMedia
									component="img"
									image="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/Desktop/Experience+dog+306x280.png"
									height="140"
									title="Temporary Course"
								/>
								<CardContent align="left">
									<Grid
										container
										// justify="space-between"
										// alignItems="center"
										direction="row"
										spacing={1}
									>
										<Grid
											item
											xs={12}
											sm={12}
											md={12}
											lg={12}
										>
											<Typography
												variant={
													// course.courseName.length > 25
													//   ? "subtitle1"
													"h5"
												}
												color="primary"
												className={
													classes.title
												}
											>
												Week Night Cooking
											</Typography>
										</Grid>
										<Grid item xs={12}>
											<Typography
												className={
													classes.subtitle
												}
												variant="subtitle2"
												justify="left"
											>
												City: Palo Alto, CA
											</Typography>
											<Typography
												className={
													classes.subtitle
												}
												variant="subtitle2"
												justify="left"
											>
												Price: Free
											</Typography>
										</Grid>

										<Grid
											item
											xs={12}
											sm={12}
											md={12}
											lg={12}
											className={
												classes.chipGrid
											}
										>
											<Chip
												color="secondary"
												label="Livestream"
											/>
											<Chip
												className={
													classes.chip
												}
												color="primary"
												variant="outlined"
												label="test"
											/>
										</Grid>
									</Grid>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={4} wrap="nowrap">
						<Card
							className={classes.paper}
							elevation={3}
							onClick={() => {
								//   Mixpanel.track("CourseList -> Click Course Card", {
								//     courseName: course.courseName,
								//     courseTag: course.tag,
								//     courseID: course.uid,
								//   });
								props.history.push(`/browse/`);
							}}
						>
							<CardActionArea>
								<CardMedia
									component="img"
									image="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/Desktop/Experience+dog+306x280.png"
									height="140"
									title="Temporary Course"
								/>
								<CardContent align="left">
									<Grid
										container
										// justify="space-between"
										// alignItems="center"
										direction="row"
										spacing={1}
									>
										<Grid
											item
											xs={12}
											sm={12}
											md={12}
											lg={12}
										>
											<Typography
												variant={
													// course.courseName.length > 25
													//   ? "subtitle1"
													"h5"
												}
												color="primary"
												className={
													classes.title
												}
											>
												Test
											</Typography>
										</Grid>
										<Grid item xs={12}>
											<Typography
												className={
													classes.subtitle
												}
												variant="subtitle2"
												justify="left"
											>
												City: Palo Alto, CA
											</Typography>
											<Typography
												className={
													classes.subtitle
												}
												variant="subtitle2"
												justify="left"
											>
												Price: Free
											</Typography>
										</Grid>

										<Grid
											item
											xs={12}
											sm={12}
											md={12}
											lg={12}
											className={
												classes.chipGrid
											}
										>
											<Chip
												color="secondary"
												label="Livestream"
											/>
											<Chip
												className={
													classes.chip
												}
												color="primary"
												variant="outlined"
												label="test"
											/>
										</Grid>
									</Grid>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={4} wrap="nowrap">
						<Card
							className={classes.paper}
							elevation={3}
							onClick={() => {
								//   Mixpanel.track("CourseList -> Click Course Card", {
								//     courseName: course.courseName,
								//     courseTag: course.tag,
								//     courseID: course.uid,
								//   });
								props.history.push(`/browse/`);
							}}
						>
							<CardActionArea>
								<CardMedia
									component="img"
									image="https://d1543jb95t9z4g.cloudfront.net/static/Landing+Page/Desktop/Experience+dog+306x280.png"
									height="140"
									title="Temporary Course"
								/>
								<CardContent align="left">
									<Grid
										container
										// justify="space-between"
										// alignItems="center"
										direction="row"
										spacing={1}
									>
										<Grid
											item
											xs={12}
											sm={12}
											md={12}
											lg={12}
										>
											<Typography
												variant={
													// course.courseName.length > 25
													//   ? "subtitle1"
													"h5"
												}
												color="primary"
												className={
													classes.title
												}
											>
												Test
											</Typography>
										</Grid>
										<Grid item xs={12}>
											<Typography
												className={
													classes.subtitle
												}
												variant="subtitle2"
												justify="left"
											>
												City: Palo Alto, CA
											</Typography>
											<Typography
												className={
													classes.subtitle
												}
												variant="subtitle2"
												justify="left"
											>
												Price: Free
											</Typography>
										</Grid>

										<Grid
											item
											xs={12}
											sm={12}
											md={12}
											lg={12}
											className={
												classes.chipGrid
											}
										>
											<Chip
												color="secondary"
												label="Livestream"
											/>
											<Chip
												className={
													classes.chip
												}
												color="primary"
												variant="outlined"
												label="test"
											/>
										</Grid>
									</Grid>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				</Grid>
			</Parallax>
		</Container>
	);
};

export default Top;
