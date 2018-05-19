import React, { Component } from 'react'
import { StyledTextField } from './elements'
import GradientButton from '../../GradientButton'
import * as Isemail from 'isemail'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'

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
  <StyledTextField
    label={label}
    helperText={touched && !!error ? error : ' '}
    error={touched && !!error}
    {...input}
    {...custom}
  />
)

export class EmailLogin extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <Field
          data-test-id="emailInput"
          name="email"
          validate={[required, email]}
          component={renderTextField}
          fullWidth
          label="Email"
          endIcon="email"
        />
        <Field
          data-test-id="passwordInput"
          name="password"
          type="password"
          validate={[required]}
          component={renderTextField}
          fullWidth
          label="Password"
          endIcon="lock"
        />
        <GradientButton
          type="submit"
          data-test-id="submitLogin"
          fullWidth
          variant="raised"
          disabled={this.props.invalid}
        >
          {this.props.submitText}
        </GradientButton>
      </form>
    )
  }
}

EmailLogin.propTypes = {
  submitText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'EmailLogin',
})(EmailLogin)
