import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

class Tools extends Component {
  state = {
    redirect: false,
    route: '/',
  }

  setRedirect = (event) => {
    const route = event.currentTarget.getAttribute("url");
    this.setState({
      redirect: true,
      route: route,
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.route} />
    }
  }

  render() {
    const toolItems = this.props.tools.map((item, i) =>
      <ListItem button url={item.url} onClick={this.setRedirect} key={i}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItem>
    );

    return (
      <div>
        {this.renderRedirect()}
        {toolItems}
      </div>
    );
  }
}

export default Tools;
