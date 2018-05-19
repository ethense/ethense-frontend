import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'

import { GradientButton } from '../elements'

const required = value => (!!value ? undefined : 'Required')
const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    helperText={touched && !!error ? error : ' '}
    error={touched && !!error}
    {...input}
    {...custom}
  />
)

export class AddAppIdDialog extends Component {
  render() {
    return (
      <Dialog
        data-test-id="addAppIdForm"
        open={this.props.open}
        onClose={this.props.handleClose}
      >
        <DialogTitle>New App Identity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Something about adding an app Identity
          </DialogContentText>
          <form>
            <Field
              data-test-id="appNameInput"
              name="name"
              validate={[required]}
              component={renderTextField}
              fullWidth
              label="App Name"
            />
            <Field
              data-test-id="mnidInput"
              name="mnid"
              validate={[required]}
              component={renderTextField}
              fullWidth
              label="MNID"
            />
            <Field
              data-test-id="privateKeyInput"
              name="privateKey"
              validate={[required]}
              component={renderTextField}
              fullWidth
              label="Private Key"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>cancel</Button>
          <GradientButton
            data-test-id="submitAddAppId"
            onClick={this.props.handleSubmit(this.props.onSubmit)}
            variant="raised"
            disabled={this.props.invalid}
          >
            add
          </GradientButton>
        </DialogActions>
      </Dialog>
    )
  }
}

AddAppIdDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'AddAppId',
})(AddAppIdDialog)
