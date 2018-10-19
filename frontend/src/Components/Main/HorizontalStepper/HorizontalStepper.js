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
// import SubAreaForm from "../SubAreaForm/SubAreaForm";
// import UserDetailsForm from "../Home/UserDetailsForm/UserDetailsForm";
import DetailsForm from "../DetailsForm/DetailsForm";
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

// function getStepContent(step) {

//   switch (step) {
//     case 0:
//       return (
//         <div style={componentStyle}>
//           <AreaForm setArea={this.handleSetArea} />
//         </div>
//       );
//     case 1:
//       return (
//         <div style={componentStyle}>
//           <SubAreaForm />
//         </div>
//       );
//     case 2:
//       return (
//         <div style={componentStyle}>
//           <DetailsForm />
//         </div>
//       );
//     default:
//       return "Unknown step";
//   }
// }

class HorizontalLinearStepper extends React.Component {
  state = {
    activeStep: 0,
    skipped: new Set(),
    area: "",
    subArea: "",
    location: "",
    userDetails: {
      name: "",
      emailAddress: "",
      department: "",
      phone: "",
      message: ""
    }
  };

  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div style={componentStyle}>
            <AreaForm setArea={this.handleSetArea} />
          </div>
        );
      case 1:
        return (
          <div style={componentStyle}>
            <SubAreaForm
              subAreaValue={this.handleSetSubArea}
              subAreaLocation={this.handleSetSubAreaLocation}
            />
          </div>
        );
      case 2:
        return (
          <div style={componentStyle}>
            <DetailsForm detailsValue={this.handleSetDetailValue} />
          </div>
        );
      default:
        return "Unknown step";
    }
  }

  isStepOptional = step => {
    return step === 1;
  };

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }

    this.setState({
      activeStep: activeStep + 1,
      skipped
    });
  };

  handleSubmit = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    console.log("Successfully submitted");
    this.setState({
      activeStep: activeStep + 1,
      skipped
    });
  };
  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleSetDetailValue = state => {
    console.log("Handle Set Detail Value in horizontal stepper -->", state);
    let userDetails = { ...this.state.userDetails };
    userDetails.name = state.name;
    userDetails.department = state.department;
    userDetails.emailAddress = state.emailAddress;
    userDetails.phone = state.phone;
    userDetails.message = state.message;
    this.setState({ userDetails }, function() {
      console.log("set the state in horizontal stepper", this.state);
    });
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
          area: newArea
        };
      },
      function() {
        console.log(this.state);
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
    const { activeStep } = this.state;

    return (
      <div className={classes.shell}>
        <div className={classes.root}>
          <Stepper className={classes.stepper} activeStep={activeStep}>
            {steps.map((label, index) => {
              const props = {};
              const labelProps = {};
              if (this.isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
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
                  {this.isStepOptional(activeStep) && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleSkip}
                      className={classes.button}
                    >
                      Skip
                    </Button>
                  )}
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
