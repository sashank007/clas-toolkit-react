export const styles = (theme) => ({
  avatar: {
    marginRight: 10,
  },
  cell: {
    fontSize: 16,
    color: '#5C6670',
    fontFamily: 'Roboto',
  },
  name: {
    display: 'flex',
    alignItems: 'center',
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    borderRadius: 0,
    boxShadow: 'none',
    borderTopWidth: 8,
    marginLeft: 12,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  table: {
    minWidth: 700,
  },
});
