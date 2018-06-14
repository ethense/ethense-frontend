import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Icon,
  IconButton,
  Input,
  MenuItem,
  Typography,
} from '@material-ui/core'
import SortableTree, {
  addNodeUnderParent,
  changeNodeAtPath,
  removeNodeAtPath,
} from 'react-sortable-tree'

import { SidebarLayout } from '../../layouts'
import {
  AddAttrButton,
  FlexInput,
  HoverSelect,
  HoverTextField,
  PageHeader,
  SectionTitle,
} from '../elements'
import {
  clearNewTemplateId,
  createClaimTemplate,
  deleteClaimTemplate,
  editClaimTemplate,
  getClaimTemplates,
} from '../../modules/claimTemplate'
import RecordSelect from '../RecordSelect'
import ClaimTemplateDialog from '../ClaimTemplateDialog'
import SortableTreeTheme from '../SortableTreeTheme'

const getNodeKey = ({ treeIndex }) => treeIndex
const getNewAttribute = () => ({
  name: '',
  type: 'string',
  value: '',
})
const parentIsObject = ({ nextParent }) =>
  nextParent === null || nextParent.type === 'object'
const defaultState = {
  selectedClaimId: '',
  selectedClaimSchema: [getNewAttribute()],
  claimDialogOpen: false,
}

export class ManageClaims extends Component {
  state = { ...defaultState }

  componentWillMount() {
    this.props.getClaimTemplates()
  }

  componentWillReceiveProps(nextProps) {
    // select newly created claim once server responds with its id
    if (!this.props.newClaimId && !!nextProps.newClaimId) {
      this.selectClaim(nextProps.newClaimId, nextProps.claimTemplates)
      this.props.clearNewClaimId()
    }
  }

  selectClaim = (claimId, claims) => {
    const claim = claims.find(c => c.id === claimId)
    this.setState({
      selectedClaimId: claimId,
      selectedClaimSchema: claim
        ? claim.schema
        : defaultState.selectedClaimSchema,
    })
  }

  // handlers to manage the selected claim template
  handleChangeClaim = e => {
    this.selectClaim(e.target.value, this.props.claimTemplates)
  }
  handleDeleteClaim = () => {
    this.props.deleteClaimTemplate(this.state.selectedClaimId)
    this.selectClaim('', [])
  }
  handleSaveClaim = () => {
    this.props.editClaimTemplate({
      id: this.state.selectedClaimId,
      schema: this.state.selectedClaimSchema,
    })
  }
  handleCreateClaim = values => {
    this.props.createClaimTemplate({
      name: values.name,
      schema: defaultState.selectedClaimSchema,
    })
    this.setState({ claimDialogOpen: false })
  }

  // handlers to manage the claim title dialog
  handleOpenClaimDialog = () => {
    this.setState({ claimDialogOpen: true })
  }
  handleCloseClaimDialog = () => {
    this.setState({ claimDialogOpen: false })
  }

  // handlers to manage attributes of the selected claim template
  handleChangeClaimSchema = selectedClaimSchema => {
    this.setState({ selectedClaimSchema })
  }
  handleAddAttribute = e => {
    this.setState({
      selectedClaimSchema: this.state.selectedClaimSchema.concat(
        getNewAttribute()
      ),
    })
  }
  handleAddChildAttribute = (node, path) => e => {
    this.setState({
      selectedClaimSchema: addNodeUnderParent({
        treeData: this.state.selectedClaimSchema,
        parentKey: path[path.length - 1],
        expandParent: true,
        getNodeKey,
        newNode: getNewAttribute(),
      }).treeData,
    })
  }
  handleChangeAttributeType = (node, path) => e => {
    const newType = e.target.value
    if (newType === node.type) return
    const newNode = {
      name: node.name,
      type: newType,
    }

    switch (newType) {
      case 'string':
      case 'dynamic':
        newNode.value = ''
        break
      case 'object':
        newNode.children = []
        break
      default:
        console.error(`ERROR: invalid attribute type: ${newType}`)
        return
    }

    this.setState({
      selectedClaimSchema: changeNodeAtPath({
        treeData: this.state.selectedClaimSchema,
        path,
        getNodeKey,
        newNode,
      }),
    })
  }
  handleDeleteAttribute = (node, path) => e => {
    this.setState({
      selectedClaimSchema: removeNodeAtPath({
        treeData: this.state.selectedClaimSchema,
        path,
        getNodeKey,
      }),
    })
  }
  handleChangeAttributeName = (node, path) => {
    return this.changeAttribute('name', node, path)
  }
  handleChangeAttributeValue = (node, path) => {
    return this.changeAttribute('value', node, path)
  }
  changeAttribute = (key, node, path) => e => {
    const newValue = e.target.value

    this.setState({
      selectedClaimSchema: changeNodeAtPath({
        treeData: this.state.selectedClaimSchema,
        path,
        getNodeKey,
        newNode: { ...node, [key]: newValue },
      }),
    })
  }

  // function used by react-sortable-tree to generate the content of each node
  getAttributeNode = ({ node, path, ...args }) => {
    const attributeName = (
      <HoverTextField
        key={0}
        onChange={this.handleChangeAttributeName(node, path)}
        placeholder="Name"
        value={node.name}
      />
    )

    const colon = (
      <Typography key={1} variant="title">
        :
      </Typography>
    )

    const attributeValue =
      node.type === 'object' ? (
        <Typography
          key={2}
          style={{ flex: 1, color: '#aaa' }}
          variant="subheading"
        >
          {`{ ${node.children.length} attributes }`}
        </Typography>
      ) : (
        <HoverTextField
          key={2}
          onChange={this.handleChangeAttributeValue(node, path)}
          placeholder="Value"
          style={{ flex: 1 }}
          value={node.value}
        />
      )

    const buttons = []
    if (node.type === 'object') {
      buttons.push(
        <IconButton
          key={5}
          onClick={this.handleAddChildAttribute(node, path)}
          style={{ marginRight: 0 }}
          variant="outlined"
        >
          <Icon>add_circle</Icon>
        </IconButton>
      )
    }
    buttons.push(
      <IconButton
        key={3}
        onClick={this.handleDeleteAttribute(node, path)}
        variant="outlined"
      >
        <Icon>delete_outline</Icon>
      </IconButton>
    )

    const attributeType = (
      <HoverSelect
        input={<Input name="type" />}
        key={4}
        onChange={this.handleChangeAttributeType(node, path)}
        value={node.type}
      >
        <MenuItem key={0} value={'string'}>
          Static
        </MenuItem>
        <MenuItem key={1} value={'dynamic'}>
          Dynamic
        </MenuItem>
        <MenuItem key={2} value={'object'}>
          Group
        </MenuItem>
      </HoverSelect>
    )

    return {
      title: [attributeName, colon, attributeValue, ...buttons, attributeType],
    }
  }

  render() {
    return (
      <SidebarLayout>
        <ClaimTemplateDialog
          open={this.state.claimDialogOpen}
          onClose={this.handleCloseClaimDialog}
          onSubmit={this.handleCreateClaim}
        />
        <PageHeader>
          <Typography variant="title">Claim Templates</Typography>
        </PageHeader>
        <SectionTitle>Title</SectionTitle>
        <RecordSelect
          data-test-id="claimTemplateSelect"
          emptyValue={'(No Claim Template Selected)'}
          selectItems={this.props.claimTemplates}
          selectValue={this.state.selectedClaimId}
          onChangeValue={this.handleChangeClaim}
          onClickDelete={this.handleDeleteClaim}
          onClickSave={this.handleSaveClaim}
          onClickCreate={this.handleOpenClaimDialog}
        />
        {this.state.selectedClaimId && (
          <div>
            <SectionTitle>Attributes</SectionTitle>
            <FlexInput numRows={10}>
              <SortableTree
                style={{ flex: 1 }}
                treeData={this.state.selectedClaimSchema}
                onChange={this.handleChangeClaimSchema}
                generateNodeProps={this.getAttributeNode}
                canDrop={parentIsObject}
                theme={SortableTreeTheme}
              />
              <AddAttrButton
                onClick={this.handleAddAttribute}
                variant="outlined"
                data-test-id="addAttrBtn"
              >
                + Attribute
              </AddAttrButton>
            </FlexInput>
          </div>
        )}
      </SidebarLayout>
    )
  }
}

ManageClaims.propTypes = {
  claimTemplates: PropTypes.array,
  clearNewClaimId: PropTypes.func.isRequired,
  createClaimTemplate: PropTypes.func.isRequired,
  deleteClaimTemplate: PropTypes.func.isRequired,
  editClaimTemplate: PropTypes.func.isRequired,
  getClaimTemplates: PropTypes.func.isRequired,
  newClaimId: PropTypes.string,
}

ManageClaims.route = '/claims'

export default connect(
  state => ({
    claimTemplates: state.claimTemplate.templates,
    newClaimId: state.claimTemplate.newTemplateId,
  }),
  dispatch => ({
    getClaimTemplates() {
      dispatch(getClaimTemplates())
    },
    createClaimTemplate(values) {
      dispatch(createClaimTemplate(values))
    },
    editClaimTemplate(values) {
      dispatch(editClaimTemplate(values))
    },
    deleteClaimTemplate(id) {
      dispatch(deleteClaimTemplate(id))
    },
    clearNewClaimId() {
      dispatch(clearNewTemplateId())
    },
  })
)(ManageClaims)
