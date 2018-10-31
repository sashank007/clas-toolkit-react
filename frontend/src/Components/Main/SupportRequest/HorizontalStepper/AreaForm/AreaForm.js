import React, { Component } from "react";
import AreaButtons from "../../../AreaButtons/AreaButtons";

class AreaForm extends React.Component {
  constructor() {
    super();
    this.sendAreaValue = this.sendAreaValue.bind(this);
  }

  sendAreaValue = area => {
    console.log(area + " inside AreaForm");
    this.props.setArea(area);
    const inboxIds = [2171, 1892, 2153, 2169, 2170];
    this.props.setInboxId(inboxIds[area]);
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
        <AreaButtons handleParentClick={this.sendAreaValue} />
      </div>
    );
  }
}

export default AreaForm;
