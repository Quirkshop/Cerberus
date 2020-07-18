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
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  Slider,
  Input,
  Chip,
} from "@material-ui/core";

import {
  ViewState,
  EditingState,
  IntegratedEditing,
  EditRecurrenceMenu,
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
import "react-infinite-calendar/styles.css";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import TerrainIcon from "@material-ui/icons/Terrain";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import { ClassFormContext } from "../ClassFormContext";
import { deepOrange, cyan, grey, blue, teal } from "@material-ui/core/colors";
import "moment/min/locales";
import * as moment from "moment/moment";
import { RoutesContext } from "../../../RoutesContext";
import { Mixpanel } from "../../../analytics/Mixpanel";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
    //backgroundColor:  teal[400],
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
  dates: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  radio: {
    marginTop: theme.spacing(3),
    // marginBottom: theme.spacing(2),
  },
  slider: {
    marginLeft: theme.spacing(2),
    width: "90%",
  },
  input: {
    width: 42,
  },
  chip: {
    width: 75,
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
  Mixpanel.track("Create Logistics");
  const classes = useStyles();
  const ctx = useContext(ClassFormContext);
  const routesCtx = useContext(RoutesContext);
  const bull = <span className={classes.bullet}>•</span>;
  const current = new Date(Date.now());
  // const [dates, setDates] = useState(ctx.date)
  const [open, setOpen] = useState(false);
  const [hasLocation, setHasLocation] = useState(true);
  const [data, setData] = React.useState(ctx.appointments);
  const [addedAppointment, setAddedAppointment] = React.useState({});
  // const [vip, setVIP] = React.useState(false);
  const [
    isAppointmentBeingCreated,
    setIsAppointmentBeingCreated,
  ] = React.useState(false);

  const [value, setValue] = React.useState(0);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    ctx.setFrontRowCapacity(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
    ctx.setFrontRowCapacity(
      event.target.value === "" ? "" : Number(event.target.value)
    );
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
      ctx.setFrontRowCapacity(0);
    } else if (value > 5) {
      setValue(5);
      ctx.setFrontRowCapacity(5);
    }
  };
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
          data.map((appointment) =>
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

  const onAppointmentFormCreated = (e) => {
    var editor = e.form.getEditor("recurrenceRule");
    var radioGroupDOM = editor.element().find(".dx-recurrence-radiogroup-freq");
    var radioGroupInstance = radioGroupDOM.dxRadioGroup("instance");
    radioGroupInstance.option(
      "items",
      radioGroupInstance.option("items").slice(0, 0)
    );
    console.log(radioGroupInstance);
  };

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
  const RecurrenceLayout = ({ visible, appointmentData, ...restProps }) => {
    // const onCustomFieldChange = (nextValue) => {
    // 	onFieldChange({ customField: nextValue });
    // };

    return (
      <AppointmentForm.RecurrenceLayout
        appointmentData={appointmentData}
        // onFieldChange={onFieldChange}
        visible={false}
        {...restProps}
      ></AppointmentForm.RecurrenceLayout>
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

  const handleMaterialsChange = (data) => {
    // //debugger;
    var myString = data.target.id;
    var lastChar = myString[myString.length - 1];
    var index = parseInt(lastChar);
    var updatedMaterials = [...ctx.materials];
    updatedMaterials[index] = data.target.value;
    ctx.setMaterials(updatedMaterials);
  };

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

  const handlePayment = (event) => {
    console.log(event);
    ctx.setPayment(event);
  };

  const dateOnly = (datetime) => {
    var newdate = moment(datetime).format("dddd MMMM Do YYYY");
    return newdate;
  };
  const handleTimeChange = (date) => {
    ctx.setTime(date);
  };

  const handlehasLocation = () => {
    setHasLocation(!hasLocation);
    ctx.setLive(false);
  };
  const handleNoLocation = () => {
    setHasLocation(false);
    ctx.setLive(false);
  };

  const handleVIP = (event) => {
    if (event === "yes") {
      ctx.setVIP(true);
      ctx.setvipRadio("yes");
    } else {
      ctx.setVIP(false);
      ctx.setvipRadio("no");
    }
  };

  const addMaterialsField = () => {
    ctx.setMaterials([...ctx.materials, ""]);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        className={classes.formContainer}
      >
        <Typography
          variant="h3"
          color="primary"
          className={classes.formTitle}
          justify="center"
          align="center"
        >
          Logistics
        </Typography>
        <Grid item xs={12} sm={12} marginTop={2} className={classes.formItem}>
          <Typography
            variant="h4"
            color="textPrimary"
            className={classes.formItemTextTitle}
          >
            Date & Time
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.formItemTextBody}
          >
            Double click to add a new appointment.
          </Typography>

          {/* <Typography
							variant="body1"
							color="textSecondary"
							className={classes.formItemTextBody}
						>
							Currently we only offer one-day classes
						</Typography> */}

          <div>
            <Scheduler data={data} height={600}>
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
              <DayView startDayHour={7} endDayHour={22} />
              <WeekView startDayHour={7} endDayHour={22} />
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

                // FormControlComponent={FormCont}
              />
              <DragDropProvider
                allowDrag={allowDrag}
                allowResize={allowResize}
              />
            </Scheduler>
          </div>
        </Grid>
        {/* <Typography
						variant="h4"
						color="textPrimary"
						className={classes.date}s
						>
								Selected Dates: {' '}
							</Typography>
							{ctx.date.map( (date) => (
								<Typography>
									{dateOnly(date)}
								</Typography>
							))}
					</Grid>
					<Grid item xs={12} sm={5} className={classes.formItem}>
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
								label="Livestream Start Time"
								value={ctx.time}
								onChange={handleTimeChange}
								KeyboardButtonProps={{
									"aria-label": "change time",
								}}
								InputLabelProps={{
									shrink: true,
								  }}
							/>
						</div>
					</Grid> */}

        {/* <Grid item xs={12} sm={5} className={classes.formItem}>
					<Typography
						variant="h4"
						color="textPrimary"
						className={classes.formItemTextTitle}
					>
						Livestream Duration
					</Typography>
					<Typography
						variant="body1"
						color="textSecondary"
						className={classes.formItemTextBody}
					>
						How long will your Livestream be (in hours)?
					</Typography>
					<TextField
						className={classes.locationField}
						label="Livestream Duration"
						value={ctx.duration}
						onChange={(e) =>
							ctx.setDuration(parseInt(e.target.value))
						}
						id="class_duration"
						InputProps={{
							inputComponent: NumberFormatCustom,
						}}
					/>
				</Grid> */}

        {/* <Grid item xs={12} sm={3} className={classes.formItemRow}> */}
        {/* {!hasLocation && (
							<Card
								className={classes.rootCard}
								onClick={() => handlehasLocation()}
							>
								<CardActionArea>
									<CardContent>
										<Typography
											variant="h5"
											component="h2"
										>
											I do have a location for
											a class
										</Typography>
										<Typography align="center">
											<HomeWorkIcon
												color="primary"
												fontSize="large"
											/>
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						)}
						{hasLocation && ctx.live === false  &&(
							<Card
								className={classes.rootCard}
								onClick={() => handlehasLocation()}
							>
								<CardActionArea>
									<CardContent>
										<Typography
											variant="h5"
											component="h2"
										>
											I do not have a location
											for a class
										</Typography>
										<Typography align="center">
											<TerrainIcon
												color="primary"
												fontSize="large"
											/>
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						)} */}

        {/* <Card
						className={classes.rootCard}
						// onClick={() => ctx.setLive(!ctx.live)}
					>
						<CardActionArea>
							<CardContent>
								<Typography
									variant="h5"
									component="h2"
									// color="textPrimary"
								>
									The Livestream will be livestreamed
								</Typography>

								<Typography align="center">
									<TerrainIcon
										color="primary"
										fontSize="large"
									/>
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid> */}
        {!hasLocation && ctx.live === false && (
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
        {ctx.live === true && (
          <Grid item xs={12} sm={6} className={classes.formItem}>
            {/* <Typography
							variant="body1"
							color="textSecondary"
							className={classes.formItemTextBody}
						>
							Even though you are hosting through
							livestream please include your City and
							State! Many of our users are interested in
							where you are located and are looking to
							support local businesses and the community!
						</Typography> */}
            <Typography
              variant="h4"
              color="textPrimary"
              className={classes.formItemTextTitle}
            >
              Livestream Location
            </Typography>

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
        )}

        {ctx.live === false && (
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
              We just need to where you will host your Livestream
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
        )}
        {/* {ctx.live === true && (
					<Grid item xs={12} sm={6} className={classes.formItem}>
						<Typography
							variant="body1"
							color="textSecondary"
							className={classes.formItemTextBody}
						>
							Due to the ongoing situation all livestreams
							will be livestreamed. Just go to your
							livestream page at your scheduled time and
							start broadcasting! We look forward to again
							offering in person experiences algonside our
							new livestreamed material.
						</Typography>
					</Grid>
				)} */}
        {/* <Grid item xs={12} sm={3} className={classes.formItem}>
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
							What is the maximum number of students you
							are willing to teach?
						</Typography>
						<TextField
							className={classes.locationField}
							label="Class Capacity"
							value={ctx.cap}
							onChange={e =>
								ctx.setCap(parseInt(e.target.value))
							}
							id="class_capacity"
							InputProps={{
								inputComponent: NumberFormatCustom
							}}
						/>
					</Grid> */}
        <Grid item xs={12} sm={6} className={classes.formItem}>
          <Typography
            variant="h4"
            color="textPrimary"
            className={classes.formItemTextTitle}
          >
            Payment Method
          </Typography>
          <FormControl component="fieldset" className={classes.radio}>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="free"
            >
              <FormControlLabel
                value="fixed"
                control={<Radio color="primary" />}
                label="Fixed Price"
                labelPlacement="top"
                onChange={(e) => handlePayment(e.target.value)}
              />
              <FormControlLabel
                value="donation"
                control={<Radio color="primary" />}
                label="Donation"
                labelPlacement="top"
                onChange={(e) => handlePayment(e.target.value)}
              />
              <FormControlLabel
                value="free"
                control={<Radio color="primary" />}
                label="Free"
                labelPlacement="top"
                onChange={(e) => handlePayment(e.target.value)}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {ctx.payment === "fixed" && (
          <Grid item xs={12} sm={5} className={classes.formItem}>
            <Typography
              variant="h4"
              color="textPrimary"
              className={classes.formItemTextTitle}
            >
              Livestream Price
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              className={classes.formItemTextBody}
            >
              The price each attendee will pay
            </Typography>
            <TextField
              className={classes.locationField}
              label="Livestream Price"
              value={ctx.price}
              onChange={(e) => ctx.setPrice(parseInt(e.target.value))}
              id="class_price"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />
          </Grid>
        )}
        {ctx.payment === "donation" && (
          <Grid item xs={12} sm={8} className={classes.formItem}>
            <Typography
              variant="h5"
              color="textPrimary"
              className={classes.formItemTextTitle}
            >
              Great! The attendee will input their donation at checkout.
            </Typography>
          </Grid>
        )}
        {ctx.payment === "free" && (
          <Grid item xs={12} sm={8} className={classes.formItem}>
            <Typography
              variant="h5"
              color="textPrimary"
              className={classes.formItemTextTitle}
            >
              Great! Your livestream will be free for all attendees.
            </Typography>
          </Grid>
        )}
        {/* {routesCtx.vip && (
					<Grid item xs={12} sm={6} className={classes.formItem}>
						<Typography
							variant="h4"
							color="textPrimary"
							className={classes.formItemTextTitle}
						>
							Front Row Seats:
						</Typography>
						<Chip
							color="secondary"
							className={classes.chip}
							label="Beta"
						/>

						<Typography
							variant="body1"
							color="textSecondary"
							className={classes.formItemTextBody}
						>
							You can have a select number of people pay a
							bit more to have video access.
						</Typography>
						<FormControl
							component="fieldset"
							className={classes.radio}
						>
							<RadioGroup
								row
								aria-label="position"
								name="position"
								defaultValue="no"
							>
								<FormControlLabel
									value="yes"
									control={<Radio color="primary" />}
									label="Yes"
									labelPlacement="top"
									onChange={(e) =>
										handleVIP(e.target.value)
									}
								/>
								<FormControlLabel
									value="no"
									control={<Radio color="primary" />}
									label="No"
									labelPlacement="top"
									onChange={(e) =>
										handleVIP(e.target.value)
									}
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
				)} */}
        {ctx.vip && ctx.payment === "fixed" && (
          <Grid item xs={12} sm={3} className={classes.formItem}>
            <Typography
              variant="h4"
              color="textPrimary"
              className={classes.formItemTextTitle}
            >
              Front Row Price
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              className={classes.formItemTextBody}
            >
              The price each front row attendee will pay
            </Typography>
            <TextField
              className={classes.locationField}
              label="Front Row Price"
              value={ctx.FrontRowPrice}
              onChange={(e) => ctx.setFrontRowPrice(parseInt(e.target.value))}
              id="class_price"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />
          </Grid>
        )}
        {ctx.vip && (
          <Grid item xs={12} sm={6} className={classes.formItem}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  color="textPrimary"
                  className={classes.formItemTextTitle}
                >
                  Please choose the number of front row seats (max 5):
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Slider
                  value={typeof value === "number" ? value : 0}
                  onChange={handleSliderChange}
                  className={classes.slider}
                  aria-labelledby="input-slider"
                  step={1}
                  max={5}
                />
              </Grid>
              <Grid item xs>
                <Input
                  className={classes.input}
                  value={value}
                  margin="dense"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 5,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
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
            List items students should bring before attending the Livestream
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
