import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import SelectDevice from "./selectDeviceWidth/SelectDevice";
//import AutoComplete from "./selectDeviceWidth/AutoComplete";
const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },

  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },

  button: {
    margin: theme.spacing(1),
    color: "gray",
    background: "white",
    "&:hover": {
      color: "gray",
      background: "white"
    }
  }
}));

const TopBar = props => {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <SelectDevice
            deviceType={props.deviceType}
            setDeviceType={props.setDeviceType}
          />

          <div className={classes.grow} />
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<PhotoLibraryIcon />}
          >
            Result
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};
export default React.memo(TopBar);
