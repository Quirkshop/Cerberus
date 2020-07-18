import React, { createContext, useState } from "react";

export const UpdateFormContext = createContext();

export const UpdateProvider = ({ course, ...props }) => {
	// ClassSection
	const [className, setClassName] = useState(course.courseName);
	const [classTag, setClassTag] = useState(course.tag);
	const [classDescription, setClassDescription] = useState(
		course.course_content.overview
	);
	const [classObjectives, setClassObjectives] = useState(
		course.course_content.learning_objectives
	);
	const [classTeacherBg, setClassTeacherBg] = useState(
		course.course_content.teacher_qual
	);

	// Logistics
	//   Location
	const [classAddr, setClassAddr] = useState(course.logistics.Address);
	const [classCity, setClassCity] = useState(course.logistics.City);
	const [classState, setClassState] = useState(course.logistics.state);
	//   Class Details
	const [classCapacity, setClassCapacity] = useState(
		course.logistics.Capacity
	);
	const [classPrice, setClassPrice] = useState(course.Price / 100);
	//   Date & Time
	const [classDate, setClassDate] = useState(course.dates);
	const [appointments, setAppointments] = useState(course.appointments);

	const [classTime, setClassTime] = useState(course.logistics.startTime);
	const [classDuration, setClassDuration] = useState(
		course.logistics.Duration
	);

	// Pre-Requisites
	const [classSkill, setClassSkill] = useState(course.prereqs.SkillLevel);
	const [classMaterials, setClassMaterials] = useState(
		course.prereqs.Materials
	);
	const [classSkills, setClassSkills] = useState(
		course.prereqs.preRequisites
	);

	// Images

	const [bannerURL, setBannerURL] = useState(course.bannerURL);
	const [cardURL, setCardURL] = useState(course.cardImageURL);

	// Toggle State
	const [contentIsValid, setContentIsValid] = useState(false);
	const [logIsValid, setLogIsValid] = useState(false);
	const [reviewValid, setReviewValid] = useState(false);
	const [isLive, setisLive] = useState(true);

	return (
		<UpdateFormContext.Provider
			value={{
				name: className,
				setName: setClassName,
				tag: classTag,
				setTag: setClassTag,
				des: classDescription,
				setDes: setClassDescription,
				obj: classObjectives,
				setObj: setClassObjectives,
				bg: classTeacherBg,
				setBg: setClassTeacherBg,
				addr: classAddr,
				setAddr: setClassAddr,
				city: classCity,
				setCity: setClassCity,
				state: classState,
				setState: setClassState,
				cap: classCapacity,
				setCap: setClassCapacity,
				price: classPrice,
				setPrice: setClassPrice,
				date: classDate,
				setDate: setClassDate,
				time: classTime,
				setTime: setClassTime,
				duration: classDuration,
				setDuration: setClassDuration,
				skillLevel: classSkill,
				setSkillLevel: setClassSkill,
				skills: classSkills,
				setSkills: setClassSkills,
				materials: classMaterials,
				setMaterials: setClassMaterials,
				contentFlag: contentIsValid,
				setContentFlag: setContentIsValid,
				logFlag: logIsValid,
				setLogFlag: setLogIsValid,
				banner: bannerURL,
				setBanner: setBannerURL,
				card: cardURL,
				setCard: setCardURL,
				review: reviewValid,
				setReview: setReviewValid,
				live: isLive,
				setisLive: setisLive,
				appointments: appointments,
				setAppointments: setAppointments,
			}}
		>
			{props.children}
		</UpdateFormContext.Provider>
	);
};
