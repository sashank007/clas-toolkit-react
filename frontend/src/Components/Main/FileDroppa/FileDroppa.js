import React, { Component } from "react";
import { render } from "react-dom";
import multer from "multer";
import axios from "axios";
import ReactDropzone from "react-dropzone";
// import express from "express";
// import request from "superagent";
class FileDroppa extends React.Component {
  state = {
    selectedFile: null
  };
  uploadFile = event => {
    let file = event.target.files[0];
    let data = new FormData();
    data.append("file", file, file.fileName);
    let URL = "https://clas.teamwork.com/desk/v1/upload/attachment";
    return dispatch => {
      axios
        .post(URL, data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`
          }
        })
        .then(response => {
          console.log("success");
        })
        .catch(error => {
          //handle error
        });
    };
  };
  //   3;
  //   console.log("uploading...");
  //   const fd = new FormData();
  //   fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
  //   axios
  //     .post(`https://clas.teamwork.com/desk/v1/upload/attachment`, fd, {
  //       headers: {
  //         "Content-Type": "form-data"
  //       },
  //       auth: {
  //         username: "0ueH80iKQ5M8duyll58kxqtVPWHJKUt2srbanEgyyL4M2UtcoM",
  //         password: ""
  //       }
  //     })
  //     .then(res => {
  //       console.log("our response for file upload --> ", res);
  //     })
  //     .catch(error => {
  //       console.log("error ", error);
  //     });
  // };
  // onDrop = event => {
  //   console.log("dropping..", event.target.files[0]);
  //   this.setState({
  //     selectedFile: event.target.files[0]
  //   });
  //   const storage = multer.diskStorage({
  //     destination: "../Upload",
  //     filename(req, upFile, cb) {
  //       cb(null, `${new Date()}-${upFile.name}`);
  //     }
  //   });

  //   const upload = multer({ storage });
  //   console.log("upload -->", upload);
  //   //   axios.post("/files", upload.single("file"), (req, res) => {
  //     const file = req.file; // file passed from client
  //     const meta = req.body; // all other values passed from the client, like name, etc..

  //     // send the data to our REST API
  //     axios({
  //       url: `https://clas.teamwork.com/desk/v1/upload/attachment`,
  //       method: "post",
  //       data: {
  //         file,
  //         name: meta.name
  //       }
  //     })
  //       .then(response => res.status(200).json(response.data.data))
  //       .catch(error => res.status(500).json(error.response.data));
  //   });
  //   // POST to a test endpoint for demo purposes
  // };
  render() {
    return (
      <div className="app">
        {/* <input type="file" onChange={this.onDrop} />
        <button>Upload</button>
        <ReactDropzone onDrop={this.onDrop}>
          Drop your best gator GIFs here!!
        </ReactDropzone> */}
      </div>
    );
  }
}
export default FileDroppa;
