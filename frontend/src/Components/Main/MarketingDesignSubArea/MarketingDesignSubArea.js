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
class MarketingDesignSubArea extends React.Component {
  // vm.supportFormData.inboxId = 1892
  constructor() {
    super();
    this.radioItems = [
      "OSAP",
      "Development",
      "Deans",
      "Academic unit or center consulation",
      "Other"
    ];
    this.state = {
      value: ""
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
  };

  render() {
    const questions = this.radioItems.map((input, i) => {
      return (
        <RadioGroup
          aria-label="SubArea-MarketingDesign"
          name="SubArea-MarketingDesign"
          // className={classes.group}
          value={this.state.value}
          onChange={this.handleChange}
        >
          <FormControlLabel value={input} control={<Radio />} label={input} />
        </RadioGroup>
      );
    });
    return (
      <div>
        <h2>Web Sub Area </h2>
        <FormControl component="fieldset">{questions}</FormControl>
      </div>
    );
  }
}

export default MarketingDesignSubArea;
