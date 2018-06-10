import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Button,
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

export class IssueCert extends Component {
  state = {
    appIdDialogOpen: false,
    // selectedAppId: this.props.appIds.length > 0 ? this.props.appIds[0].id : null,
    email: '',
    selectedIssuanceId: '',
    selectedAppId: '',
    selectedClaimId: '',
    selectedClaimDynamicFields: [],
    recipientType: MULTIPLE_RECIPIENTS,
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

  render() {
    return (
      <SidebarLayout>
        <PageHeader>
          <Typography variant="title">Issue Certificates</Typography>
          <GradientButton
            onClick={this.handleSubmit}
            data-test-id="issueBtn"
            variant="raised"
            disabled
          >
            Issue
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>search</Icon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="recipient email"
                />
                <Button color="secondary" variant="raised">
                  Import CSV
                </Button>
              </RecipientsToolbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>email</TableCell>
                    <TableCell>mnid</TableCell>
                    <TableCell>last updated</TableCell>
                    <TableCell>status</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <IconButton
                        style={{ width: 24, height: 24, marginRight: 8 }}
                      >
                        <Icon>arrow_drop_down</Icon>
                      </IconButton>
                      <span>user.one@consensys.net</span>
                    </TableCell>
                    <TableCell />
                    <TableCell>31 days ago</TableCell>
                    <TableCell>imported</TableCell>
                    <TableCell numeric />
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ background: '#eee' }} colSpan={5}>
                      {this.state.selectedClaimDynamicFields.map(
                        (attribute, i) => (
                          <div>
                            <strong>{attribute.value}</strong>: blah
                          </div>
                        )
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <IconButton
                        style={{ width: 24, height: 24, marginRight: 8 }}
                      >
                        <Icon>arrow_right</Icon>
                      </IconButton>
                      <span>user.two@consensys.net</span>
                    </TableCell>
                    <TableCell />
                    <TableCell>22 days ago</TableCell>
                    <TableCell>email sent</TableCell>
                    <TableCell numeric>
                      <Button size="small">resend</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <IconButton
                        style={{ width: 24, height: 24, marginRight: 8 }}
                      >
                        <Icon>arrow_right</Icon>
                      </IconButton>
                      <span>user.three@consensys.net</span>
                    </TableCell>
                    <TableCell>2odoBdfhiVZkxQEN432MoT9MsCYRizopXJu</TableCell>
                    <TableCell>8 days ago</TableCell>
                    <TableCell>collected</TableCell>
                    <TableCell numeric>
                      <Button size="small">push</Button>
                      <Button size="small">email</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <IconButton
                        style={{ width: 24, height: 24, marginRight: 8 }}
                      >
                        <Icon>arrow_right</Icon>
                      </IconButton>
                      <span>user.four@consensys.net</span>
                    </TableCell>
                    <TableCell>2odoMoT9MspBdfhoZkxQEN432XJiVCYRizu</TableCell>
                    <TableCell>17 days ago</TableCell>
                    <TableCell>collected</TableCell>
                    <TableCell numeric>
                      <Button size="small" disabled>
                        push
                      </Button>
                      <Button size="small">email</Button>
                    </TableCell>
                  </TableRow>
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
    appIds: state.appIdentity.identities,
    claimTemplates: state.claimTemplate.templates,
  }),
  dispatch => ({
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
