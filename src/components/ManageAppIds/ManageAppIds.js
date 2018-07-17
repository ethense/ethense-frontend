import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import { SidebarLayout } from '../../layouts'
import { GradientButton, PageHeader } from '../elements'
import { getAppIds, addAppId, deleteAppId } from '../../modules/appIdentity'
import AddAppIdDialog from '../AddAppIdDialog'

const defaultState = {
  appIdDialogOpen: false,
}
export class ManageAppIds extends Component {
  state = { ...defaultState }

  componentWillMount() {
    this.props.getAppIds()
  }

  handleOpenAppIdDialog = () => {
    this.setState({ appIdDialogOpen: true })
  }
  handleCloseAppIdDialog = () => {
    this.setState({ appIdDialogOpen: false })
  }
  handleAddAppId = values => {
    this.props.addAppId(values)
    this.setState({ appIdDialogOpen: false })
  }
  handleDeleteAppId = id => () => {
    this.props.deleteAppId(id)
  }

  render() {
    return (
      <SidebarLayout>
        <PageHeader>
          <Typography variant="title">App Identities</Typography>
          <GradientButton
            data-test-id="addAppIdBtn"
            variant="raised"
            onClick={this.handleOpenAppIdDialog}
          >
            Add Identity
          </GradientButton>
        </PageHeader>
        <AddAppIdDialog
          open={this.state.appIdDialogOpen}
          onClose={this.handleCloseAppIdDialog}
          onSubmit={this.handleAddAppId}
        />
        <Paper elevation={1}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Private Key</TableCell>
              </TableRow>
            </TableHead>
            <TableBody data-test-id="appIdsTableBody">
              {this.props.appIds.map(appId => (
                <TableRow key={appId.id}>
                  <TableCell component="th" scope="row">
                    {appId.name}
                  </TableCell>
                  <TableCell>{appId.mnid}</TableCell>
                  <TableCell>{appId.privateKey}</TableCell>
                  <TableCell numeric>
                    <IconButton onClick={this.handleDeleteAppId(appId.id)}>
                      <Icon>delete_outline</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </SidebarLayout>
    )
  }
}

ManageAppIds.route = '/appIdentities'

ManageAppIds.propTypes = {
  appIds: PropTypes.array,
  getAppIds: PropTypes.func.isRequired,
  addAppId: PropTypes.func.isRequired,
  // removeAppId: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    appIds: state.appIdentity.identities,
  }),
  dispatch => ({
    getAppIds() {
      dispatch(getAppIds())
    },
    addAppId(values) {
      dispatch(addAppId(values))
    },
    deleteAppId(id) {
      dispatch(deleteAppId(id))
    },
  })
)(ManageAppIds)
