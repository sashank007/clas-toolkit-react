import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Tool from './Tool';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './Styles/Home';

class Home extends Component {
  state = {
    tools: [],
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ tools: nextProps.tools });
  }

  render() {
    const { classes } = this.props;

    const cards = this.state.tools
      .sort((a, b) => a.rank > b.rank)
      .map((tool) =>
      <CardActions key={tool.rank}>
        <Route render={({history}) => (
          <Button size="small" className={classes.tool} url={tool.url} onClick={(event) => { event.target.getAttribute("url") && history.push(event.target.getAttribute("url")) }} >
            <Tool name={tool.name} description={tool.description} icon={tool.icon} url={tool.url} />
          </Button>
        )} />
      </CardActions>
    );

    return (
      <div>
        <div className={classes.tools}>
          {cards}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
