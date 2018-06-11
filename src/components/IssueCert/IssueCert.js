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
import { issue } from '../../modules/issuance'
import { getClaimTemplates } from '../../modules/claimTemplate'
// import {
//   clearNewIssuanceId,
//   createIssuance,
//   deleteIssuance,
//   editIssuance,
//   getIssuances,
// } from '../../modules/issuance'
import RecordSelect from '../RecordSelect'
import CreateOrSelect from '../CreateOrSelect'
import ManageClaims from '../ManageClaims'
import { MULTIPLE_RECIPIENTS, SINGLE_RECIPIENT } from '../../constants/enums'

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
  if(!results) return []
  const categories = results.data[0]
  const emailIndex = categories.map(c => c.toLowerCase()).indexOf('email')
  if(emailIndex < 0) {
    console.error('no column named \'email\'')
    return []
  }
  return results.data.slice(1).map(recipient => {
    const data = {}
    for(var i = 0; i < categories.length; i++) {
      if(i !== emailIndex) {
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
      data
    }
    return r
  })
}

export class IssueCert extends Component {
  state = {
    appIdDialogOpen: false,
    email: '',
    selectedIssuanceId: '',
    selectedAppId: '',
    selectedClaimId: '',
    selectedClaimDynamicFields: [],
    recipientType: MULTIPLE_RECIPIENTS,
    selectedIssuanceDone: false,
    recipientFilter: '',
    recipientDataFields: ['first', 'last'],
    recipients: [
      {
        email: 'user.one@consensys.net',
        mnid: null,
        lastUpdated: 1524268800,
        status: 'imported',
        data: {
          first: 'charlie',
          last: 'kelly',
        },
        expanded: true,
      },
      {
        email: 'user.two@consensys.net',
        mnid: null,
        lastUpdated: 1526169600,
        status: 'requested',
        data: {
          first: 'dee',
          last: 'reynolds',
        },
        expanded: false,
      },
      {
        email: 'user.three@consensys.net',
        mnid: '2odoMoT9MspBdfhoZkxQEN432XJiVCYRizu',
        lastUpdated: 1526860800,
        status: 'collected',
        data: {
          first: 'ronald',
          last: 'macdonald',
        },
        expanded: false,
      },
      {
        email: 'user.four@consensys.net',
        mnid: '2odoBdfhiVZkxQEN432MoT9MsCYRizopXJu',
        lastUpdated: 1528329600,
        status: 'collected',
        data: {
          first: 'dennis',
          last: 'reynolds',
        },
        expanded: false,
      },
    ],
    // recipients: [],
  }

  componentWillMount() {
    this.props.getAppIds()
    this.props.getClaimTemplates()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.appIds.length === 0 && nextProps.appIds.length > 0) {
      this.setState({
        selectedAppId: nextProps.appIds[0].id,
      })
    }
  }

  // handlers to manage issuances
  handleChangeIssuance = () => {}
  handleDeleteIssuance = () => {}
  handleSaveIssuance = () => {}
  handleOpenIssuanceDialog = () => {}
  handleSubmit = () => {
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
    this.setState({
      selectedClaimId: claimId,
      selectedClaimDynamicFields: claim
        ? claim.schema.filter(attr => attr.type === 'dynamic')
        : [],
    })
  }

  // handlers to manage recipients
  handleChangeRecipientType = (e, value) => {
    this.setState({ recipientType: value })
  }
  handleChangeEmail = e => {
    this.setState({ email: e.target.value })
  }
  handleRecipientToggle = i => e => {
    const recipient = this.state.recipients[i]
    this.setState({
      recipients: [
        ...this.state.recipients.slice(0, i),
        {
          ...recipient,
          expanded: !recipient.expanded,
        },
        ...this.state.recipients.slice(i + 1),
      ],
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
          console.log('parsed csv:', results, file)
          this.setState({
            recipientDataFields: [...results.data[0]],
            recipients: parseRecipientData(results)
          })
        },
      })
    }
  }

  render() {
    const missingFields = this.state.selectedClaimDynamicFields.filter(
      field => !this.state.recipientDataFields.includes(field.value)
    )

    return (
      <SidebarLayout>
        <PageHeader>
          <Typography variant="title">Issue Certificates</Typography>
          <GradientButton
            onClick={this.handleSubmit}
            data-test-id="issueBtn"
            variant="raised"
            disabled={this.state.selectedIssuanceDone}
          >
            {this.state.selectedIssuanceDone ? 'Issued' : 'Issue'}
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
          disabled={this.state.selectedIssuanceDone}
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
          disabled={this.state.selectedIssuanceDone}
        />

        <SectionTitle>Recipients</SectionTitle>
        <RecipientsForm>
          <Tabs
            value={this.state.recipientType}
            onChange={this.handleChangeRecipientType}
          >
            <Tab label="Cohort" />
            <Tab label="Test" />
          </Tabs>
          <Divider />
          {this.state.recipientType === MULTIPLE_RECIPIENTS && (
            <div>
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
                  color="secondary"
                  variant="raised"
                  disabled={this.state.selectedIssuanceDone}
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
              {missingFields.length > 0 && (
                <div style={{ padding: 16 }}>
                  <Typography
                    variant="caption"
                    color="error"
                    style={{ marginRight: 8, display: 'inline-block' }}
                  >
                    Imported data is missing the following columns:
                  </Typography>
                  {missingFields.map((field, i) => (
                    <Chip color="error" key={i} label={field.value} />
                  ))}
                </div>
              )}
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
                              onClick={this.handleRecipientToggle(i)}
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
                            {recipient.status === 'requested' && (
                              <Button>resend</Button>
                            )}
                            {recipient.status === 'collected' && (
                              <Button>push</Button>
                            )}
                            {recipient.status === 'collected' && (
                              <Button>email</Button>
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
}

IssueCert.route = '/issue'

export default connect(
  state => ({
    // issuances: state.issuance.issuances,
    appIds: state.appIdentity.identities,
    claimTemplates: state.claimTemplate.templates,
  }),
  dispatch => ({
    // getIssuances() {
    //   dispatch(getIssuances())
    // },
    // createIssuance(values) {
    //   dispatch(createIssuance(values))
    // },
    // editIssuance(values) {
    //   dispatch(editIssuance(values))
    // },
    // deleteIssuance(id) {
    //   dispatch(deleteIssuance(id))
    // },
    // clearNewIssuanceId() {
    //   dispatch(clearNewIssuanceId())
    // },
    getAppIds() {
      dispatch(getAppIds())
    },
    addAppId(values) {
      dispatch(addAppId(values))
    },
    issue(appId, email, schema) {
      dispatch(issue(appId, email, schema))
    },
    getClaimTemplates() {
      dispatch(getClaimTemplates())
    },
  })
)(withRouter(IssueCert))
