import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import IssueCert from '../IssueCert'
import ManageAppIds from '../ManageAppIds'
import ManageUsers from '../ManageUsers'
import { logout } from '../../modules/authentication'

export class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
    }
  }

  handleClick = e => {
    this.setState({ anchorEl: e.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    return (
      <div>
        <Link to={IssueCert.route}>Issue Cert</Link>
        <Link to={ManageAppIds.route}>App Identities</Link>
        <Link to={ManageUsers.route}>Users</Link>
        <Button data-test-id="userMenuBtn" onClick={this.handleClick}>
          user
        </Button>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem data-test-id="logoutButton" onClick={this.props.logout}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }
}

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
}

export default connect(
  state => ({}),
  dispatch => ({
    logout() {
      dispatch(logout())
    },
  })
)(Sidebar)
