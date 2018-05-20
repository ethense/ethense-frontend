import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import { SidebarLayout } from '../../layouts'
import { GradientButton, PageHeader, SectionTitle, InputRow } from '../elements'
import { getAppIds, addAppId } from '../../modules/appIdentity'
import AddAppIdDialog from '../AddAppIdDialog'

export class IssueCert extends Component {
  state = {
    addAppIdOpen: false,
    issuerId: null,
  }

  componentWillMount() {
    this.props.getAppIds()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.appIds.length !== nextProps.appIds.length) {
      this.setState({
        issuerId: nextProps.appIds[0].id,
      })
    }
  }

  handleClickOpen = () => {
    this.setState({ addAppIdOpen: true })
  }

  handleClose = () => {
    this.setState({ addAppIdOpen: false })
  }

  handleSubmit = values => {
    this.props.addAppId(values)
    this.setState({ addAppIdOpen: false })
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
          {this.props.appIds.length > 0 ? (
            <Select
              data-test-id="appIdSelect"
              key={0}
              value={this.state.issuerId}
              onChange={this.handleChange}
            >
              {this.props.appIds.map(appId => (
                <MenuItem key={appId.id} value={appId.id}>
                  {appId.name}: {appId.mnid}
                </MenuItem>
              ))}
            </Select>
          ) : (
            [
              <Typography key={0} variant="caption" color="error">
                No app identities found. Please add one to issue certificates.
              </Typography>,
              <Button
                onClick={this.handleClickOpen}
                key={1}
                data-test-id="addAppIdBtn"
                variant="raised"
                color="secondary"
              >
                Add App Identity
              </Button>,
            ]
          )}
          <AddAppIdDialog
            open={this.state.addAppIdOpen}
            onClose={this.handleClose}
            onSubmit={this.handleSubmit}
          />
        </InputRow>
        <SectionTitle>Recipient Identity</SectionTitle>
        <InputRow>
          <TextField data-test-id="recipientEmail" label="Email" />
        </InputRow>
        <SectionTitle>Attestation Claim Data</SectionTitle>
        <InputRow>claim data</InputRow>
      </SidebarLayout>
    )
  }
}

IssueCert.propTypes = {
  appIds: PropTypes.array,
  getAppIds: PropTypes.func.isRequired,
  addAppId: PropTypes.func.isRequired,
}

IssueCert.route = '/issue'

export default connect(
  state => ({ appIds: state.appIdentity.identities }),
  dispatch => ({
    getAppIds() {
      dispatch(getAppIds())
    },
    addAppId(values) {
      dispatch(addAppId(values))
    },
  })
)(IssueCert)
