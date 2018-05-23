import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import * as Isemail from 'isemail'

import { GradientButton } from '../elements'

const CREATE_USER_TITLE = 'Create User'
const EDIT_USER_TITLE = 'Edit User'
const CREATE_USER_SUBMIT = 'Create'
const EDIT_USER_SUBMIT = 'Save'

const required = value => (!!value ? undefined : 'Required')
const email = value =>
  Isemail.validate(value || '', { minDomainAtoms: 2 })
    ? undefined
    : 'Invalid Email'

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    error={touched && !!error}
    helperText={touched && !!error ? error : ' '}
    label={label}
    {...input}
    {...custom}
  />
)

export class UserDialog extends Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.open && !this.props.open) {
      const user = nextProps.selectedUser
      this.props.initialize({
        email: user ? user.email : '',
        password: '',
      })
    }
  }

  render() {
    return (
      <Dialog
        data-test-id="userForm"
        onClose={this.props.handleClose}
        open={this.props.open}
      >
        <DialogTitle>
          {this.props.selectedUser ? EDIT_USER_TITLE : CREATE_USER_TITLE}
        </DialogTitle>
        <DialogContent>
          <form>
            <Field
              component={renderTextField}
              data-test-id="emailInput"
              fullWidth
              label="Email"
              name="email"
              validate={[required, email]}
            />
            <Field
              component={renderTextField}
              data-test-id="passwordInput"
              fullWidth
              label="Password"
              name="password"
              type="password"
              validate={[required]}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>cancel</Button>
          <GradientButton
            data-test-id="submitAddAppId"
            disabled={this.props.invalid}
            onClick={this.props.handleSubmit(this.props.onSubmit)}
            variant="raised"
          >
            {this.props.selectedUser ? EDIT_USER_SUBMIT : CREATE_USER_SUBMIT}
          </GradientButton>
        </DialogActions>
      </Dialog>
    )
  }
}

UserDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  selectedUser: PropTypes.object,
}

export default reduxForm({
  form: 'UserForm',
})(UserDialog)
