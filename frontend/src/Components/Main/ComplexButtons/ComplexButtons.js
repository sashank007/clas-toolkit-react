import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import WebFont from "webfontloader";
import { SvgIcon } from "@material-ui/core";
WebFont.load({
  google: {
    families: ["Titillium Web:300,400,700", "sans-serif", "Nocturno Regular 26"]
  }
});
const styles = theme => ({
  root: {
    marginLeft: "45%",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
    // display: "inline-block"
  },
  text: {
    fontFamily: "avenir,helvetica,sans-serif",
    padding: "20px",
    color: "#393a3d",
    fontSize: "0.8rem",
    textTransform: "capitalize"
  },
  buttonNotClicked: {},
  buttonClicked: {
    border: "1px solid #42A5F5"
  },
  paper: {
    minHeight: "120px",
    width: "200px",
    backgroundColor: "#fafafa",
    boxShadow: "0 4px 3px rgba(0,0,0,.2)",
    borderRadius: "5px"
  },
  root: {
    flexGrow: 1
  },
  clicked: {
    height: 220,
    width: 200,
    backgroundColor: "white"
  },

  control: {
    padding: 5 * 2
  },
  title: {
    fontFamily: "Titillium Web:300",
    color: "black",
    paddingTop: "10px",
    padding: "20px",
    display: "flex"
  },
  checkMark: {
    padding: "20px"
  },
  icon: {
    width: 60,
    height: 60,
    justifyContent: "center",

    paddingTop: "20px"
  },
  card: {
    position: "relative",

    [theme.breakpoints.down("xs")]: {
      width: "100% !important",
      height: 100
    },
    "&:click": {
      height: 200
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15
      },
      "& $imageMarked": {
        opacity: 0
      },
      "& $imageTitle": {
        border: "4px solid currentcolor"
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
      .spacing.unit + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
});

class ButtonBases extends React.Component {
  state = {
    spacing: "40"
  };
  constructor() {
    super();
    this.state = {
      clicked: false,
      areas: [
        {
          id: 0,

          title: "IT",
          width: "30%",
          checkMark: false,
          path:
            "M6,2C4.89,2 4,2.89 4,4V12C4,13.11 4.89,14 6,14H18C19.11,14 20,13.11 20,12V4C20,2.89 19.11,2 18,2H6M6,4H18V12H6V4M4,15C2.89,15 2,15.89 2,17V20C2,21.11 2.89,22 4,22H20C21.11,22 22,21.11 22,20V17C22,15.89 21.11,15 20,15H4M8,17H20V20H8V17M9,17.75V19.25H13V17.75H9M15,17.75V19.25H19V17.75H15Z"
        },
        {
          id: 1,

          title: "Web",
          width: "30%",
          checkMark: false,
          path:
            "M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
        },
        {
          id: 2,

          title: "Marketing/Design",
          width: "30%",
          checkMark: false,
          path:
            "M21,12C21,9.97 20.33,8.09 19,6.38V17.63C20.33,15.97 21,14.09 21,12M17.63,19H6.38C7.06,19.55 7.95,20 9.05,20.41C10.14,20.8 11.13,21 12,21C12.88,21 13.86,20.8 14.95,20.41C16.05,20 16.94,19.55 17.63,19M11,17L7,9V17H11M17,9L13,17H17V9M12,14.53L15.75,7H8.25L12,14.53M17.63,5C15.97,3.67 14.09,3 12,3C9.91,3 8.03,3.67 6.38,5H17.63M5,17.63V6.38C3.67,8.09 3,9.97 3,12C3,14.09 3.67,15.97 5,17.63M23,12C23,15.03 21.94,17.63 19.78,19.78C17.63,21.94 15.03,23 12,23C8.97,23 6.38,21.94 4.22,19.78C2.06,17.63 1,15.03 1,12C1,8.97 2.06,6.38 4.22,4.22C6.38,2.06 8.97,1 12,1C15.03,1 17.63,2.06 19.78,4.22C21.94,6.38 23,8.97 23,12Z"
        },
        {
          id: 3,

          title: "Events",
          width: "30%",
          checkMark: false,
          path:
            "M21,17V8H7V17H21M21,3A2,2 0 0,1 23,5V17A2,2 0 0,1 21,19H7C5.89,19 5,18.1 5,17V5A2,2 0 0,1 7,3H8V1H10V3H18V1H20V3H21M3,21H17V23H3C1.89,23 1,22.1 1,21V9H3V21M19,15H15V11H19V15Z"
        },
        {
          id: 4,

          title: "SalesForce/Qualtrics",
          width: "30%",
          checkMark: false,
          path:
            "M18.65,2.85L19.26,6.71L22.77,8.5L21,12L22.78,15.5L19.24,17.29L18.63,21.15L14.74,20.54L11.97,23.3L9.19,20.5L5.33,21.14L4.71,17.25L1.22,15.47L3,11.97L1.23,8.5L4.74,6.69L5.35,2.86L9.22,3.5L12,0.69L14.77,3.46L18.65,2.85M9.5,7A1.5,1.5 0 0,0 8,8.5A1.5,1.5 0 0,0 9.5,10A1.5,1.5 0 0,0 11,8.5A1.5,1.5 0 0,0 9.5,7M14.5,14A1.5,1.5 0 0,0 13,15.5A1.5,1.5 0 0,0 14.5,17A1.5,1.5 0 0,0 16,15.5A1.5,1.5 0 0,0 14.5,14M8.41,17L17,8.41L15.59,7L7,15.59L8.41,17Z"
        }
      ]
    };
  }

  handleClick = key => {
    this.setState({ clicked: !this.clicked });
    const { areas } = this.state;
    this.props.handleParentClick(key);
    console.log("key -->", key);
    areas[key].checkMark = !areas[key].checkMark;
    this.setState({ areas });
    console.log(areas[key]);
  };
  render() {
    const { classes } = this.props;
    const { areas } = this.state;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.demo}
            justify="center"
            spacing={40}
          >
            {areas.map(area => (
              <Grid key={area.id} item>
                {console.log("outside", area.checkMark)}
                <Button
                  className={
                    area.checkMark
                      ? classes.buttonClicked
                      : classes.buttonNotClicked
                  }
                  onClick={this.handleClick.bind(this, area.id)}
                >
                  <Paper className={classes.paper}>
                    <SvgIcon className={classes.icon}>
                      <path fill="#607D8B" d={area.path} />
                    </SvgIcon>
                    <p className={classes.text}>{area.title}</p>
                  </Paper>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ButtonBases.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonBases);
