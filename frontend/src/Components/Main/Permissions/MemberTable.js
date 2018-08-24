import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import EditRole from './EditRole';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './Styles/MemberTable';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#5C6670',
    color: theme.palette.common.white,
    fontSize: 16,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class MemberTable extends Component {
  state = {
    role: this.props.role,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ role: nextProps.role });
  }

  render() {
    const { classes, roles, updateRoles } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell className={classes.head}>Name</CustomTableCell>
              <CustomTableCell className={classes.head}>Department</CustomTableCell>
              <CustomTableCell className={classes.head}>Email</CustomTableCell>
              <CustomTableCell className={classes.head}>ASURITE</CustomTableCell>
              <CustomTableCell className={classes.head}>Date Added</CustomTableCell>
              <CustomTableCell className={classes.head}>Action</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.role ?
              this.state.role.members.map(row => {
                return (
                  <TableRow className={classes.row} key={row.id}>
                    <CustomTableCell className={classes.cell}>
                      <div className={classes.name}>
                        <Avatar alt="User" src={row.photoUrl} className={classNames(classes.avatar, classes.bigAvatar)}/>
                        <div>{row.name}</div>
                      </div>
                    </CustomTableCell>
                    <CustomTableCell className={classes.cell}>{row.department}</CustomTableCell>
                    <CustomTableCell className={classes.cell}>{row.email}</CustomTableCell>
                    <CustomTableCell className={classes.cell}>{row.asurite}</CustomTableCell>
                    <CustomTableCell className={classes.cell}>{row.dateadded}</CustomTableCell>
                    <CustomTableCell className={classes.cell}>
                      <EditRole
                        roles={roles}
                        currentRole={this.state.role}
                        name={row.name}
                        department={row.department}
                        asurite={row.asurite}
                        email={row.email}
                        primaryTitle={row.primaryTitle}
                        photoUrl={row.photoUrl}
                        updateRoles={updateRoles}
                      />
                    </CustomTableCell>
                  </TableRow>
                );
              })
            : <TableRow />}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

MemberTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberTable);
