import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageIcon from "@material-ui/icons/Image";
import SelectionBox from "./SelectionBox";
const useStyles = makeStyles(theme => ({
  leftcontainer: {
    height: "100vh",
    width: "50%",
    float: "left",
    overflowY: "scroll"
  },
  rightcontainer: {
    height: "100vh",
    width: "50%",
    float: "left",
    overflowY: "scroll"
  },
  image: {
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
  }
}));

const ImagesContainer = props => {
  const classes = useStyles();
  let mockUpImageurl = props.prev ? URL.createObjectURL(props.prev) : null;
  let webImageurl = props.ImageUrl;

  return (
    <>
      <div
        className={classes.leftcontainer}
        style={
          !mockUpImageurl ? { display: "flex", justifyContent: "center" } : null
        }
      >
        {mockUpImageurl ? (
          <>
            <img
              src={mockUpImageurl}
              className={classes.image}
              alt="Loading..."
            />
          </>
        ) : (
          <div className={classes.demoimage}>
            <ImageIcon color="primary" className={classes.demoicon} />
            <span className={classes.text}>Click on Upload Mockup image</span>
          </div>
        )}
      </div>

      <div
        className={classes.rightcontainer}
        style={
          !webImageurl ? { display: "flex", justifyContent: "center" } : null
        }
      >
        {webImageurl ? (
          <img src={webImageurl} className={classes.image} alt="Loading..." />
        ) : (
          <div className={classes.demoimage}>
            <ImageIcon color="primary" className={classes.demoicon} />
            <span className={classes.text}>Enter URL and Select Device</span>
          </div>
        )}
      </div>
    </>
  );
};
export default ImagesContainer;
