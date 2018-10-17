import React from "react";

class SecurityReview extends React.Component {
  //compulsory lines

  constructor() {
    super();
    this.handleChildClick = this.handleChildClick.bind(this);
  }
  handleChildClick() {
    console.log("child click");
    this.props.parentProps("child package");
  }
  render() {
    return (
      <div>
        <h1>Security Review</h1>
        <button onClick={this.handleChildClick}>Test</button>
      </div>
    );
  }
}
export default SecurityReview;
