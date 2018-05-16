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
import { getUsersExist, createAdmin, login } from '../../modules/authentication'

export const SUBMIT_LOGIN = 'login'
export const SUBMIT_CREATE = 'create admin'
export const TOGGLE_LOGIN_UPORT = 'login with uport'
export const TOGGLE_LOGIN_EMAIL = 'login with email'
export const TOGGLE_CREATE_UPORT = 'create with uport'
export const TOGGLE_CREATE_EMAIL = 'create with email'
export const SCAN_LOGIN = 'scan with uport to login'
export const SCAN_CREATE = 'scan with uport to create admin'

export class LoginForm extends Component {
  constructor(props) {
    super(props)
    const useUport = false
    this.state = {
      useUport,
      ...this.getElementTexts(props.usersExist, useUport),
    }
  }

  getElementTexts = (usersExist, useUport) => ({
    submitText: usersExist ? SUBMIT_LOGIN : SUBMIT_CREATE,
    scanText: usersExist ? SCAN_LOGIN : SCAN_CREATE,
    toggleText: usersExist
      ? useUport
        ? TOGGLE_LOGIN_EMAIL
        : TOGGLE_LOGIN_UPORT
      : useUport
        ? TOGGLE_CREATE_EMAIL
        : TOGGLE_CREATE_UPORT,
  })

  componentWillMount() {
    // query the server, if no users exist change to create admin form
    this.props.getUsersExist()
  }

  componentWillReceiveProps(nextProps) {
    // when usersExist updates from the store, update our texts
    if (nextProps.usersExist !== this.props.usersExist) {
      this.setState(
        this.getElementTexts(nextProps.usersExist, nextProps.useUport)
      )
    }
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
        <StyledButton
          onClick={() => {
            this.props.usersExist
              ? this.props.login()
              : this.props.createAdmin()
          }}
          data-test-id="submitLogin"
          fullWidth
          variant="raised"
        >
          {this.state.submitText}
        </StyledButton>
        <FlexSpace />
        <Button data-test-id="toggleLoginMode" fullWidth variant="raised">
          {this.state.toggleText}
        </Button>
      </StyledPaper>
    )
  }
}

LoginForm.propTypes = {
  usersExist: PropTypes.bool.isRequired,
  getUsersExist: PropTypes.func.isRequired,
  createAdmin: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    usersExist: state.authentication.usersExist,
  }),
  dispatch => ({
    getUsersExist() {
      dispatch(getUsersExist())
    },
    createAdmin() {
      dispatch(createAdmin())
    },
    login() {
      dispatch(login())
    },
  })
)(LoginForm)
