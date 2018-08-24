import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './Styles/Role';

class Role extends Component {
  state = {
    isSelected: this.props.isSelected,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isSelected: nextProps.isSelected });
  }

  render() {
    const { classes, name, count } = this.props;

    return (
      <div>
        <Card className={classNames(classes.card, this.state.isSelected ? classes.active : classes.inactive)} role={name}>
          <CardContent role={name}>
            <Typography className={classes.title} color="textSecondary" role={name}>
              {name}
            </Typography>
            <Typography className={classes.count} variant="headline" component="h1" role={name}>
              {count}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Role.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Role);
