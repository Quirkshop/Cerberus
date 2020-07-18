import React, { createContext, useState } from "react";

export const CourseContext = createContext();

export const CourseProvider = ({ course, ...props }) => {
  // ClassSection
  const [mode, setMode] = useState("Course");
  const [open, setOpen] = React.useState(false);
  const [publish, setPublish] = React.useState(false);
  const [duplicate, setDuplicate] = React.useState(false);
  const [available, setAvailable] = React.useState(false);
  const [appointments, setAppointments] = React.useState([]);
  const [schedule, setSchedule] = React.useState(course.appointments);
  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  // const [allDates, setAllDates] =

  // Toggle State
  // const [course_state, setCourseState] = useState('Course');
  // const [editState, seteditState] = useState('Edit');
  // const [reviewValid, setReviewValid] = useState(false);

  return (
    <CourseContext.Provider
      value={{
        mode: mode,
        setMode: setMode,
        open: open,
        setOpen: setOpen,
        publish: publish,
        setPublish: setPublish,
        duplicate: duplicate,
        setDuplicate: setDuplicate,
        available: available,
        setAvailable: setAvailable,
        appointments: appointments,
        setAppointments: setAppointments,
        selected: selected,
        setSelected: setSelected,
        total: total,
        setTotal: setTotal,
        price: price,
        setPrice: setPrice,
        schedule: schedule,
        setSchedule: setSchedule,
        // courseState: course_state,
        // setCourse: setCourseState,
      }}
    >
      {props.children}
    </CourseContext.Provider>
  );
};
