import React from "react";
import {
	FacebookShareCount,
	PinterestShareCount,
	VKShareCount,
	OKShareCount,
	RedditShareCount,
	TumblrShareCount,
	FacebookShareButton,
	FacebookMessengerShareButton,
	FacebookMessengerIcon,
	LinkedinShareButton,
	TwitterShareButton,
	PinterestShareButton,
	VKShareButton,
	OKShareButton,
	TelegramShareButton,
	WhatsappShareButton,
	RedditShareButton,
	EmailShareButton,
	TumblrShareButton,
	LivejournalShareButton,
	MailruShareButton,
	ViberShareButton,
	WorkplaceShareButton,
	LineShareButton,
	WeiboShareButton,
	PocketShareButton,
	InstapaperShareButton,
	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
	PinterestIcon,
	VKIcon,
	OKIcon,
	TelegramIcon,
	WhatsappIcon,
	RedditIcon,
	TumblrIcon,
	MailruIcon,
	EmailIcon,
	LivejournalIcon,
	ViberIcon,
	WorkplaceIcon,
	LineIcon,
	PocketIcon,
	InstapaperIcon,
	WeiboIcon,
} from "react-share";
import { makeStyles } from "@material-ui/core/styles";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Avatar,
	Paper,
	Grow,
	ClickAwayListener,
	Popper,
	MenuList,
	Box,
	Container,
} from "@material-ui/core";
import { Mixpanel } from "../../analytics/Mixpanel";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	shareContainer: {
		display: "flex",
		flexDirection: "row",
	},
	shareBtn: {
		cursor: "pointer",
		margin: theme.spacing(1),
	},
}));

const ShareBar = ({ isVertical, url, title, body }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Container className={classes.shareContainer}>
				<FacebookShareButton
					url={url}
					quote={title}
					className={classes.shareBtn}
					beforeOnClick={() => {
						Mixpanel.track("Facebook Share Clicked");
					}}
				>
					<FacebookIcon size={32} round />
				</FacebookShareButton>
				<RedditShareButton
					url={url}
					title={title}
					windowWidth={660}
					windowHeight={460}
					className={classes.shareBtn}
					beforeOnClick={() => {
						Mixpanel.track("Reddit Share Clicked");
					}}
				>
					<RedditIcon size={32} round />
				</RedditShareButton>
				{/* <LinkedinShareButton
					url={"quirkshop.org"}
					source="quirkshop.org"
					className={classes.shareBtn}
				>
					<LinkedinIcon size={32} round />
				</LinkedinShareButton> */}
				<TwitterShareButton
					url={url}
					title={title}
					className={classes.shareBtn}
					hashtags={["quirkshop", "hobby", "learning", "quirks"]}
					related={["quirkshop1"]}
					beforeOnClick={() => {
						Mixpanel.track("Twitter Share Clicked");
					}}
				>
					<TwitterIcon size={32} round />
				</TwitterShareButton>

				<WhatsappShareButton
					url={url}
					title={title}
					separator=" "
					className={classes.shareBtn}
					beforeOnClick={() => {
						Mixpanel.track("Whatsapp Share Clicked");
					}}
				>
					<WhatsappIcon size={32} round />
				</WhatsappShareButton>
				<EmailShareButton
					url={url}
					subject={title}
					body={body}
					className={classes.shareBtn}
					beforeOnClick={() => {
						Mixpanel.track("Email Share Clicked");
					}}
				>
					<EmailIcon size={32} round />
				</EmailShareButton>
			</Container>
		</div>
	);
};

export default ShareBar;
