import React, { Component } from "react";
import CardComponent from "../Card/CardComponent";
import ComplexButtons from "../ComplexButtons/ComplexButtons";
import SecurityReview from "../SecurityReview/SecurityReview";
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
        <h3>Which area do you want support in?</h3>
        <br />
        <ComplexButtons handleParentClick={this.sendAreaButton} />
        {/* <SecurityReview parentProps={this.onParentClick} /> */}
      </div>
    );
  }
}
export default AreaForm;
