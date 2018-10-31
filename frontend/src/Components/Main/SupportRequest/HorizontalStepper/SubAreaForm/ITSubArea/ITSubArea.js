import React, { Component } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

class ITSubArea extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "None",
      location: ""
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value }, function() {
      console.log("state of radio box in subArea", this.state);
    });
    this.props.subAreaValue(event.target.value);
  };
  handleLocationChange = event => {
    const { location } = this.state;

    this.setState(
      {
        location: event.target.value
      },
      function() {
        console.log(
          "current state after location change in subarea",
          this.state
        );
      }
    );
    console.log("current location in subArea", event.target.value);
    this.props.subAreaLocation(event.target.value);
  };

  render() {
    return (
      <div>
        <h3
          style={{
            lineHeight: "3.6rem",
            fontSize: "2rem",
            color: "#393a3d",
            textAlign: "center"
          }}
        >
          Which sub-area do you want help in?
        </h3>
        <div>
          <p style={{ color: "#8d9096", fontWeight: "400px" }}>
            Check a button that applies to you.
          </p>
        </div>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="SubArea: IT"
            name="gender1"
            // className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel
              value="Software"
              control={<Radio />}
              label="Software"
            />
            <FormControlLabel
              value="HardWare"
              control={<Radio />}
              label="HardWare"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <form>
          <TextField
            required
            onBlur={this.handleLocationChange}
            id="outlined-required"
            label="Location"
            //className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </form>
      </div>
    );
  }
}
export default ITSubArea;
