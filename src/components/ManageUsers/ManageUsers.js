import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
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
import { getUsers, createUser } from '../../modules/users'
import UserDialog from '../UserDialog'

export class ManageUsers extends Component {
  state = {
    userDialogOpen: false,
  }

  componentWillMount() {
    this.props.getUsers()
  }

  handleOpenUserDialog = () => {
    this.setState({ userDialogOpen: true })
  }

  handleCloseUserDialog = () => {
    this.setState({ userDialogOpen: false })
  }

  handleSubmitUserDialog = values => {
    console.log('submit user dialog', values)
    this.props.createUser(values)
    this.handleCloseUserDialog()
  }

  render() {
    return (
      <SidebarLayout>
        <PageHeader>
          <Typography variant="title">Users</Typography>
          <GradientButton
            onClick={this.handleOpenUserDialog}
            data-test-id="createUserBtn"
            variant="raised"
          >
            Create User
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
                      <IconButton key={0}>
                        <Icon>edit</Icon>
                      </IconButton>,
                      <IconButton key={1}>
                        <Icon>delete_outline</Icon>
                      </IconButton>,
                    ]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <UserDialog
          open={this.state.userDialogOpen}
          onClose={this.handleCloseUserDialog}
          onSubmit={this.handleSubmitUserDialog}
        />
      </SidebarLayout>
    )
  }
}

ManageUsers.route = '/users'

ManageUsers.propTypes = {
  users: PropTypes.array,
  getUsers: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
}

export default withRouter(
  connect(
    state => ({
      users: state.users.users,
    }),
    dispatch => ({
      getUsers() {
        dispatch(getUsers())
      },
      createUser(values) {
        dispatch(createUser(values))
      },
    })
  )(ManageUsers)
)
