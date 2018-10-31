import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FileDropper from "../FileDrop/FileDrop";
import FileDroppa from "../FileDroppa/FileDroppa";
const styles = theme => ({
  container: {
    display: "block",
    flexWrap: "wrap",
    justifyContent: "center"
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

const test = ` <img
style={{width:"50%" , height:"100px"}}
alt="College of Liberal Arts and Sciences"
src="https://clas-forms.asu.edu/sites/default/files/styles/panopoly_image_original/public/asu_liberalarts_horiz_rgb_maroongold_150ppi_1.png"
/>`;
class DetailsForm extends React.Component {
  constructor() {
    super();
    console.log("constructor called");
    this.state = {
      currentUser: {},
      isFetching: false,
      displayName: "",
      firstName: "",
      lastName: "",
      id: "",
      department: "",
      emailAddress: "",
      phone: "",
      message: "",
      inboxId: 0,
      attachmentId: [],
      filesUrl: null
    };
    // this.fetchData();
    console.log("component mounted", this.state);
  }

  fetchData() {
    this.setState({ ...this.state, isFetching: true });
    fetch("/api/backend/currentuser")
      .then(response => response.json())
      .then(result => {
        console.log("result from fetchData ---------->", result);
        this.setState(
          {
            currentUser: result.docs[0],
            firstName: result.docs[0].firstName,
            lastName: result.docs[0].lastName,
            id: result.docs[0].eid,
            displayName: result.docs[0].displayName,
            emailAddress: result.docs[0].emailAddress,
            department: result.docs[0].primaryDepartment,
            isFetching: false,
            customContent: "",
            inboxId: parseInt(result.docs[0].primaryMailCode)
          },
          function() {
            console.log("currentUser in fetch", this.state);
          }
        );
      })
      .then(() => {
        this.props.detailsValue(this.state);
      });
  }
  handleSendAttachment = childState => {
    console.log("handle send attachment", childState);
    this.setState({
      attachmentId: childState.attachmentId,
      filesUrl: childState.fileUrl
    });
    this.props.detailsValue(this.state);
  };
  handleChange = value => event => {
    this.setState(
      {
        [value]: event.target.value
      },
      function() {
        console.log("current userDetails:", this.state);
      }
    );
    this.props.detailsValue(this.state);
  };
  componentWillMount() {
    console.log("component did mount --> ", this.state.currentUser);
  }
  componentDidMount() {
    this.fetchData();
    this.props.detailsValue(this.state);
    // this.setState({ name: "" });
    console.log("component did mount -->", this.state.currentUser);
  }
  render() {
    const { classes } = this.props;
    const {
      currentUser,
      displayName,
      emailAddress,
      department,
      isFetching
    } = this.state;
    const testValue = "test";
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <h3
          style={{
            lineHeight: "3.6rem",
            fontSize: "2rem",
            color: "#393a3d",
            textAlign: "center"
          }}
        >
          Tell us who you are.
        </h3>
        <p style={{ color: "#8d9096", fontWeight: "400px" }}>
          Please fill in the form with essential details.
        </p>

        <br />
        <TextField
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value={!isFetching && displayName}
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
        <FileDropper sendAttachment={this.handleSendAttachment} />
        {/* <FileDroppa /> */}
      </form>
    );
  }
}

DetailsForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailsForm);
