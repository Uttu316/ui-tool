import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Autocomplete from "react-autocomplete";
import DeviceWidth from "./DeviceWidth.json";
const useStyles = makeStyles(theme => ({
  input: {
    borderRadius: 4,
    padding: 5,
    color: "gray",
    fontSize: "1rem"
  },
  icon: {
    display: "inline",
    verticalAlign: "middle",
    color: "gray"
  },
  menuItem: {
    color: "gray",
    background: "white",
    borderRadius: 0,

    padding: 5
  }
}));

function SelectDevice(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState();

  return (
    <div>
      <Autocomplete
        getItemValue={item => item.label}
        items={DeviceWidth}
        wrapperStyle={{
          display: "inline-block",
          borderRadius: 4,
          background: "white"
        }}
        renderInput={function(props) {
          return (
            <>
              <input
                {...props}
                placeholder="Select Device type"
                className={classes.input}
              ></input>
              <ExpandMoreIcon className={classes.icon} />
            </>
          );
        }}
        shouldItemRender={(item, value) =>
          item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
        }
        renderItem={(item, isHighlighted) => (
          <Paper
            key={item.label}
            className={classes.menuItem}
            style={{
              background: isHighlighted ? "lightgray" : "white"
            }}
          >
            {item.label}
          </Paper>
        )}
        value={value}
        onChange={e => setValue(e.target.value)}
        onSelect={val => setValue(val)}
      />
    </div>
  );
}
export default React.memo(SelectDevice);
