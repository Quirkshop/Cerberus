import React, { createContext, useState } from "react";

export const RoutesContext = createContext();

export const RoutesProvider = ({ course, ...props }) => {
	// ClassSection
	const [isAdmin, setAdmin] = useState(false);
	const [staging, setStaging] = useState(false);
	const [vip, setVip] = useState(true);
	const [open, setOpen] = React.useState(false);
   

	// Toggle State
	// const [course_state, setCourseState] = useState('Course');
	// const [editState, seteditState] = useState('Edit');
	// const [reviewValid, setReviewValid] = useState(false);

	return (
		<RoutesContext.Provider
			value={{
				isAdmin: isAdmin,
				setAdmin: setAdmin,
				staging: staging,
				setStaging: setStaging,
				vip: vip,
				setVip: setVip,
				open: open,
				setOpen: setOpen
                
				
			}}
		>
			{props.children}
		</RoutesContext.Provider>
	);
};
