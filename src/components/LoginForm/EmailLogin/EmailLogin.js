import React, { Component } from 'react'
import { StyledTextField, StyledButton } from './elements'
import * as Isemail from 'isemail'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'

const required = value => (value ? undefined : 'Required')
const email = value =>
  Isemail.validate(value || '', { minDomainAtoms: 2 })
    ? undefined
    : 'Invalid Email'

export class EmailLogin extends Component {
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Field
          data-test-id="emailInput"
          name="email"
          validate={[required, email]}
          component={StyledTextField}
          fullWidth
          label="Email"
          endIcon="email"
        />
        <Field
          data-test-id="passwordInput"
          name="password"
          type="password"
          validate={[required]}
          component={StyledTextField}
          fullWidth
          label="Password"
          endIcon="lock"
        />
        <StyledButton
          type="submit"
          data-test-id="submitLogin"
          fullWidth
          variant="raised"
        >
          {this.props.submitText}
        </StyledButton>
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
