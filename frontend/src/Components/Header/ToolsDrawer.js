import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';

class ToolsDrawer extends Component {
  state = {
    redirect: false,
    route: '/',
  }

  render() {
    const toolItems = this.props.tools
      .sort((a, b) => a.rank > b.rank)
      .map((tool, i) =>
      <div key={i}>
        <Route render={({history}) => (
          <ListItem button url={tool.url} onClick={(event) => { event.target.getAttribute("url") && history.push(event.target.getAttribute("url")) }}>
            <ListItemIcon url={tool.url}>
              <SvgIcon url={tool.url}>
                <path d={tool.icon} url={tool.url} />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText primary={tool.name} url={tool.url} />
          </ListItem>
        )} />
      </div>
    );

    return (
      <div>
        {toolItems}
      </div>
    );
  }
}

export default ToolsDrawer;
