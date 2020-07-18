import React from "react";
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import {
	Typography,
	Container,
	Button,
	Paper,
	Divider,
	Avatar,
	Grid,
} from "@material-ui/core";
import Image from "material-ui-image";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import Mutations from "../../graphql/mutations";
import {GET_USER} from "../../graphql/queries";
import { useMutation, useQuery } from "@apollo/react-hooks";
const {SAVE_REVIEW} = Mutations

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	divider: {
		marginBottom: theme.spacing(5),
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	paper: {
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5),
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
		// marginTop: theme.spacing(1),
		marginBottom: theme.spacing(2),
	},
	ratingWriting: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	rating: {
		marginTop: theme.spacing(0),
		marginBottom: theme.spacing(1),
	},

	image: {
		height: "auto",
		width: "100%",
		marginTop: 10,
	},
	button: {
		justifyContent: "center",
		margin: "0 auto",
		marginTop: theme.spacing(0),
		marginBottom: theme.spacing(0),
		display: "flex",
	},
}));

const StreamerFeedback = ({courseID, uid, ...props}) => {
	const classes = useStyles();

	
	const [value, setValue] = React.useState(null);
	const [text, setText] = React.useState("");
	var text_review;
	const[stream_review] = useMutation(SAVE_REVIEW)

	const {loading, error, data} = useQuery(GET_USER, {
        variables: { uid }
      });

    if(loading) return null;

	const handleSubmit = () => {
		
		let stars = value;
		let courseId = courseID;
		let first = data.user.first
		let last = data.user.last
		stream_review({
			variables: {
				uid,
				stars,
				text,
				courseId,
				first,
				last
				
			},
		}).then(
			(result) => {
				// console.log(result);
				// startBroadcast();
				props.history.push("/home")
			},
			(error) => {
				console.log(error);
			}
		);

	};

	return (
		<div className={classes.root}>
			<Container component="main" maxWidth="md">
				<Paper className={classes.paper} elevation={2}>
					<Container className={classes.paper}>
						<Typography
							className={classes.avatarText}
							variant="h4"
							color="Primary"
							align="center"
						>
							Thanks for attending!
						</Typography>
						<Typography
							className={classes.avatarText}
							variant="h6"
							color="textPrimary"
							align="center"
						>
							Please rate your host, and consider leaving a
							review.
						</Typography>
						{/* <Avatar
							alt="Remy Sharp"
							src="/static/images/avatar/1.jpg"
							className={classes.large}
						>
							BC
						</Avatar>
						<Typography
							className={classes.ratingWriting}
							component="legend"
						>
							Blaze Cubanski
						</Typography> */}
						<Rating
							className={classes.rating}
							name="simple-controlled"
							value={value}
							onChange={(event, newValue) => {
								setValue(newValue);
							}}
						/>
						<TextField
							id="filled-full-width"
							label="Review"
							style={{ margin: 8 }}
							value={text_review}
							helperText="How was the Quirkshop?"
							fullWidth
							margin="normal"
							multiline
							InputLabelProps={{
								shrink: true,
							}}
							onChange={e =>
								setText(
									e.target.value
								)
							}
							variant="filled"
						/>

						<Button
							className={classes.button}
							variant="contained"
							color="primary"
							onClick = {() => handleSubmit()}
						>
							Submit
						</Button>
					</Container>
					<Container></Container>
				</Paper>
			</Container>
		</div>
	);
};

export default withRouter(StreamerFeedback);
