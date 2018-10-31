import React, { Component } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

class EventsSubArea extends React.Component {
  constructor() {
    super();
    this.radioItems = ["Event request", "Other questions"];
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
          aria-label="SubArea-Events"
          name="SubArea-Events"
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

export default EventsSubArea;
