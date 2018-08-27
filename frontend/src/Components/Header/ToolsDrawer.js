import React from 'react';
import { Route } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';

const ToolsDrawer = (props) => {
  const toolItems = props.tools
    .sort((a, b) => a.rank > b.rank)
    .map((tool, i) =>
    <div key={i}>
      <Route render={({history}) => (
        <ListItem button onClick={(event) => { history.push(tool.url) }}>
          <ListItemIcon>
            <SvgIcon>
              <path d={tool.icon} />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary={tool.name} />
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

export default ToolsDrawer;
