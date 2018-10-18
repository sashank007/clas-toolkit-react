import React, { Component } from "react";
import CardComponent from "../Card/CardComponent";
import ComplexButtons from "../ComplexButtons/ComplexButtons";
import SecurityReview from "../SecurityReview/SecurityReview";
import { withStyles } from "@material-ui/core/styles";
class AreaForm extends React.Component {
  constructor() {
    super();
    this.sendAreaButton = this.sendAreaButton.bind(this);
  }

  sendAreaButton = area => {
    console.log(area + " inside AreaForm");
    this.props.setArea(area);
  };
  render() {
    return (
      <div>
        <h3
          style={{
            lineHeight: "3.6rem",
            fontSize: "2rem",
            color: "#393a3d",
            textAlign: "center"
          }}
        >
          Which area do you want help in?
        </h3>
        <p style={{ color: "#8d9096", fontWeight: "400px" }}>
          Select a box that applies to you.
        </p>
        <br />
        <ComplexButtons handleParentClick={this.sendAreaButton} />
        {/* <SecurityReview parentProps={this.onParentClick} /> */}
      </div>
    );
  }
}

export default AreaForm;
