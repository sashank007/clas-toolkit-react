import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';

class ToolsDrawer extends Component {
  state = {
    redirect: false,
    route: '/',
  }

  setRedirect = (event) => {
    const route = event.currentTarget.getAttribute("url");
    route !== this.state.route && this.setState({
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
    const toolItems = this.props.tools
      .sort((a, b) => a.rank > b.rank)
      .map((tool, i) =>
        <ListItem button url={tool.url} onClick={this.setRedirect} key={i}>
          <ListItemIcon>
            <SvgIcon >
              <path d={tool.icon} />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary={tool.name} />
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

export default ToolsDrawer;
