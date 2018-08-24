import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ISearch from './ISearch/ISearch';
import Permissions from './Permissions/Permissions';
import WebAudit from './WebAudit/WebAudit';
import Welcome from './Home/Home';
import { Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../Header/Styles/Header'

class Main extends Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/webaudit" component={WebAudit} />
          <Route exact path="/isearch" component={ISearch} />
          <Route exact path="/permissions" component={Permissions} />
        </Switch>
      </main>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Main);
