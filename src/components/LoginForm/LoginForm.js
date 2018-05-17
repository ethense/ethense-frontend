import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { StyledPaper, FlexSpace, FullWindow } from './elements'
import { getUsersExist, createAdmin, login } from '../../modules/authentication'
import UportLogin from './UportLogin'
import EmailLogin from './EmailLogin'

export const SUBMIT_LOGIN = 'login'
export const SUBMIT_CREATE = 'create admin'
export const TOGGLE_LOGIN_UPORT = 'login with uport'
export const TOGGLE_LOGIN_EMAIL = 'login with email'
export const TOGGLE_CREATE_UPORT = 'create with uport'
export const TOGGLE_CREATE_EMAIL = 'create with email'
export const SCAN_LOGIN = 'scan with uport to login'
export const SCAN_CREATE = 'scan with uport to create admin'

const getElementTexts = (usersExist, useUport) => ({
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

export class LoginForm extends Component {
  constructor(props) {
    super(props)
    const useUport = false
    this.state = {
      useUport,
      ...getElementTexts(props.usersExist, useUport),
    }

    this.toggleUport.bind(this)
  }

  toggleUport = () => {
    const useUport = !this.state.useUport
    this.setState({
      useUport,
      ...getElementTexts(this.props.usersExist, useUport),
    })
  }

  componentWillMount() {
    // query the server, if no users exist change to create admin form
    this.props.getUsersExist()
  }

  componentWillReceiveProps(nextProps) {
    // when usersExist updates from the store, update our texts
    if (nextProps.usersExist !== this.props.usersExist) {
      this.setState(getElementTexts(nextProps.usersExist, nextProps.useUport))
    }
  }

  render() {
    return (
      <FullWindow>
        <StyledPaper data-test-id="loginForm" elevation={1}>
          {this.state.useUport ? (
            <UportLogin />
          ) : (
            <EmailLogin
              onSubmit={
                this.props.usersExist
                  ? this.props.login
                  : this.props.createAdmin
              }
              submitText={this.state.submitText}
            />
          )}
          <FlexSpace />
          <Button
            data-test-id="toggleLoginMode"
            fullWidth
            variant="raised"
            onClick={this.toggleUport}
          >
            {this.state.toggleText}
          </Button>
        </StyledPaper>
      </FullWindow>
    )
  }
}

LoginForm.propTypes = {
  usersExist: PropTypes.bool.isRequired,
  getUsersExist: PropTypes.func.isRequired,
  createAdmin: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
}

LoginForm.route = '/'

export default connect(
  state => ({
    usersExist: state.authentication.usersExist,
  }),
  dispatch => ({
    getUsersExist() {
      dispatch(getUsersExist())
    },
    createAdmin(values) {
      dispatch(createAdmin(values))
    },
    login() {
      dispatch(login())
    },
  })
)(LoginForm)
