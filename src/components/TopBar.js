import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Button, IconButton, InputBase } from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import SelectDevice from "./SelectDevice";
import axios from "axios";
const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    border: "1px  solid white",
    position: "relative",

    borderRadius: theme.shape.borderRadius,

    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    color: "white",
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 0
  },
  sendIcon: {
    background: "white",
    borderRadius: "100%"
  },
  input: {
    display: "none"
  },
  inputRoot: {
    color: "white"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
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
  const [url, getURL] = React.useState("");
  const [device, setDevice] = React.useState(3);

  //Return the image object in props.fetchUrl
  function handleSubmit(e) {
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
  }
  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <input
            accept="image/*"
            className={classes.input}
            id="outlined-button-file"
            multiple
            type="file"
            onChange={e => props.getLocalImage(e.target.files[0])}
          />
          <label htmlFor="outlined-button-file">
            <Button
              variant="outlined"
              component="span"
              className={classes.button}
            >
              Upload Mockup image
            </Button>
          </label>
          <SelectDevice setDevice={setDevice} device={device} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <LanguageIcon />
            </div>

            <InputBase
              placeholder="Enter URL…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={e => getURL(e.target.value)}
              value={url}
            />
            <IconButton
              color="primary"
              edge="end"
              aria-label="send url"
              style={{ background: "white", borderRadius: 0, left: -12 }}
              onClick={e => handleSubmit(e)}
            >
              <ImageSearchIcon />
            </IconButton>
          </div>

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
