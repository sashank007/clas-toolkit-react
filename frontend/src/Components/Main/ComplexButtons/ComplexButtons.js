import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import ComputerImage from "../../../Assets/Images/computerWallpaper.jpg";
import WebImage from "../../../Assets/Images/web.jpg";
import MarketingImage from "../../../Assets/Images/marketingwallpaper.jpg";
import EventsImage from "../../../Assets/Images/events.jpg";
import SalesImage from "../../../Assets/Images/sales.jpg";
import classNames from "classnames";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
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

  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 150
  },
  control: {
    padding: 5 * 2
  },
  card: {
    position: "relative",
    height: 150,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
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

const areas = [
  {
    id: 0,
    img: ComputerImage,
    title: "IT",
    width: "30%"
  },
  {
    id: 1,
    img: WebImage,
    title: "Web",
    width: "30%"
  },
  {
    id: 2,
    img: MarketingImage,
    title: "Marketing/Design",
    width: "30%"
  },
  {
    id: 3,
    img: EventsImage,
    title: "Events",
    width: "30%"
  },
  {
    id: 4,
    img: SalesImage,
    title: "SalesForce/Qualtrics",
    width: "30%"
  }
];

class ButtonBases extends React.Component {
  state = {
    spacing: "40"
  };
  constructor() {
    super();
    // this.handleClick = this.handleClick.bind(this);
  }
  handleClick = key => {
    console.log("clicked in complex buttons");
    // console.log(key);
    this.props.handleParentClick(key);
  };
  render() {
    const { classes } = this.props;
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
                <Paper className={classes.paper}>
                  <Card style={{ width: "100%" }}>
                    <CardContent>Hi</CardContent>
                  </Card>
                  {/* <p className={classes.title}>{area.title}</p> */}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

// <div className={classes.root}>
//   {areas.map(image => (
//     <Card style={{ width: "10%" }} className={classes.card}>
//       <CardContent>
//         <Typography
//           className={classes.title}
//           color="textSecondary"
//           gutterBottom
//         >
//           Word of the Day
//         </Typography>
//         <Typography variant="h5" component="h2">
//           benovelant
//         </Typography>
//         <Typography className={classes.pos} color="textSecondary">
//           adjective
//         </Typography>
//         <Typography component="p">
//           well meaning and kindly.
//           <br />
//           {'"a benevolent smile"'}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//     </Card>
// <ButtonBase
//   focusRipple
//   // onClick={this.handleChildClick}
//   key={image.title}
//   className={classes.image}
//   style={{ backgroundColor: "white" }}
//   onClick={this.handleClick.bind(this, image.id)}
//   focusVisibleClassName={classes.focusVisible}
//   style={{
//     width: image.width
//   }}
// >
//   <span
//     className={classes.imageSrc}
//     style={{
//       backgroundImage: `url(${image.img})`
//     }}
//   />
//   <span className={classes.imageBackdrop} />
//   <span className={classes.imageButton}>
//     <Typography
//       component="span"
//       variant="subtitle1"
//       color="inherit"
//       className={classes.imageTitle}
//     >
//       {image.title}
//       <span className={classes.imageMarked} />
//     </Typography>
//   </span>
// </ButtonBase>
//       ))}
//     </div>
//   );
// }

// function ButtonBases(props) {
//   const { classes } = props;

//   function handleClick() {
//     console.log("clicked");
//   }
//   const state = {
//     clicked: "clicked"
//   };

//   //   function handleChildClick() {
//   //     console.log("clicked inside child");
//   //     this.props.handleParentClick("clicked p");
//   //   }
//   return (
//     <div className={classes.root}>
//       {images.map(image => (
//         <ButtonBase
//           focusRipple
//           // onClick={this.handleChildClick}
//           key={image.title}
//           className={classes.image}
//           onClick={this.handleClick}
//           focusVisibleClassName={classes.focusVisible}
//           style={{
//             width: image.width
//           }}
//         >
//           <span
//             className={classes.imageSrc}
//             style={{
//               backgroundImage: `url(${image.img})`
//             }}
//           />
//           <span className={classes.imageBackdrop} />
//           <span className={classes.imageButton}>
//             <Typography
//               component="span"
//               variant="subtitle1"
//               color="inherit"
//               className={classes.imageTitle}
//             >
//               {image.title}
//               <span className={classes.imageMarked} />
//             </Typography>
//           </span>
//         </ButtonBase>
//       ))}
//     </div>
//   );
// }

ButtonBases.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonBases);
