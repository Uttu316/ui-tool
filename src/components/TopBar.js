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

  const [device, setDevice] = React.useState(3);

  //Return the image object in props.fetchUrl
  /* function handleSubmit(e) {
    e.preventDefault();
    let deviceWidth;
    switch (device) {
      case 1:
        deviceWidth = 768;
        break;
      case 2:
        deviceWidth = 992;
        break;
      case 3:
        deviceWidth = 1200;
        break;
      default:
        deviceWidth = 1200;
        break;
    }
    if (url && props.prev) {
      console.log(url, "k");
      axios
        .post(
          "http://localhost:8080/screenshot",
          {
            url: url,
            viewport_width: deviceWidth,
            image_name: props.prev.name
          },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(function(response) {
          props.fetchURL(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      if (url === "") {
        alert("Enter url");
      }
      if (!props.prev) {
        alert("Select image");
      }
    }
  }*/
  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <SelectDevice setDevice={setDevice} device={device} />

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
export default TopBar;
