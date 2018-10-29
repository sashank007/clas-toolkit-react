import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AreaForm from "../AreaForm/AreaForm";
import SubAreaForm from "../SubAreaForm/SubAreaForm";
import DetailsForm from "../DetailsForm/DetailsForm";
import FadeSnackBar from "../FadeSnackBar/FadeSnackBar";
import axios from "axios";
import FileDroppa from "../FileDroppa/FileDroppa";
import Upload from "material-ui-upload/Upload";
const styles = theme => ({
  stepper: { backgroundColor: "white" },
  shell: {
    boxSizing: "border-box",
    color: "white"
  },
  root: {
    border: "1px solid #e3e5e8",
    backgroundColor: "white",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
    padding: "50px"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

const componentStyle = {
  padding: 50
};
function getSteps() {
  return ["Select Area", "Select Sub Area", "Confirm Details"];
}

class HorizontalLinearStepper extends React.Component {
  state = {
    selectedFile: null,
    activeStep: 0,
    showSnackBar: false,
    snackBarMessage: "",
    skipped: new Set(),
    area: "",
    subArea: "",
    location: "",
    userDetails: {
      displayName: "",
      email: "",
      department: "",
      firstName: "",
      lastName: "",
      phone: "",
      customerId: "",
      photoUrl: "",
      souce: "support api form",
      optionalCCS: [],
      files: [],
      area: "",
      message: "",
      inboxId: 1892,
      switchIndex: 0,
      customContent: "",
      subject: ""
    }
  };
  onDrop = event => {
    console.log("dropping..");
    this.setState({
      selectedFile: event.target.files[0]
    });
  };
  uploadFile = event => {
    console.log("Uploading...");
    let file = this.state.selectedFile;
    let data = new FormData();
    data.append("file", file, file.fileName);
    let URL = "https://clas.teamwork.com/desk/v1/upload/attachment";
    axios
      .post(URL, data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`
        },
        auth: {
          username: "0ueH80iKQ5M8duyll58kxqtVPWHJKUt2srbanEgyyL4M2UtcoM",
          password: ""
        }
      })
      .then(response => {
        console.log("success", response);
      })
      .catch(error => {
        //handle error
        console.log("error", error.response);
      });
  };
  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div style={componentStyle}>
            <AreaForm
              setArea={this.handleSetArea}
              setInboxId={this.handleSetInboxId}
            />
          </div>
        );
      case 1:
        return (
          <div style={componentStyle}>
            <SubAreaForm
              switchIndex={this.state.switchIndex}
              subAreaValue={this.handleSetSubArea}
              subAreaLocation={this.handleSetSubAreaLocation}
            />
          </div>
        );
      case 2:
        return (
          <div style={componentStyle}>
            <DetailsForm detailsValue={this.handleSetDetailValue} />
            <input type="file" onChange={this.onDrop} />

            <Button
              variant="outlined"
              component="span"
              onClick={this.uploadFile}
            >
              Upload
            </Button>
          </div>
        );
      default:
        return "Unknown step";
    }
  }
  validateAreaForm() {
    const { area } = this.state;
    return area.length > 0;
  }
  validateSubAreaForm() {
    const { subArea } = this.state;
    return subArea.length > 0;
  }
  validateDetailsForm() {
    const { message } = this.state;
    return message.length > 0;
  }
  isStepOptional = step => {
    return step === 1;
  };
  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;

    if (activeStep == 0 && !this.validateAreaForm()) {
      console.log("required fields not filled for area");
      this.setState({
        showSnackBar: true,
        snackBarMessage: "Please pick an area."
      });
      setTimeout(() => {
        this.setState({
          showSnackBar: false
        });
      }, 2500);
    } else if (activeStep == 1 && !this.validateSubAreaForm()) {
      console.log("required fields not filled subarea");
      this.setState({
        showSnackBar: true,
        snackBarMessage: "Please pick a sub area."
      });
      setTimeout(() => {
        this.setState({
          showSnackBar: false
        });
      }, 2500);
    } else {
      this.setState({
        activeStep: activeStep + 1,
        skipped
      });
    }
  };
  postData = () => {
    const { userDetails } = this.state;
    const { area } = this.state;
    const { subArea } = this.state;
    const { location } = this.state;
    let data = JSON.stringify({
      displayName: userDetails.displayName,
      email: userDetails.email,
      phone: userDetails.phone,
      department: userDetails.department,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      // customerId: parseInt(userDetails.customerId),
      customerId: 3258492,
      photoUrl: userDetails.photoUrl,
      source: "support api form",
      optionalCCS: [],
      files: [],
      area: userDetails.area,
      inboxId: userDetails.inboxId,
      subarea: subArea,
      subject: subArea + " " + location,
      message: userDetails.message,
      customContent: userDetails.customContent
    });
    axios
      .post("https://clas.teamwork.com/desk/v1/tickets.json", data, {
        headers: {
          "Content-Type": "application/json"
        },
        auth: {
          username: "0ueH80iKQ5M8duyll58kxqtVPWHJKUt2srbanEgyyL4M2UtcoM",
          password: ""
        }
      })
      .then(response => {
        console.log("inside post response postData", data, response);
      })
      .catch(error => {
        console.log("error -->", data, error.response);
      });
  };
  handleSubmit = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.postData();
    console.log("Successfully submitted");
    this.setState({
      activeStep: activeStep + 1,
      skipped
    });
  };
  //make the api post call

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleSetDetailValue = state => {
    console.log("Handle Set Detail Value in horizontal stepper -->", state);
    let userDetails = { ...this.state.userDetails };
    userDetails.displayName = state.displayName;
    userDetails.firstName = state.firstName;
    userDetails.lastName = state.lastName;
    userDetails.customerId = state.id;
    userDetails.department = state.department;
    userDetails.email = state.emailAddress;
    userDetails.phone = state.phone;
    userDetails.customContent = state.customContent;
    userDetails.message = state.message;
    userDetails.phone = state.phone;
    // userDetails.inboxId = state.inboxId;
    this.setState({ userDetails }, function() {
      console.log("set the state in horizontal stepper", this.state);
    });
  };
  handleSetInboxId = inboxId => {
    this.setState(
      prevState => {
        return {
          inboxId: inboxId
        };
      },
      function() {
        console.log("inbox id set -->", this.state.inboxId);
      }
    );
  };
  handleSetArea = areaIndex => {
    const { area } = this.state;
    const areas = [
      "IT",
      "Web",
      "Marketing/Design",
      "Events",
      "Salesforce/Qualtrics"
    ];
    console.log("inside horizontal stepper " + areaIndex);
    console.log(areas[areaIndex]);
    const newArea = areas[areaIndex];
    console.log("new area -->", newArea);

    this.setState(
      prevState => {
        return {
          area: newArea,
          switchIndex: areaIndex
        };
      },
      function() {
        console.log("switch index changed", this.state);
      }
    );
  };
  handleSetSubAreaLocation = subAreaLocation => {
    const { location } = this.state;

    const newSubAreaLocation = subAreaLocation;
    this.setState(
      prevState => {
        return {
          location: newSubAreaLocation
        };
      },
      function() {
        console.log(
          "inside horizontal stepper sub area location --> ",
          this.state
        );
      }
    );
  };
  handleSetSubArea = subAreaValue => {
    const { subArea } = this.state;

    const newSubArea = subAreaValue;
    console.log("new sub area -->", newSubArea);
    this.setState(
      prevState => {
        return {
          subArea: newSubArea
        };
      },
      function() {
        console.log(
          "inside horizontal stepper sub area value --> ",
          this.state
        );
      }
    );
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, showSnackBar, snackBarMessage } = this.state;

    return (
      <div className={classes.shell}>
        <div className={classes.root}>
          <Stepper className={classes.stepper} activeStep={activeStep}>
            {steps.map((label, index) => {
              const props = {};
              const labelProps = {};
              if (this.isStepOptional(index)) {
                labelProps.optional = <Typography>Optional</Typography>;
              }
              if (this.isStepSkipped(index)) {
                props.completed = false;
              }
              return (
                <Step key={label} {...props}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography>
                  <h2 className={classes.instructions}>
                    Your ticket has been received!
                  </h2>
                  <p>
                    A member of our team will be in contact as soon as possible.
                    We'll reply to tickets in the order they were received.
                  </p>
                </Typography>
                <Button onClick={this.handleReset} className={classes.button}>
                  Reset
                </Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {this.getStepContent(activeStep)}
                </Typography>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  {/* {this.isStepOptional(activeStep) && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleSkip}
                      className={classes.button}
                    >
                      Skip
                    </Button>
                  )} */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      activeStep === steps.length - 1
                        ? this.handleSubmit
                        : this.handleNext
                    }
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                  {showSnackBar && <FadeSnackBar message={snackBarMessage} />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

HorizontalLinearStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(HorizontalLinearStepper);
