export const styles = (theme) => ({
  about: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  bigAvatar: {
    width: 100,
    height: 100,
    marginRight: 25,
  },
  button: {
    margin: theme.spacing.unit,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 0,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  member: {
    display: 'flex',
    flexDirection: 'column',
    color: '#5C6670',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  roles: {
    display: 'flex',
  },
});
