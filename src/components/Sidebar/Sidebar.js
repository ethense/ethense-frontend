import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Menu from 'material-ui/Menu'
// import MenuItem from 'material-ui/MenuItem'
import Button from '@material-ui/core/Button'

import IssueCert from '../IssueCert'
import ManageAppIds from '../ManageAppIds'
import ManageUsers from '../ManageUsers'

class Sidebar extends Component {
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
        <Button onClick={this.handleClick}>user</Button>
        {/* <Menu
          anochorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu> */}
      </div>
    )
  }
}

export default Sidebar
