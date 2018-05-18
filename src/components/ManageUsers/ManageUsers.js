import React, { Component } from 'react'
import { SidebarLayout } from '../../layouts'

class ManageUsers extends Component {
  render() {
    return <SidebarLayout> manage users </SidebarLayout>
  }
}

ManageUsers.route = '/users'

export default ManageUsers
