import React, { Component } from "react";
import ITSubArea from "./ITSubArea/ITSubArea";
import WebSubArea from "./WebSubArea/WebSubArea";
import MarketingDesignSubArea from "./MarketingDesignSubArea/MarketingDesignSubArea";
import SalesforceQualtricsSubArea from "./SalesforceQualtricsSubArea/SalesforceQualtricsSubArea";
import EventsSubArea from "./EventsSubArea/EventsSubArea";
class SubAreaForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "None",
      location: ""
    };
  }
  handleSubAreaValue = value => {
    this.setState({ value: value }, function() {
      console.log("state of radio box in subArea", this.state);
    });
    this.props.subAreaValue(value);
  };
  handleLocationChange = value => {
    const { location } = this.state;

    this.setState(
      {
        location: value
      },
      function() {
        console.log(
          "current state after location change in subarea",
          this.state
        );
      }
    );
    console.log("current location in subArea", value);
    this.props.subAreaLocation(value);
  };

  renderSwitch(param) {
    switch (param) {
      case 0:
        return (
          <ITSubArea
            subAreaValue={this.handleSubAreaValue}
            subAreaLocation={this.handleLocationChange}
          />
        );
      case 1:
        return (
          <WebSubArea
            subAreaValue={this.handleSubAreaValue}
            subAreaLocation={this.handleLocationChange}
          />
        );
      case 2:
        return (
          <EventsSubArea
            subAreaValue={this.handleSubAreaValue}
            subAreaLocation={this.handleLocationChange}
          />
        );
      case 3:
        return (
          <MarketingDesignSubArea
            subAreaValue={this.handleSubAreaValue}
            subAreaLocation={this.handleLocationChange}
          />
        );
      case 4:
        return (
          <SalesforceQualtricsSubArea
            subAreaValue={this.handleSubAreaValue}
            subAreaLocation={this.handleLocationChange}
          />
        );
      default:
        return (
          <ITSubArea
            subAreaValue={this.handleSubAreaValue}
            subAreaLocation={this.handleLocationChange}
          />
        );
    }
  }
  render() {
    const { switchIndex } = this.props;
    return <div>{this.renderSwitch(switchIndex)}</div>;
  }
}
export default SubAreaForm;
