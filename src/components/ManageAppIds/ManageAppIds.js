import React, { Component } from 'react'
import { Typography } from '@material-ui/core'

import { SidebarLayout } from '../../layouts'
import { GradientButton, PageHeader } from '../elements'

export class ManageAppIds extends Component {
  render() {
    return (
      <SidebarLayout>
        <PageHeader>
          <Typography variant="title">App Identities</Typography>
          <GradientButton data-test-id="addAppIdBtn" variant="raised">
            Add Identity
          </GradientButton>
        </PageHeader>
      </SidebarLayout>
    )
  }
}

ManageAppIds.route = '/appIdentities'

export default ManageAppIds
