import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import PersonIcon from "@material-ui/icons/Person";
import Popper from "@material-ui/core/Popper";
import SvgIcon from "@material-ui/core/SvgIcon";
import { styles } from "./Styles/Header";

class UserMenu extends Component {
  state = {
    open: false,
    imageError: false
  };

  componentWillMount() {
    this.setState({ imageError: false });
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleLogout = event => {
    fetch("/api/backend/logout");
  };

  onSrcError = event => {
    this.setState({ imageError: true });
  };

  render() {
    const { classes, currentUser } = this.props;
    const { open } = this.state;

    return (
      <div>
        <Button
          buttonRef={node => {
            this.anchorEl = node;
          }}
          aria-owns={open ? "menu-list-grow" : null}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <Avatar
            alt="User"
            src={currentUser.docs && currentUser.docs[0].photoUrl}
            onError={this.onSrcError}
          >
            {this.state.imageError && <AccountCircle />}
          </Avatar>
        </Button>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList className={classes.menuList}>
                    <MenuItem
                      className={classes.profileMenuItem}
                      onClick={this.handleClose}
                      size="large"
                    >
                      <div className={classes.profile}>
                        <Avatar
                          alt="User"
                          src={currentUser.docs && currentUser.docs[0].photoUrl}
                          className={classNames(
                            classes.avatar,
                            classes.bigAvatar
                          )}
                          onError={this.onSrcError}
                        >
                          {this.state.imageError && <PersonIcon />}
                        </Avatar>
                        <div className={classes.profileContent}>
                          <div className={classes.name}>
                            {currentUser.docs &&
                              currentUser.docs[0].firstName.concat(
                                " ",
                                currentUser.docs[0].lastName
                              )}
                          </div>
                          <div className={classes.email}>
                            {currentUser.docs &&
                              currentUser.docs[0].emailAddress}
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={this.handleLogout}>
                      <SvgIcon className={classes.logoutIcon}>
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" />
                      </SvgIcon>
                      <p className={classes.logout}>Log Out</p>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(UserMenu);
