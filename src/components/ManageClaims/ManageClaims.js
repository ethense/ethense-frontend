import React, { Component } from 'react'
import { Typography } from '@material-ui/core'

import { SidebarLayout } from '../../layouts'
import {
  GradientButton,
  PageHeader,
  SectionTitle,
} from '../elements'
import RecordSelect from '../RecordSelect'

export class ManageClaims extends Component {
  render() {
    return (
      <SidebarLayout>
        <PageHeader>
          <Typography variant="title">Claim Templates</Typography>
          <GradientButton>Create Template</GradientButton>
        </PageHeader>
        <SectionTitle>Name</SectionTitle>
        <RecordSelect
          data-test-id="claimTemplateSelect"
          emptyValue={'(Untitled Claim Template)'}
          // selectItems={this.props.claimTemplates}
          // selectValue={this.state.claimTemplateId}
          // onChangeValue={this.handleChangeClaim}
          // onClickDelete={this.handleDeleteClaim}
          // onClickSave={this.handleSaveClaim}
          // onClickCreate={this.handleOpenClaimDialog}
        />
        <SectionTitle>Attributes</SectionTitle>
      </SidebarLayout>
    )
  }
}

ManageClaims.route = '/claims'

export default ManageClaims
