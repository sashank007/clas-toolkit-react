import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Question from './Question';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  root: {
    backgroundColor: '#fff',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  dialog: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

const getSteps = () => {
  return ['Questions Type 1', 'Questions Type 2', 'Questions Type 3'];
}

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return ['Phase 1 Questions 1', 'Phase 1 Question 2', 'Phase 1 Question 3', 'Phase 1 Question 4'];
    case 1:
      return ['Phase 2 Questions 1', 'Phase 2 Question 2', 'Phase 2 Question 3', 'Phase 2 Question 4'];
    case 2:
      return ['Phase 3 Questions 1', 'Phase 3 Question 2', 'Phase 3 Question 3', 'Phase 3 Question 4'];
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
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
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
          <div className={classes.dialog}>
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
                <Question content={getStepContent(activeStep)} />
                <div className={classes.actions}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleClose}
                      className={classes.button}
                    >
                      Cancel
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
