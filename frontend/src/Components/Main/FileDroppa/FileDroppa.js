import React from "react";
import MagicDropzone from "react-magic-dropzone";
import { render } from "react-dom";

import "./FileDroppa.css";

class FileDroppa extends React.Component {
  state = {
    value: "image/jpeg, image/png, .jpg, .jpeg, .png",
    previews: [],
    selectedFiles: []
  };

  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  onDrop = (accepted, rejected, links) => {
    accepted = accepted.map(v => v.preview);
    var newPreviews = [...this.state.previews, ...accepted, ...links];
    this.setState({
      previews: newPreviews
    });

    //send selectedFiles to the parent
  };
  onChangeFile = e => {
    console.log("files -->", e.target.files);
    let file = e.target.files[0];
    let selectedFiles = this.state.selectedFiles.slice();
    8;
    selectedFiles.push(file);
    this.setState({ selectedFiles }, function() {
      console.log("callback for selected files in onChangefile", this.state);
      this.props.selectedFiles(this.state.selectedFiles);
    });
  };

  render() {
    return (
      <div className="Dropzone-page">
        <div className="Dropzone-input-wrapper">
          {/* <input
            className="Dropzone-input"
            onChange={this.onChange}
            value={this.state.value}  
            placeholder="Accept"
            type="text"
          /> */}
        </div>
        <MagicDropzone
          className="Dropzone"
          accept={this.state.value}
          onDrop={this.onDrop}
          onChange={this.onChangeFile}
        >
          <div className="Dropzone-content">
            {this.state.previews.length > 0
              ? this.state.previews.map((v, i) => (
                  <img key={i} alt="" className="Dropzone-img" src={v} />
                ))
              : "Drop some files on me!"}
          </div>
        </MagicDropzone>
      </div>
    );
  }
}
export default FileDroppa;
