import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import SortableTree from 'react-sortable-tree'
import 'react-sortable-tree/style.css'

import { SidebarLayout } from '../../layouts'
import { GradientButton, PageHeader, SectionTitle, InputRow } from '../elements'
import { getAppIds, addAppId } from '../../modules/appIdentity'
import AddAppIdDialog from '../AddAppIdDialog'

export class IssueCert extends Component {
  state = {
    addAppIdOpen: false,
    issuerId: this.props.appIds.length > 0 ? this.props.appIds[0].id : null,
    treeData: [
      { name: 'email', type: 'string', value: 'mike@test.com' },
      {
        name: 'address',
        type: 'object',
        children: [
          { name: 'street', type: 'string', value: '123 main st' },
          { name: 'city', type: 'string', value: 'indy' },
        ],
      },
    ],
  }

  componentWillMount() {
    this.props.getAppIds()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.appIds.length === 0 && nextProps.appIds.length > 0) {
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

  handleTreeChange = treeData => {
    this.setState({ treeData })
  }

  handleAddAttr = () => {
    console.log('add attribute')
  }

  handleChangeNodeName = (node, path) => e => {
    console.log('change node name', node, path, e)
  }

  handleChangeNodeType = (node, path) => e => {
    console.log('change node type', node, path, e)
  }

  handleChangeNodeValue = (node, path) => e => {
    console.log('change node value', node, path, e)
  }

  handleAddNodeChild = (node, path) => e => {
    console.log('add child node', node, path, e)
  }

  handleRemoveNode = (node, path) => e => {
    console.log('remove node', node, path, e)
  }

  getTreeNode = ({ node, path }) => {
    const valueField =
      node.type === 'object' ? (
        <span key={2}>{node.children.length} values</span>
      ) : (
        <TextField
          key={2}
          value={node.value}
          label="Value"
          onChange={this.handleChangeNodeValue(node, path)}
        />
      )

    const buttons = []
    if (node.type === 'object') {
      buttons.push(
        <Button key={0} onClick={this.handleAddNodeChild(node, path)}>
          add child
        </Button>
      )
    }
    buttons.push(
      <Button key={1} onClick={this.handleRemoveNode(node, path)}>
        remove
      </Button>
    )

    return {
      title: [
        <TextField
          key={0}
          value={node.name}
          label="Name"
          onChange={this.handleChangeNodeName(node, path)}
        />,
        <Select
          key={1}
          value={node.type}
          onChange={this.handleChangeNodeType(node, path)}
        >
          <MenuItem key={0} value={'string'}>
            string
          </MenuItem>
          <MenuItem key={1} value={'object'}>
            object
          </MenuItem>
        </Select>,
        valueField,
      ],
      buttons,
    }
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
        <SortableTree
          treeData={this.state.treeData}
          onChange={this.handleTreeChange}
          generateNodeProps={this.getTreeNode}
          canDrop={({ nextParent }) =>
            nextParent === null || nextParent.type === 'object'
          }
        />
        <Button
          onClick={this.handleAddAttr}
          variant="raised"
          data-test-id="addAttrBtn"
        >
          + Attribute
        </Button>
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
