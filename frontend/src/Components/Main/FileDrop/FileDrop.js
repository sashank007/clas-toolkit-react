import React, { Component } from "react";
import DropToUpload from "react-drop-to-upload";
import Button from "@material-ui/core/Button";
import axios from "axios";
class FileDropper extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
      attachmentId: [],
      fileUrl: [],
      styles: {
        width: "100%",
        height: "300px",
        border: "1.5px dotted lightblue"
      }
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleDropArrayBuffer = this.handleDropArrayBuffer.bind(this);
    this.handleDropDataURI = this.handleDropDataURI.bind(this);
  }

  handleDrop(files) {
    console.log(files.length > 0); // true
    console.log(files[0] instanceof File); // true
    this.setState({
      selectedFile: files[0]
    });
    console.log("changed selected file", files[0]);
  }

  handleDropArrayBuffer(arrayBuffers, files) {
    console.log(files.length > 0); // true
    console.log(files.length === arrayBuffers.length); // true
    console.log(files[0] instanceof File); // true
    console.log(arrayBuffers[0] instanceof ArrayBuffer); // true
  }

  handleDropDataURI(dataURIs, files) {
    console.log(files.length > 0); // true
    console.log(files.length === dataURIs.length); // true
    console.log(files[0] instanceof File); // true
    console.log(typeof dataURIs[0] === "string"); // trueX`
    console.log(/^data:(.*);(.*),/.test(dataURIs[0])); // true
  }
  uploadFile = event => {
    console.log("Uploading...");
    let file = this.state.selectedFile;
    let data = new FormData();
    let { attachmentId, fileUrl } = this.state;
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
          // username: "0ueH80iKQ5M8duyll58kxqtVPWHJKUt2srbanEgyyL4M2UtcoM",
          username: "zMx7pGzRHQaFrbs8WvR9RZXCo5YZ33wuPzNLdrcrRpPIqSMFdQ",
          password: null
        }
      })
      .then(response => {
        console.log("success", response);
        attachmentId = response.data.attachment.id;
        fileUrl = response.data.attachment.downloadURL;
        this.setState({ attachmentId, fileUrl }, function() {
          console.log("after setting image", this.state);
        });
        console.log("attachment Id recieved -->", attachmentId);
        this.props.sendAttachment(this.state);
      })
      .catch(error => {
        //handle error
        console.log("error", error.response);
      });
  };

  render() {
    return (
      <div>
        <DropToUpload
          style={this.state.styles}
          onDrop={this.handleDrop}
          onDropArrayBuffer={this.handleDropArrayBuffer}
          onDropDataURI={this.handleDropDataURI}
        >
          <p style={{ textAlign: "center", margin: "100px" }}>
            Drop file here to upload
          </p>
        </DropToUpload>
        <Button variant="outlined" component="span" onClick={this.uploadFile}>
          Upload
        </Button>
      </div>
    );
  }
}
export default FileDropper;
