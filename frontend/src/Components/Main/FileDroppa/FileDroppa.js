import React from "react";
import MagicDropzone from "react-magic-dropzone";
import { render } from "react-dom";

import "./FileDroppa.css";

class FileDroppa extends React.Component {
  state = {
    value: "image/jpeg, image/png, .jpg, .jpeg, .png",
    previews: []
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
