import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import CustomForm from './CustomForm';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { styles } from './Styles/CustomStepper';

const getSteps = () => {
  return ['Step 1', 'Step 2', 'Step 3'];
}

const getStepContent = (step) => {
  switch (step) {
    case 0:
    case 1:
    case 2:
      return [
        {
          question: 'Text',
          inputType: 'text',
          placeholder: 'Fill in Text',
          isRequired: false,
        },
        {
          question: 'Search',
          inputType: 'search',
          placeholder: 'Search here',
          isRequired: false,
        },
        {
          question: 'Telephone',
          inputType: 'tel',
          placeholder: '(xxx) - xxx - xxxx',
          isRequired: false,
        },
        {
          question: 'Password',
          inputType: 'password',
          placeholder: '********',
          isRequired: false,
        },
        {
          question: 'URL',
          inputType: 'url',
          placeholder: 'http://www.xyz.com',
          isRequired: false,
        },
        {
          question: 'Email',
          inputType: 'email',
          placeholder: 'xyz@asu.edu',
          isRequired: false,
        },
        {
          question: 'Date',
          inputType: 'date',
          defaultValue: '2018-08-30',
          isRequired: false,
        },
        {
          question: 'Number',
          inputType: 'number',
          min: "0",
          max: "100",
          isRequired: false,
        },
        {
          question: 'Checkboxes',
          inputType: 'checkbox',
          isRequired: false,
          values: ['checkbox1', 'checkbox2'],
        },
        {
          question: 'Radio',
          inputType: 'radio',
          isRequired: false,
          values: ['radio1', 'radio2'],
        },
        {
          question: 'Select',
          inputType: 'select',
          isRequired: false,
          values: ['select1', 'select2'],
        },
        {
          question: 'Question',
          inputType: 'file',
          isRequired: false,
        },
      ];
    default:
      return 'Unknown step';
  }
}

class CustomStepper extends Component {
  state = {
    activeStep: 0,
    open: false,
    skipped: new Set(),
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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
      skipped,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
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
        skipped,
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
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
      <div className={classes.root}>
        <Button variant="contained" color="primary"  onClick={this.handleClickOpen}>Start</Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="md"
        >
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const props = {};
              const labelProps = {};
              return (
                <Step key={label} {...props}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div className={classes.dialogContent}>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed - you&quot;re finished
                </Typography>
                <Button onClick={this.handleReset} className={classes.button}>
                  Reset
                </Button>
              </div>
            ) : (
              <div>
                <CustomForm content={getStepContent(activeStep)} />
                <div className={classes.actions}>
                  <Button
                    onClick={this.handleClose}
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      variant="contained"
                      color="primary"
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Dialog>
      </div>
    );
  }
}

CustomStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(CustomStepper);
