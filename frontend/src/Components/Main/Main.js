import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ISearch from './ISearch/ISearch';
import Permissions from './Permissions/Permissions';
import WebAudit from './WebAudit/WebAudit';
import Home from './Home/Home';
import { Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../Header/Styles/Header'

class Main extends Component {
  state={
    tools: [],
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ tools: nextProps.tools });
  }


  render() {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/" render={(props) => <Home tools={this.state.tools}/>} />
          { this.state.tools.filter(tool => tool.url === "/webaudit").length > 0 && <Route exact path="/webaudit" component={WebAudit} /> }
          { this.state.tools.filter(tool => tool.url === "/isearch").length > 0 && <Route exact path="/isearch" component={ISearch} /> }
          { this.state.tools.filter(tool => tool.url === "/permissions").length > 0 && <Route exact path="/permissions" component={Permissions} /> }
        </Switch>
      </main>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Main);
