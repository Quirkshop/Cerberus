import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  CardActions,
  CardActionArea,
} from "@material-ui/core";

import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  DayView,
  MonthView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  DragDropProvider,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import * as DateFnsUtils from "@date-io/date-fns";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import TerrainIcon from "@material-ui/icons/Terrain";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import { UpdateFormContext } from "./UpdateContext";
import { deepOrange, cyan, grey, blue } from "@material-ui/core/colors";
import "moment/min/locales";
import * as moment from "moment/moment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  dates: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formContainer: {
    display: "flex",
    flexDirection: "Column",
  },
  formItem: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(4),
  },
  formItemRow: {
    display: "flex",
    flexDirection: "row",
    margin: theme.spacing(4),
  },
  formTitle: {
    margin: theme.spacing(4),
  },
  formItemTextTitle: {
    marginLeft: theme.spacing(1),
  },
  formItemTextBody: {
    margin: theme.spacing(1),
  },
  objField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  customFieldIcon: {
    display: "flex",
    flexDirection: "row",
  },
  customField: {
    display: "flex",
    flexDirection: "column",
  },
  pickers: {
    display: "flex",
    flexDirection: "row",
  },
  picker: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  rootCard: {
    minWidth: 300,
    backgroundColor: grey[100],
    margin: theme.spacing(1),
    zIndex: "9",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  cardTitle: {
    fontSize: 14,
  },
  cardPos: {
    marginBottom: 12,
  },
  locationButton: {
    margin: theme.spacing(2),
  },
  locationRow: {
    display: "flex",
    flexDirection: "row",
    // marginTop: theme.spacing(1)
  },
  locationField: {
    margin: theme.spacing(1),
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix=""
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const ClassSection = () => {
  const classes = useStyles();
  const ctx = useContext(UpdateFormContext);
  const bull = <span className={classes.bullet}>•</span>;
  const [open, setOpen] = useState(false);
  // const selected = ctx.date.map((date) => {return new Date(date)})
  // console.log(selected)
  const current = new Date(Date.now());
  const [hasLocation, setHasLocation] = useState(true);
  const [data, setData] = React.useState(ctx.appointments);
  console.log(data);
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [
    isAppointmentBeingCreated,
    setIsAppointmentBeingCreated,
  ] = React.useState(false);

  const [editingOptions, setEditingOptions] = React.useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true,
    allowDragging: true,
    allowResizing: true,
  });

  const {
    allowAdding,
    allowDeleting,
    allowUpdating,
    allowResizing,
    allowDragging,
  } = editingOptions;

  const onCommitChanges = React.useCallback(
    ({ added, changed, deleted }) => {
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        setData([...data, { id: startingAddedId, ...added }]);
        ctx.setAppointments([...data, { id: startingAddedId, ...added }]);
      }
      if (changed) {
        setData(
          data.map((appointment, i) =>
            // var index = changed.indexOf()
            changed[appointment.id]
              ? {
                  ...appointment,
                  ...changed[appointment.id],
                }
              : appointment
          )
        );
        ctx.setAppointments(
          data.map((appointment) =>
            changed[appointment.id]
              ? {
                  ...appointment,
                  ...changed[appointment.id],
                }
              : appointment
          )
        );
      }
      if (deleted !== undefined) {
        setData(data.filter((appointment) => appointment.id !== deleted));
        ctx.setAppointments(
          data.filter((appointment) => appointment.id !== deleted)
        );
      }
      setIsAppointmentBeingCreated(false);
    },
    [setData, setIsAppointmentBeingCreated, ctx.setAppointments, data]
  );
  const onAddedAppointmentChange = React.useCallback((appointment) => {
    setAddedAppointment(appointment);
    setIsAppointmentBeingCreated(true);
  });
  const handleEditingOptionsChange = React.useCallback(({ target }) => {
    const { value } = target;
    const { [value]: checked } = editingOptions;
    setEditingOptions({
      ...editingOptions,
      [value]: !checked,
    });
  });
  const TextEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    // console.log(props)
    if (props.type === "multilineTextEditor") {
      return null;
    }
    if (props.type === "titleTextEditor") {
      return null;
    }
    return <AppointmentForm.TextEditor {...props} />;
  };

  const Label = (props) => {
    console.log(props);
    if (props.type === "title") {
      return null;
    }
    //   if (props.label === 'All Day') {
    // 	return null;
    //   }
    return null;
  };

  const BooleanEditor = (props) => {
    if (props.label === "Repeat") {
      return null;
    }
    if (props.label === "All Day") {
      return null;
    }
    return <AppointmentForm.BooleanEditor {...props} />;
  };

  const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onCustomFieldChange = (nextValue) => {
      onFieldChange({ customField: nextValue });
    };

    return (
      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
      ></AppointmentForm.BasicLayout>
    );
  };

  const TimeTableCell = React.useCallback(
    React.memo(({ onDoubleClick, ...restProps }) => (
      <WeekView.TimeTableCell
        {...restProps}
        onDoubleClick={allowAdding ? onDoubleClick : undefined}
      />
    )),
    [allowAdding]
  );

  const CommandButton = React.useCallback(
    ({ id, ...restProps }) => {
      if (id === "deleteButton") {
        return (
          <AppointmentForm.CommandButton
            id={id}
            {...restProps}
            disabled={!allowDeleting}
          />
        );
      }
      return <AppointmentForm.CommandButton id={id} {...restProps} />;
    },
    [allowDeleting]
  );

  const allowDrag = React.useCallback(() => allowDragging && allowUpdating, [
    allowDragging,
    allowUpdating,
  ]);
  const allowResize = React.useCallback(() => allowResizing && allowUpdating, [
    allowResizing,
    allowUpdating,
  ]);

  const addMaterialsField = () => {
    ctx.setMaterials([...ctx.materials, ""]);
  };

  const handleMaterialsChange = (data) => {
    // //debugger;
    var myString = data.target.id;
    var lastChar = myString[myString.length - 1];
    var index = parseInt(lastChar);
    var updatedMaterials = [...ctx.materials];
    updatedMaterials[index] = data.target.value;
    ctx.setMaterials(updatedMaterials);
  };

  // const handleDateChange = (date) => {
  // 	ctx.setDate(date);
  // };
  const handleDateChange = (date_array) => {
    // console.log(date_array)
    // // dates = date_array
    // console.log(dates)
    var dates = [...ctx.date];
    console.log(dates);
    dates = date_array;
    console.log(dates);
    ctx.setDate(dates);

    setOpen(false);
  };
  const handleTimeChange = (date) => {
    ctx.setTime(date);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.formContainer}>
        <Typography
          variant="h3"
          color="primary"
          className={classes.formTitle}
          justify="center"
          align="center"
        >
          Logistics
        </Typography>
        <Grid item xs={12} sm={10} className={classes.formItem}>
          <Typography
            variant="h4"
            className={classes.formItemTextTitle}
            justify="center"
            align="left"
          >
            Calendar
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.formItemTextBody}
          >
            Select Date to edit or double click to add more.
          </Typography>
          <Scheduler data={data} height={600}>
            {/* <ViewState
									currentDate={current}
								/> */}
            <ViewState
              defaultCurrentDate={current}
              defaultCurrentViewName="Week"
            />
            <EditingState
              onCommitChanges={onCommitChanges}
              addedAppointment={addedAppointment}
              onAddedAppointmentChange={onAddedAppointmentChange}
            />

            <IntegratedEditing />

            <DayView
              startDayHour={7}
              endDayHour={22}
              timeTableCellComponent={TimeTableCell}
            />
            <WeekView
              startDayHour={7}
              endDayHour={22}
              timeTableCellComponent={TimeTableCell}
            />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
            <Appointments />

            <AppointmentTooltip showOpenButton />
            <AppointmentForm
              commandButtonComponent={CommandButton}
              textEditorComponent={TextEditor}
              booleanEditorComponent={BooleanEditor}
              labelComponent={Label}
            />
            <DragDropProvider allowDrag={allowDrag} allowResize={allowResize} />
          </Scheduler>
          {/* <Typography
							variant="h4"
							color="textPrimary"
							className={classes.formItemTextTitle}
						>
							Date
						</Typography>
						<div className={classes.pickers}>
						
						<Button className={classes.dates} variant='contained' size='small' color="primary" onClick={() => setOpen(!open)}>
								Select Dates
							</Button>
							 <MultipleDatesPicker
								open={open}
								selectedDates={selected}
								onCancel={() => setOpen(false)}
								onSubmit={dates => handleDateChange(dates)}
							/>
							
						</div> */}
        </Grid>
        {/* <Grid item xs={12} sm={5} className={classes.formItem}>
					<Typography
							variant="h4"
							color="textPrimary"
							className={classes.formItemTextTitle}
						>
							Time
						</Typography>
					<div className={classes.pickers}>
					<KeyboardTimePicker
								className={classes.picker}
								margin="normal"
								id="class_time"
								label="Class Start Time"
								value={ctx.time}
								onChange={handleTimeChange}
								KeyboardButtonProps={{
									"aria-label": "change time",
								}}
							/>
						</div>

					</Grid> */}

        <Grid item xs={12} sm={3} className={classes.formItem}>
          <Typography
            variant="h4"
            color="textPrimary"
            className={classes.formItemTextTitle}
          >
            Class Duration
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.formItemTextBody}
          >
            How long will your class be?
          </Typography>
          <TextField
            className={classes.locationField}
            label="Class Duration"
            value={ctx.duration}
            onChange={(e) => ctx.setDuration(parseInt(e.target.value))}
            id="class_duration"
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={3} className={classes.formItemRow}>
          {ctx.live == false && !hasLocation && (
            <Card
              className={classes.rootCard}
              onClick={() => setHasLocation(true)}
            >
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    I do have a location for a class
                  </Typography>
                  <Typography align="center">
                    <HomeWorkIcon color="primary" fontSize="large" />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )}
          {ctx.live == false && hasLocation && (
            <Card
              className={classes.rootCard}
              onClick={() => setHasLocation(false)}
            >
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    I do not have a location for a class
                  </Typography>
                  <Typography align="center">
                    <TerrainIcon color="primary" fontSize="large" />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )}
        </Grid>
        {ctx.live == false && !hasLocation && (
          <Grid item xs={12} sm={10} className={classes.formItemRow}>
            <Card
              className={classes.rootCard}
              // onClick={() => setHasLocation()}
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  It's okay, we have partnered with external services to help
                  you find a space
                </Typography>

                <Button
                  color="primary"
                  variant="contained"
                  className={classes.locationButton}
                  onClick={() =>
                    window.open("https://liquidspace.com/", "_blank")
                  }
                >
                  LiquidSpace
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.locationButton}
                  onClick={() =>
                    window.open("https://www.sharedesk.net/", "_blank")
                  }
                >
                  ShareDesk
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.locationButton}
                  onClick={() =>
                    window.open("https://www.facilitron.com/", "_blank")
                  }
                >
                  Facilitron
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.locationButton}
                  onClick={() =>
                    window.open("https://www.peerspace.com/", "_blank")
                  }
                >
                  Peerspace
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}
        <Grid item xs={12} sm={6} className={classes.formItem}>
          <Typography
            variant="h4"
            color="textPrimary"
            className={classes.formItemTextTitle}
          >
            Location
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.formItemTextBody}
          >
            We just need to where you will teach your class
          </Typography>
          <TextField
            className={classes.locationField}
            variant="outlined"
            fullWidth
            id="street_address"
            label="Street Address"
            name="street_address"
            value={ctx.addr}
            onChange={(e) => ctx.setAddr(e.target.value)}
          />
          <div className={classes.locationRow}>
            <TextField
              className={classes.locationField}
              variant="outlined"
              fullWidth
              id="city"
              label="City"
              name="city"
              value={ctx.city}
              onChange={(e) => ctx.setCity(e.target.value)}
            />
            <TextField
              className={classes.locationField}
              variant="outlined"
              fullWidth
              id="state"
              label="State"
              name="state"
              value={ctx.state}
              onChange={(e) => ctx.setState(e.target.value)}
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={3} className={classes.formItem}>
          <Typography
            variant="h4"
            color="textPrimary"
            className={classes.formItemTextTitle}
          >
            Class Capacity
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.formItemTextBody}
          >
            What is the maximum number of students you are willing to teach?
          </Typography>
          <TextField
            className={classes.locationField}
            label="Class Capacity"
            value={ctx.cap}
            onChange={(e) => ctx.setCap(parseInt(e.target.value))}
            id="class_capacity"
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={3} className={classes.formItem}>
          <Typography
            variant="h4"
            color="textPrimary"
            className={classes.formItemTextTitle}
          >
            Class Price
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.formItemTextBody}
          >
            The price each student will pay
          </Typography>
          <TextField
            className={classes.locationField}
            label="Class Price"
            value={ctx.price}
            onChange={(e) => ctx.setPrice(parseInt(e.target.value))}
            id="class_price"
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} className={classes.formItem}>
          <Typography
            variant="h4"
            color="textPrimary"
            className={classes.formItemTextTitle}
          >
            Materials
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.formItemTextBody}
          >
            List items students should bring before attending the class
          </Typography>
          <div className={classes.customFieldIcon}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => addMaterialsField()}
            >
              <AddCircleIcon />
            </IconButton>
            <div className={classes.customField}>
              {ctx.materials &&
                ctx.materials.map((val, idx) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id={`materials-${idx}`}
                    label="Material"
                    name="materials"
                    arrayIndex={idx}
                    className={classes.objField}
                    value={ctx.materials[idx]}
                    onChange={handleMaterialsChange}
                  />
                ))}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ClassSection;
