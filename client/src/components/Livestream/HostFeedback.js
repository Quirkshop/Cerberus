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
const {SAVE_FEEDBACK} = Mutations

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
const HostFeedback = ({courseID, uid,...props}) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(null);
	const [text, setText] = React.useState("");
	var text_review;
	const[host_review] = useMutation(SAVE_FEEDBACK)

	const {loading, error, data} = useQuery(GET_USER, {
        variables: { uid }
      });

    if(loading) return null;

	const handleSubmit = () => {
		let stars = value;
		let courseId = courseID;
		let first = data.user.first
		let last = data.user.last
		host_review({
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
							Thanks for hosting!
						</Typography>
						<Typography
							className={classes.avatarText}
							variant="h6"
							color="textPrimary"
							align="center"
						>
							Please rate your livestream experience, and
							consider leaving a review to help us improve! 
							Your course will now be archived but you can always 
							publish it again with a new date from your "My Quirks" page.
						</Typography>
						{/* <Avatar
                            alt='Remy Sharp'
                            src='/static/images/avatar/1.jpg'
                            className={classes.large}
                        >
                            BC
                        </Avatar> */}
						{/* <Typography
                            className={classes.ratingWriting}
                            component='legend'
                        >
                            Rating
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
							value={text_review}
							style={{ margin: 8 }}
							helperText="How was the Livestream?"
							fullWidth
							margin="normal"
							multiline
							InputLabelProps={{
								shrink: true,
							}}
							variant="filled"
							onChange={e =>
								setText(
									e.target.value
								)
							}
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
export default withRouter(HostFeedback);
