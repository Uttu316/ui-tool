import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageIcon from "@material-ui/icons/Image";
import SelectionBox from "./selectionBox/SelectionBox";
import LanguageIcon from "@material-ui/icons/Language";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import { Paper, Button, IconButton, InputBase } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  leftcontainer: {
    width: "50%",
    float: "left",
    height: "90vh"
    //background: "black",
  },
  rightcontainer: {
    height: "90vh",
    width: "50%",
    float: "left"
  },
  search: {
    border: "1px  solid white",
    position: "relative",
    display: "flex",
    borderRadius: theme.shape.borderRadius,

    marginRight: 2,
    marginLeft: 2
  },
  searchIcon: {
    color: "gray",
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
    color: "white",

    borderRadius: 0,
    background: "#3f51b5",
    marginRight: 2,
    "&:hover": {
      color: "white",
      background: "#3f51b5"
    }
  },
  input: {
    display: "none"
  },
  inputRoot: {
    color: "black",
    width: "100%"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%"
  },

  demoimage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  demoicon: {
    width: 100,
    height: 100,
    opacity: 0.4
  },
  text: {
    color: "gray"
  },
  button: {
    margin: 7,
    color: "gray",
    background: "white",
    "&:hover": {
      color: "gray",
      background: "white"
    }
  }
}));

const ImagesContainer = props => {
  const classes = useStyles();
  const [url, getURL] = React.useState("");
  const [itemsLeft, setItemsLeft] = React.useState([
    //{ id: '1', x: 0, y: 10, width: 50, height: 25 },
    //{ id: '2', x: 120, y: 0, width: 20, height: 75 }
  ]);
  const [itemsRight, setItemsRight] = React.useState([]);

  let mockUpImageurl = props.prev ? URL.createObjectURL(props.prev) : null;
  let webImageurl =
    props.ImageUrl !== "" ? props.ImageUrl.data.screenshot_path : "";
  function handleSubmit(e) {
    e.preventDefault();
    props.fetchURL(url);
  }
  //console.log(itemsLeft, "left");
  // console.log(itemsRight, "right");
  return (
    <>
      <div className={classes.leftcontainer}>
        <Paper className={classes.leftHeader}>
          <input
            accept="image/*"
            className={classes.input}
            id="outlined-button-file"
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
        </Paper>
        <div
          style={
            !mockUpImageurl
              ? {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  position: "relative",
                  top: "40%"
                }
              : {
                  height: "87vh",

                  overflow: "scroll"
                }
          }
        >
          {mockUpImageurl ? (
            <>
              <SelectionBox
                src={mockUpImageurl}
                targetContainer="left"
                itemsLeft={itemsLeft}
                itemsRight={itemsRight}
                setItemsLeft={setItemsLeft}
                setItemsRight={setItemsRight}
                deviceWidth={props.deviceWidth}
              />
            </>
          ) : (
            <div className={classes.demoimage}>
              <ImageIcon color="primary" className={classes.demoicon} />
              <span className={classes.text}>Click on Upload Mockup image</span>
            </div>
          )}
        </div>
      </div>

      <div className={classes.rightcontainer}>
        <Paper className={classes.rightHeader}>
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
              value={url}
              onChange={e => getURL(e.target.value)}
            />
            <IconButton
              edge="end"
              aria-label="send url"
              className={classes.sendIcon}
              onClick={e => handleSubmit(e)}
            >
              <ImageSearchIcon />
            </IconButton>
          </div>
        </Paper>
        <div
          style={
            !mockUpImageurl
              ? {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  position: "relative",
                  top: "40%"
                }
              : {
                  height: "87vh",

                  overflow: "scroll"
                }
          }
        >
          {mockUpImageurl ? (
            <>
              <SelectionBox
                src={mockUpImageurl}
                itemsLeft={itemsLeft}
                itemsRight={itemsRight}
                setItemsLeft={setItemsLeft}
                setItemsRight={setItemsRight}
                targetContainer="right"
                deviceWidth={props.deviceWidth}
              />
            </>
          ) : (
            <div className={classes.demoimage}>
              <ImageIcon color="primary" className={classes.demoicon} />
              <span className={classes.text}>Enter URL and Select Device</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default React.memo(ImagesContainer);
