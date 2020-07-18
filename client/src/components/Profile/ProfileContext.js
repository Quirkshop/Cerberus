import React, { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({course, ...props})  => {
	// ClassSection
	const [mode, setMode] = useState('PROFILE');
    const [open, setOpen] = React.useState(false);
    const [publish, setPublish] = React.useState(false);

	// Toggle State
	// const [course_state, setCourseState] = useState('Course');
	// const [editState, seteditState] = useState('Edit');
	// const [reviewValid, setReviewValid] = useState(false);

	return (
		<ProfileContext.Provider
			value={{
				mode: mode,
                setMode: setMode,
                open: open,
                setOpen: setOpen,
                publish: publish,
                setPublish: setPublish
				// courseState: course_state,
				// setCourse: setCourseState,
				
			}}
		>
			{props.children}
		</ProfileContext.Provider>
	);
};