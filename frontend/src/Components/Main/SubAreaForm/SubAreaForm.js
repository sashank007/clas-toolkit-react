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
class SubAreaForm extends React.Component {
  state = {
    value: "female"
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <h3>Which sub-area do you want help in?</h3>
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
export default SubAreaForm;
