import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import { SidebarLayout } from '../../layouts'
import { GradientButton, PageHeader } from '../elements'
import { getUsers } from '../../modules/users'

export class ManageUsers extends Component {
  componentWillMount() {
    this.props.getUsers()
  }

  render() {
    return (
      <SidebarLayout>
        <PageHeader>
          <Typography variant="title">Users</Typography>
          <GradientButton data-test-id="addUserBtn" variant="raised">
            Add User
          </GradientButton>
        </PageHeader>
        <Paper elevation={1}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody data-test-id="usersTableBody">
              {this.props.users.map(user => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.email}
                  </TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell numeric>
                    {[
                      <IconButton key={0}><Icon>edit</Icon></IconButton>,
                      <IconButton key={1}><Icon>delete_outline</Icon></IconButton>,
                    ]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </SidebarLayout>
    )
  }
}

ManageUsers.route = '/users'

export default connect(
  state => ({
    users: state.users.users,
  }),
  dispatch => ({
    getUsers() {
      dispatch(getUsers())
    },
  })
)(ManageUsers)
