import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'

import { SidebarLayout } from '../../layouts'
import { GradientButton, PageHeader, SectionTitle, InputRow } from '../elements'
import { getAppIds } from '../../modules/appIdentity'

export class IssueCert extends Component {
  state = {
    addAppIdOpen: false,
  }

  componentWillMount() {
    this.props.getAppIds()
  }

  handleClickOpen = () => {
    this.setState({ addAppIdOpen: true })
  }

  handleClose = () => {
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
          {this.props.appIds.length > 0
            ? this.props.appIds.map(appId => (
                <div>
                  {appId.name}: {appId.mnid}
                </div>
              ))
            : [
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
              ]}
          <Dialog open={this.state.addAppIdOpen} onClose={this.handleClose}>
            <DialogTitle data-test-id="addAppIdForm">
              New App Identity
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Something about adding an app Identity
              </DialogContentText>
              <TextField id="appName" label="App Name" fullWidth />
              <TextField id="mnid" label="MNID" fullWidth />
              <TextField id="privateKey" label="Private Key" fullWidth />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>cancel</Button>
              <GradientButton variant="raised">add</GradientButton>
            </DialogActions>
          </Dialog>
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
