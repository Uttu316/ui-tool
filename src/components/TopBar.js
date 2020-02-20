import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import SelectDevice from "./selectDeviceWidth/SelectDevice";
import MuiCheckbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
  checkboxes: {
    marginLeft: 10
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
const Checkbox = withStyles({
  root: {
    color: "white",
    "&$checked": {
      color: "white"
    }
  },
  checked: {}
})(props => <MuiCheckbox color="default" {...props} />);
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
          <FormGroup row className={classes.checkboxes}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.boundryBorders}
                  onChange={() =>
                    props.setboundryBorders(!props.boundryBorders)
                  }
                  value={props.boundryBorders}
                />
              }
              label="Borders"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.regionNames}
                  onChange={() => props.setregionNames(!props.regionNames)}
                  value={props.regionNames}
                />
              }
              label="Region names"
            />
          </FormGroup>
          <div className={classes.grow} />
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<PhotoLibraryIcon />}
            onClick={props.handleSubmit}
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
