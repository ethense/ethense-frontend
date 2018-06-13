import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Button,
  Chip,
  Divider,
  Icon,
  IconButton,
  Input,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  CircularProgress,
} from '@material-ui/core'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import Papa from 'papaparse'

import { SidebarLayout } from '../../layouts'
import {
  AddAttrButton,
  FlexInput,
  GradientButton,
  HoverSelect,
  HoverTextField,
  InputRow,
  PageHeader,
  SectionTitle,
} from '../elements'
import { getAppIds, addAppId } from '../../modules/appIdentity'
import AddAppIdDialog from '../AddAppIdDialog'
import { getClaimTemplates } from '../../modules/claimTemplate'
import {
  clearNewIssuanceId,
  createIssuance,
  deleteIssuance,
  editIssuance,
  getIssuances,
  issue,
  batchIssue,
  pollIssuance,
  resend,
  pushAttestation,
  emailAttestation,
} from '../../modules/issuance'
import RecordSelect from '../RecordSelect'
import CreateOrSelect from '../CreateOrSelect'
import ManageClaims from '../ManageClaims'
import { MULTIPLE_RECIPIENTS, SINGLE_RECIPIENT } from '../../constants/enums'
import ClaimTemplateDialog from '../ClaimTemplateDialog'

const RecipientsForm = styled(({ children, ...props }) => (
  <Paper elevation={1} {...props}>
    {children}
  </Paper>
))`
  margin-top: 8px;
`

const RecipientsContent = styled.div`
  padding: 16px;
`

const RecipientsToolbar = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
  margin-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
`

const parseRecipientData = results => {
  if (!results) return []
  const categories = results.data[0]
  const emailIndex = categories.map(c => c.toLowerCase()).indexOf('email')
  if (emailIndex < 0) {
    console.error("no column named 'email'")
    return []
  }
  return results.data.slice(1).map(recipient => {
    const data = {}
    for (var i = 0; i < categories.length; i++) {
      if (i !== emailIndex) {
        const category = categories[i]
        data[category] = recipient[i]
      }
    }
    const r = {
      email: recipient[emailIndex],
      mnid: null,
      lastUpdated: Math.floor(Date.now() / 1000),
      status: 'imported',
      expanded: false,
      data,
    }
    return r
  })
}

const defaultState = {
  appIdDialogOpen: false,
  issuanceDialogOpen: false,
  selectedIssuanceId: '',
  selectedIssuanceDone: false,
  selectedIssuanceIssuing: false,
  selectedAppId: '',
  selectedClaimId: '',
  selectedClaimDynamicFields: [],
  recipientType: MULTIPLE_RECIPIENTS,
  recipientFilter: '',
  recipientDataFields: [],
  recipients: [],
  email: '',
}

export class IssueCert extends Component {
  state = { ...defaultState }

  componentWillMount() {
    this.props.getIssuances()
    this.props.getAppIds()
    this.props.getClaimTemplates()
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.newIssuanceId && !!nextProps.newIssuanceId) {
      if (
        !this.state.selectedIssuanceId ||
        this.state.selectedIssuanceId === nextProps.newIssuanceId
      ) {
        this.selectIssuance(nextProps.newIssuanceId, nextProps.issuances)
      }
      this.props.clearNewIssuanceId()
    }

    // if (this.props.appIds.length === 0 && nextProps.appIds.length > 0) {
    //   this.setState({
    //     selectedAppId: nextProps.appIds[0].id,
    //   })
    // }
  }

  // handlers to manage issuances
  selectIssuance = (id, issuances) => {
    const newState = {
      selectedIssuanceId: id,
      selectedAppId: defaultState.selectedAppId,
      selectedClaimId: defaultState.selectedClaimId,
      selectedIssuanceDone: defaultState.selectedIssuanceDone,
      selectedIssuanceIssuing: defaultState.selectedIssuanceIssuing,
      recipients: defaultState.recipients,
      recipientDataFields: defaultState.recipientDataFields,
      selectedClaimDynamicFields: defaultState.selectedClaimDynamicFields,
    }
    const issuance = issuances.find(i => i.id === id)
    if (issuance) {
      newState.selectedAppId = issuance.appId
      newState.selectedClaimId = issuance.claimId
      newState.selectedIssuanceDone = issuance.done
      newState.selectedIssuanceIssuing = issuance.batchIssuing
      newState.recipients = issuance.recipients
      newState.recipientDataFields = [
        'Email',
        ...Object.keys(
          issuance.recipients.reduce((prev, val) => {
            if (val.data) {
              for (const k in val.data) {
                prev[k] = true
              }
            }
            return prev
          }, {})
        ),
      ]

      const claim = this.props.claimTemplates.find(
        c => c.id === issuance.claimId
      )
      newState.selectedClaimDynamicFields = claim
        ? claim.schema.filter(attr => attr.type === 'dynamic')
        : []

      if (issuance.batchIssuing) {
        setTimeout(() => {
          this.props.pollIssuance(issuance.id)
        }, 1000)
      }
    }
    this.setState(newState)
    return issuance
  }
  handleChangeIssuance = e => {
    const issuanceId = e.target.value
    const issuance = this.selectIssuance(issuanceId, this.props.issuances)
    // TODO: remove this hack to reload the selected issuance
    if (issuance) this.props.pollIssuance(issuance.id)
  }
  handleDeleteIssuance = () => {
    this.props.deleteIssuance(this.state.selectedIssuanceId)
    this.setState({ selectedIssuanceId: '' })
  }
  handleSaveIssuance = () => {
    this.props.editIssuance({
      id: this.state.selectedIssuanceId,
      appId: this.state.selectedAppId,
      claimId: this.state.selectedClaimId,
      recipients: this.state.recipients.map(({ expanded, ...r }) => r),
    })
  }
  handleOpenIssuanceDialog = () => {
    this.setState({ issuanceDialogOpen: true })
  }
  handleCloseIssuanceDialog = () => {
    this.setState({ issuanceDialogOpen: false })
  }
  handleCreateIssuance = values => {
    this.props.createIssuance({
      name: values.name,
      appId: this.state.selectedAppId,
      claimId: this.state.selectedClaimId,
      recipients: this.state.recipients.map(({ expanded, ...r }) => r),
    })
    this.setState({ issuanceDialogOpen: false })
  }
  handleSubmit = () => {
    const issuanceId = this.state.selectedIssuanceId
    if (issuanceId) {
      this.props.batchIssue(issuanceId)
    } else {
      console.warn('do not issue ', issuanceId)
    }
    // this.props.issue(this.state.selectedAppId, this.state.email, this.state.treeData)
  }

  // handlers to manage app ids
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
  handleChangeAppId = e => {
    this.setState({ selectedAppId: e.target.value })
  }

  // handlers to manage claim templates
  handleChangeClaim = e => {
    const claimId = e.target.value
    const claim = this.props.claimTemplates.find(c => c.id === claimId)

    function collectDynamicField(attribute) {
      switch (attribute.type) {
        case 'dynamic':
          return attribute.value
        case 'object':
          let dynamicFields = []
          attribute.children.forEach(a => {
            const childFields = collectDynamicField(a)
            if (Array.isArray(childFields)) {
              dynamicFields = dynamicFields.concat(childFields)
            } else {
              dynamicFields.push(childFields)
            }
          })
          return dynamicFields
        default:
          return null
      }
    }

    const selectedClaimDynamicFields = claim
      ? claim.schema.reduce((acc, attribute) => {
          const dynamicFields = collectDynamicField(attribute)
          if (Array.isArray(dynamicFields)) acc = acc.concat(dynamicFields)
          else acc.push(dynamicFields)
          return acc
        }, [])
      : []

    this.setState({
      selectedClaimId: claimId,
      selectedClaimDynamicFields,
    })
  }

  // handlers to manage recipients
  handleChangeRecipientType = (e, value) => {
    this.setState({ recipientType: value })
  }
  handleChangeEmail = e => {
    this.setState({ email: e.target.value })
  }
  handleRecipientToggle = email => e => {
    this.setState({
      recipients: this.state.recipients.map(r => {
        return r.email === email ? { ...r, expanded: !r.expanded } : r
      }),
    })
  }
  handleChangeRecipientFilter = e => {
    this.setState({ recipientFilter: e.target.value })
  }
  handleRecipientImport = e => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0]
      Papa.parse(file, {
        complete: (results, file) => {
          this.setState({
            recipientDataFields: [...results.data[0]],
            recipients: parseRecipientData(results),
          })
        },
      })
    }
  }
  handleResend = email => e => {
    this.props.resend(this.state.selectedIssuanceId, email)
  }
  handlePushAttestation = email => e => {
    this.props.pushAttestation(email)
  }
  handleEmailAttestation = email => e => {
    this.props.emailAttestation(email)
  }

  render() {
    const missingFields = this.state.selectedClaimDynamicFields.filter(
      field => !this.state.recipientDataFields.includes(field.value)
    )
    const primaryBtnText = this.state.selectedIssuanceDone
      ? 'Issued'
      : this.state.selectedIssuanceIssuing
        ? 'Issuing...'
        : 'Issue'

    const locked =
      this.state.selectedIssuanceDone || this.state.selectedIssuanceIssuing

    return (
      <SidebarLayout>
        <PageHeader>
          <Typography variant="title">Issue Certificates</Typography>
          <GradientButton
            onClick={this.handleSubmit}
            data-test-id="issueBtn"
            variant="raised"
            disabled={locked}
          >
            {primaryBtnText}
            {this.state.selectedIssuanceIssuing && (
              <CircularProgress size={24} />
            )}
            {this.state.selectedIssuanceDone && (
              <Icon>check_circle_outline</Icon>
            )}
          </GradientButton>
        </PageHeader>

        <SectionTitle>Issuance</SectionTitle>
        <RecordSelect
          data-test-id="issuanceSelect"
          emptyValue={'(No Issuance Selected)'}
          selectItems={this.props.issuances}
          selectValue={this.state.selectedIssuanceId}
          onChangeValue={this.handleChangeIssuance}
          onClickDelete={this.handleDeleteIssuance}
          onClickSave={this.handleSaveIssuance}
          onClickCreate={this.handleOpenIssuanceDialog}
          locked={locked}
        />
        <ClaimTemplateDialog
          open={this.state.issuanceDialogOpen}
          onClose={this.handleCloseIssuanceDialog}
          onSubmit={this.handleCreateIssuance}
        />

        <SectionTitle>Issuer App Identity</SectionTitle>
        <CreateOrSelect
          emptyNode={
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
            </Typography>
          }
          emptyValue="(No App Id Selected)"
          selectItems={this.props.appIds}
          selectValue={this.state.selectedAppId}
          onCreateItem={this.handleOpenAppIdDialog}
          onChangeItem={this.handleChangeAppId}
          buttonText={'Add App Identity'}
          disabled={locked}
        />
        <AddAppIdDialog
          open={this.state.appIdDialogOpen}
          onClose={this.handleCloseAppIdDialog}
          onSubmit={this.handleAddAppId}
        />

        <SectionTitle>Issued Claim Template</SectionTitle>
        <CreateOrSelect
          emptyNode={
            <Typography key={0} variant="caption" color="error">
              No Claim Templates found. Please create one from the Manage Claims
              page.
            </Typography>
          }
          emptyValue="(No Claim Template Selected)"
          selectItems={this.props.claimTemplates}
          selectValue={this.state.selectedClaimId}
          onCreateItem={() => {
            this.props.history.push(ManageClaims.route)
          }}
          onChangeItem={this.handleChangeClaim}
          buttonText={'Create claim'}
          disabled={locked}
        />

        <SectionTitle>Recipients</SectionTitle>
        <RecipientsForm>
          <Tabs
            value={this.state.recipientType}
            onChange={this.handleChangeRecipientType}
            indicatorColor="primary"
          >
            <Tab label="Cohort" />
            <Tab label="Test" />
          </Tabs>
          <Divider />
          {this.state.recipientType === MULTIPLE_RECIPIENTS && (
            <div>
              {this.state.selectedClaimDynamicFields.length > 0 && (
                <div
                  style={{ paddingLeft: 16, marginTop: 16, marginBottom: 16 }}
                >
                  <Typography
                    variant="caption"
                    style={{ display: 'inline-block' }}
                  >
                    Dynamic Fields:
                  </Typography>
                  {this.state.selectedClaimDynamicFields.map((field, i) => {
                    const imported = this.state.recipientDataFields.includes(
                      field
                    )
                    return (
                      <Chip
                        key={i}
                        label={field}
                        style={{
                          marginLeft: 8,
                          background: imported ? '#eaeaea' : '#ffc8c8',
                        }}
                      />
                    )
                  })}
                </div>
              )}
              <RecipientsToolbar>
                <TextField
                  style={{ flex: 1, marginRight: 36 }}
                  disabled={this.state.recipients.length === 0}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>search</Icon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Filter by Recipient Email"
                  onChange={this.handleChangeRecipientFilter}
                />
                <Button
                  color="primary"
                  variant="raised"
                  disabled={locked}
                  onClick={e => this.uploadCsv.click()}
                >
                  Import CSV
                </Button>
                <input
                  type="file"
                  ref={ref => (this.uploadCsv = ref)}
                  style={{ display: 'none' }}
                  onChange={this.handleRecipientImport}
                  accept=".csv"
                />
              </RecipientsToolbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ paddingLeft: 56 }}>email</TableCell>
                    <TableCell>mnid</TableCell>
                    <TableCell>last updated</TableCell>
                    <TableCell>status</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.recipients.length > 0 &&
                    this.state.recipients
                      .filter(
                        recipient =>
                          this.state.recipientFilter === '' ||
                          recipient.email.includes(this.state.recipientFilter)
                      )
                      .map((recipient, i) => [
                        <TableRow key={i * 2}>
                          <TableCell component="th" scope="row">
                            <IconButton
                              style={{ width: 24, height: 24, marginRight: 8 }}
                              onClick={this.handleRecipientToggle(
                                recipient.email
                              )}
                            >
                              <Icon>
                                {recipient.expanded
                                  ? 'arrow_drop_down'
                                  : 'arrow_right'}
                              </Icon>
                            </IconButton>
                            <span>{recipient.email}</span>
                          </TableCell>
                          <TableCell>{recipient.mnid}</TableCell>
                          <TableCell>
                            <Moment fromNow unix>
                              {recipient.lastUpdated}
                            </Moment>
                          </TableCell>
                          <TableCell>{recipient.status}</TableCell>
                          <TableCell numeric>
                            {(recipient.status === 'requested' ||
                              recipient.status === 'request failed') && (
                              <Button
                                onClick={this.handleResend(recipient.email)}
                              >
                                resend
                              </Button>
                            )}
                            {recipient.status === 'collected' && (
                              <Button
                                onClick={this.handlePushAttestation(
                                  recipient.email
                                )}
                              >
                                push
                              </Button>
                            )}
                            {recipient.status === 'collected' && (
                              <Button
                                onClick={this.handleEmailAttestation(
                                  recipient.email
                                )}
                              >
                                email
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>,
                        recipient.expanded ? (
                          <TableRow key={i * 2 + 1}>
                            <TableCell
                              style={{ background: '#eee', paddingTop: 8 }}
                              colSpan={5}
                            >
                              {Object.keys(recipient.data).map((key, j) => {
                                return (
                                  <div
                                    key={j}
                                    style={{ paddingLeft: 32, marginBottom: 8 }}
                                  >
                                    {key}: {recipient.data[key]}
                                  </div>
                                )
                              })}
                            </TableCell>
                          </TableRow>
                        ) : null,
                      ])}
                </TableBody>
              </Table>
            </div>
          )}
          {this.state.recipientType === SINGLE_RECIPIENT && (
            <RecipientsContent>
              <TextField
                fullWidth
                onChange={this.handleChangeEmail}
                data-test-id="recipientEmail"
                placeholder="Email"
              />
              {this.state.selectedClaimDynamicFields.map((v, i) => (
                <TextField key={i} fullWidth label={v.value} />
              ))}
            </RecipientsContent>
          )}
        </RecipientsForm>
      </SidebarLayout>
    )
  }
}

IssueCert.propTypes = {
  appIds: PropTypes.array,
  claimTemplates: PropTypes.array,
  getAppIds: PropTypes.func.isRequired,
  addAppId: PropTypes.func.isRequired,
  issue: PropTypes.func.isRequired,
  getClaimTemplates: PropTypes.func.isRequired,
  issuances: PropTypes.array,
  newIssuanceId: PropTypes.string,
  pollIssuance: PropTypes.func.isRequired,
  resend: PropTypes.func.isRequired,
  pushAttestation: PropTypes.func.isRequired,
  emailAttestation: PropTypes.func.isRequired,
}

IssueCert.route = '/issue'

export default connect(
  state => ({
    issuances: state.issuance.issuances,
    newIssuanceId: state.issuance.newIssuanceId,
    appIds: state.appIdentity.identities,
    claimTemplates: state.claimTemplate.templates,
  }),
  dispatch => ({
    getIssuances() {
      dispatch(getIssuances())
    },
    createIssuance(values) {
      dispatch(createIssuance(values))
    },
    editIssuance(values) {
      dispatch(editIssuance(values))
    },
    deleteIssuance(id) {
      dispatch(deleteIssuance(id))
    },
    clearNewIssuanceId() {
      dispatch(clearNewIssuanceId())
    },
    getAppIds() {
      dispatch(getAppIds())
    },
    addAppId(values) {
      dispatch(addAppId(values))
    },
    issue(appId, email, schema) {
      dispatch(issue(appId, email, schema))
    },
    batchIssue(id) {
      dispatch(batchIssue(id))
    },
    getClaimTemplates() {
      dispatch(getClaimTemplates())
    },
    pollIssuance(id) {
      dispatch(pollIssuance(id))
    },
    resend(id, email) {
      dispatch(resend(id, email))
    },
    pushAttestation(id, email) {
      dispatch(pushAttestation(id, email))
    },
    emailAttestation(id, email) {
      dispatch(emailAttestation(id, email))
    },
  })
)(withRouter(IssueCert))
