import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AreaForm from "./AreaForm/AreaForm";
import SubAreaForm from "./SubAreaForm/SubAreaForm";
import DetailsForm from "./DetailsForm/DetailsForm";
import FadeSnackBar from "../FadeSnackBar/FadeSnackBar";
import axios from "axios";
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
const supportApiForm = "support api form";
const defaultInbox = 1892;
const uploadUrl = "https://clas.teamwork.com/desk/v1/upload/attachment";
const componentStyle = {
  padding: 50
};
function getSteps() {
  return ["Select Area", "Select Sub Area", "Confirm Details"];
}
const snackBarMessages = [
  "Please select an Area.",
  "Please select a Sub Area.",
  "Please select a location."
];
class HorizontalLinearStepper extends React.Component {
  state = {
    selectedFiles: [],
    activeStep: 0,
    showSnackBar: false,
    snackBarMessage: null,
    skipped: new Set(),
    area: null,
    subArea: null,
    location: "",
    fileUrl: [],
    // stillUploading: false,
    attachmentId: [],
    userDetails: {
      displayName: null,
      email: null,
      department: null,
      firstName: null,
      lastName: null,
      phone: null,
      customerId: null,
      photoUrl: null,
      source: supportApiForm,
      optionalCCS: [],
      files: [],
      area: null,
      message: null,
      inboxId: defaultInbox,
      switchIndex: 0,
      customContent: null,
      subject: null
    }
  };

  onDrop = event => {
    console.log("dropping..");
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  uploadFile = () => {
    console.log("Uploading...");
    let { selectedFiles } = this.state;
    let attachmentId = this.state.attachmentId.slice();
    selectedFiles.map((file, index) => {
      let data = new FormData();
      // this.setState({ stillUploading: true });
      // let fileUrl = this.state.fileUrl.slice();
      console.log("attachment id before post request", attachmentId);
      data.append("file", file, file.fileName);
      axios
        .post(uploadUrl, data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`
          },
          auth: {
            // username: "0ueH80iKQ5M8duyll58kxqtVPWHJKUt2srbanEgyyL4M2UtcoM",
            username: "zMx7pGzRHQaFrbs8WvR9RZXCo5YZ33wuPzNLdrcrRpPIqSMFdQ",
            password: null
          }
        })
        .then(response => {
          console.log("success", response);
          attachmentId.push(response.data.attachment.id);

          this.setState({ attachmentId }, function() {
            console.log("after setting image , callback", this.state);
          });
          console.log("index -->", index);

          console.log("attachment Id recieved -->", attachmentId);
          // this.props.sendAttachment(this.state);
          if (this.state.attachmentId.length == this.state.selectedFiles.length)
            this.postData();
        })
        .catch(error => {
          //handle error
          console.log("error", error.response);
        });
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
            <DetailsForm
              detailsValue={this.handleSetDetailValue}
              selectedFiles={this.handleSelectedFiles}
            />
            {/* <FileDroppa /> */}
          </div>
        );
      default:
        return "Unknown step";
    }
  }
  validateAreaForm() {
    const { area } = this.state;
    return area != null;
  }
  validateSubAreaForm() {
    const { subArea } = this.state;
    const { area } = this.state;
    const { location } = this.state;
    if (area == "IT") {
      console.log("validateSubArea", area);
      return [location != null, snackBarMessages[2]];
    }
    return [subArea != null, snackBarMessages[1]];
  }
  validateDetailsForm() {
    const { message } = this.state;
    return message != null;
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
        snackBarMessage: snackBarMessages[0]
      });
      setTimeout(() => {
        this.setState({
          showSnackBar: false
        });
      }, 2500);
    } else if (activeStep == 1 && !this.validateSubAreaForm()[0]) {
      console.log("required fields not filled subarea");
      this.setState({
        showSnackBar: true,
        snackBarMessage: this.validateSubAreaForm()[1]
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
  postData() {
    const tableContent = `<table style="padding:5px;background-color:#f5f5f5;color:#4c4c4c;border-radius:7px;margin:50px;width:100%">
    <tr>
           <td>
           <h1
           style="text-align:center;margin:10px;font-weight:30;padding:20px"><b>Support
           Request Submission</b>
         </h1></td>
    </tr>
    <tr>
              
            <tr>
             <td> 
           <p style = "font-size:15px;text-align:center;padding:20px">
             A member of our support team will be in contact as soon as
             possible, replying to tickets in the order they were received.
             <br />
             <br />
           </p>
           </td>
         </tr>
        
    <tr>
           <td>
         <p style = "font-size:15px;text-align:center">  Details of your ticket follow:<br/> ${
           this.state.userDetails.message
         }</p>
        </td>
    </tr>
    <tr>
           <td style="text-align:center"><img
           style="width: 300px;"

             alt="College of Liberal Arts and Sciences"
             src="https://clas-forms.asu.edu/sites/default/files/styles/panopoly_image_original/public/asu_liberalarts_horiz_rgb_maroongold_150ppi_1.png"
           /></td>

    </tr>
    </table>`;
    const originalPayload = {
      displayName: "Sai Sashank Tungaturthi",
      email: "stungatu@asu.edu",
      department: "College Of Lib Arts & Sciences",
      firstName: "Sai Sashank",
      lastName: "Tungaturthi",
      customerId: "3258492",
      photoUrl: "https://webapp4.asu.edu/photo-ws/directory_photo/3258492",
      source: "support api form",
      optionalCCS: [],
      files: [
        {
          key: "lfobj9221f4b0d",
          lfFile: {},
          lfFileName: "earth.png",
          lfFileType: "image/png",
          lfTagType: "image",
          lfDataUrl:
            "blob:https://tools.clas.asu.edu/b7daeda0-2d44-415d-880b-84d22f7d149d",
          isRemote: false
        }
      ],
      area: "Web",
      inboxId: 1892,
      subarea: "Update or change a web page",
      customContent:
        '\n\t\t\t\t\t\t<div style="padding:5px;background-color:#f5f5f5;color:#4c4c4c;border-radius:7px;">\n\t\t\t\t\t\t\t\t<h2 style="text-align:center;margin:10px;font-weight:400;">Support Request Submission</h2>\n\t\t\t\t\t\t\t\t<div style="padding-left: 10px;">\n\t\t\t\t\t\t\t\t<hr>\n\t\t\t\t\t\t\t\t<p>A member of our support team will be in contact as soon as possible, replying to tickets in the order they were received.<br><br>Details of your ticket follow:</p>\n\t\t\t\t\t\t\t\t<p>undefined</p>\n\t\t\t\t\t\t\t\t<hr>\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<p style="text-align:center;">\n\t\t\t\t\t\t\t\t\t\t<img style="width:200px;" alt="College of Liberal Arts and Sciences" src="https://clas-forms.asu.edu/sites/default/files/styles/panopoly_image_original/public/asu_liberalarts_horiz_rgb_maroongold_150ppi_1.png">\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>',
      attachments: [22297521]
    };

    const attachmentPayload = {
      displayName: "Sai Sashank Tungaturthi",
      email: "stungatu@asu.edu",
      phone: "",
      department: "College Of Lib Arts & Sciences",
      firstName: "Sai Sashank",
      lastName: "Tungaturthi",
      customerEmail: "stungatu@asu.edu",
      fileUrl:
        "https://s3.amazonaws.com/tw-desk/i/166923/attachment/318579.20181031202430255.318579.20181031202430255rlq0U.png",
      photoUrl: null,
      source: "support api form",
      optionalCCS: [],
      area: null,
      inboxId: 1892,
      subarea: "Academic unit or center consulation",
      subject: "Academic unit or center consulation null",
      message:
        '<div style={{"padding:5px;backgroundColor:#f5f5f5;color:#4c4c4c;borderRadius:7px;"}}>\n    <h2\n      {{style="textAlign:center;margin:"10px";fontWeight:400;}}">Support\n      Request Submission\n    </h2>\n    <div style={{padding:left: "10px"}}>\n      <hr>\n        <p>\n          A member of our support team will be in contact as soon as\n          possible, replying to tickets in the order they were received.\n          <br />\n          <br />\n        \n        </p>\n      </hr>\n      <p>  Details of your ticket follow: Tes</p>\n    </div>\n    <div>\n      <p style={"textAlign:center;"} />\n    \n      <img\n      style={{ width: 100 }}\n\n        alt="College of Liberal Arts and Sciences"\n        src="https://clas-forms.asu.edu/sites/default/files/styles/panopoly_image_original/public/asu_liberalarts_horiz_rgb_maroongold_150ppi_1.png"\n      />\n  \n    </div>\n  </div>',
      attachments: [22299580]
    };
    const {
      location,
      attachmentId,
      subArea,
      area,
      userDetails,
      selectedFiles,
      source
    } = this.state;
    let data = JSON.stringify({
      customerName: userDetails.displayName,
      customerEmail: userDetails.email,
      customerfirstName: userDetails.firstName,
      customerlastName: userDetails.lastName,
      customerEmail: userDetails.email,
      customerMobile: userDetails.phone,
      notifyCustomer: true,
      fileUrl: this.state.fileUrl,
      // customerId: parseInt(userDetails.customerId),
      // customerId: 3258492,
      source: source,
      area: area,
      inboxId: userDetails.inboxId,
      subarea: subArea,
      subject: subArea + " " + location,
      message: tableContent,
      attachments: attachmentId
    });
    axios
      .post("https://clas.teamwork.com/desk/v1/tickets.json", data, {
        headers: {
          "Content-Type": "application/json"
        },
        auth: {
          username: "0ueH80iKQ5M8duyll58kxqtVPWHJKUt2srbanEgyyL4M2UtcoM",
          password: null
        }
      })
      .then(response => {
        console.log("inside post response postData", data, response);
      })
      .catch(error => {
        console.log("error -->", data, error.response);
      });
  }
  handleSubmit = () => {
    const { activeStep, selectedFiles } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    if (selectedFiles.length > 0) this.uploadFile();
    else this.postData();
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

    userDetails.message = state.message;
    userDetails.phone = state.phone;
    // userDetails.inboxId = state.inboxId;
    this.setState(
      {
        userDetails,
        attachmentId: state.attachmentId,
        fileUrl: state.filesUrl
      }
      // function() {
      //   console.log("set the state in horizontal stepper", this.state);
      // }
    );
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
  handleSelectedFiles = files => {
    console.log("inside horizontal stepper handleselectedfiles", files);
    let { selectedFiles } = this.state;
    selectedFiles = files;
    this.setState({ selectedFiles }, function() {
      console.log("changed state of selected files", this.state);
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
    console.log(areas[areaIndex]);
    const newArea = areas[areaIndex];
    console.log("new area -->", newArea);

    this.setState(prevState => {
      return {
        area: newArea,
        switchIndex: areaIndex
      };
    });
  };
  handleSetSubAreaLocation = subAreaLocation => {
    const { location } = this.state;

    const newSubAreaLocation = subAreaLocation;
    this.setState(prevState => {
      return {
        location: newSubAreaLocation
      };
    });
  };
  handleSetSubArea = subAreaValue => {
    const { subArea } = this.state;

    const newSubArea = subAreaValue;
    console.log("new sub area -->", newSubArea);
    this.setState(prevState => {
      return {
        subArea: newSubArea
      };
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
                  Create a new form
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
