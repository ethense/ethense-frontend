import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import SortableTree, {
  addNodeUnderParent,
  removeNodeAtPath,
  changeNodeAtPath,
} from 'react-sortable-tree'
import 'react-sortable-tree/style.css'
import SortableTreeTheme from '../SortableTreeTheme'

import { SidebarLayout } from '../../layouts'
import {
  GradientButton,
  PageHeader,
  SectionTitle,
  InputRow,
  FlexInput,
  AddAttrButton,
  HoverSelect,
  HoverTextField,
} from '../elements'
import { getAppIds, addAppId } from '../../modules/appIdentity'
import AddAppIdDialog from '../AddAppIdDialog'
import { issue } from '../../modules/issuance'

const getNodeKey = ({ treeIndex }) => treeIndex
const getNewNode = () => ({
  name: '',
  type: 'string',
  value: '',
})

export class IssueCert extends Component {
  state = {
    addAppIdOpen: false,
    issuerId: this.props.appIds.length > 0 ? this.props.appIds[0].id : null,
    email: '',
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

  handleChangeApp = e => {
    this.setState({ issuerId: e.target.value })
  }

  handleChangeEmail = e => {
    this.setState({ email: e.target.value })
  }

  handleSubmit = values => {
    this.props.addAppId(values)
    this.setState({ addAppIdOpen: false })
  }

  handleTreeChange = treeData => {
    this.setState({ treeData })
  }

  handleAddAttr = () => {
    this.setState({
      treeData: this.state.treeData.concat(getNewNode()),
    })
  }

  handleChangeNodeType = (node, path) => e => {
    const newValue = e.target.value
    if (newValue === node.type) return
    const newNode = {
      name: node.name,
      type: newValue,
    }

    switch (newValue) {
      case 'string':
        newNode.value = ''
        break
      case 'object':
        newNode.children = []
        break
      default:
        console.error('ERROR: invalid attribute type', newValue)
    }

    this.setState({
      treeData: changeNodeAtPath({
        treeData: this.state.treeData,
        path,
        getNodeKey,
        newNode,
      }),
    })
  }

  handleChangeNodeText = (attr, node, path) => e => {
    const newValue = e.target.value

    this.setState({
      treeData: changeNodeAtPath({
        treeData: this.state.treeData,
        path,
        getNodeKey,
        newNode: { ...node, [attr]: newValue },
      }),
    })
  }

  handleAddNodeChild = (node, path) => e => {
    this.setState({
      treeData: addNodeUnderParent({
        treeData: this.state.treeData,
        parentKey: path[path.length - 1],
        expandParent: true,
        getNodeKey,
        newNode: getNewNode(),
      }).treeData,
    })
  }

  handleRemoveNode = (node, path) => e => {
    this.setState({
      treeData: removeNodeAtPath({
        treeData: this.state.treeData,
        path,
        getNodeKey,
      }),
    })
  }

  getTreeNode = ({ node, path, ...other }) => {
    const valueField =
      node.type === 'object' ? (
        <Typography
          // TODO: get rid of this style prop
          style={{ flex: 1, color: '#aaa' }}
          variant="subheading"
          key={3}
        >
          {`{ ${node.children.length} attributes }`}
        </Typography>
      ) : (
        <HoverTextField
          // TODO: get rid of this style prop
          style={{ flex: 1 }}
          key={3}
          value={node.value}
          placeholder="Value"
          onChange={this.handleChangeNodeText('value', node, path)}
        />
      )

    const buttons = []
    if (node.type === 'object') {
      buttons.push(
        <IconButton
          // TODO: get rid of style prop
          style={{ marginRight: 0 }}
          variant="outlined"
          key={6}
          onClick={this.handleAddNodeChild(node, path)}
        >
          <Icon>add</Icon>
        </IconButton>
      )
    }
    buttons.push(
      <IconButton
        variant="outlined"
        key={5}
        onClick={this.handleRemoveNode(node, path)}
      >
        <Icon>delete_outline</Icon>
      </IconButton>
    )

    return {
      title: [
        <HoverTextField
          key={1}
          value={node.name}
          placeholder="Name"
          onChange={this.handleChangeNodeText('name', node, path)}
        />,
        <Typography key={2} variant="title">
          :
        </Typography>,
        valueField,
        ...buttons,
        <HoverSelect
          key={0}
          value={node.type}
          onChange={this.handleChangeNodeType(node, path)}
          input={<Input name="type" />}
        >
          <MenuItem key={0} value={'string'}>
            Static
          </MenuItem>
          <MenuItem key={1} value={'object'}>
            Group
          </MenuItem>
          <MenuItem key={2} value={'dynamic'}>
            Dynamic
          </MenuItem>
        </HoverSelect>,
      ],
    }
  }

  handleSubmit = () => {
    this.props.issue(this.state.issuerId, this.state.email, this.state.treeData)
  }

  render() {
    return (
      <SidebarLayout>
        <PageHeader>
          <Typography variant="title">Issue Certificate</Typography>
          <GradientButton
            onClick={this.handleSubmit}
            data-test-id="issueBtn"
            variant="raised"
          >
            Issue
          </GradientButton>
        </PageHeader>
        <SectionTitle>Issuer App Identity</SectionTitle>
        <InputRow>
          {this.props.appIds.length > 0 ? (
            <Select
              fullWidth
              data-test-id="appIdSelect"
              key={0}
              value={this.state.issuerId}
              onChange={this.handleChangeApp}
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
                No app identities found. Please{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://appmanager.uport.me/"
                >
                  create
                </a>{' '}
                and add one to issue certificates.
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
          <TextField
            fullWidth
            onChange={this.handleChangeEmail}
            data-test-id="recipientEmail"
            label="Email"
          />
        </InputRow>
        <SectionTitle>Attestation Claim Data</SectionTitle>
        <FlexInput>
          <SortableTree
            style={{ flex: 1 }}
            treeData={this.state.treeData}
            onChange={this.handleTreeChange}
            generateNodeProps={this.getTreeNode}
            canDrop={({ nextParent }) =>
              nextParent === null || nextParent.type === 'object'
            }
            theme={SortableTreeTheme}
          />
          <AddAttrButton
            onClick={this.handleAddAttr}
            variant="outlined"
            data-test-id="addAttrBtn"
          >
            + Attribute
          </AddAttrButton>
        </FlexInput>
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
    issue(appId, email, schema) {
      console.log(appId, email, schema)
      dispatch(issue(appId, email, schema))
    },
  })
)(IssueCert)
