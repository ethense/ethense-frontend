import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
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

export class ClaimTemplateDialog extends Component {
  render() {
    return (
      <Dialog
        data-test-id="claimTemplateDialog"
        open={this.props.open}
        onClose={this.props.handleClose}
      >
        <DialogTitle>
          {this.props.title ? this.props.title : 'Create Claim Template'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
            <Field
              data-test-id="claimTemplateNameInput"
              name="name"
              validate={[required]}
              component={renderTextField}
              fullWidth
              label={
                this.props.fieldLabel ? this.props.fieldLabel : 'Template Name'
              }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>cancel</Button>
          <GradientButton
            data-test-id="submitClaimTemplate"
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

ClaimTemplateDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'ClaimTemplate',
})(ClaimTemplateDialog)
