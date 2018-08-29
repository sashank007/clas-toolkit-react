import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = {
  questions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
};

function Question(props) {
  const { classes, content } = props;

  const questions = content
  .map((question, i) =>
  <TextField
    key={i}
    id="full-width"
    label={question}
    InputLabelProps={{
      shrink: true,
    }}
    placeholder="Fill in Answer"
    fullWidth
    margin="normal"
  />);

  return (
    <div className={classes.questions}>
      <Typography className={classes.title} color="textSecondary">
        Answer the following questions correctly:
      </Typography>
      {questions}
    </div>
  );
}

Question.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Question);
