import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ToolsDrawer from './ToolsDrawer';
import Main from '../Main/Main';
import UserMenu from './UserMenu'
import { styles } from './Styles/Header'

class Header extends React.Component {
  state = {
    open: false,
    currentUser: {},
    tools: [],
    roles: [],
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  fetchTools() {
    fetch('/api/backend/tools')
    .then((data) => data.json())
    .then((tools) => this.setState({tools}));
  }

  fetchRoles() {
    fetch('/api/backend/roles')
    .then((data) => data.json())
    .then((roles) => this.setState({roles}, () => {
      const currentRole = this.state.roles.find((role) => {
        return role.members.find((member) => member.asurite && this.state.currentUser.docs && member.asurite === this.state.currentUser.docs[0].asuriteId);
      });
      if (currentRole) {
        const tools = this.state.tools.filter((tool) => currentRole.permissions.indexOf(tool.name) > -1);
        this.setState({tools});
      }
    }));
  }

  fetchCurrentUser() {
    fetch('/api/backend/currentuser')
    .then((data) => data.json())
    .then((currentUser) => this.setState({currentUser}));
  }

  componentWillMount() {
    this.fetchCurrentUser();
    this.fetchTools();
    this.fetchRoles();
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.navBar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              CLAS Tools
            </Typography>
            <UserMenu currentUser={this.state.currentUser} />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <a href="/"><img alt="ASU" src="https://www.asu.edu/asuthemes/4.6/assets/full_logo.png" className={classes.logo}/></a>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List><ToolsDrawer tools={this.state.tools} /></List>
        </Drawer>
        <Main tools={this.state.tools} />
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Header);
