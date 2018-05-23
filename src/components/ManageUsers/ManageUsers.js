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
import { getUsers, createUser, editUser, deleteUser } from '../../modules/users'
import UserDialog from '../UserDialog'

export class ManageUsers extends Component {
  state = {
    userDialogOpen: false,
    selectedUser: null,
  }

  componentWillMount() {
    this.props.getUsers()
  }

  handleCreateUser = () => {
    this.setState({ selectedUser: null, userDialogOpen: true })
  }

  handleCloseUserDialog = () => {
    this.setState({ userDialogOpen: false })
  }

  handleSubmitUserDialog = values => {
    console.log('submit user dialog', values)
    if (this.state.selectedUser) {
      this.props.editUser({
        id: this.state.selectedUser.id,
        ...values,
      })
    } else {
      this.props.createUser(values)
    }
    this.handleCloseUserDialog()
  }

  handleEditUser = user => () => {
    this.setState({ selectedUser: user, userDialogOpen: true })
  }

  handleDeleteUser = userId => () => {
    this.props.deleteUser(userId)
  }

  render() {
    return (
      <SidebarLayout>
        <PageHeader>
          <Typography variant="title">Users</Typography>
          <GradientButton
            onClick={this.handleCreateUser}
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
                        <Icon onClick={this.handleEditUser(user)}>edit</Icon>
                      </IconButton>,
                      <IconButton key={1}>
                        <Icon onClick={this.handleDeleteUser(user.id)}>
                          delete_outline
                        </Icon>
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
          selectedUser={this.state.selectedUser}
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
  editUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
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
      editUser(values) {
        dispatch(editUser(values))
      },
      deleteUser(id) {
        dispatch(deleteUser(id))
      },
    })
  )(ManageUsers)
)
