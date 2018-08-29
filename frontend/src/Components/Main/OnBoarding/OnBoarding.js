import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CustomStepper from './CustomStepper';
import Typography from '@material-ui/core/Typography';

const styles = {
  actions: {
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  card: {
    minWidth: 275,
    marginBottom: 10,
  },
  content: {
    display: 'flex',
  },
  onboarding: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: 16,
    fontSize: 30,
  },
};

class OnBoarding extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <img alt="Onboarding" src="https://kissflow.com/wp-content/uploads/2018/04/850x450_Onboarding-01.png" />
            <div>
              <Typography className={classes.title} color="textSecondary">
                Title
              </Typography>
              <Typography component="p">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960 with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Typography>
            </div>
          </CardContent>
          <CardActions className={classes.actions}>
            <CustomStepper />
          </CardActions>
        </Card>
      </div>
    );
  }
}

OnBoarding.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OnBoarding);
