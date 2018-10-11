import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./Styles/EditRole";
import DefaultIcon from "../../../Assets/Images/defaultIcon.jpg";
class EditRole extends Component {
  state = {
    open: false,
    value: this.props.currentRole.name
  };

  handleClickOpen = () => {
    this.setState({ open: true, showMessage: false, message: "" });
  };

  handleClose = () => {
    this.setState({ open: false, showMessage: false, message: "" });
  };

  handleSave = () => {
    this.handleDelete();
    this.setState({ open: false }, () => {
      fetch("/api/backend/roles/".concat(this.state.value), {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          asuriteId: this.props.asurite
        })
      })
        .then(res => {
          if (res.status === 500) throw new Error(res);
          return res.json();
        })
        .then(data => {
          this.props.updateRoles({
            showMessage: true,
            error: false,
            message: "Role changed to ".concat(this.state.value)
          });
        })
        .catch(err => {
          this.props.updateRoles({
            showMessage: true,
            error: true,
            message: "Error occured while saving"
          });
        });
    });
  };

  handleDelete = () => {
    this.setState({ open: false }, () => {
      fetch("/api/backend/roles/".concat(this.props.currentRole.name), {
        mode: "cors",
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          asuriteId: this.props.asurite
        })
      })
        .then(res => {
          if (res.status === 500) throw new Error(res);
          return res.json();
        })
        .then(data => {
          this.props.updateRoles({
            showMessage: true,
            error: false,
            message: "Successfully deleted"
          });
        })
        .catch(err => {
          this.props.updateRoles({
            showMessage: true,
            error: true,
            message: "Error occured while deleting"
          });
        });
    });
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  srcError = event => {
    event.target.src = DefaultIcon;
  };

  render() {
    const {
      classes,
      roles,
      name,
      department,
      email,
      primaryTitle,
      photoUrl
    } = this.props;

    const roleList = roles
      .sort((a, b) => a.rank > b.rank)
      .map(role => (
        <FormControlLabel
          key={role.rank}
          value={role.name}
          control={<Radio />}
          label={role.name}
        />
      ));

    return (
      <div>
        <Button
          onClick={this.handleClickOpen}
          variant="contained"
          className={classes.button}
        >
          Edit
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent className={classes.content}>
            <div className={classes.about}>
              <Avatar
                alt="User"
                src={photoUrl}
                className={classNames(classes.avatar, classes.bigAvatar)}
                onError={this.srcError}
              />
              <div className={classes.member}>
                <div className={classes.name}>{name}</div>
                <div>{department}</div>
                <div>
                  {email}
                  <span> ({primaryTitle})</span>
                </div>
              </div>
            </div>
            <div className={classes.roles}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Role</FormLabel>
                <RadioGroup
                  aria-label="Roles"
                  name="roles"
                  className={classes.group}
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                  {roleList}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions className={classes.buttons}>
            <Button
              onClick={this.handleDelete}
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
            >
              Delete
              <DeleteIcon className={classes.rightIcon} />
            </Button>
            <div>
              <Button
                onClick={this.handleClose}
                color="primary"
                className={classes.button}
              >
                Cancel
              </Button>
              <Button
                onClick={this.handleSave}
                color="primary"
                className={classes.button}
              >
                Save
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

EditRole.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditRole);
