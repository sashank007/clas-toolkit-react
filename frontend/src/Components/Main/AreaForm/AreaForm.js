import React, { Component } from "react";
import CardComponent from "../Card/CardComponent";
import ComplexButtons from "../ComplexButtons/ComplexButtons";
class AreaForm extends React.Component {
  render() {
    return (
      <div>
        <h3>Which area do you want support in?</h3>
        <ComplexButtons />
      </div>
    );
  }
}
export default AreaForm;
