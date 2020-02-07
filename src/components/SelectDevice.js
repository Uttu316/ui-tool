import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DesktopMacIcon from "@material-ui/icons/DesktopMac";
import TabletMacIcon from "@material-ui/icons/TabletMac";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
const useStyles = makeStyles(theme => ({
  select: {
    display: "flex"
  }
}));
const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

function SelectDevice(props) {
  // console.log(anchorEl);
  const classes = useStyles();
  return (
    <div>
      <Select
        value={props.device}
        autoWidth={true}
        onChange={e => props.setDevice(e.target.value)}
        classes={{ selectMenu: classes.select }}
        style={{
          borderRadius: 4,
          margin: 8,
          color: "gray",
          background: "white"
        }}
      >
        <StyledMenuItem value={1}>
          <ListItemIcon style={{ minWidth: 0, margin: 5 }}>
            <PhoneIphoneIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Mobile" />
        </StyledMenuItem>
        <StyledMenuItem value={2}>
          <ListItemIcon style={{ minWidth: 0, margin: 5 }}>
            <TabletMacIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Tablet" />
        </StyledMenuItem>
        <StyledMenuItem value={3}>
          <ListItemIcon style={{ minWidth: 0, margin: 5 }}>
            <DesktopMacIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Desktop" />
        </StyledMenuItem>
      </Select>
    </div>
  );
}
export default React.memo(SelectDevice);
