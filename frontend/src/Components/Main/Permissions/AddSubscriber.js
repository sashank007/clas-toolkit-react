import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Notification from '../Notification/Notification'

export default class AddSubscriber extends Component {
  state = {
    open: false,
    asuriteId: '',
    showMessage: false,
    error: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true, asuriteId: '', showMessage: false});
  };

  handleClose = () => {
    this.setState({ open: false, showMessage: false});
  };

  handleAdd = () => {
    if(this.state.asuriteId === '') {
      this.setState({ showMessage: true, error: true });
    }
    else {
      fetch('/api/backend/roles/')
      .then((data) => data.json())
      .then((roles) => {
        const role = roles.find((role) => {
          return role.members.find((member) => member.asurite && this.state.asuriteId && member.asurite === this.state.asuriteId);
        });
        if (!role) {
          this.setState({ showMessage: false }, () => {
            fetch('/api/backend/roles/subscriber', {
              method: "put",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                asuriteId: this.state.asuriteId,
              })
            })
            .then((res) => {
              if(res.status === 500)
                throw new Error(res);
              return res.json();
            })
            .then((data) => {
              this.setState({showMessage: true, error: false}, () => {
                this.props.updateRoles({ showMessage: false, error: false, message: '' });
              });
            })
            .catch((err) => {
              this.setState({showMessage: true, error: true});
            });
          });
        } else {
          this.setState({showMessage: true, error: true});
        }
      });
    }
  }

  handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      this.handleAdd();
    }
  }

  handleInputChange = (event) => {
    this.setState({ asuriteId: event.currentTarget.value });
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen} variant="fab" color="primary" aria-label="Add">
          <AddIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Subscriber</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a subscriber, please enter the following details.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="asuriteId"
              label="Asurite ID"
              type="string"
              fullWidth
              onChange={this.handleInputChange}
              onKeyDown={this.handleKeyPress}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <Notification open={this.state.showMessage} variant={this.state.error ? "error" : "success"} message={this.state.error ? "Invalid ASURITE ID" : "Added as a subscriber" } />
      </div>
    );
  }
}
