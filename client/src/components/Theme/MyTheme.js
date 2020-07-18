import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

export default createMuiTheme({
	palette: {
		primary: {
			main: "#26A69A",
		},
		secondary: {
			main: "#E1391F",
		},
		background: {
			default: "#7BD2B8",
		},
		companyOrange: {
			backgroundColor: "#EC6B34",
			color: "#fff",
		},
		companyYellow: {
			backgroundColor: "#F7DFB2",
			color: "#000",
		},
		companyBlue: {
			backgroundColor: "#237094",
			color: "#fff",
		},
		companyNavy: {
			backgroundColor: "#0A2955",
			color: "#fff",
		},
	},
	typography: {
		fontFamily: "B612",
	},
});
