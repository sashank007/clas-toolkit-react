import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { styles } from './Styles/CustomForm'

function CustomForm(props) {
  const { classes, content } = props;

  const questions = content
  .map((input, i) =>
    (['text', 'search', 'tel', 'password', 'url', 'email', 'date', 'number'].includes(input.inputType) && (
      <TextField
        key={i}
        id="full-width"
        InputLabelProps={{
          shrink: true,
        }}
        label={input.question}
        type={input.inputType}
        placeholder={input.placeholder}
        defaultValue={input.defaultValue}
        fullWidth
        margin="normal"
      />
    )) ||
    (['checkbox'].includes(input.inputType) && (
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">{input.question}</FormLabel>
        <FormGroup>
          {input.values
          .map((value, i) =>
            <FormControlLabel
              control={
                <Checkbox />
              }
              label={value}
            />
          )}
        </FormGroup>
      </FormControl>
    )) ||
    (['radio'].includes(input.inputType) && (
      <FormControl component="fieldset" className={classes.formControl} fullWidth>
        <FormLabel component="legend">{input.question}</FormLabel>
        <RadioGroup
          aria-label="Radio"
          name="radio"
        >
          {input.values
          .map((value, i) =>
            <FormControlLabel value={value} control={<Radio />} label={value} />
          )}
        </RadioGroup>
      </FormControl>
    )) ||
    (['select'].includes(input.inputType) && (
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel shrink>
          {input.question}
        </InputLabel>
        <Select
          input={<Input />}
          displayEmpty
        >
          {input.values
          .map((value, i) =>
            <MenuItem value={value}>{value}</MenuItem>
          )}
        </Select>
      </FormControl>
    )) ||
    (['file'].includes(input.inputType) && (
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel shrink>
          {input.question}
        </InputLabel>
        <Input type={input.inputType} />
      </FormControl>
    ))
  );

  return (
    <form noValidate>
      <Typography className={classes.title} color="textSecondary">
        Answer the following questions correctly:
      </Typography>
      {questions}
    </form>
  );
}

CustomForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomForm);
