import React, { Component } from 'react'
import { Typography } from '@material-ui/core'

import { SidebarLayout } from '../../layouts'
import { GradientButton, PageHeader } from '../elements'

export class ManageUsers extends Component {
  render() {
    return (
      <SidebarLayout>
        <PageHeader>
          <Typography variant="title">Users</Typography>
          <GradientButton data-test-id="addUserBtn" variant="raised">
            Add User
          </GradientButton>
        </PageHeader>
      </SidebarLayout>
    )
  }
}

ManageUsers.route = '/users'

export default ManageUsers
