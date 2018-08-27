import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddSubscriber from './AddSubscriber';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import MemberTable from './MemberTable';
import Role from './Role';
import Notification from '../Notification/Notification';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './Styles/Permissions';

class Permissions extends Component {
  state = {
    roles: [],
    selectedRole: '',
    showMessage: false,
    error: false,
    message: '',
  };

  updateRoles = (obj) => {
    this.setState({ showMessage: obj.showMessage, error: obj.error, message: obj.message });
    fetch('/api/backend/roles')
    .then((data) => data.json())
    .then((roles) => this.setState({roles}, () => {
      if (this.state.selectedRole === '')
        this.setState({selectedRole: this.state.roles[0].name });
    }));
  };

  componentWillMount() {
    this.updateRoles({showMessage: false, error: false, message: ''});
  }

  render() {
    const { classes } = this.props;

    const cards = this.state.roles
      .sort((a, b) => a.rank > b.rank)
      .map((role) =>
      <CardActions key={role.rank}>
        <Button size="small" className={classes.role} onClick={() => this.setState({ selectedRole: role.name, showMessage: false, error: false, message: '' })}>
          <Role name={role.name} count={role.members.length} isSelected={role.name === this.state.selectedRole ? true : false} />
        </Button>
      </CardActions>
    );

    const role = this.state.roles.find((role) => {
      return role.name === this.state.selectedRole;
    });

    return (
      <div>
        <div className={classes.permissions}>
          <p className={classes.heading}>User Permissions</p>
          <AddSubscriber updateRoles={this.updateRoles}/>
        </div>
        <div className={classes.roles}>
          {cards}
        </div>
        <MemberTable roles={this.state.roles} role={role} updateRoles={this.updateRoles} />
        <Notification open={this.state.showMessage} variant={this.state.error ? "error" : "success"} message={this.state.message} />
      </div>
    );
  }
}

Permissions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Permissions);
