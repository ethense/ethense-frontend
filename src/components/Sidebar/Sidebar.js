import React, { Component } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Icon from '@material-ui/core/Icon'

import IssueCert from '../IssueCert'
import ManageAppIds from '../ManageAppIds'
import ManageUsers from '../ManageUsers'
import { logout } from '../../modules/authentication'
import { Container, FlexSpace, NavButton, UserButton } from './elements'

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

  // TODO: figure out how to get the route prop working when nested inside a LayoutRoute
  render() {
    return (
      <Container>
        <NavButton data-test-id="issueNav" to={IssueCert.route}>
          <Icon>school</Icon>Issue Cert
        </NavButton>
        <NavButton data-test-id="appIdsNav" to={ManageAppIds.route}>
          <Icon>settings</Icon>App Identities
        </NavButton>
        <NavButton data-test-id="usersNav" to={ManageUsers.route}>
          <Icon>supervisor_account</Icon>Users
        </NavButton>
        <FlexSpace />
        <UserButton data-test-id="userMenuBtn" onClick={this.handleClick}>
          <Icon>person</Icon>
        </UserButton>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem data-test-id="logoutButton" onClick={this.props.logout}>
            Logout
          </MenuItem>
        </Menu>
      </Container>
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
