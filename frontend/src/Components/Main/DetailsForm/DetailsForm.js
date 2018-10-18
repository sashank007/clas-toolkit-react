import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    // display: "flex",
    // justifyContent: "center",
    // // display: "inline-block",
    // flexWrap: "wrap",
    // width: "50%"
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class DetailsForm extends React.Component {
  fetchData() {
    this.setState({ ...this.state, isFetching: true });
    fetch("/api/backend/currentuser")
      .then(response => response.json())
      .then(result =>
        this.setState(
          {
            name: result.docs[0].firstName + " " + result.docs[0].lastName,
            emailAddress: result.docs[0].emailAddress,
            department: result.docs[0].primaryDepartment,
            isFetching: false
          },
          function() {
            console.log("currentUser in fetch", this.state);
          }
        )
      );
  }

  constructor() {
    super();
    console.log("constructor called");
    this.state = {
      currentUser: {},
      isFetching: false,
      tools: [],
      roles: [],
      name: "",
      department: "",
      emailAddress: ""
    };
    // this.fetchData();
    console.log("component mounted", this.state);
  }
  handleChange = currentUser => event => {
    this.setState(
      {
        [currentUser]: event.target.value
      },
      function() {
        console.log("current userDetails:", this.state.currentUser);
      }
    );
  };
  handleChangeNew = event => {
    console.log("handleChangeNew", event.target.value);
    this.setState({ emailAddress: event.target.value });
  };
  componentWillMount() {
    // this.fetchData();
    console.log("component did mount --> ", this.state.currentUser);
    // this.state.currentUser.docs
    //   ? this.setState({ name: this.state.currentUser.docs[0].firstName })
    //   : null;
  }
  componentDidMount() {
    this.fetchData();
    // this.setState({ name: "" });
    console.log("component did mount -->", this.state.currentUser);
  }
  render() {
    const { classes } = this.props;
    const {
      currentUser,
      name,
      emailAddress,
      department,
      isFetching
    } = this.state;
    const testValue = "test";
    // const { emailAddress } =
    //   currentUser.docs && currentUser.docs[0].emailAddress;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value={!isFetching && name}
          onChange={this.handleChange("currentUser")}
          margin="normal"
          variant="outlined"
        />
        <br />
        <TextField
          id="outlined-email-input"
          label="Email"
          value={!isFetching && emailAddress}
          className={classes.textField}
          type="email"
          onChange={this.handleChangeNew}
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
        />
        <br />
        <TextField
          id="outlined-dense"
          label="Department"
          className={classNames(classes.textField, classes.dense)}
          value={!isFetching && department}
          margin="dense"
          variant="outlined"
        />

        <TextField
          id="outlined-dense"
          label="Phone Number"
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
        />
        {/* <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          rowsMax="4"
          value={this.state.multiline}
          onChange={this.handleChange("multiline")}
          className={classes.textField}
          margin="normal"
          helperText="hello"
          variant="outlined"
        />
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows="4"
          defaultValue="Default Value"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-with-placeholder"
          label="With placeholder"
          placeholder="Placeholder"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-number"
          label="Number"
          value={this.state.age}
          onChange={this.handleChange("age")}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange("currency")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select your currency"
          margin="normal"
          variant="outlined"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Native select"
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange("currency")}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select your currency"
          margin="normal"
          variant="outlined"
        >
          {currencies.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField> */}
        <TextField
          id="outlined-full-width"
          label="Message For Us"
          style={{ margin: 8 }}
          placeholder="..."
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
        />
        {/* <TextField
          id="outlined-bare"
          className={classes.textField}
          defaultValue="Bare"
          margin="normal"
          variant="outlined"
        /> */}
      </form>
    );
  }
}

DetailsForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailsForm);
