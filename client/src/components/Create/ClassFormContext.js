import React, { createContext, useState } from "react";

export const ClassFormContext = createContext();

export const ClassProvider = (props) => {
	// ClassSection
	const [className, setClassName] = useState("");
	const [classTag, setClassTag] = useState("");
	const [classDescription, setClassDescription] = useState("");
	const [classObjectives, setClassObjectives] = useState([""]);
	const [classTeacherBg, setClassTeacherBg] = useState("");

	// Logistics
	//   Location
	const [classAddr, setClassAddr] = useState("");
	const [classCity, setClassCity] = useState("");
	const [classState, setClassState] = useState("");
	//   Class Details
	const [classCapacity, setClassCapacity] = useState(null);
	const [classPrice, setClassPrice] = useState(null);
	const [frontRowPrice, setFrontRowPrice] = useState(null);
	const [frontRowCapacity, setFrontRowCapacity] = useState(0);
	//   Date & Time
	const [classDate, setClassDate] = useState([new Date(Date.now())]);
	const [classTime, setClassTime] = useState(new Date(Date.now()));
	const [classDuration, setClassDuration] = useState(null);
	const [appointments, setAppointments] = useState([]);

	// Pre-Requisites
	const [classSkill, setClassSkill] = useState(-1);
	const [classMaterials, setClassMaterials] = useState([""]);
	const [classSkills, setClassSkills] = useState([""]);

	// Images

	const [bannerURL, setBannerURL] = useState("");
	const [cardURL, setCardURL] = useState("");
	const [isLive, setisLive] = useState(true);
	const [vip, setVIP] = useState(false);
	const [payment, setPayment] = useState("free");
	const [vipRadio, setvipRadio] = useState("no");
	// Toggle State
	const [contentIsValid, setContentIsValid] = useState(false);
	const [logIsValid, setLogIsValid] = useState(false);
	const [reviewValid, setReviewValid] = useState(false);

	return (
		<ClassFormContext.Provider
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
				setLive: setisLive,
				appointments: appointments,
				setAppointments: setAppointments,
				payment: payment,
				setPayment: setPayment,
				frontRowPrice: frontRowPrice,
				setFrontRowPrice: setFrontRowPrice,
				frontRowCapacity: frontRowCapacity,
				setFrontRowCapacity: setFrontRowCapacity,
				vip: vip,
				setVIP: setVIP,
				vipRadio: vipRadio,
				setvipRadio: setvipRadio,
			}}
		>
			{props.children}
		</ClassFormContext.Provider>
	);
};
