const drawerWidth = 240;

export const styles = (theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#5C6670',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  bigAvatar: {
    width: 50,
    height: 50,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  logout: {
    marginLeft: 5,
  },
  logoutIcon: {
    color: '#5C6670',
  },
  menuList: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  profile: {
    display: 'flex',
    alignItems: 'center'
  },
  profileContent: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  profileMenuItem: {
    paddingBottom: 25,
    paddingTop: 25,
    paddingRight: 50,
  },
  name: {
    fontSize: 18,
    marginBottom: -10,
  },
  email: {
    fontSize: 12,
    color: '#5C6670',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    textAlign: 'center',
  },
  navBar:{
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    width: '80%',
  },
});
