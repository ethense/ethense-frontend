import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import {
  StyledPaper,
  StyledTextField,
  StyledButton,
  FlexSpace,
} from './elements'
import {getUsersExist} from '../../modules/authentication'

export class LoginForm extends Component {
  componentWillMount() {
    this.props.getUsersExist()
  }

  render() {
    return (
      <StyledPaper data-test-id="loginForm" elevation={1}>
        <StyledTextField
          data-test-id="emailInput"
          fullWidth
          label="Email"
          endIcon="email"
        />
        <StyledTextField
          data-test-id="passwordInput"
          fullWidth
          type="password"
          label="Password"
          endIcon="lock"
        />
        <StyledButton data-test-id="submitLogin" fullWidth variant="raised">
          Login
        </StyledButton>
        <FlexSpace />
        <Button data-test-id="toggleLoginMode" fullWidth variant="raised">
          Login with uPort
        </Button>
      </StyledPaper>
    )
  }
}

LoginForm.porpTypes = {
  getUsersExist: PropTypes.func.isRequired,
}

export default connect(
  state => ({
  }),
  dispatch => ({
    getUsersExist() { dispatch(getUsersExist())},
  })
)(LoginForm)
