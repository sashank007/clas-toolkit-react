import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: "block",
    flexWrap: "wrap",
    justifyContent: "center"
    // // display: "inline-block",
    // flexWrap: "wrap",
    // width: "50%"
    // display: "flex",
    // flexWrap: "wrap",
    // display: "wrap",

    // marginTop: 40
  },
  message: {
    height: 120
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    padding: 2,
    width: "100%"
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
      name: "",
      department: "",
      emailAddress: "",
      phone: "",
      message: ""
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
        console.log("current userDetails:", this.state);
      }
    );
  };
  handleChangeNew = value => event => {
    console.log("handleChangeNew", event.target.value);
    this.setState({ value: event.target.value });
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
          onChange={this.handleChange("name")}
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
          onChange={this.handleChange("emailAddress")}
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
        />
        <br />
        <TextField
          id="outlined-email-input"
          label="Department"
          className={classes.textField}
          type="Name"
          value={!isFetching && department}
          onChange={this.handleChange("department")}
          name="Department"
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-email-input"
          label="Phone Number"
          className={classes.textField}
          type="Phone Number  "
          onChange={this.handleChange("phone")}
          value={this.state.phone}
          name="Phone Number"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Message For Us"
          style={{ margin: 8 }}
          placeholder="..."
          value={this.state.message}
          fullWidth
          className={classes.message}
          onChange={this.handleChange("message")}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
        />
      </form>
    );
  }
}

DetailsForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailsForm);
