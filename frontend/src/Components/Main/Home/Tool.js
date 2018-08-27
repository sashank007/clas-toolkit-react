import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './Styles/Tool';

function ToolIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d={props.icon} />
    </SvgIcon>
  );
}

class Tool extends Component {
  state = {
    isSelected: this.props.isSelected,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isSelected: nextProps.isSelected });
  }

  render() {
    const { classes, name, description, icon, url } = this.props;

    return (
      <div>
        <Card className={classNames(classes.card, this.state.isSelected ? classes.active : classes.inactive)} url={url}>
          <CardContent url={url}>
            <ToolIcon icon={icon} className={classes.icon} url={url} />
            <Typography className={classes.title} variant="title" url={url}>
              {name}
            </Typography>
            <Typography className={classes.description} variant="caption" url={url}>
              {description}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Tool.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tool);
