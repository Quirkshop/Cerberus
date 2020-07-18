import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import color from "@material-ui/core/colors/amber";
const Logo = (props) => {
  // //debugger;
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <g>
        <path
          d="M11.673 4.50583L21.3856 5.26189L16.1166 0L11.673 4.50583Z"
          fill={props.color}
        />
        <path
          d="M16.7413 6.104L11.9194 5.72865L18.0126 23.9387L24 18L16.7413 6.104Z"
          fill={props.color}
        />
        <path
          d="M16.7677 24L13.9372 15.5407L6.05758 14.397L6.05904 14.4L5.91616 14.3764L0 13.5177L8.33765 24H16.7677Z"
          fill={props.color}
        />
        <path
          d="M5.43132 13.0935L13.5108 14.2662L12.5258 11.3225L2.9759 7.98286L5.43132 13.0935Z"
          fill={props.color}
        />
      </g>
    </SvgIcon>
  );
};
export default Logo;
