import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { CourseContext } from "./CourseContext";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import grey from "@material-ui/core/colors/grey";
import { Mixpanel } from "../../analytics/Mixpanel";

// var Mixpanel = require('Mixpanel-browser');
// Mixpanel.init("dc2dfcb18af8544959b43f6a2b2daae0");

const useStyles = makeStyles((theme) => ({
  menuList: {
    padding: 0,
    margin: 0,
  },
}));

const options = ["Audience", "Front Row (Beta)"];

const Dropdown = ({ course, val, i, ...props }) => {
  const classes = useStyles();
  const ctx = useContext(CourseContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleClickListItem = (event) => {
    Mixpanel.track("Quirkshop Purchase DropDown click list item");
    setAnchorEl(event.currentTarget);
    // console.log(event.currentTarget)
  };

  const handleMenuItemClick = (event, index, i) => {
    Mixpanel.track("Quirkshop Purchase Dropdown", {
      option: options[i],
    });
    setSelectedIndex(index);
    if (index === 0) {
      if (course.payment === "donation") {
        ctx.selected[i].price = ctx.price;
      } else {
        ctx.selected[i].price = course.Price / 100;
      }

      updateTotal(ctx.selected);
    }
    if (index == 1) {
      if (course.payment === "donation") {
        ctx.selected[i].price = ctx.price;
      } else {
        ctx.selected[i].price = course.vipPrice;
      }

      ctx.selected[i].isVip = true;
      updateTotal(ctx.selected);
    }
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    Mixpanel.track("Close Dropdown");
    setAnchorEl(null);
  };

  const updateTotal = (data) => {
    var temp_total = sum(data, "price");
    ctx.setTotal(temp_total);
  };

  const sum = (items, prop) => {
    if (items == null) {
      return 0;
    }
    return items.reduce(function(a, b) {
      return b[prop] == null ? a : a + b[prop];
    }, 0);
  };
  // //debugger;
  return (
    <div>
      <List
        component="nav"
        aria-label="Device settings"
        className={classes.menuList}
      >
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClickListItem}
          className={classes.menuList}
        >
          <Grid container direction="row">
            <Grid item xs={10}>
              <ListItemText
                className={classes.menuList}
                primary={options[selectedIndex]}
              />
            </Grid>
            <Grid item xs={1}>
              <ArrowDropDownIcon />
            </Grid>
          </Grid>
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={val.vip.length >= course.vipNum ? index === 1 : false}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index, i)}
            // className={classes.menuList}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Dropdown;
