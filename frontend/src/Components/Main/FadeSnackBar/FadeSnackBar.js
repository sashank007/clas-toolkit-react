import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";
class FadeSnackBar extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    console.log("props open", this.props.open);
    return (
      <div>
        <Snackbar
          open={true}
          onClose={this.handleClose}
          TransitionComponent={Fade}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.props.message}</span>}
        />
      </div>
    );
  }
}

export default FadeSnackBar;
