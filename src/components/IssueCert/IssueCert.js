import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

import { SidebarLayout } from '../../layouts'
import { GradientButton, PageHeader, SectionTitle, InputRow } from '../elements'
import { getAppIds } from '../../modules/appIdentity'

export class IssueCert extends Component {
  componentWillMount() {
    this.props.getAppIds()
  }

  render() {
    return (
      <SidebarLayout>
        <PageHeader>
          <Typography variant="title">Issue Certificate</Typography>
          <GradientButton data-test-id="issueBtn" variant="raised">
            Issue
          </GradientButton>
        </PageHeader>
        <SectionTitle>Issuer App Identity</SectionTitle>
        <InputRow>
        </InputRow>
        <SectionTitle>Recipient Identity</SectionTitle>
        <InputRow>mnid</InputRow>
        <SectionTitle>Attestation Claim Data</SectionTitle>
        <InputRow>claim data</InputRow>
      </SidebarLayout>
    )
  }
}

IssueCert.propTypes = {
  appIds: PropTypes.array,
  getAppIds: PropTypes.func.isRequired,
}

IssueCert.route = '/issue'

export default connect(
  state => ({ appIds: state.appIdentity.identities }),
  dispatch => ({
    getAppIds() {
      dispatch(getAppIds())
    },
  })
)(IssueCert)
